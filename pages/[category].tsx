import { css } from '@emotion/css'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import type { Category, Menu } from '../types'
import { getContentById, menu, paths } from '../libs/api'
import metadata from '../libs/metadata'

export default function Content({ menu, category }: { menu: Menu; category: Category }) {
  return (
    <>
      <Head>
        <title>{category.type}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      <Navbar menu={menu} />
      <main className="content">
        {category.content.map((v) => (
          <section
            className={css`
              display: flex;
              padding: 10px 0;
              margin-bottom: 10px;

              > div {
                flex: 1;
                display: flex;
                align-items: center;
              }
            `}
            key={v.word}
          >
            <div>{v.word}</div>
            <div></div>
            <div>{'phonetic'}</div>
            <div>{'reference'}</div>
          </section>
        ))}
      </main>
    </>
  )
}

export async function getStaticProps({
  params,
}: {
  params: {
    category: string
  }
}) {
  const category = getContentById(params.category)

  return {
    props: {
      menu,
      category,
      metadata,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths,
    fallback: false,
  }
}
