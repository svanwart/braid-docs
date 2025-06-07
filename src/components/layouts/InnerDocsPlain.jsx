import { DocsHeader } from '@/components/DocsHeader'
import { PrevNextLinks } from '@/components/PrevNextLinks'
import { Prose } from '@/components/Prose'
import { TableOfContents } from '@/components/TableOfContents'
import { collectSections } from '@/lib/sections'

export function InnerDocsPlain({ children, frontmatter: { title }, nodes }) {
  return (
    <>
      <div className="min-w-0 flex-auto px-4 py-16 lg:pl-8 lg:pr-0 xl:px-16">
        <article>
          <DocsHeader title={title} />
          <Prose>{children}</Prose> 
        </article>
        <PrevNextLinks />
      </div>
    </>
  )
}
