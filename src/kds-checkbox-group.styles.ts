import { css } from "lit";

export const checkboxGroupStyles = css`
  :host {
    display: block;
    inline-size: 100%;

    --color: var(--mod-legend-color, var(--kds-fg-base));
    --font-size: var(--mod-legend-font-size, var(--kds-font-size-md));
    --font-weight: var(--mod-legend-font-weight, var(--kds-font-body-font-weight));
    --margin-bottom: var(--mod-legend-margin-bottom, var(--kds-space-md));
  }

  /* Reset fieldset to act as invisible container */
  .fieldset {
    border: none;
    margin: 0;
    padding: 0;
    display: block;
    inline-size: 100%;

    /* Disabled state cascades opacity */
    &:disabled {
      cursor: not-allowed;
      opacity: var(--kds-base-opacity-disabled, 0.5);
    }
  }

  /* Style legend to match text-input label */
  .legend {
    color: var(--color);
    font-size: var(--font-size);
    font-weight: var(--font-weight);
    font-family: var(--kds-font-family);
    margin-block-end: var(--margin-bottom);
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
    margin-inline-start: 0.125rem;
    content: "*";
    color: var(--kds-fg-negative-base);
  }

  /* Group container with direction and gap support */
  .group {
    display: flex;
    inline-size: 100%;
    gap: var(--kds-space-md); /* Default gap */

    /* Direction variants */
    &.column {
      flex-direction: column;
    }

    &.row {
      flex-direction: row;
    }

    /* Size-based gap overrides */
    &.xs {
      gap: var(--kds-space-xs);
    }

    &.sm {
      gap: var(--kds-space-sm);
    }

    &.md {
      gap: var(--kds-space-md);
    }

    &.lg {
      gap: var(--kds-space-lg);
    }

    /* Slotted checkboxes inherit full width for better text wrapping */
    & ::slotted(kds-checkbox) {
      flex: 0 1 auto;
    }
  }

  /* Error block (below checkboxes) */
  .error-block {
    margin-block-start: var(--kds-space-sm);
  }

  /* Help text wrapper */
  .help-text-wrapper {
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

  .help-text {
    font-size: var(--kds-font-size-xs);
    color: var(--kds-fg-neutral-base);
    font-family: var(--kds-font-family);
  }

  /* Accessibility preferences */
  @media (prefers-reduced-motion: reduce) {
    .group {
      transition: none !important;
    }
  }
`;
