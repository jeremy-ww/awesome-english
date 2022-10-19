import Link from 'next/link'
import React from 'react'
import { Menu } from '../types'

export default React.memo(function Navbar({ menu }: { menu: Menu }) {
  return (
    <nav>
      <section>
        <h3>Glossary</h3>

        {menu.glossary.map((v) => (
          <li key={v}>
            <Link href={v}>{v}</Link>
          </li>
        ))}
      </section>

      <section>
        <h3>Expression</h3>

        {menu.expression.map((v) => (
          <li key={v}>
            <Link href={v}>{v}</Link>
          </li>
        ))}
      </section>
    </nav>
  )
})
