import { css } from '@linaria/core'

export default function Loading() {
  return (
    <span
      className={css`
        width: 100%;
        height: 2px;
        display: inline-block;
        position: relative;
        background: #f5f5f5;
        overflow: hidden;

        &::after {
          content: '';
          width: 96px;
          height: 2px;
          background: var(--octo-fill);
          position: absolute;
          top: 0;
          left: 0;
          box-sizing: border-box;
          animation: hitZak 1s linear infinite alternate;
        }

        @keyframes hitZak {
          0% {
            left: 0;
            transform: translateX(-1%);
          }
          100% {
            left: 100%;
            transform: translateX(-99%);
          }
        }
      `}
    ></span>
  )
}
