import { Global } from '@emotion/react'
import type { AppProps } from 'next/app'
import ViewOnGitHub from '../components/ViewOnGitHub'
import { globalStyles } from '../styles/globals'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyles} />
      <ViewOnGitHub />
      <Component {...pageProps} />
    </>
  )
}
