import { css } from '@emotion/css'
import Navbar from '../../components/Navbar'
import type { Category, Menu } from '../../types'
import { getContentById, menu, paths } from '../../libs/api'

export default function Content({ menu, category }: { menu: Menu; category: Category }) {
  return (
    <section
      className={css`
        display: flex;
        height: 100%;
      `}
    >
      <Navbar menu={menu} />

      <main>
        {category.content.map((v) => (
          <ul key={v.word}>
            <li>{v.word}</li>
            <li>{v.origin}</li>
            <li>{v.phonetic}</li>
            <li>{v.reference}</li>
          </ul>
        ))}
      </main>
    </section>
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
    },
  }
}

export async function getStaticPaths() {
  return {
    paths,
    fallback: false,
  }
}
