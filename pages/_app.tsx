import type { AppProps } from 'next/app'
import ViewOnGitHub from '../components/ViewOnGitHub'
import Head from 'next/head'
import '../styles/globals'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@JeremyWuReal" />
        <meta property="og:title" content={process.env.APP_NAME} />
        <meta property="og:image" content="https://awesome-english.vercel.app/og-image.jpeg" />
      </Head>

      <ViewOnGitHub />
      <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      </QueryClientProvider>
    </>
  )
}
