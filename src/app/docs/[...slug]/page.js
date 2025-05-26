import { getMarkdownContent, getAllSlugs } from '@/lib/custom-markdoc-loader';
import { DocsLayout } from '@/components/DocsLayout';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default function DocPage({ params }) {
  const { content, frontmatter, nodes } = getMarkdownContent(params.slug);

  return (
    <DocsLayout frontmatter={frontmatter} nodes={nodes}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </DocsLayout>
  );
}
