import { css, cx } from '@emotion/css'
import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <section>
          <h2>Glossary</h2>

          <Link href="/123">123</Link>
          <Link href="/123">123</Link>
          <Link href="/123">123</Link>
          <Link href="/123">123</Link>
          <Link href="/123">123</Link>
        </section>

        <section>
          <h2>Expression</h2>

          <Link href="/123">123</Link>
          <Link href="/123">123</Link>
          <Link href="/123">123</Link>
          <Link href="/123">123</Link>
        </section>
      </nav>
      <main>{children}</main>
    </>
  )
}
