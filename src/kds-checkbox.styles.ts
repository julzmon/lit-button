import { css } from "lit";

export const checkboxStyles = css`
  :host {
    display: inline-block;
    --checkbox-size: var(--kds-icon-size-md);
    --gap: var(--kds-space-md);
    --font-size: var(--kds-font-size-md);
    --checkbox-color: var(--mod-checkbox-color, var(--kds-fg-on-emphasis));
    --checkbox-border-color: var(--mod-checkbox-border-color, var(--kds-border-neutral-emphasis-base));
    --checkbox-background: var(--mod-checkbox-background, var(--kds-bg-info-emphasis-base));
    --checkbox-background-hover: var(--mod-checkbox-background-hover, var(--kds-bg-info-emphasis-hover));
    --checkbox-background-invalid: var(--mod-checkbox-background-invalid, var(--kds-bg-error-emphasis-base));
    --checkbox-border-invalid: var(--mod-checkbox-border-invalid, var(--kds-border-error-emphasis-base));
    --checkbox-border-radius: var(--mod-checkbox-border-radius, var(--kds-border-radius-sm));
    --checkbox-border-width: var(--mod-checkbox-border-width,1px);
  }

  /* Size variants */
  :host([size="sm"]) {
    --checkbox-size: var(--kds-icon-size-sm);
    --gap: var(--kds-space-sm);
    --font-size: var(--kds-font-size-sm);
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
    border-color: var(--checkbox-border-invalid);
  }

  :host([invalid]) .native-input:checked ~ .indicator,
  :host([invalid]) .native-input:indeterminate ~ .indicator {
    background-color: var(--checkbox-background-invalid);
    border-color: var(--checkbox-background-invalid);
  }

  .checkbox {
    display: flex;
    flex-direction: column;
    gap: var(--kds-space-xs);
    cursor: pointer;
  }

  .checkbox.disabled {
    cursor: not-allowed;
  }

  .label {
    display: flex;
    align-items: center;
    gap: var(--gap);
    cursor: pointer;
    font-family: var(--kds-font-family);
    font-size: var(--font-size);
    font-weight: 400;
    color: var(--kds-fg-base);
    line-height: 1.4;
    letter-spacing: var(--kds-font-letter-spacing-wide);
    user-select: none;
    position: relative;
  }

  .checkbox.disabled .label {
    cursor: not-allowed;
  }

  .native-input {
    position: absolute;
    width: var(--checkbox-size);
    height: var(--checkbox-size);
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
  .describedby {
    display: flex;
    flex-direction: column;
    gap: var(--kds-space-xs);
    margin-inline-start: calc(var(--checkbox-size) + var(--gap) + 3px);
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
