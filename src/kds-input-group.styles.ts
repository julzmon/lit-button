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
  }

  /* Screen reader only utility - visually hides legend while keeping it accessible */
  .legend.sr-only {
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
  }

  .start,
  .main,
  .end {
    display: flex;
    align-items: stretch;
  }

  .start {
    flex: 0 0 auto;
  }

  .main {
    flex: 1 1 auto;
    min-inline-size: 0;
  }

  .end {
    flex: 0 0 auto;
  }

  /* Size variants */
  .group.sm {
    block-size: var(--kds-button-input-height-sm);
  }

  .group.md {
    block-size: var(--kds-button-input-height-md);
  }

  /* Ensure all slotted elements match the group height */
  .start ::slotted(*),
  .main ::slotted(*),
  .end ::slotted(*) {
    block-size: 100%;
    box-sizing: border-box;
  }

  /* Hide labels in slotted text-inputs for screen reader only access */
  .start ::slotted(kds-text-input),
  .main ::slotted(kds-text-input),
  .end ::slotted(kds-text-input) {
    --label-margin-bottom: 0;
  }

  .start ::slotted(kds-text-input)::part(label),
  .main ::slotted(kds-text-input)::part(label),
  .end ::slotted(kds-text-input)::part(label) {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* Connected borders: First element keeps left radius */
  .start ::slotted(*:first-child) {
    border-start-end-radius: 0 !important;
    border-end-end-radius: 0 !important;
    position: relative;
    z-index: 1;
  }

  /* Main slot: Remove both radii and left border when start exists */
  .start ~ .main ::slotted(*) {
    border-start-start-radius: 0 !important;
    border-end-start-radius: 0 !important;
    margin-inline-start: calc(-1 * var(--kds-input-group-border-width));
    position: relative;
    z-index: 2;
  }

  /* Main slot: Remove right radius when end exists */
  .main:has(~ .end:not(:empty)) ::slotted(*) {
    border-start-end-radius: 0 !important;
    border-end-end-radius: 0 !important;
  }

  /* End slot: Remove left radius and overlap left border */
  .end ::slotted(*) {
    border-start-start-radius: 0 !important;
    border-end-start-radius: 0 !important;
    margin-inline-start: calc(-1 * var(--kds-input-group-border-width));
    position: relative;
    z-index: 1;
  }

  /* When main has no start sibling, keep left radius */
  .start:empty ~ .main ::slotted(*) {
    border-start-start-radius: var(--kds-input-group-border-radius) !important;
    border-end-start-radius: var(--kds-input-group-border-radius) !important;
    margin-inline-start: 0;
  }

  /* Focus management - bring focused element to top */
  .start ::slotted(*:focus-within),
  .main ::slotted(*:focus-within),
  .end ::slotted(*:focus-within) {
    z-index: 10 !important;
  }

  /* Invalid state - propagate border color to all slotted elements */
  .group.invalid .start ::slotted(*),
  .group.invalid .main ::slotted(*),
  .group.invalid .end ::slotted(*) {
    --input-border-color: var(--kds-input-group-border-color-invalid) !important;
    --mod-btn-border-color: var(--kds-input-group-border-color-invalid) !important;
  }

  /* Component-specific overrides */

  /* Button overrides */
  .start ::slotted(kds-button),
  .main ::slotted(kds-button),
  .end ::slotted(kds-button) {
    --mod-btn-height: 100%;
    --mod-btn-min-width: auto;
    --mod-btn-background-color: transparent;
    --mod-btn-background-color-hover: var(--kds-bg-neutral-muted-hover);
  }

  /* Text input overrides */
  .start ::slotted(kds-text-input),
  .main ::slotted(kds-text-input),
  .end ::slotted(kds-text-input) {
    --input-height: 100%;
  }

  /* Error text block (matching text-input) */
  .error {
    margin-block-start: var(--kds-space-sm);
  }

  .error-message {
    display: flex;
    align-items: center;
    gap: var(--kds-space-sm);
    color: var(--kds-fg-negative-base);
    font-size: var(--kds-font-size-sm);
    font-family: var(--kds-font-family);
    font-weight: var(--kds-font-weight-bold);
  }

  .error-icon {
    flex: 0 0 auto;
    font-size: var(--kds-font-size-sm);
  }

  .error-text {
    flex: 1;
  }

  /* Help text (matching text-input) */
  .help-text-wrapper {
    margin-block-start: var(--kds-space-sm);

    &:empty {
      display: none;
    }
  }

  .help-text,
  .help-text-wrapper ::slotted(*) {
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
    .start ::slotted(*),
    .main ::slotted(*),
    .end ::slotted(*) {
      transition: none !important;
    }
  }

  @media (forced-colors: active) {
    .group.invalid .start ::slotted(*),
    .group.invalid .main ::slotted(*),
    .group.invalid .end ::slotted(*) {
      border-color: Mark !important;
    }
  }
`;
