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
    min-inline-size: 0;
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

  /* Group container - holds all slotted elements */
  .group {
    position: relative;
    display: flex;
    align-items: stretch;
    inline-size: 100%;
    isolation: isolate;

    /* Size variants */
    &.sm {
      block-size: var(--kds-button-input-height-sm);
    }

    &.md {
      block-size: var(--kds-button-input-height-md);
    }
  }

  .start,
  .main,
  .end {
    display: flex;
    align-items: stretch;

    /* Ensure all slotted elements match the group height */
    ::slotted(*) {
      block-size: 100%;
      box-sizing: border-box;

      /* Focus management - bring focused element to top */
      &:focus-within {
        z-index: 10 !important;
      }
    }

    /* Text input overrides */
    ::slotted(kds-text-input) {
      --label-margin-bottom: 0;
      --input-height: 100%;
    }
  }

  .start {
    flex: 0 0 auto;

    ::slotted(*:first-child) {
      border-start-end-radius: 0 !important;
      border-end-end-radius: 0 !important;
      position: relative;
      z-index: 1;
    }

    /* Main slot adjustments when start exists */
    ~ .main ::slotted(*) {
      border-start-start-radius: 0 !important;
      border-end-start-radius: 0 !important;
      margin-inline-start: calc(-1 * var(--kds-input-group-border-width));
      position: relative;
      z-index: 2;
    }

    /* When start is empty, restore main's left radius */
    &:empty ~ .main ::slotted(*) {
      border-start-start-radius: var(--kds-input-group-border-radius) !important;
      border-end-start-radius: var(--kds-input-group-border-radius) !important;
      margin-inline-start: 0;
    }
  }

  .main {
    flex: 1 1 auto;
    min-inline-size: 0;
  }

  .end {
    flex: 0 0 auto;

    ::slotted(*) {
      border-start-start-radius: 0 !important;
      border-end-start-radius: 0 !important;
      margin-inline-start: calc(-1 * var(--kds-input-group-border-width));
      position: relative;
      z-index: 1;
    }

    /* Remove right radius from main when end is not empty */
    &:not(:empty) ~ .main ::slotted(*),
    ~ .main ::slotted(*) {
      border-start-end-radius: 0 !important;
      border-end-end-radius: 0 !important;
    }
  }

  /* Error text block (matching text-input) */
  .error {
    margin-block-start: var(--kds-space-sm);

    &-message {
      display: flex;
      align-items: center;
      gap: var(--kds-space-sm);
      color: var(--kds-fg-negative-base);
      font-size: var(--kds-font-size-sm);
      font-family: var(--kds-font-family);
      font-weight: var(--kds-font-weight-bold);
    }

    &-icon {
      flex: 0 0 auto;
      font-size: var(--kds-font-size-sm);
    }

    &-text {
      flex: 1;
    }
  }

  /* Help text (matching text-input) */
  .help-text {
    &-wrapper {
      margin-block-start: var(--kds-space-sm);

      &:empty {
        display: none;
      }

      ::slotted(*) {
        font-size: var(--kds-font-size-xs);
        color: var(--kds-fg-neutral-base);
        font-family: var(--kds-font-family);
      }
    }

    font-size: var(--kds-font-size-xs);
    color: var(--kds-fg-neutral-base);
    font-family: var(--kds-font-family);
  }

  /* Disabled state */
  .fieldset:disabled .group {
    cursor: not-allowed;
    opacity: var(--kds-base-opacity-disabled, 0.5);
  }

  /* Accessibility preferences */
  @media (prefers-reduced-motion: reduce) {
    .start,
    .main,
    .end {
      ::slotted(*) {
        transition: none !important;
      }
    }
  }
`;
