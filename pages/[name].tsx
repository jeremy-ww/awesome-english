import { css } from '@linaria/core'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import type { Menu, GlossaryItem, SectionType, ExpressionItem } from '../types'
import { paths, menu, getFullPage } from '../libs/api'
import metadata from '../libs/metadata'
import Case from 'case'
import breakpoints from '../styles/breakpoints'
import React, { useLayoutEffect, useState, useEffect, useMemo } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { SwipeableDrawer, TextField, ClickAwayListener, Button } from '@mui/material'
import { FixedSizeList as List } from 'react-window'

function Word(props: {
  isGlossary: boolean
  style?: React.CSSProperties
  item: GlossaryItem | ExpressionItem
}) {
  const { item } = props
  return (
    <div
      className={css`
        display: flex;
        padding: 13px 0;
        align-items: center;
        border-bottom: 1px solid #f5f5f5;
        color: var(--text-primary);
        width: 75% !important;

        @media (max-width: ${breakpoints.xl}) {
          width: 90% !important;
        }

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
      {props.isGlossary ? (
        <>
          <div>{(item as GlossaryItem).word}</div>
          <div>
            {(item as GlossaryItem).origin?.map((origin) => (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <audio
                preload="none"
                controls
                controlsList="nodownload"
                key={(item as GlossaryItem).word}
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
            <span>{(item as GlossaryItem)?.phonetics[0]}</span>
            {(item as GlossaryItem).phonetics[1] && (
              <span
                className={css`
                  opacity: 0.5;
                `}
              >
                {(item as GlossaryItem).phonetics[1]}
              </span>
            )}
          </div>
        </>
      ) : (
        <>
          <div>{(item as ExpressionItem).sentence}</div>
          <div>{(item as ExpressionItem).explanation}</div>
        </>
      )}
    </div>
  )
}

export interface Info {
  dataLength: number
  category: string
  name: string
}

export default function Content({
  menu,
  fullPage,
  info,
}: {
  menu: Menu
  fullPage: GlossaryItem[]
  info: Info
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [virtualListHight, setVirtualListHight] = useState(0)
  const [searchWord, setSearchWord] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const isGlossary = info.category === 'glossary'
  const filterFullPage = useMemo(() => {
    const key = isGlossary ? 'word' : 'sentence'
    return fullPage.filter((item) => item[key]?.toLowerCase().includes(searchWord.toLowerCase()))
  }, [fullPage, searchWord, isGlossary])

  useLayoutEffect(() => {
    setVirtualListHight(
      window.innerHeight -
        (/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(navigator.userAgent) ? 0 : 40),
    )
  }, [])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.metaKey && e.key === 'f') {
        e.preventDefault()
        e.stopPropagation()
        setIsSearching((v) => !v)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <Head>
        <title>{`${Case.capital(info.name)} - ${process.env.APP_NAME}`}</title>
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
      >
        <div
          className={css`
            width: 30px;
            height: 6px;
            background-color: rgb(224, 224, 224);
            border-radius: 3px;
            margin: 10px auto;
          `}
        ></div>
        <Navbar
          onClick={() => {
            setIsDrawerOpen(false)
          }}
          className={css`
            background-color: var(--bg-color);

            padding: 10px;
            width: 100%;
            padding-top: 0;

            h3:first-of-type {
              margin-top: 20px;
            }
          `}
          menu={menu}
        />
      </SwipeableDrawer>

      <Navbar
        className={css`
          position: fixed;
          margin-left: 10%;
          margin-top: 2%;

          @media (max-width: ${breakpoints.lg}) {
            margin-left: 2%;
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
          width: 73%;
          top: 40px;
          right: 0;

          @media (max-width: ${breakpoints.md}) {
            width: 100%;
            padding-left: 5%;
            top: 0;
          }
        `}
      >
        <aside>
          {isSearching && (
            <ClickAwayListener
              onClickAway={() => {
                setSearchWord('')
                setIsSearching(false)
              }}
            >
              <TextField
                label="Search words by their names"
                placeholder="Type Cmd + F or Press Enter to exit searching mode."
                variant="standard"
                className={css`
                  max-width: 1000px;
                `}
                fullWidth
                onChange={(event) => {
                  setSearchWord(event.target.value)
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    setSearchWord('')
                    setIsSearching(false)
                  }
                }}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
              />
            </ClickAwayListener>
          )}
        </aside>

        <List
          key={info.name}
          height={virtualListHight}
          itemCount={filterFullPage.length}
          itemSize={81}
        >
          {({ index, style }) => (
            <Word isGlossary={isGlossary} style={style} item={filterFullPage[index]} />
          )}
        </List>
      </main>
    </>
  )
}

export async function getStaticProps({
  params,
}: {
  params: {
    name: string
  }
}) {
  const [sectionType, name] = params.name.split('-') || []
  const fullPage = getFullPage(sectionType as SectionType, name)
  return {
    props: {
      menu,
      fullPage,
      info: {
        category: sectionType,
        name,
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
