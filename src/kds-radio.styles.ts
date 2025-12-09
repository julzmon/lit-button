import { css } from "lit";

export const radioStyles = css`
  :host {
    display: inline-block;
    --size: var(--kds-icon-size-xl);
    --font-size: var(--kds-font-size-md);
    --gap: var(--kds-space-md);
    --color: var(
      --mod-radio-color,
      var(--kds-fg-on-emphasis)
    );
    --border-color: var(
      --mod-radio-border-color,
      var(--kds-border-neutral-emphasis-base)
    );
    --background: var(
      --mod-radio-background,
      var(--kds-bg-info-emphasis-base)
    );
    --background-hover: var(
      --mod-radio-background-hover,
      var(--kds-bg-info-emphasis-hover)
    );
    --background-invalid: var(
      --mod-radio-background-invalid,
      var(--kds-bg-negative-emphasis-base)
    );
    --border-invalid: var(
      --mod-radio-border-invalid,
      var(--kds-border-negative-emphasis-base)
    );
    --border-width: var(
      --mod-radio-border-width,
      1px
    );
  }

  /* Size variants */
  :host([size="sm"]) {
    --size: var(--kds-icon-size-sm);
    --gap: var(--kds-space-sm);
    --font-size: var(--kds-font-size-sm);
  }

  /* State styles */
  :host([disabled]) {
    cursor: not-allowed;
    opacity: 0.4;
  }

  :host([required]) .label::after {
    content: "*";
    color: var(--kds-fg-negative-base);
  }

  .radio {
    display: flex;
    flex-direction: column;
    gap: var(--kds-space-xs);
  }

  .radio.disabled {
    cursor: not-allowed;
  }

  .label {
    display: flex;
    align-items: flex-start;
    gap: var(--gap);
    cursor: pointer;
    font-family: var(--kds-font-family);
    font-size: var(--font-size);
    font-weight: 400;
    color: var(--kds-fg-base);
    line-height: 1.4;
    letter-spacing: var(--kds-font-letter-spacing-wide);
    user-select: none;
  }

  .radio.disabled .label {
    cursor: not-allowed;
  }

  .native-input {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: var(--size);
    height: var(--size);
    flex-shrink: 0;
    cursor: pointer;
    margin: 0;
    margin-inline-end: var(--kds-space-xs);
    margin-block-start: 0.125em;
    border: var(--border-width) solid var(--border-color);
    border-radius: 50%;
    background-color: var(--kds-bg-base);
    transition:
      var(--kds-animation-duration-normal) background-color,
      var(--kds-animation-duration-normal) border-color,
      var(--kds-animation-duration-normal) box-shadow;
    accent-color: var(--background);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Radio dot pseudo-element */
  .native-input::before {
    content: "";
    position: absolute;
    width: calc(var(--size) * 0.5);
    height: calc(var(--size) * 0.5);
    background-color: var(--color);
    border-radius: 50%;
    transform: scale(0);
    transition:
      var(--kds-animation-duration-fast) transform;
    transform-origin: center;
  }

  .native-input:disabled {
    cursor: not-allowed;
  }

  /* Focus state */
  .native-input:focus-visible {
    outline: var(--kds-border-width-sm) solid
      var(--kds-border-info-emphasis-base);
    outline-offset: var(--kds-border-width-sm);
  }

  /* Checked state */
  .native-input:checked {
    background-color: var(--background);
    border-color: var(--background);
  }

  .native-input:checked::before {
    transform: scale(1);
  }

  .native-input:checked:hover:not(:disabled) {
    background-color: var(--background-hover);
    border-color: var(--background-hover);
  }

  /* Invalid state */
  :host([invalid]) .native-input {
    border-color: var(--border-invalid);
    background-color: var(--kds-bg-negative-muted-base);
  }

  :host([invalid]) .native-input:checked {
    background-color: var(--background-invalid);
    border-color: var(--background-invalid);
  }

  /* Content area */
  .describedby {
    display: flex;
    flex-direction: column;
    margin-inline-start: calc(var(--size) + var(--gap));
  }

  .help-text {
    font-size: var(--kds-font-size-xs);
    color: var(--kds-fg-neutral-base);
    line-height: 1.4;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .native-input {
      transition: none !important;
    }
  }
`;
