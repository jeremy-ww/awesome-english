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
import { Drawer } from '@mui/material'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'

export default function Content({ menu, category }: { menu: Menu; category: Category }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  return (
    <>
      <Head>
        <title>{`${Case.capital(category.type)} - ${process.env.APP_NAME}`}</title>
        <meta name="description" content={metadata.description} />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>

      <Drawer
        onClose={() => {
          setIsDrawerOpen(false)
        }}
        anchor="bottom"
        open={isDrawerOpen}
      >
        <Navbar
          onClick={() => {
            setIsDrawerOpen(false)
          }}
          className={css`
            padding: 10px;
            width: 100%;
          `}
          menu={menu}
        />
      </Drawer>

      <Navbar
        className={css`
          position: fixed;

          @media (max-width: ${breakpoints.md}) {
            display: none;
          }
        `}
        menu={menu}
      />

      <div
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault()
          setIsDrawerOpen(true)
        }}
        onKeyUp={(e) => {
          e.preventDefault()
          if (e.code !== 'Escape') {
            setIsDrawerOpen(true)
          }
        }}
        className={css`
          position: fixed;
          bottom: 40px;
          right: 40px;
          z-index: 1;
          padding: 20px;
          @media (min-width: ${breakpoints.md}) {
            display: none;
          }
        `}
      >
        <MenuIcon
          className={css`
            fill: var(--menu-icon-bg-color);
          `}
        />
      </div>

      <main className="content">
        {category.content.map((v) => (
          <section
            className={css`
              display: flex;
              padding: 10px 0;
              margin-bottom: 10px;
              align-items: center;
              border-bottom: 1px solid #f5f5f5;

              > div {
                display: flex;
                align-items: center;
                flex: 2;
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

                > div:nth-child(2) {
                  flex: 1;
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
