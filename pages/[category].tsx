import { css } from '@emotion/css'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import type { Category, Menu } from '../types'
import { getContentById, menu, paths } from '../libs/api'
import metadata from '../libs/metadata'
import ViewOnGitHub from '../components/ViewOnGitHub'
import Case from 'case'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

export default function Content({ menu, category }: { menu: Menu; category: Category }) {
  return (
    <>
      <Head>
        <title>
          {Case.capital(category.type)} - {process.env.APP_NAME}
        </title>
        <meta name="description" content={metadata.description} />
      </Head>

      <Navbar menu={menu} />

      <ViewOnGitHub />

      <main className="content">
        {category.content.map((v) => (
          <section
            className={css`
              display: flex;
              padding: 10px 0;
              margin-bottom: 10px;
              align-items: center;
              border-bottom: 1px solid #f5f5f5;

              div {
                overflow: hidden;
                color: var(--primary-color);
              }

              > div:first-child {
                flex: 1;
              }

              > div:not(:first-child) {
                flex: 2;
                display: flex;
                align-items: center;
              }

              .rhap_container {
                padding: 0;

                .rhap_main {
                  flex-direction: row-reverse;
                }

                .rhap_controls-section {
                  margin: 0;
                }
              }

              @media (max-width: 768px) {
                .rhap_progress-section {
                  display: none;
                }
              }
            `}
            key={v.word}
          >
            <div>{v.word}</div>
            <div>
              {v.origin?.map((v) => (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <AudioPlayer
                  customVolumeControls={[]}
                  customAdditionalControls={[]}
                  showJumpControls={false}
                  key={v}
                  src={v}
                />
                // <audio controls key={v} src={v}></audio>
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
