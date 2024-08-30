import { slugifyWithCounter } from '@sindresorhus/slugify'

function isHeadingNode(node) {
  return (
    node.type === 'heading' &&
    [1, 2, 3, 4, 5, 6].includes(node.attributes.level) &&
    (typeof node.attributes.id === 'string' ||
      typeof node.attributes.id === 'undefined')
  )
}

function isH2Node(node) {
  return isHeadingNode(node) && node.attributes.level === 2
}

function isH3Node(node) {
  return isHeadingNode(node) && node.attributes.level === 3
}

function getNodeText(node) {
  let text = ''
  for (let child of node.children ?? []) {
    if (child.type === 'text') {
      text += child.attributes.content
    }
    text += getNodeText(child)
  }
  return text
}

function collectAllHeadings(nodes) {
  let headers = []
  for (const node of nodes) {
    headers = collectHeadings(node, headers)
  }
  return headers
}

function collectHeadings(node, headers = []) {
  if (node) {
    // console.log(node)
    if (node.type === 'heading') {
      headers.push(node)
    }
    // Match all h1, h2, h3… tags
    // if (node.name.match(/h\d/)) {
    //   headers.push(node)
    // }

    if (node.children) {
      for (const child of node.children) {
        // console.log('recurse', child.type)
        collectHeadings(child, headers)
      }
    }
  }

  return headers
}

export function collectSections(nodes, slugify = slugifyWithCounter()) {
  let sections = []
  //   console.log(collectAllHeadings(nodes))
  const headings = collectAllHeadings(nodes)
  //   console.log('LENGTH', headings.length)
  //   return sections

  for (let node of headings) {
    if (true) {
      //isH2Node(node) || isH3Node(node)) {
      let title = getNodeText(node)
      if (title) {
        let id = slugify(title)
        if (isH3Node(node)) {
          if (!sections[sections.length - 1]) {
            throw new Error(
              'Cannot add `h3` to table of contents without a preceding `h2`',
            )
          }
          sections[sections.length - 1].children.push({
            ...node.attributes,
            id,
            title,
          })
        } else {
          sections.push({ ...node.attributes, id, title, children: [] })
        }
      }
    }

    sections.push(...collectSections(node.children ?? [], slugify))
    // console.log(sections)
  }
  return sections
}
