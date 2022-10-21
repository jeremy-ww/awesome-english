import type { AppProps } from 'next/app'
import ViewOnGitHub from '../components/ViewOnGitHub'
import '../styles/globals'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ViewOnGitHub />
      <Component {...pageProps} />
    </>
  )
}
