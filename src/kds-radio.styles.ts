import { css } from "lit";

export const radioStyles = css`
  :host {
    display: inline-block;
    --radio-size: 24px;
    --radio-color: var(
      --mod-radio-color,
      #0080a7
    );
    --radio-border-color: var(
      --mod-radio-border-color,
      #717778
    );
    --radio-background: var(
      --mod-radio-background,
      transparent
    );
    --radio-background-hover: var(
      --mod-radio-background-hover,
      transparent
    );
    --radio-border-invalid: var(
      --mod-radio-border-invalid,
      #e52626
    );
    --radio-color-invalid: var(
      --mod-radio-color-invalid,
      #e52626
    );
    --radio-border-width: var(
      --mod-radio-border-width,
      1px
    );
  }

  /* Size variants */
  :host([size="sm"]) {
    --radio-size: 16px;
    font-size: var(--kds-font-size-sm);
  }

  :host([size="md"]) {
    font-size: var(--kds-font-size-md);
  }

  /* State styles */
  :host([disabled]) {
    cursor: not-allowed;
    opacity: 0.4;
  }

  :host([invalid]) .indicator {
    border-color: var(--radio-border-invalid);
  }

  :host([invalid]) .dot {
    background-color: var(--radio-color-invalid);
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
    align-items: center;
    gap: var(--kds-space-xs);
    cursor: pointer;
    font-family: var(--kds-font-family);
    font-weight: 400;
    color: var(--kds-fg-base);
    line-height: 1.4;
    letter-spacing: var(--kds-font-letter-spacing-wide);
    user-select: none;
    position: relative;
  }

  .radio.disabled .label {
    cursor: not-allowed;
  }

  .native-input {
    position: absolute;
    width: var(--radio-size);
    height: var(--radio-size);
    opacity: 0;
    cursor: pointer;
    margin: 0;
    z-index: 1;
  }

  .native-input:disabled {
    cursor: not-allowed;
  }

  .indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--radio-size);
    height: var(--radio-size);
    border: var(--radio-border-width) solid var(--radio-border-color);
    border-radius: 50%;
    background-color: var(--radio-background);
    transition:
      var(--kds-animation-duration-normal) background-color,
      var(--kds-animation-duration-normal) border-color;
  }

  /* Focus state */
  .native-input:focus-visible ~ .indicator {
    outline: var(--kds-border-width-sm) solid
      var(--kds-border-info-emphasis-base);
    outline-offset: var(--kds-border-width-sm);
  }

  /* Checked state */
  .native-input:checked ~ .indicator {
    background-color: var(--radio-background);
    border-color: var(--radio-border-color);
  }

  /* Radio dot */
  .dot {
    width: 60%;
    height: 60%;
    border-radius: 50%;
    background-color: var(--radio-color);
    opacity: 0;
    transform: scale(0.5);
    transition:
      var(--kds-animation-duration-fast) opacity,
      var(--kds-animation-duration-fast) transform;
  }

  .native-input:checked ~ .indicator .dot {
    opacity: 1;
    transform: scale(1);
  }

  .describedby {
    display: flex;
    flex-direction: column;
    gap: var(--kds-space-xs);
  }

  .help-text {
    font-size: var(--kds-font-size-sm);
    color: var(--kds-fg-muted);
    line-height: 1.4;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .indicator,
    .dot {
      transition: none !important;
    }
  }
`;
