import { css } from '@emotion/css'
import Link from 'next/link'
import React from 'react'
import { Menu } from '../types'

export default React.memo(function Navbar({ menu }: { menu: Menu }) {
  return (
    <nav
      className={css`
        position: fixed;

        li {
          padding: 10px 0;
          list-style: none;
          text-indent: 10px;

          a {
            text-decoration: none;
            text-transform: capitalize;
          }
        }
      `}
    >
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
