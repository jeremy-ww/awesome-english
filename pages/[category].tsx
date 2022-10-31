import { css } from '@linaria/core'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import type { Category, Menu } from '../types'
import { paths, menu } from '../libs/api'
import metadata from '../libs/metadata'
import Case from 'case'
import breakpoints from '../styles/breakpoints'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { SwipeableDrawer } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

export default function Content({ menu }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const category = {
    content: []
  }

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

              audio::-webkit-media-controls-volume-control-container {
                display: none !important;
              }

              audio::-internal-media-controls-overflow-button {
                display: none !important;
              }
            `}
            key={v.word}
          >
            <div>{v.word}</div>
            <div>
              {v.origin?.map((origin) => (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <audio preload="none" controls controlsList="nodownload" key={v.word} src={origin}></audio>
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

export async function getStaticProps() {
  return {
    props: {
      menu,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths,
    fallback: false,
  }
}
