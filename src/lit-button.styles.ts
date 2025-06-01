import { css } from "lit";

export const buttonStyles = css`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    --kds-btn-height: var(--mod-btn-height, var(--kds-button-input-height-md));
    --kds-btn-min-width: var(--mod-btn-min-width, auto);
    --kds-btn-padding-inline: var(
      --mod-btn-padding-inline,
      var(--kds-spacing-md)
    );
    --kds-btn-gap: var(--mod-btn-gap, var(--kds-spacing-sm));
    --kds-btn-color: var(--mod-btn-color, var(--kds-fg-on-emphasis));
    --kds-btn-color-hover: var(
      --mod-btn-color-hover,
      var(--kds-fg-on-emphasis)
    );
    --kds-btn-font-weight: var(--kds-font-weight-regular);
    --kds-btn-font-size: var(--mod-btn-font-size, var(--kds-font-size-md));
    --kds-btn-line-height: var(--mod-btn-line-height, 1.2);
    --kds-btn-border-width: var(
      --mod-btn-border-width,
      var(--kds-border-width-xs)
    );
    --kds-btn-border-radius: var(
      --mod-btn-border-radius,
      var(--kds-border-radius-sm)
    );
    --kds-btn-border-color: var(--mod-btn-border-color, transparent);
    --kds-btn-border-color-hover: var(
      --mod-btn-border-color-hover,
      transparent
    );
    --kds-btn-bg-color: var(
      --mod-btn-background-color,
      var(--kds-bg-neutral-emphasis-base)
    );
    --kds-btn-bg-color-hover: var(
      --mod-btn-background-color-hover,
      var(--kds-bg-neutral-emphasis-hover)
    );
    --kds-btn-text-decoration-hover: var(--kds-btn-text-decoration-hover, none);
    --kds-btn-opacity-disabled: 1;

    cursor: pointer;
    user-select: none;
    position: relative;
    overflow: visible;
    display: inline-flex;
    gap: var(--kds-btn-gap);
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: var(--kds-btn-line-height);
    text-decoration: none;
    text-transform: none;
    vertical-align: top;
    -webkit-appearance: button;
    border-style: solid;
    transition: var(--kds-animation-duration-normal) background-color,
      var(--kds-animation-duration-normal) color, var(--kds-animation-duration-normal) border,
      var(--kds-animation-duration-normal) box-shadow;

    background-color: var(--kds-btn-bg-color);
    min-width: var(--kds-btn-min-width);
    height: var(--kds-btn-height);
    padding-block: 0;
    padding-inline: var(--kds-btn-padding-inline);
    margin-block: var(--mod-btn-margin-block);
    margin-inline-end: var(--mod-btn-margin-right);
    margin-inline-start: var(--mod-btn-margin-left);
    color: var(--kds-btn-color);
    font-weight: var(--kds-btn-font-weight);
    font-size: var(--kds-btn-font-size);
    font-family: var(--kds-font-family);
    border-width: var(--kds-btn-border-width);
    border-radius: var(--kds-btn-border-radius);
    border-color: var(--kds-btn-border-color);
    user-select: none;
    -webkit-user-select: none;
    opacity: var(--kds-btn-opacity-disabled, 1);

    &:hover:not(:disabled) {
      color: var(--kds-btn-color-hover);
      background-color: var(--kds-btn-bg-color-hover);
      border-color: var(--kds-btn-border-color-hover);
      text-decoration: var(--kds-btn-text-decoration-hover);
    }

    &:focus {
      // outline: none;
    }

    &:focus-visible {
      outline: 4px;
      outline-offset: 2px;
    }

    &:disabled {
      cursor: not-allowed;
      --kds-btn-opacity-disabled: var(--kds-base-opacity-disabled, 20%);
    }

    /* Property Treatment */

    /* Neutral */
    &.neutral.outline {
      --kds-btn-bg-color: transparent;
      --kds-btn-bg-color-hover: var(--kds-bg-neutral-muted-base);
      --kds-btn-color: var(--kds-fg-base);
      --kds-btn-color-hover: var(--kds-fg-base);
      --kds-btn-border-color: var(--kds-border-neutral-emphasis-base);
      --kds-btn-border-color-hover: var(--kds-border-neutral-emphasis-hover);
    }

    &.neutral.transparent {
      --kds-btn-bg-color: transparent;
      --kds-btn-bg-color-hover: var(--kds-bg-neutral-muted-hover);
      --kds-btn-color: var(--kds-fg-base);
      --kds-btn-color-hover: var(--kds-fg-base);
    }

    /* Negative */
    &.negative {
      --kds-btn-bg-color: var(--kds-bg-negative-emphasis-base);
      --kds-btn-bg-color-hover: var(--kds-bg-negative-emphasis-hover);
    }

    &.negative.outline {
      --kds-btn-bg-color: transparent;
      --kds-btn-bg-color-hover: var(--kds-bg-negative-muted-base);
      --kds-btn-color: var(--kds-fg-negative-base);
      --kds-btn-color-hover: var(--kds-fg-negative-base);
      --kds-btn-border-color: var(--kds-border-negative-emphasis-base);
      --kds-btn-border-color-hover: var(--kds-border-negative-emphasis-hover);
    }

    &.negative.transparent {
      --kds-btn-bg-color: transparent;
      --kds-btn-bg-color-hover: var(--kds-bg-negative-muted-hover);
      --kds-btn-color: var(--kds-fg-negative-base);
      --kds-btn-color-hover: var(--kds-fg-negative-base);
    }

    /* Positive */
    &.positive {
      --kds-btn-bg-color: var(--kds-bg-positive-emphasis-base);
      --kds-btn-bg-color-hover: var(--kds-bg-positive-emphasis-hover);
    }

    &.positive.outline {
      --kds-btn-bg-color: transparent;
      --kds-btn-bg-color-hover: var(--kds-bg-positive-muted-base);
      --kds-btn-color: var(--kds-fg-positive-base);
      --kds-btn-color-hover: var(--kds-fg-positive-base);
      --kds-btn-border-color: var(--kds-border-positive-emphasis-base);
      --kds-btn-border-color-hover: var(--kds-border-positive-emphasis-hover);
    }

    &.positive.transparent {
      --kds-btn-bg-color: transparent;
      --kds-btn-bg-color-hover: var(--kds-bg-positive-muted-hover);
      --kds-btn-color: var(--kds-fg-positive-base);
      --kds-btn-color-hover: var(--kds-fg-positive-base);
    }

    /* Warning */
    &.warning {
      --kds-btn-bg-color: var(--kds-bg-warning-emphasis-base);
      --kds-btn-bg-color-hover: var(--kds-bg-warning-emphasis-hover);
    }

    &.warning.outline {
      --kds-btn-bg-color: transparent;
      --kds-btn-bg-color-hover: var(--kds-bg-warning-muted-base);
      --kds-btn-color: var(--kds-fg-warning-base);
      --kds-btn-color-hover: var(--kds-fg-warning-base);
      --kds-btn-border-color: var(--kds-border-warning-emphasis-base);
      --kds-btn-border-color-hover: var(--kds-border-warning-emphasis-hover);
    }

    &.warning.transparent {
      --kds-btn-bg-color: transparent;
      --kds-btn-bg-color-hover: var(--kds-bg-warning-muted-hover);
      --kds-btn-color: var(--kds-fg-warning-base);
      --kds-btn-color-hover: var(--kds-fg-warning-base);
    }

    /* Info */
    &.info {
      --kds-btn-bg-color: var(--kds-bg-info-emphasis-base);
      --kds-btn-bg-color-hover: var(--kds-bg-info-emphasis-hover);
    }

    &.info.outline {
      --kds-btn-bg-color: transparent;
      --kds-btn-bg-color-hover: var(--kds-bg-info-muted-base);
      --kds-btn-color: var(--kds-fg-info-base);
      --kds-btn-color-hover: var(--kds-fg-info-base);
      --kds-btn-border-color: var(--kds-border-info-emphasis-base);
      --kds-btn-border-color-hover: var(--kds-border-info-emphasis-hover);
    }

    &.info.transparent {
      --kds-btn-bg-color: transparent;
      --kds-btn-bg-color-hover: var(--kds-bg-info-muted-hover);
      --kds-btn-color: var(--kds-fg-info-base);
      --kds-btn-color-hover: var(--kds-fg-info-base);
    }

    /* Link */
    &.link {
      --kds-btn-bg-color: transparent;
      --kds-btn-bg-color-hover: transparent;
      --kds-btn-color: var(--kds-fg-link-base);
      --kds-btn-color-hover: var(--kds-fg-link-hover);
      --kds-btn-text-decoration-hover: underline;
      --kds-btn-padding-inline: 0;
    }

    /* Property Priority */

    /* Priority */
    &.primary {
      --kds-btn-bg-color: var(--kds-bg-brand-emphasis-base);
      --kds-btn-bg-color-hover: var(--kds-bg-brand-emphasis-hover);
    }

    &.secondary {
      --kds-btn-bg-color: transparent;
      --kds-btn-bg-color-hover: var(--kds-bg-neutral-muted-base);
      --kds-btn-color: var(--kds-fg-base);
      --kds-btn-color-hover: var(--kds-fg-base);
      --kds-btn-border-color: var(--kds-border-neutral-emphasis-base);
      --kds-btn-border-color-hover: var(--kds-border-neutral-emphasis-hover);
    }

    &.tertiary {
      --kds-btn-bg-color: transparent;
      --kds-btn-bg-color-hover: var(--kds-bg-neutral-muted-hover);
      --kds-btn-color: var(--kds-fg-base);
      --kds-btn-color-hover: var(--kds-fg-base);
    }

    /* Size Variants */
    &.xs {
      --kds-btn-height: var(--kds-button-input-height-xs);
      --kds-btn-font-size: var(--kds-font-size-xs);
      --kds-btn-padding-inline: var(--kds-spacing-xs);
    }

    &.sm {
      --kds-btn-height: var(--kds-button-input-height-sm);
      --kds-btn-font-size: var(--kds-font-size-sm);
      --kds-btn-padding-inline: var(--kds-spacing-sm);
    }

    &.md {
      --kds-btn-height: var(--kds-button-input-height-md);
      --kds-btn-font-size: var(--kds-font-size-md);
      --kds-btn-padding-inline: var(--kds-spacing-md);
    }

    &.lg {
      --kds-btn-height: var(--kds-button-input-height-lg);
      --kds-btn-font-size: var(--kds-font-size-lg);
      --kds-btn-padding-inline: var(--kds-spacing-lg);
    }
  }

  ::slotted([slot="start"]),
  ::slotted([slot="end"]) {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    pointer-events: none;
  }
`;
