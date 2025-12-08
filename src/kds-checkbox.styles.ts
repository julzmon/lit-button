import { css } from "lit";

export const checkboxStyles = css`
  :host {
    display: inline-block;
    --checkbox-size: var(--mod-checkbox-size, var(--kds-size-md));
    --checkbox-color: var(
      --mod-checkbox-color,
      var(--kds-fg-on-emphasis)
    );
    --checkbox-border-color: var(
      --mod-checkbox-border-color,
      var(--kds-border-neutral-emphasis-base)
    );
    --checkbox-background: var(
      --mod-checkbox-background,
      var(--kds-bg-brand-emphasis-base)
    );
    --checkbox-background-hover: var(
      --mod-checkbox-background-hover,
      var(--kds-bg-brand-emphasis-hover)
    );
    --checkbox-border-radius: var(
      --mod-checkbox-border-radius,
      var(--kds-border-radius-xs)
    );
    --checkbox-border-width: var(
      --mod-checkbox-border-width,
      var(--kds-border-width-sm)
    );
  }

  /* Size variants */
  :host([size="sm"]) {
    --checkbox-size: var(--kds-size-sm);
    font-size: var(--kds-font-size-sm);
  }

  :host([size="md"]) {
    --checkbox-size: var(--kds-size-md);
    font-size: var(--kds-font-size-md);
  }

  :host([size="lg"]) {
    --checkbox-size: var(--kds-size-lg);
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

  .checkbox {
    display: flex;
    align-items: flex-start;
    gap: var(--kds-space-sm);
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
    font-weight: var(--kds-font-weight-regular);
    color: var(--kds-fg-base);
    line-height: var(--kds-size-md);
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
