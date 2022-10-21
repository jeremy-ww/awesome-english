import { css } from '@linaria/core'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import type { Category, Menu } from '../types'
import { getContentById, menu, paths } from '../libs/api'
import metadata from '../libs/metadata'
import Case from 'case'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import breakpoints from '../styles/breakpoints'

export default function Content({ menu, category }: { menu: Menu; category: Category }) {
  return (
    <>
      <Head>
        <title>{`${Case.capital(category.type)} - ${process.env.APP_NAME}`}</title>
        <meta name="description" content={metadata.description} />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>

      <Navbar menu={menu} />

      <main className="content">
        {category.content.map((v) => (
          <section
            className={css`
              display: grid;
              grid-template-columns: 1fr 2fr 1fr;
              gap: 5px;
              padding: 10px 0;
              margin-bottom: 10px;
              align-items: center;
              border-bottom: 1px solid #f5f5f5;

              > div {
                display: flex;
                align-items: center;
                flex: 1;
                color: var(--primary-color);
                overflow: hidden;
              }

              .rhap_container {
                padding: 0;
                box-shadow: none;
                width: 60%;

                .rhap_main {
                  flex-direction: row-reverse;
                }

                .rhap_controls-section {
                  margin: 0;
                }

                .rhap_progress-indicator {
                  width: 15px;
                  height: 15px;
                  top: -6px;
                }

                .rhap_progress-bar {
                  height: 4px;
                }
              }

              @media (max-width: ${breakpoints.md}) {
                .rhap_progress-section {
                  display: none;
                }
                .rhap_container {
                  width: 100%;
                }
              }
            `}
            key={v.word}
          >
            <div>{v.word}</div>
            <div>
              {v.origin?.map((v) => (
                <AudioPlayer
                  customVolumeControls={[]}
                  customAdditionalControls={[]}
                  showJumpControls={false}
                  key={v}
                  src={v}
                />
              ))}
            </div>
            <div>{v.phonetic}</div>
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
