import { css } from '@linaria/core'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import type { Menu, Item } from '../types'
import { paths, menu, getFirstPage } from '../libs/api'
import metadata from '../libs/metadata'
import Case from 'case'
import breakpoints from '../styles/breakpoints'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { SwipeableDrawer } from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'

function Word(props: { item: Item }) {
  const { item } = props
  return (
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
      key={item.word}
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
    </section>
  )
}

export default function Content({
  menu,
  firstPage,
  info,
}: {
  menu: Menu
  firstPage: Item[]
  info: { dataLength: number; category: string }
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<{
    pageNo: string
    content: Item[]
  }>(
    ['getCategoryContent', info.category],
    async ({ pageParam = 2 }) =>
      await fetch(`/api/category/${info.category}?pageNo=${pageParam}`).then((result) =>
        result.json(),
      ),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.content.length === 0 ? undefined : lastPage.pageNo + 1
      },
      // Mobile browsers' performance sucks, so we only prefetch the first page
      cacheTime: 0,
    },
  )

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
        {firstPage.map((item) => (
          <Word item={item} key={item.word} />
        ))}

        <InfiniteScroll
          next={fetchNextPage}
          hasMore={hasNextPage}
          dataLength={data?.pages.reduce((acc, page) => acc + page.content.length, 0) ?? 0}
          loader={<Loading />}
        >
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.content.map((item) => (
                <Word item={item} key={item.word} />
              ))}
            </React.Fragment>
          ))}
        </InfiniteScroll>
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
  const firstPage = getFirstPage(params.category)
  return {
    props: {
      menu,
      firstPage,
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
