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

    display: inline-flex;
    width: var(--kds-progress-size);
    height: var(--kds-progress-size);
    flex: none;
  }

  :host([size="xs"]) {
    --kds-progress-size: var(--kds-icon-size-xs, 0.75rem);
  }

  :host([size="sm"]) {
    --kds-progress-size: var(--kds-icon-size-sm, 0.875rem);
  }

  :host([size="md"]) {
    --kds-progress-size: var(--kds-icon-size-md, 1rem);
  }

  :host([size="lg"]) {
    --kds-progress-size: var(--kds-icon-size-lg, 1.25rem);
  }

  :host([size="xl"]) {
    --kds-progress-size: var(--kds-icon-size-xl, 1.5rem);
  }

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  .track {
    stroke: var(--kds-progress-track-color);
    stroke-width: var(--kds-progress-stroke-width);
  }

  .indicator {
    stroke: var(--kds-progress-indicator-color);
    stroke-width: var(--kds-progress-stroke-width);
    stroke-dasharray: 6.283 118.381;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    transform-origin: 50% 50%;
    transform-box: fill-box;
    animation: kds-progress-circle-spin var(--kds-progress-speed) linear infinite;
  }

  @keyframes kds-progress-circle-spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
