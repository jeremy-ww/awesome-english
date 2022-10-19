import { css } from '@emotion/css'
import React from 'react'
import Navbar from './Navbar'

export default React.memo(function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section
      className={css`
        display: flex;
        height: 100%;
      `}
    >
      <Navbar menu={[]} />
      <main>{children}</main>
    </section>
  )
})
