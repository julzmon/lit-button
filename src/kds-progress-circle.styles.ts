import { css } from "lit";

export const progressCircleStyles = css`
    :host {
    --track-width: 2px;
    --track-color: var(--kds-bg-surface-level-2);
    --indicator-color: currentColor;
    --speed: 1s;

    flex: none;
    display: inline-flex;
    width: 1em;
    height: 1em;
  }

  svg {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    display: block;
  }

  .track {
    stroke: var(--track-color);
  }

  .indicator {
    stroke: var(--indicator-color);
    stroke-dasharray: 6.283, 118.381;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    transform-origin: 50% 50%;
    transform-box: fill-box;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;
