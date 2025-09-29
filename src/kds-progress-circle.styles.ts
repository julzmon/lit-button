import { css } from "lit";

export const progressCircleStyles = css`
  /* Host sets up container queries, default sizing, and overridable tokens. */
  :host {
    container-type: size;
    --kds-progress-size: var(--mod-progress-size, var(--kds-icon-size-md, 1rem));
    /* Stroke scales with the component's container size while staying reasonable. */
    --kds-progress-stroke-width: clamp(
      2px,
      calc(0.12 * min(100cqw, 100cqh)),
      8px
    );
    --kds-progress-indicator-color: var(
      --mod-progress-indicator-color,
      currentColor
    );
    /* Track fallback for legacy browsers plus a color-mix override that follows currentColor. */
    // --kds-progress-track-color: rgba(0, 0, 0, 0.1);
    --kds-progress-track-color: color-mix(in srgb, currentColor 10%, transparent);
    --kds-progress-speed: var(--mod-progress-speed, 1s);
    --kds-progress-spinner-arc: var(--mod-progress-spinner-arc, 40deg);

    display: inline-flex;
    width: var(--kds-progress-size);
    height: var(--kds-progress-size);
    flex: none;
  }

  /* Size presets map attribute values to design token sizes. */
  :host([size="xs"]) {
    --kds-progress-size: 1rem;
  }

  :host([size="sm"]) {
    --kds-progress-size: 1.5rem;
  }

  :host([size="md"]) {
    --kds-progress-size: 2rem;
  }

  :host([size="lg"]) {
    --kds-progress-size: 2.5rem;
  }

  :host([size="xl"]) {
    --kds-progress-size: 8rem;
  }

  /* Wrapper that ensures pseudo elements can absolutely position. */
  .ring {
    position: relative;
    width: 100%;
    height: 100%;
  }

  /* Track and indicator pseudo share common circular footprint. */
  .track,
  .indicator::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
  }

  /* Track is a hollow ring created using a radial gradient and the stroke width token. */
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

  /* Indicator container rotates for animation and masks the active arc. */
  .indicator {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    transform-origin: 50% 50%;
  }

  /* Pseudo element paints the active arc with a conic gradient and punches the center out. */
  .indicator::before {
    --kds-progress-leading-color: transparent;
    background: conic-gradient(
      from 0deg,
      var(--kds-progress-leading-color) 0deg,
      var(--kds-progress-indicator-color)
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

  /* Spinner mode spins the indicator container in place. */
  :host(.is-indeterminate) .indicator {
    animation: kds-progress-circle-spin var(--kds-progress-speed) linear infinite;
  }

  :host(.is-determinate) .indicator {
    animation: none;
  }

  /* Determinate mode brightens the leading edge and enables smooth transitions. */
  :host(.is-determinate) .indicator::before {
    --kds-progress-leading-color: color-mix(
      in srgb,
      var(--kds-progress-indicator-color) 10%,
      transparent
    );
    transition: background var(--kds-animation-duration-normal, 0.24s)
      var(--kds-animation-easing-standard, ease);
  }

  /* Spin animation starts at the top (−90°) and rotates a full turn. */
  @keyframes kds-progress-circle-spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;
