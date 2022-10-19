import { css } from '@emotion/css'
import Navbar from '../../components/Navbar'
import type { Category, Menu } from '../../types'
import { getContentById, menu, paths } from '../../libs/api'

export default function Content({ menu, category }: { menu: Menu; category: Category }) {
  return (
    <section className="container">
      <Navbar menu={menu} />

      <main
        className={css`
          margin-left: 200px;
          padding: 50px;
          flex: 1;
        `}
      >
        {category.content.map((v) => (
          <section
            className={css`
              display: flex;
              > div {
                flex: 1;
                display: flex;
                align-items: center;
              }
              margin-bottom: 10px;
            `}
            key={v.word}
          >
            <div>{v.word}</div>
            <div>
              <audio
                src="https://jeremy-ww.github.io/awesome-pronunciation/public/audio/denominator.mp3"
                controls="controls"
              ></audio>
            </div>
            <div>{'phonetic'}</div>
            <div>{'reference'}</div>
          </section>
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
