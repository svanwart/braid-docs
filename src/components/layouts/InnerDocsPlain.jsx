import { Prose } from '@/components/Prose'


export function InnerDocsPlain({ children, frontmatter: { title }, nodes }) {
  return (
    <>
      <article>
          <Prose>{children}</Prose>
        </article>
    </>
  )
}
