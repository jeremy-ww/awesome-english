import { css } from '@emotion/react'

export const globalStyles = css`
  *,
  :after,
  :before,
  html {
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Apple Color Emoji', 'SF Pro', 'SF Pro Icons',
      'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    margin: 0;
    font-size: clamp(1rem, 0.96rem + 0.18vw, 1.125rem);
  }

  html,
  body,
  #__next {
    height: 100%;
  }

  :root {
    /* Common */
    --nav-bar-width: 150px;
    --nav-bar-focus-bg-color: #eee;
    --border-radius: 5px;
    --primary-color: #333;

    /* View On GitHub */
    --octo-color: #fff;
    --octo-fill: #42b983;
  }

  .content {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0 auto;
  }

  #__next {
    width: 90%;
    margin: 3% auto 0 auto;
  }

  /* Small devices (landscape phones, 576px and up) */
  @media (max-width: 576px) {
    :root {
      --nav-bar-width: 0px;
    }
    .nav {
      display: none;
    }
  }

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    #__next {
      width: 90%;
      margin: 5% auto 0 auto;
    }

    .content {
      width: 70%;
    }
  }

  /* iPad, etc */
  @media (min-width: 768px) and (max-width: 992px) {
    .content {
      margin-left: calc(var(--nav-bar-width) * 1.2);
    }
  }

  /* Large devices (desktops, 992px and up) */
  @media (min-width: 992px) {
    #__next {
      margin: 2% auto 0 auto;
      width: 80%;
    }
  }
`
