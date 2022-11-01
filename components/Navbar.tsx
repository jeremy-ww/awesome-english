import { css, cx } from '@linaria/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Menu } from '../types'

function SubMenu({
  data,
  onClick,
  prefix,
  activeUrl,
}: {
  data: string[]
  onClick: () => void
  prefix: string
  activeUrl: string
}) {
  return (
    <>
      {data.map((v) => (
        <li
          className={cx(
            activeUrl === `${prefix}-${v}` &&
              css`
                font-weight: 600;
                background-color: var(--nav-bar-focus-bg-color);
              `,
            css`
              border-radius: var(--border-radius);
            `,
          )}
          aria-hidden
          onClick={onClick}
          onKeyUp={onClick}
          key={v}
        >
          <Link href={`/${prefix}-${v}`}>{v}</Link>
        </li>
      ))}
    </>
  )
}

export default React.memo(function Navbar({
  menu,
  className,
  onClick,
}: {
  menu: Menu
  className?: string
  onClick?: () => void
}) {
  const route = useRouter()

  return (
    <nav
      className={cx(
        'nav',
        className,
        css`
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
              color: var(--text-secondary);
            }
          }
        `,
      )}
    >
      <section>
        <h3>Glossary</h3>

        <SubMenu
          activeUrl={route.query.name as string}
          data={menu.glossary}
          prefix="glossary"
          onClick={onClick}
        />
      </section>

      <section>
        <h3>Expression</h3>

        <SubMenu
          activeUrl={route.query.name as string}
          data={menu.expression}
          prefix="expression"
          onClick={onClick}
        />
      </section>
    </nav>
  )
})
