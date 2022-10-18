import { css, cx } from '@emotion/css'

export default function Layout({ children }: {
  children: React.ReactNode
}) {
  return <main className={css`border: 1px solid green;`}>{children}</main>;
}