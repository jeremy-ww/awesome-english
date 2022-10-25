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
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { SwipeableDrawer } from '@mui/material'

export default function Content({ menu, category }: { menu: Menu; category: Category }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  return (
    <>
      <Head>
        <title>{`${Case.capital(category.type)} - ${process.env.APP_NAME}`}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:description" content={metadata.description} />
      </Head>

      <SwipeableDrawer
        onOpen={() => setIsDrawerOpen(true)}
        onClose={() => {
          setIsDrawerOpen(false)
        }}
        anchor="bottom"
        open={isDrawerOpen}
        className={css``}
      >
        <Navbar
          onClick={() => {
            setIsDrawerOpen(false)
          }}
          className={css`
            background-color: var(--bg-color);

            padding: 10px;
            width: 100%;
          `}
          menu={menu}
        />
      </SwipeableDrawer>

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
            fill: var(--menu-icon-bg-color) !important;
          `}
        />
      </div>

      <main className="content">
        {category.content.map((v) => (
          <section
            className={css`
              display: flex;
              padding: 13px 0;
              align-items: center;
              border-bottom: 1px solid #f5f5f5;
              color: var(--text-primary);

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
                background-color: transparent;

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

                .rhap_time {
                  color: var(--audio-bg-color);
                }

                .rhap_progress-indicator,
                .rhap_progress-filled {
                  background-color: var(--audio-bg-color);
                }

                path {
                  fill: var(--audio-bg-color);
                }
              }

              @media (max-width: calc(${breakpoints.xl} + 100px)) {
                .rhap_container {
                  width: 80%;
                }
              }

              @media (max-width: ${breakpoints.lg}) {
                .rhap_container {
                  width: 90%;
                }
              }

              @media (max-width: ${breakpoints.md}) {
                .rhap_progress-section {
                  display: none;
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
              {v.origin?.map((origin) => (
                <AudioPlayer
                  customVolumeControls={[]}
                  customAdditionalControls={[]}
                  showJumpControls={false}
                  preload="none"
                  key={v.word}
                  src={origin}
                />
              ))}
            </div>
            <div
              className={css`
                flex-wrap: wrap;

                span {
                  margin: 0 3px;
                }
              `}
            >
              <span>{v?.phonetics[0]}</span>
              {v.phonetics[1] && (
                <span
                  className={css`
                    opacity: 0.5;
                  `}
                >
                  {v.phonetics[1]}
                </span>
              )}
            </div>
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
