import { css } from "lit";

export const progressCircleStyles = css`
  :host {
    --kds-progress-size: var(--mod-progress-size, var(--kds-icon-size-md, 1rem));
    --kds-progress-stroke-width: var(--mod-progress-stroke-width, 2px);
    --kds-progress-track-color: var(
      --mod-progress-track-color,
      var(--kds-bg-surface-level-2)
    );
    --kds-progress-indicator-color: var(
      --mod-progress-indicator-color,
      currentColor
    );
    --kds-progress-speed: var(--mod-progress-speed, 1s);
    --kds-progress-spinner-arc: var(--mod-progress-spinner-arc, 40deg);

    display: inline-flex;
    width: var(--kds-progress-size);
    height: var(--kds-progress-size);
    flex: none;
  border: 1px solid black;
  }

  :host([size="xs"]) {
    --kds-progress-size: var(--kds-icon-size-xs);
  }

  :host([size="sm"]) {
    --kds-progress-size: var(--kds-icon-size-sm);
  }

  :host([size="md"]) {
    --kds-progress-size: var(--kds-icon-size-md);
  }

  :host([size="lg"]) {
    --kds-progress-size: var(--kds-icon-size-lg);
  }

  :host([size="xl"]) {
    --kds-progress-size: 3rem;
  }

  .ring {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .track,
  .indicator::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
  }

  .track {
    background:
      radial-gradient(
        farthest-side,
        transparent calc(100% - var(--kds-progress-stroke-width)),
        var(--kds-progress-track-color)
          calc(100% - var(--kds-progress-stroke-width)),
        var(--kds-progress-track-color) 100%
      );
  }

  .indicator {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    transform-origin: 50% 50%;
  }

  .indicator::before {
    background: conic-gradient(
      from 0deg,
      var(--kds-progress-indicator-color) 0deg
        var(--arc-deg, var(--kds-progress-spinner-arc)),
      transparent var(--arc-deg, var(--kds-progress-spinner-arc)) 360deg
    );
    mask:
      radial-gradient(
        farthest-side,
        transparent calc(100% - var(--kds-progress-stroke-width)),
        #000 calc(100% - var(--kds-progress-stroke-width)),
        #000 100%
      );
    -webkit-mask:
      radial-gradient(
        farthest-side,
        transparent calc(100% - var(--kds-progress-stroke-width)),
        #000 calc(100% - var(--kds-progress-stroke-width)),
        #000 100%
      );
  }

  :host(.is-indeterminate) .indicator {
    animation: kds-progress-circle-spin var(--kds-progress-speed) linear infinite;
  }

  :host(.is-determinate) .indicator {
    animation: none;
  }

  :host(.is-determinate) .indicator::before {
    transition: background var(--kds-animation-duration-normal, 0.24s)
      var(--kds-animation-easing-standard, ease);
  }

  @keyframes kds-progress-circle-spin {
    from {
      transform: rotate(-90deg);
    }

    to {
      transform: rotate(270deg);
    }
  }
`;
