import { css } from "lit";

export const checkboxStyles = css`
  :host {
    display: inline-block;
    --checkbox-size: 24px;
    --checkbox-color: var(
      --mod-checkbox-color,
      var(--kds-fg-on-emphasis)
    );
    --checkbox-border-color: var(
      --mod-checkbox-border-color,
      #717778
    );
    --checkbox-background: var(
      --mod-checkbox-background,
      #0080a7
    );
    --checkbox-background-hover: var(
      --mod-checkbox-background-hover,
      var(--kds-bg-brand-emphasis-hover)
    );
    --checkbox-background-invalid: var(
      --mod-checkbox-background-invalid,
      #cc0000
    );
    --checkbox-border-invalid: var(
      --mod-checkbox-border-invalid,
      #e52626
    );
    --checkbox-border-radius: var(
      --mod-checkbox-border-radius,
      var(--kds-border-radius-sm)
    );
    --checkbox-border-width: var(
      --mod-checkbox-border-width,
      1px
    );
  }

  /* Size variants affect label font size only */
  :host([size="sm"]) {
    font-size: var(--kds-font-size-sm);
  }

  :host([size="md"]) {
    font-size: var(--kds-font-size-md);
  }

  :host([size="lg"]) {
    font-size: var(--kds-font-size-lg);
  }

  /* State styles */
  :host([disabled]) {
    cursor: not-allowed;
    opacity: 0.4;
  }

  :host([invalid]) .indicator {
    border-color: var(--checkbox-border-invalid);
  }

  :host([invalid]) .native-input:checked ~ .indicator,
  :host([invalid]) .native-input:indeterminate ~ .indicator {
    background-color: var(--checkbox-background-invalid);
    border-color: var(--checkbox-background-invalid);
  }

  .checkbox {
    display: flex;
    align-items: center;
    gap: var(--kds-space-xs);
    cursor: pointer;
  }

  .checkbox.disabled {
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
    width: var(--checkbox-size);
    height: var(--checkbox-size);
    border: var(--checkbox-border-width) solid var(--checkbox-border-color);
    border-radius: var(--checkbox-border-radius);
    background-color: var(--kds-bg-base);
    transition:
      var(--kds-animation-duration-normal) background-color,
      var(--kds-animation-duration-normal) border-color,
      var(--kds-animation-duration-normal) box-shadow;
  }

  /* Hover state - subtle hover per design */
  .native-input:hover:not(:disabled) ~ .indicator {
    /* Hover state matches design - no significant color change */
  }

  /* Focus state */
  .native-input:focus-visible ~ .indicator {
    outline: var(--kds-border-width-sm) solid
      var(--kds-border-info-emphasis-base);
    outline-offset: var(--kds-border-width-sm);
  }

  /* Checked state */
  .native-input:checked ~ .indicator,
  .native-input:indeterminate ~ .indicator {
    background-color: var(--checkbox-background);
    border-color: var(--checkbox-background);
  }

  .native-input:checked:hover:not(:disabled) ~ .indicator,
  .native-input:indeterminate:hover:not(:disabled) ~ .indicator {
    background-color: var(--checkbox-background-hover);
    border-color: var(--checkbox-background-hover);
  }

  /* Checkmark */
  .checkmark {
    width: 100%;
    height: 100%;
    color: var(--checkbox-color);
    opacity: 0;
    transform: scale(0.8);
    transition:
      var(--kds-animation-duration-fast) opacity,
      var(--kds-animation-duration-fast) transform;
  }

  .native-input:checked ~ .indicator .checkmark,
  .native-input:indeterminate ~ .indicator .checkmark {
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
    font-family: var(--kds-font-family);
    font-weight: 400;
    color: var(--kds-fg-base);
    line-height: 1.4;
    letter-spacing: var(--kds-font-letter-spacing-wide);
    user-select: none;
  }

  .checkbox.disabled .label {
    cursor: not-allowed;
  }

  .help-text {
    font-size: var(--kds-font-size-sm);
    color: var(--kds-fg-muted);
    line-height: 1.4;
  }

  .error-message {
    font-size: var(--kds-font-size-sm);
    color: var(--kds-fg-negative-base);
    line-height: 1.4;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .indicator,
    .checkmark {
      transition: none !important;
    }
  }
`;
