import { css, cx } from '@linaria/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Menu } from '../types'

export default React.memo(function Navbar({ menu }: { menu: Menu }) {
  const route = useRouter()

  return (
    <nav
      className={cx(
        'nav',
        css`
          position: fixed;
          width: var(--nav-bar-width);
          height: 100%;

          li {
            list-style: none;

            a {
              text-indent: 10px;
              padding: 10px 0;
              width: 100%;
              display: inline-block;
              text-decoration: none;
              text-transform: capitalize;
              color: #333;
            }
          }
        `,
      )}
    >
      <section>
        <h3>Glossary</h3>

        {menu.glossary.map((v) => (
          <li
            className={cx(
              route.query.category === v &&
                css`
                  font-weight: 600;
                  background-color: var(--nav-bar-focus-bg-color);
                `,
              css`
                border-radius: var(--border-radius);
              `,
            )}
            key={v}
          >
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
