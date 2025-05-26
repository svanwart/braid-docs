import fs from 'fs';
import path from 'path';
import Markdoc from '@markdoc/markdoc';
import config from '../markdoc/config';
import { Tag } from '@markdoc/markdoc';
import { slugifyWithCounter } from '@sindresorhus/slugify';
import yaml from 'js-yaml';

const CONTENT_DIR = path.join(process.cwd(), 'docs');
let documentSlugifyMap = new Map();

export function getAllMarkdownFiles(dir = CONTENT_DIR, array = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllMarkdownFiles(fullPath, array);
    } else if (file.endsWith('.md')) {
      array.push(fullPath);
    }
  }

  return array;
}

export function getSlugFromPath(filePath) {
  return filePath
    .replace(CONTENT_DIR + '/', '')
    .replace(/\.md$/, '')
    .split('/');
}

export function getAllSlugs() {
  const files = getAllMarkdownFiles();
  return files.map(getSlugFromPath);
}

export function getMarkdownContent(slugArray) {
  const filePath = path.join(CONTENT_DIR, ...slugArray) + '.md';
  const raw = fs.readFileSync(filePath, 'utf-8');
  const ast = Markdoc.parse(raw);
  
  // Reset the slugify counter for each document
  documentSlugifyMap.set(config, slugifyWithCounter());
  
  // Transform the AST using the same config
  const content = Markdoc.transform(ast, config);
  
  // Extract frontmatter
  const frontmatter = yaml.load(ast.attributes.frontmatter) || {};
  
  return {
    content: Markdoc.renderers.html(content),
    frontmatter,
    nodes: content.attributes.nodes || []
  };
}
