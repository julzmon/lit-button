import { css } from "lit";

export const textInputStyles = css`
  :host {
    display: block;
    position: relative;
    inline-size: 100%;

    --input-height: var(--mod-input-height, var(--kds-button-input-height-md));
    --input-padding-inline: var(--mod-input-padding-inline, var(--kds-space-xl));
    --input-gap: var(--mod-input-gap, var(--kds-space-md));
    --input-color: var(--mod-input-color, var(--kds-fg-base));
    --input-font-size: var(--mod-input-font-size, var(--kds-font-size-md));
    --input-line-height: var(--mod-input-line-height, 1.5);
    --input-border-width: var(--mod-input-border-width, var(--kds-border-width-xs));
    --input-border-radius: var(--mod-input-border-radius, var(--kds-border-radius-sm));
    --input-border-color: var(--mod-input-border-color, var(--kds-border-neutral-emphasis-base));
    --input-border-color-hover: var(--mod-input-border-color-hover, var(--kds-border-neutral-emphasis-hover));
    --input-border-color-focus: var(--mod-input-border-color-focus, var(--kds-border-info-emphasis-base));
    --input-background-color: var(--mod-input-background-color, var(--kds-bg-surface-base));

    --placeholder-color: var(--mod-placeholder-color, var(--kds-fg-neutral-base));
    --placeholder-style: var(--mod-placeholder-style, italic);

    --label-color: var(--mod-label-color);
    --label-font-size: var(--mod-label-font-size);
    --label-font-weight: var(--mod-label-font-weight);
    --label-margin-bottom: var(--mod-label-margin-bottom, var(--kds-space-md));

    --focus-ring-width: var(--mod-focus-ring-width, var(--kds-border-width-xs));
    --focus-ring-color: var(--mod-focus-ring-color, var(--input-border-color-focus));
    --focus-ring-color-invalid: var(--mod-focus-ring-color-invalid, var(--kds-border-negative-emphasis-base));
  }

  /* Host size variants */
  :host([size="sm"]) {
    --input-height: var(--kds-button-input-height-sm);
    --input-font-size: var(--kds-font-size-sm);
    --input-padding-inline: var(--kds-space-md);
  }

  :host([size="md"]) {
    --input-height: var(--kds-button-input-height-md);
    --input-font-size: var(--kds-font-size-md);
    --input-padding-inline: var(--kds-space-xl);
  }

  /* Label */
  label {
    color: var(--label-color);
    font-size: var(--label-font-size);
    font-weight: var(--label-font-weight);
    font-family: var(--font-family);
    margin-block-end: var(--label-margin-bottom);
    display: block;
  }

  :host([required]) #label::after {
    margin-inline-start: .125rem;
    content: "*";
    color: var(--kds-fg-negative-base);
  }

  /* Field wrapper */
  .input {
    position: relative;
    display: flex;
    align-items: center;
    inline-size: 100%;
    block-size: var(--input-height);
    box-sizing: border-box;
    border: var(--input-border-width) solid var(--input-border-color);
    border-radius: var(--input-border-radius);
    background-color: var(--input-background-color);
    padding-inline: var(--input-padding-inline);
    gap: var(--input-gap);
    outline: none; /* we drive focus visuals with border + shadow */
    transition: border-color var(--animation-duration-normal, 120ms) ease-out;

    /* Hover (only when not focused and not invalid) */
    &:hover:not(:focus-within):not(.invalid) {
      border-color: var(--input-border-color-hover);
    }

    /* Focus: border color + OUTER ring (no layout shift) */
    &:focus-within {
      border-color: var(--input-border-color-focus);
      box-shadow: 0 0 0 var(--focus-ring-width) var(--focus-ring-color);
    }

    /* Invalid base state (attr, class, or ARIA) */
    &.invalid {
      --input-border-color: var(--kds-border-negative-emphasis-base);
      --input-border-color-hover: var(--kds-border-negative-emphasis-hover);
      --input-border-color-focus: var(--kds-border-negative-emphasis-base);
    }
  }

  /* Host-level invalid also updates the inner .input custom props */
  :host([invalid]) {
    .input {
      --input-border-color: var(--kds-border-negative-emphasis-base);
      --input-border-color-hover: var(--kds-border-negative-emphasis-hover);
      --input-border-color-focus: var(--kds-border-negative-emphasis-base);

      /* Invalid + focus (same outer ring, red) */
      &:focus-within {
        border-color: var(--kds-border-negative-emphasis-base);
        box-shadow: 0 0 0 var(--focus-ring-width) var(--focus-ring-color-invalid);
      }
    }
  }

  /* Also cover class/ARIA invalid focus (if host[invalid] isn’t used) */
  .input.invalid:focus-within {
    border-color: var(--kds-border-negative-emphasis-base);
    box-shadow: 0 0 0 var(--kds-border-width-xs) var(--focus-ring-color-invalid);
  }

  /* Native input */
  .native-input {
    appearance: none;
    width: 100%;
    min-inline-size: 0;
    border: none;
    outline: none;
    background: transparent;
    color: var(--input-color);
    font-size: var(--input-font-size);
    font-family: var(--font-family);
    font-weight: var(--font-weight-regular);
    line-height: var(--input-line-height);
    letter-spacing: 0.022em;
    margin: auto 0px;
    padding: 0;

    &::placeholder {
      color: var(--placeholder-color);
      font-style: var(--placeholder-style);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: var(--kds-base-opacity-disabled, 0.5);
    }
  }

  /* Error text block */
  .error { margin-block-start: var(--kds-space-sm); }
  .error-message {
    display: flex;
    align-items: center;
    gap: var(--kds-space-sm);
    color: var(--kds-fg-negative-base);
    font-size: var(--kds-font-size-sm);
    font-family: var(--kds-font-family);
    font-weight: var(--kds-font-weight-bold);

    .error-icon { flex: 0 0 auto; font-size: var(--kds-font-size-sm); }
    .error-text { flex: 1; }
  }

  /* Disabled: freeze visuals */
  :host([disabled]) {
    .input {
      cursor: not-allowed;
      opacity: var(--kds-base-opacity-disabled, 0.5);

      &:focus-within {
        border-color: var(--input-border-color);
        box-shadow: none;
      }
    }
    .start,
    .end { opacity: var(--kds-base-opacity-disabled, 0.5); }
  }

  /* Accessibility preferences */
  @media (prefers-reduced-motion: reduce) {
    .input { transition: none; }
  }

  @media (forced-colors: active) {
    .input { border-color: ButtonBorder; }
    .input:focus-within {
      /* Outline is most reliable in HCM */
      outline: var(--focus-ring-width) solid Highlight;
      outline-offset: 0;
      box-shadow: none;
      border-color: Highlight;
    }

    /* Invalid colors in HCM */
    :host([invalid]) .input,
    .input.invalid { border-color: Mark; }
  }

  .input-action-btn {
    appearance: none;
    border: none;
    background: transparent;
    color: var(--input-color, currentColor);
    width: var(--kds-button-input-height-sm);
    height: var(--kds-button-input-height-sm);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-radius: var(--kds-border-radius-sm);
    cursor: pointer;
    font-size: 1.05em;
    padding: 0;
    margin-inline-start: 0.25rem;
    transition: background 0.12s ease, box-shadow 0.12s ease;

    &:hover {
      background-color: var(--kds-bg-neutral-muted-hover);
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 var(--kds-border-width-sm) var(--focus-ring-color);
    }
  }

  .help-text-wrapper {
    margin-block-start: var(--kds-space-sm);

    &:empty {
      display: none;
    }
    ::slotted(*) {
      font-size: var(--kds-font-size-xs);
      color: var(--kds-fg-neutral-base);
    }
  }

  ::slotted([slot="start"]) {
    margin-inline-start: calc(var(--padding-inline) / 2);
  }

  ::slotted([slot="end"]) {
    margin-inline-end: calc(var(--padding-inline) / 2);
  }
`;
