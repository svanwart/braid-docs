import fs from 'fs'
import path from 'path'
import Markdoc from '@markdoc/markdoc'
import config from '../markdoc/config'
import { slugifyWithCounter } from '@sindresorhus/slugify'
import yaml from 'js-yaml'

const CONTENT_DIR = path.join(process.cwd(), 'docs')
let documentSlugifyMap = new Map()

const MARKDOWN_EXTENSIONS = ['.md', '.mdx']

export function getAllMarkdownFiles(dir = CONTENT_DIR, array = []) {
  const files = fs.readdirSync(dir)

  // Check for page.md or page.mdx in the current directory
  for (const ext of MARKDOWN_EXTENSIONS) {
    const pagePath = path.join(dir, `page${ext}`)
    if (fs.existsSync(pagePath)) {
      array.push(pagePath)
    }
  }

  for (const file of files) {
    const fullPath = path.join(dir, file)
    if (fs.statSync(fullPath).isDirectory()) {
      // Check for page.md or page.mdx in directory
      for (const ext of MARKDOWN_EXTENSIONS) {
        const pagePath = path.join(fullPath, `page${ext}`)
        if (fs.existsSync(pagePath)) {
          array.push(pagePath)
        }
      }
      // Continue searching in subdirectories
      getAllMarkdownFiles(fullPath, array)
    } else if (
      MARKDOWN_EXTENSIONS.some((ext) => file.endsWith(ext)) &&
      !file.startsWith('page')
    ) {
      array.push(fullPath)
    }
  }

  return array
}

export function getSlugFromPath(filePath) {
  const relativePath = filePath
    .replace(CONTENT_DIR + '/', '')
    .replace(/\.(md|mdx)$/, '')
    .replace(/\/page$/, '') // Remove 'page' from the end of the path

  // Handle both nested and non-nested paths
  return relativePath.split('/')
}

export function getAllSlugs() {
  const files = getAllMarkdownFiles()
  return files.map(getSlugFromPath)
}

export function getMarkdownContent(slugArray) {
  // Try both direct .md/.mdx file and directory/page.md/page.mdx
  const paths = []
  for (const ext of MARKDOWN_EXTENSIONS) {
    paths.push(path.join(CONTENT_DIR, ...slugArray) + ext)
    paths.push(path.join(CONTENT_DIR, ...slugArray, `page${ext}`))
  }
  const rootPagePaths = MARKDOWN_EXTENSIONS.map((ext) =>
    path.join(CONTENT_DIR, `page${ext}`),
  )

  let filePath
  if (slugArray.length === 0) {
    // Handle root /docs path
    for (const rootPath of rootPagePaths) {
      if (fs.existsSync(rootPath)) {
        filePath = rootPath
        break
      }
    }
  } else {
    // Check all possible paths
    for (const path of paths) {
      if (fs.existsSync(path)) {
        filePath = path
        break
      }
    }
  }

  if (!filePath) {
    throw new Error(`No markdown file found for path: ${slugArray.join('/')}`)
  }

  const raw = fs.readFileSync(filePath, 'utf-8')
  const ast = Markdoc.parse(raw, {
    allowDangerousHtml: true,
  })

  // Reset the slugify counter for each document
  documentSlugifyMap.set(config, slugifyWithCounter())

  // Transform the AST using the same config
  const content = Markdoc.transform(ast, {
    ...config,
    allowDangerousHtml: true,
  })

  // Extract frontmatter
  const frontmatter = yaml.load(ast.attributes.frontmatter) || {}
  return {
    content: content,
    frontmatter,
    nodes: content.attributes.nodes || [],
  }
}
