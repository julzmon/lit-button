import { css } from "lit";

export const inputGroupStyles = css`
  :host {
    display: block;
    position: relative;
    width: 100%;
  }

  .base {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .group {
    --kds-input-group-border-radius: var(--mod-input-group-border-radius, var(--kds-border-radius-sm));
    --kds-input-group-border-width: var(--mod-input-group-border-width, var(--kds-border-width-xs));
    --kds-input-group-border-color: var(--mod-input-group-border-color, var(--kds-border-neutral-emphasis-base));
    --kds-input-group-border-color-invalid: var(--mod-input-group-border-color-invalid, var(--kds-border-negative-emphasis-base));

    position: relative;
    display: flex;
    align-items: stretch;
    width: 100%;
    isolation: isolate;
  }

  .start,
  .end {
    display: flex;
    align-items: stretch;
    flex: 0 0 auto;
  }

  .input-wrapper {
    display: flex;
    align-items: stretch;
    flex: 1 1 auto;
    min-width: 0;
  }

  /* Border radius handling for grouped elements */
  .group.has-start .start {
    margin-right: calc(-1 * var(--kds-input-group-border-width));
  }

  .group.has-end .end {
    margin-left: calc(-1 * var(--kds-input-group-border-width));
  }

  /* Start placement styling */
  .group.has-start .start ::slotted(*) {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    position: relative;
    z-index: 1;
  }

  .group.has-start .input-wrapper ::slotted(*) {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    position: relative;
    z-index: 2;
  }

  /* End placement styling */
  .group.has-end .input-wrapper ::slotted(*) {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    position: relative;
    z-index: 2;
  }

  .group.has-end .end ::slotted(*) {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    position: relative;
    z-index: 1;
  }

  /* Both placement styling */
  .group.has-start.has-end .start ::slotted(*) {
    border-radius: var(--kds-input-group-border-radius) 0 0 var(--kds-input-group-border-radius) !important;
    z-index: 1;
  }

  .group.has-start.has-end .input-wrapper ::slotted(*) {
    border-radius: 0 !important;
    z-index: 3;
  }

  .group.has-start.has-end .end ::slotted(*) {
    border-radius: 0 var(--kds-input-group-border-radius) var(--kds-input-group-border-radius) 0 !important;
    z-index: 1;
  }

  /* Invalid state - propagate border color */
  .group.invalid .start ::slotted(*),
  .group.invalid .input-wrapper ::slotted(*),
  .group.invalid .end ::slotted(*) {
    --kds-input-border-color: var(--kds-input-group-border-color-invalid) !important;
    --mod-btn-border-color: var(--kds-input-group-border-color-invalid) !important;
  }

  /* Size variants */
  .group.sm {
    height: var(--kds-button-input-height-sm);
  }

  .group.md {
    height: var(--kds-button-input-height-md);
  }

  /* Ensure all slotted elements match the group height */
  .start ::slotted(*),
  .input-wrapper ::slotted(*),
  .end ::slotted(*) {
    height: 100%;
    box-sizing: border-box;
  }

  /* Focus management - higher z-index when focused */
  .group:focus-within .input-wrapper ::slotted(*) {
    z-index: 10 !important;
  }

  /* Button-specific overrides when used in input groups */
  .start ::slotted(kds-button),
  .end ::slotted(kds-button) {
    --mod-btn-border-radius: inherit;
    --mod-btn-height: 100%;
    --mod-btn-min-width: auto;
  }

  /* Input-specific overrides when used in input groups */
  .input-wrapper ::slotted(kds-input) {
    --mod-input-border-radius: inherit;
    --mod-input-height: 100%;
  }

  /* Hover and focus states for seamless appearance */
  .group:hover .start ::slotted(*):not(:focus-within),
  .group:hover .input-wrapper ::slotted(*):not(:focus-within),
  .group:hover .end ::slotted(*):not(:focus-within) {
    --kds-input-border-color-hover: var(--kds-border-neutral-emphasis-hover) !important;
    --mod-btn-border-color-hover: var(--kds-border-neutral-emphasis-hover) !important;
  }

  .group.invalid:hover .start ::slotted(*):not(:focus-within),
  .group.invalid:hover .input-wrapper ::slotted(*):not(:focus-within),
  .group.invalid:hover .end ::slotted(*):not(:focus-within) {
    --kds-input-border-color-hover: var(--kds-border-negative-emphasis-hover) !important;
    --mod-btn-border-color-hover: var(--kds-border-negative-emphasis-hover) !important;
  }

  /* Ensure buttons in groups don't have their own background by default */
  .start ::slotted(kds-button),
  .end ::slotted(kds-button) {
    --mod-btn-background-color: transparent;
    --mod-btn-background-color-hover: var(--kds-bg-neutral-muted-hover);
  }

  /* Special handling for icon-only buttons */
  .start ::slotted(kds-button:not([priority])),
  .end ::slotted(kds-button:not([priority])) {
    --mod-btn-padding-inline: var(--kds-spacing-sm);
  }

  .group.sm .start ::slotted(kds-button),
  .group.sm .end ::slotted(kds-button) {
    --mod-btn-padding-inline: var(--kds-spacing-xs);
  }
`;