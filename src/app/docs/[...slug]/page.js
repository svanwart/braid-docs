import { getMarkdownContent, getAllSlugs } from '@/lib/custom-markdoc-loader';
import Markdoc from '@markdoc/markdoc'
import React from 'react'

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default function DocPage({ params }) {
  const { content, frontmatter, nodes } = getMarkdownContent(params.slug);
//   return (
//     <DocsLayout frontmatter={frontmatter} nodes={nodes}>
//       {Markdoc.renderers.react(content, React)}
//     </DocsLayout>
//   );
    return Markdoc.renderers.react(content, React);
}
