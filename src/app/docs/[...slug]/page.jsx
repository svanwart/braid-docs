import { getMarkdownContent, getAllSlugs } from '@/lib/custom-markdoc-loader'
import Markdoc from '@markdoc/markdoc'
import React from 'react'
import { InnerDocsLayout } from '@/components/layouts/InnerDocsLayout'
import { InnerDocsPlain } from '@/components/layouts/InnerDocsPlain'

const layouts = {
  inner: InnerDocsLayout,
  plain: InnerDocsPlain,
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default function DocPage({ params }) {
  const { content, frontmatter, nodes } = getMarkdownContent(params.slug)
  const Layout = layouts[frontmatter?.layout || 'inner'] || InnerDocsLayout

  return (
    <Layout frontmatter={frontmatter} nodes={nodes}>
      {Markdoc.renderers.react(content, React)}
    </Layout>
  )
}
