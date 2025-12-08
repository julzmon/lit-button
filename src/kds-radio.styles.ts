import { css } from "lit";

export const radioStyles = css`
  :host {
    display: inline-block;
    --radio-size: var(--mod-radio-size, var(--kds-size-md));
    --radio-color: var(
      --mod-radio-color,
      var(--kds-fg-on-emphasis)
    );
    --radio-border-color: var(
      --mod-radio-border-color,
      var(--kds-border-neutral-emphasis-base)
    );
    --radio-background: var(
      --mod-radio-background,
      var(--kds-bg-brand-emphasis-base)
    );
    --radio-background-hover: var(
      --mod-radio-background-hover,
      var(--kds-bg-brand-emphasis-hover)
    );
    --radio-border-width: var(
      --mod-radio-border-width,
      var(--kds-border-width-sm)
    );
  }

  /* Size variants */
  :host([size="sm"]) {
    --radio-size: var(--kds-size-sm);
    font-size: var(--kds-font-size-sm);
  }

  :host([size="md"]) {
    --radio-size: var(--kds-size-md);
    font-size: var(--kds-font-size-md);
  }

  :host([size="lg"]) {
    --radio-size: var(--kds-size-lg);
    font-size: var(--kds-font-size-lg);
  }

  /* State styles */
  :host([disabled]) {
    cursor: not-allowed;
    opacity: var(--kds-base-opacity-disabled, 0.5);
  }

  :host([invalid]) .indicator {
    border-color: var(--kds-border-negative-emphasis-base);
  }

  .radio {
    display: flex;
    align-items: flex-start;
    gap: var(--kds-space-sm);
    cursor: pointer;
  }

  .radio.disabled {
    cursor: not-allowed;
  }

  .control {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .native-input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    margin: 0;
  }

  .native-input:disabled {
    cursor: not-allowed;
  }

  .indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--radio-size);
    height: var(--radio-size);
    border: var(--radio-border-width) solid var(--radio-border-color);
    border-radius: 50%;
    background-color: var(--kds-bg-base);
    transition:
      var(--kds-animation-duration-normal) background-color,
      var(--kds-animation-duration-normal) border-color,
      var(--kds-animation-duration-normal) box-shadow;
  }

  /* Hover state */
  .native-input:hover:not(:disabled) ~ .indicator {
    border-color: var(--kds-border-brand-emphasis-base);
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
    border-color: var(--radio-background);
  }

  .native-input:checked:hover:not(:disabled) ~ .indicator {
    background-color: var(--radio-background-hover);
    border-color: var(--radio-background-hover);
  }

  /* Radio dot */
  .dot {
    width: 40%;
    height: 40%;
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

  /* Content area */
  .content {
    display: flex;
    flex-direction: column;
    gap: var(--kds-space-xs);
    flex: 1;
    min-width: 0;
  }

  .label {
    display: block;
    cursor: pointer;
    font-weight: var(--kds-font-weight-regular);
    color: var(--kds-fg-base);
    line-height: var(--kds-size-md);
    user-select: none;
  }

  .radio.disabled .label {
    cursor: not-allowed;
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
