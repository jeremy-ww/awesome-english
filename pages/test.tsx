import { css } from '@linaria/core'

export default function Test() {
  return (
    <div
      className={css`
        background: red;
        width: 100px;
        height: 100px;
        position: fixed;
        top: 100px;
      `}
    ></div>
  )
}
