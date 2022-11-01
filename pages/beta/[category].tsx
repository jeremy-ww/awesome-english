import { css } from '@linaria/core'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import type { Menu, Item } from '../../types'
import { paths, menu, getFullPage } from '../../libs/api'
import metadata from '../../libs/metadata'
import Case from 'case'
import breakpoints from '../../styles/breakpoints'
import React, { useLayoutEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { SwipeableDrawer } from '@mui/material'
import { FixedSizeList as List } from 'react-window'

css`
  :global() {
    #__next {
      width: 100%;
      padding-top: 0 !important;
    }
  }
`

function Word(props: { style?: React.CSSProperties; item: Item }) {
  const { item } = props
  return (
    <div
      className={css`
        display: flex;
        padding: 13px 0;
        align-items: center;
        border-bottom: 1px solid #f5f5f5;
        color: var(--text-primary);
        width: 80% !important;

        /* Tablet, iPad, etc */
        @media (max-width: ${breakpoints.xl}) {
          width: 90% !important;
        }

        /* Tablet, iPad, etc */
        @media (max-width: ${breakpoints.lg}) {
          width: 100% !important;
        }

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
      style={props.style}
    >
      <div>{item.word}</div>
      <div>
        {item.origin?.map((origin) => (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <audio
            preload="none"
            controls
            controlsList="nodownload"
            key={item.word}
            src={origin}
          ></audio>
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
        <span>{item?.phonetics[0]}</span>
        {item.phonetics[1] && (
          <span
            className={css`
              opacity: 0.5;
            `}
          >
            {item.phonetics[1]}
          </span>
        )}
      </div>
    </div>
  )
}

export default function Content({
  menu,
  fullPage,
  info,
}: {
  menu: Menu
  fullPage: Item[]
  info: { dataLength: number; category: string }
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [virtualListHight, setVirtualListHight] = useState(0)

  useLayoutEffect(() => {
    setVirtualListHight(window.innerHeight)
  }, [])

  return (
    <>
      <Head>
        <title>{`${Case.capital(info.category)} - ${process.env.APP_NAME}`}</title>
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
          margin-left: 10%;
          margin-top: 2%;

          /* Tablet, iPad, etc */
          @media (max-width: ${breakpoints.lg}) {
            margin-left: 0;
          }

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

      <main
        className={css`
          position: absolute;
          width: 75%;
          right: 0;

          @media (max-width: ${breakpoints.md}) {
            width: 100%;
            padding-left: 2%;
          }
        `}
      >
        <List height={virtualListHight} itemCount={fullPage.length} itemSize={81}>
          {({ index, style }) => {
            return <Word style={style} item={fullPage[index]} />
          }}
        </List>
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
  const fullPage = getFullPage(params.category)
  return {
    props: {
      menu,
      fullPage,
      info: {
        category: params.category,
      },
    },
  }
}

export async function getStaticPaths() {
  return {
    paths,
    fallback: false,
  }
}
