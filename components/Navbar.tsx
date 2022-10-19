import Link from 'next/link'

export default function Navbar({ menu }: { menu: string[] }) {
  console.log(menu)
  return (
    <nav>
      <section>
        <h3>Glossary</h3>

        {menu?.map((v) => (
          <Link key={v} href={v}>
            {v}
          </Link>
        ))}

        <Link href="/123">123</Link>
        <Link href="/123">123</Link>
        <Link href="/123">123</Link>
        <Link href="/123">123</Link>
      </section>

      <section>
        <h3>Expression</h3>

        <Link href="/123">123</Link>
        <Link href="/123">123</Link>
        <Link href="/123">123</Link>
        <Link href="/123">123</Link>
      </section>
    </nav>
  )
}
