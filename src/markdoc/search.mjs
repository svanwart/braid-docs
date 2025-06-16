import Markdoc from '@markdoc/markdoc'
import { slugifyWithCounter } from '@sindresorhus/slugify'
import glob from 'fast-glob'
import * as fs from 'fs'
import * as path from 'path'
import { createLoader } from 'simple-functional-loader'
import * as url from 'url'
import { navigation } from '../lib/navigation.mjs'

const __filename = url.fileURLToPath(import.meta.url)
const slugify = slugifyWithCounter()

function toString(node) {
  let str =
    node.type === 'text' && typeof node.attributes?.content === 'string'
      ? node.attributes.content
      : ''
  if ('children' in node) {
    for (let child of node.children) {
      str += toString(child)
    }
  }
  return str
}

function extractSections(node, sections, isRoot = true) {
  if (isRoot) {
    slugify.reset()
  }
  if (node.type === 'heading' || node.type === 'paragraph') {
    let content = toString(node).trim()
    if (node.type === 'heading' && node.attributes.level <= 2) {
      let hash = node.attributes?.id ?? slugify(content)
      sections.push([content, hash, []])
    } else {
      sections.at(-1)[2].push(content)
    }
  } else if ('children' in node) {
    for (let child of node.children) {
      extractSections(child, sections, false)
    }
  }
}

// Create a map of URLs to their levels from navigation
const urlToLevels = new Map()
navigation.forEach((section) => {
  section.links.forEach((link) => {
    urlToLevels.set(link.href, link.level)
  })
})
console.log('URL to levels:', urlToLevels)

export default function withSearch(nextConfig = {}) {
  let cache = new Map()

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: __filename,
        use: [
          createLoader(function () {
            // Define multiple directories to watch
            const contentDirs = [
              path.resolve('./src/app'),
              path.resolve('./docs'),
              // Add more directories as needed
            ]
            console.log(contentDirs)

            // Add each directory as a context dependency
            contentDirs.forEach((dir) => {
              this.addContextDependency(dir)
            })

            // Search for page.md files in all directories
            let files = contentDirs.flatMap((dir) => {
              try {
                return glob
                  .sync('**/**.md', { cwd: dir })
                  .map((file) => ({ file, dir }))
              } catch (e) {
                console.warn(`Directory ${dir} not found, skipping...`)
                return []
              }
            })

            let data = files.map(({ file, dir }) => {
              // Get the relative path from the project root
              const relativeDir = path.relative(process.cwd(), dir)
              // Construct URL with the directory path
              let url = `/${relativeDir}/${file.replace(/\.md$/, '')}`
                .replace(/^\/src\/app\//, '/') // Remove src/app prefix if present
                .replace(/^\/docs\//, '/docs/') // Ensure docs prefix is present
              url = url.replace('/page', '/')
              let md = fs.readFileSync(path.join(dir, file), 'utf8')

              let sections

              if (cache.get(file)?.[0] === md) {
                sections = cache.get(file)[1]
              } else {
                let ast = Markdoc.parse(md)
                let title =
                  ast.attributes?.frontmatter?.match(
                    /^title:\s*(.*?)\s*$/m,
                  )?.[1]
                sections = [[title, null, []]]
                extractSections(ast, sections)
                cache.set(file, [md, sections])
              }

              return { url, sections }
            })

            // When this file is imported within the application
            // the following module is loaded:
            return `
              import FlexSearch from 'flexsearch'

              let sectionIndex = new FlexSearch.Document({
                tokenize: 'full',
                document: {
                  id: 'url',
                  index: 'content',
                  store: ['title', 'pageTitle', 'level'],
                },
                context: {
                  resolution: 9,
                  depth: 2,
                  bidirectional: true
                }
              })

              let data = ${JSON.stringify(data)}
              let urlToLevels = ${JSON.stringify(Array.from(urlToLevels.entries()))}
              console.log('URL to levels:', urlToLevels)

              for (let { url, sections } of data) {
                for (let [title, hash, content] of sections) {
                  const levels = urlToLevels.find(([u]) => u === url)?.[1]
                  if (!levels) {
                    console.warn('Unknown URL in search index:', url)
                    continue // Skip this entry if URL is not in navigation
                  }
                  const entry = {
                    url: url + (hash ? ('#' + hash) : ''),
                    title,
                    content: [title, ...content].join('\\n'),
                    pageTitle: hash ? sections[0][0] : undefined,
                    level: levels
                  }
                  sectionIndex.add(entry)
                  // console.log('Added entry:', entry)
                }
              }

              export function search(query, { limit = 5, level = 1 } = {}) {
                console.log('Search called with level:', level)
                let results = []
                let index = 0

                for (let { url, sections } of data) {
                  for (let [title, hash, content] of sections) {
                    let score = 0
                    let position = 0
                    let positions = []

                    // Search in the title
                    let titlePosition = title.toLowerCase().indexOf(query.toLowerCase())
                    if (titlePosition !== -1) {
                      score += 2
                      positions.push(titlePosition)
                    }

                    // Search in the content (which is an array of strings)
                    let contentText = content.join(' ').toLowerCase()
                    let contentPosition = contentText.indexOf(query.toLowerCase())
                    if (contentPosition !== -1) {
                      score += 1
                      positions.push(contentPosition)
                    }

                    if (score > 0) {
                      // Get the levels for this URL
                      const itemLevels = urlToLevels.find(([u]) => u === url)?.[1] || [1]
                      console.log('Filtering item:', {
                        url,
                        title,
                        itemLevels,
                        userLevel: level,
                        shouldInclude: level === 0 || itemLevels.includes(level)
                      })

                      // Include the item if it matches the user level or if level is 0 (All Levels)
                      if (level === 0 || itemLevels.includes(level)) {
                        results.push({
                          url: url + (hash ? '#' + hash : ''),
                          title,
                          content: contentText.slice(Math.max(0, positions[0] - 20), positions[0] + 100),
                          score,
                        })
                      }
                    }
                  }
                }

                results.sort((a, b) => b.score - a.score)
                console.log('Filtered results:', results)
                return results.slice(0, limit)
              }
            `
          }),
        ],
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })
}
