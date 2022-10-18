import Link from 'next/link'
import Head from 'next/head'

import metadata from '../libs/metadata'

export default function HomePage({
  metadata,
}: {
  metadata: {
    name: string
    description: string
  }
}) {
  return (
    <main>
      <Head>
        <title>{metadata.name}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      <h1 className="title">
        Read <Link href="/posts/123">this page!</Link>
      </h1>
    </main>
  )
}

export async function getStaticProps() {
  return {
    props: {
      metadata,
    },
  }
}
