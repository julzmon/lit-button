import { css } from "lit";

export const inputGroupStyles = css`
  :host {
    display: block;
    position: relative;
    inline-size: 100%;

    --kds-input-group-border-radius: var(--mod-input-group-border-radius, var(--kds-border-radius-sm));
    --kds-input-group-border-width: var(--mod-input-group-border-width, var(--kds-border-width-xs));
    --kds-input-group-border-color: var(--mod-input-group-border-color, var(--kds-border-neutral-emphasis-base));
    --kds-input-group-border-color-invalid: var(--mod-input-group-border-color-invalid, var(--kds-border-negative-emphasis-base));

    --legend-color: var(--mod-legend-color);
    --legend-font-size: var(--mod-legend-font-size);
    --legend-font-weight: var(--mod-legend-font-weight);
    --legend-margin-bottom: var(--mod-legend-margin-bottom, var(--kds-space-md));
  }

  /* Reset fieldset to act as invisible container */
  .fieldset {
    border: none;
    margin: 0;
    padding: 0;
    /* min-inline-size: 0; */
    display: block;
    inline-size: 100%;

    /* Disabled state */
    &:disabled .group {
      cursor: not-allowed;
      opacity: var(--kds-base-opacity-disabled, 0.5);
    }
  }

  /* Style legend to match text-input label */
  .legend {
    color: var(--legend-color);
    font-size: var(--legend-font-size);
    font-weight: var(--legend-font-weight);
    font-family: var(--kds-font-family);
    margin-block-end: var(--legend-margin-bottom);
    padding: 0;
    display: block;
    inline-size: 100%;

    /* Screen reader only utility - visually hides legend while keeping it accessible */
    &.sr-only {
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border-width: 0 !important;
    }
  }

  /* Required indicator (red asterisk) */
  :host([required]) .legend::after {
    margin-inline-start: .125rem;
    content: "*";
    color: var(--kds-fg-negative-base);
  }

  /* Group container with unified default slot */
  .group {
    position: relative;
    display: flex;
    align-items: stretch;
    inline-size: 100%;
    isolation: isolate;
    /* Base slotted element layout */
    & ::slotted(*) {
      block-size: 100%;
      box-sizing: border-box;
      position: relative;
      z-index: 0;
    }

    /* Collapse adjoining borders using negative margin (except first) */
    & ::slotted(*:not(:first-child)) {
      margin-inline-start: calc(-1 * var(--kds-input-group-border-width));
    }

    /* Focus stacking: raise focused control above neighbors */
    & ::slotted(*:focus),
    & ::slotted(*:focus-within) {
      z-index: 5;
    }

    /* Text input corner shaping */
    & ::slotted(kds-text-input:first-child:last-child) {
      --mod-input-border-radius: var(--kds-border-radius-sm);
    }
    & ::slotted(kds-text-input:first-child:not(:last-child)) {
      --mod-input-border-radius: var(--kds-border-radius-sm) 0 0 var(--kds-border-radius-sm);
    }
    & ::slotted(kds-text-input:last-child:not(:first-child)) {
      --mod-input-border-radius: 0 var(--kds-border-radius-sm) var(--kds-border-radius-sm) 0;
    }
    & ::slotted(kds-text-input:not(:first-child):not(:last-child)) {
      --mod-input-border-radius: 0;
    }

    /* Button corner shaping mirrors text inputs */
    & ::slotted(kds-button:first-child:last-child) {
      --mod-btn-border-radius-top-left: var(--kds-border-radius-sm);
      --mod-btn-border-radius-top-right: var(--kds-border-radius-sm);
      --mod-btn-border-radius-bottom-right: var(--kds-border-radius-sm);
      --mod-btn-border-radius-bottom-left: var(--kds-border-radius-sm);
    }
    & ::slotted(kds-button:first-child:not(:last-child)) {
      --mod-btn-border-radius-top-left: var(--kds-border-radius-sm);
      --mod-btn-border-radius-top-right: 0;
      --mod-btn-border-radius-bottom-right: 0;
      --mod-btn-border-radius-bottom-left: var(--kds-border-radius-sm);
    }
    & ::slotted(kds-button:last-child:not(:first-child)) {
      --mod-btn-border-radius-top-left: 0;
      --mod-btn-border-radius-top-right: var(--kds-border-radius-sm);
      --mod-btn-border-radius-bottom-right: var(--kds-border-radius-sm);
      --mod-btn-border-radius-bottom-left: 0;
    }
    & ::slotted(kds-button:not(:first-child):not(:last-child)) {
      --mod-btn-border-radius-top-left: 0;
      --mod-btn-border-radius-top-right: 0;
      --mod-btn-border-radius-bottom-right: 0;
      --mod-btn-border-radius-bottom-left: 0;
    }

    /* Interior elements (any except first/last) no corner rounding for other custom controls */
    & ::slotted(*:not(kds-text-input):not(kds-button):not(:first-child):not(:last-child)) {
      border-radius: 0;
    }
  }

  /* Error spacing */
  /* .error-block {
    margin-block-start: var(--kds-space-sm);
  } */

  /* Help text (matching text-input) */
  .help-text {
    &-wrapper {
      margin-block-start: var(--kds-space-sm);

      &:empty {
        display: none;
      }

      & ::slotted(*) {
        font-size: var(--kds-font-size-xs);
        color: var(--kds-fg-neutral-base);
        font-family: var(--kds-font-family);
      }
    }

    font-size: var(--kds-font-size-xs);
    color: var(--kds-fg-neutral-base);
    font-family: var(--kds-font-family);
  }

  /* Accessibility preferences */
  @media (prefers-reduced-motion: reduce) {
    .group ::slotted(*) { transition: none !important; }
  }
`;
