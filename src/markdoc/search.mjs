import Markdoc from '@markdoc/markdoc'
import { slugifyWithCounter } from '@sindresorhus/slugify'
import glob from 'fast-glob'
import * as fs from 'fs'
import * as path from 'path'
import { createLoader } from 'simple-functional-loader'
import * as url from 'url'

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
                // Extract level from frontmatter
                let level =
                  ast.attributes?.frontmatter?.match(
                    /^level:\s*(.*?)\s*$/m,
                  )?.[1] || 'beginner'
                sections = [[title, null, [], level]] // Add level to sections
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

              for (let { url, sections } of data) {
                for (let [title, hash, content, level] of sections) {
                  const entry = {
                    url: url + (hash ? ('#' + hash) : ''),
                    title,
                    content: [title, ...content].join('\\n'),
                    pageTitle: hash ? sections[0][0] : undefined,
                    level: level || 'beginner'
                  }
                  sectionIndex.add(entry)
                }
              }

              export function search(query, options = {}) {
                const { level = 'beginner', ...searchOptions } = options
                console.log('Search called with level:', level)
                
                let result = sectionIndex.search(query, {
                  ...searchOptions,
                  enrich: true,
                })
                
                if (result.length === 0) {
                  return []
                }

                // Filter results based on level
                const filteredResults = result[0].result.filter(item => {
                  const itemLevel = item.doc.level
                  console.log('Item level:', itemLevel, 'User level:', level)
                  if (level === 'beginner') return true // Beginners see everything
                  if (level === 'intermediate') return itemLevel !== 'advanced'
                  if (level === 'advanced') return itemLevel === 'advanced'
                  return true
                })

                console.log('Filtered results:', filteredResults)

                return filteredResults.map((item) => ({
                  url: item.id,
                  title: item.doc.title,
                  pageTitle: item.doc.pageTitle,
                  level: item.doc.level
                }))
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
