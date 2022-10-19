import { css } from '@emotion/css'
import Navbar from '../../components/Navbar'
import type { Content, Menu } from '../../types'
import { getContentById, menu, paths } from '../../libs/api'

export default function Content({ menu, content }: { menu: Menu; content: Content }) {
  return (
    <section
      className={css`
        display: flex;
        height: 100%;
      `}
    >
      <Navbar menu={menu} />

      <main>
        <ul>
          <li>{content.word}</li>
          <li>{content.origin}</li>
          <li>{content.phonetic}</li>
          <li>{content.reference}</li>
        </ul>
      </main>
    </section>
  )
}

export async function getStaticProps({
  params,
}: {
  params: {
    word: string
  }
}) {
  const content = getContentById(params.word)

  return {
    props: {
      menu,
      content,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths,
    fallback: false,
  }
}
