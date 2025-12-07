/* kds-button.styles.ts */
import { css } from "lit";

export const buttonStyles = css`
  /* Layers: base < variant < priority */
  @layer base, variant, priority;

  /* ============================
   * BASE
   * ============================ */
  @layer base {
    :host {
      display: inline-block;
      position: relative;
      width: auto;
      cursor: pointer;

      /* ---- Component defaults (no mod fallbacks here) ---- */
      --kds-btn-height: var(--kds-button-input-height-md);
      --kds-btn-min-width: auto;
      --kds-btn-padding-inline: var(--kds-space-2xl);
      --kds-btn-gap: var(--kds-space-lg);

      --kds-btn-text-color: var(--kds-fg-on-emphasis);
      --kds-btn-text-color-hover: var(--kds-fg-on-emphasis);

      --kds-btn-font-weight: var(--kds-font-weight-regular);
      --kds-btn-font-size: var(--kds-font-size-md);
      --kds-btn-line-height: 1.2;
      --kds-btn-font-family: var(--kds-font-family);

      --kds-btn-border-width: var(--kds-border-width-xs);
      --kds-btn-border-radius: var(--kds-border-radius-sm);
      --kds-btn-border-color: transparent;
      --kds-btn-border-color-hover: transparent;

      --kds-btn-bg-color: var(--kds-bg-neutral-emphasis-base);
      --kds-btn-bg-color-hover: var(--kds-bg-neutral-emphasis-hover);

      --kds-btn-text-decoration-hover: none;

      /* Default opacity (enabled) */
      --kds-btn-opacity: 1;

      /* Spinner sizing derives from the control height; overridden per size below. */
      --kds-btn-spinner-size: var(
        --mod-btn-spinner-size,
        calc(var(--kds-btn-height) * 0.5)
      );
    }

    .button {
      cursor: pointer;
      user-select: none;
      position: relative;
      overflow: visible;
      display: inline-flex;

      /* ---- Read mod-first, then kds ---- */
      gap: var(--mod-btn-gap, var(--kds-btn-gap));
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      margin: 0;
      width: 100%;
      white-space: nowrap;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      line-height: var(--mod-btn-line-height, var(--kds-btn-line-height));
      text-decoration: none;
      text-transform: none;
      vertical-align: middle;
      -webkit-appearance: button;
      border-style: solid;
      transition:
        var(--kds-animation-duration-normal) background-color,
        var(--kds-animation-duration-normal) color,
        var(--kds-animation-duration-normal) border-color,
        var(--kds-animation-duration-normal) box-shadow;

      background-color: var(--mod-btn-background-color, var(--kds-btn-bg-color));
      min-width: var(--mod-btn-min-width, var(--kds-btn-min-width));
      height: var(--mod-btn-height, var(--kds-btn-height));
      padding-block: 0;
      padding-inline: var(--mod-btn-padding-inline, var(--kds-btn-padding-inline));

      /* external margins: consume mod directly (no kds passthrough vars) */
      margin-block: var(--mod-btn-margin-block, 0);
      margin-inline-start: var(--mod-btn-margin-left, 0);
      margin-inline-end: var(--mod-btn-margin-right, 0);

      color: var(--mod-btn-text-color, var(--kds-btn-text-color));
      font-weight: var(--mod-btn-font-weight, var(--kds-btn-font-weight));
      font-size: var(--mod-btn-font-size, var(--kds-btn-font-size));
      font-family: var(--kds-btn-font-family);

      border-block-start-width: var(--mod-btn-border-width-block-start, var(--kds-btn-border-width));
      border-block-end-width: var(--mod-btn-border-width-block-end, var(--kds-btn-border-width));
      border-inline-start-width: var(--mod-btn-border-width-inline-start, var(--kds-btn-border-width));
      border-inline-end-width: var(--mod-btn-border-width-inline-end, var(--kds-btn-border-width));
      border-top-left-radius: var(--mod-btn-border-radius-top-left, var(--kds-btn-border-radius));
      border-top-right-radius: var(--mod-btn-border-radius-top-right, var(--kds-btn-border-radius));
      border-bottom-right-radius: var(--mod-btn-border-radius-bottom-right, var(--kds-btn-border-radius));
      border-bottom-left-radius: var(--mod-btn-border-radius-bottom-left, var(--kds-btn-border-radius));
      border-block-start-color: var(--mod-btn-border-color-block-start, var(--kds-btn-border-color));
      border-block-end-color: var(--mod-btn-border-color-block-end, var(--kds-btn-border-color));
      border-inline-start-color: var(--mod-btn-border-color-inline-start, var(--kds-btn-border-color));
      border-inline-end-color: var(--mod-btn-border-color-inline-end, var(--kds-btn-border-color));

      opacity: var(--kds-btn-opacity, 1);

      /* states */
      &:hover:not(:disabled):not([aria-disabled="true"]) {
        color: var(--mod-btn-text-color-hover, var(--kds-btn-text-color-hover));
        background-color: var(--mod-btn-background-color-hover, var(--kds-btn-bg-color-hover));
        border-block-start-color: var(--mod-btn-border-color-block-start-hover, var(--kds-btn-border-color-hover));
        border-block-end-color: var(--mod-btn-border-color-block-end-hover, var(--kds-btn-border-color-hover));
        border-inline-start-color: var(--mod-btn-border-color-inline-start-hover, var(--kds-btn-border-color-hover));
        border-inline-end-color: var(--mod-btn-border-color-inline-end-hover, var(--kds-btn-border-color-hover));
        text-decoration: var(--mod-btn-text-decoration-hover, var(--kds-btn-text-decoration-hover));
      }

      &:focus { outline: none; }

      &:focus-visible {
        outline: var(--kds-border-width-sm) solid var(--kds-border-info-emphasis-base);
        outline-offset: var(--kds-border-width-sm);
      }

      &:is(:disabled, [aria-disabled="true"]) {
        cursor: not-allowed;
        --kds-btn-opacity: var(--kds-base-opacity-disabled, 0.2);
      }
    }

    /* Pending state overrides disabled opacity to keep button visible during loading */
    :host([pending]) .button {
      cursor: not-allowed;
      --kds-btn-opacity: 1;
    }

    .button__spinner {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: var(--kds-btn-spinner-size);
      block-size: var(--kds-btn-spinner-size);
      pointer-events: none;
    }

    .button__label {
      display: inline-flex;
      align-items: center;
    }

    ::slotted([slot='start']),
    ::slotted([slot='end']) {
      display: flex;
      align-items: center;
      flex: 0 0 auto;
      pointer-events: none;
    }

    /* Sizes (host attributes tweak kds defaults) */
    :host([size="xs"]) {
      --kds-btn-height: var(--kds-button-input-height-xs);
      --kds-btn-font-size: var(--kds-font-size-xs);
      --kds-btn-padding-inline: var(--kds-space-md);
      --kds-btn-spinner-size: var(
        --mod-btn-spinner-size,
        calc(var(--kds-btn-height) * 0.65)
      );
    }
    :host([size="sm"]) {
      --kds-btn-height: var(--kds-button-input-height-sm);
      --kds-btn-font-size: var(--kds-font-size-sm);
      --kds-btn-padding-inline: var(--kds-space-lg);
      --kds-btn-spinner-size: var(
        --mod-btn-spinner-size,
        calc(var(--kds-btn-height) * 0.6)
      );
    }
    :host([size="lg"]) {
      --kds-btn-height: var(--kds-button-input-height-lg);
      --kds-btn-font-size: var(--kds-font-size-lg);
      --kds-btn-padding-inline: var(--kds-space-2xl);
      --kds-btn-spinner-size: var(
        --mod-btn-spinner-size,
        calc(var(--kds-btn-height) * 0.55)
      );
    }
  } /* end @layer base */

  /* ============================
   * VARIANT
   * ============================ */
  @layer variant {
    /* Solid color families */

    :host([color="positive"]) {
      --kds-btn-bg-color: var(--kds-bg-positive-emphasis-base);
      --kds-btn-bg-color-hover: var(--kds-bg-positive-emphasis-hover);
      --kds-btn-text-color: var(--kds-fg-on-emphasis);
    }
    :host([color="negative"]) {
      --kds-btn-bg-color: var(--kds-bg-negative-emphasis-base);
      --kds-btn-bg-color-hover: var(--kds-bg-negative-emphasis-hover);
      --kds-btn-text-color: var(--kds-fg-on-emphasis);
    }
    :host([color="warning"]) {
      --kds-btn-bg-color: var(--kds-bg-warning-emphasis-base);
      --kds-btn-bg-color-hover: var(--kds-bg-warning-emphasis-hover);
      --kds-btn-text-color: var(--kds-fg-on-emphasis);
    }
    :host([color="info"]) {
      --kds-btn-bg-color: var(--kds-bg-info-emphasis-base);
      --kds-btn-bg-color-hover: var(--kds-bg-info-emphasis-hover);
      --kds-btn-text-color: var(--kds-fg-on-emphasis);
    }

    /* Generic variants */
    :host([variant="outline"]) {
      --kds-btn-bg-color: transparent;
      --kds-btn-text-color: var(--kds-fg-base);
      --kds-btn-text-color-hover: var(--kds-fg-base);
      --kds-btn-border-color: var(--kds-border-neutral-emphasis-base);
      --kds-btn-border-color-hover: var(--kds-border-neutral-emphasis-hover);
      --kds-btn-bg-color-hover: var(--kds-bg-neutral-muted-base);
    }
    :host([variant="transparent"]) {
      --kds-btn-bg-color: transparent;
      --kds-btn-bg-color-hover: var(--kds-bg-neutral-muted-hover);
      --kds-btn-text-color: var(--kds-fg-base);
      --kds-btn-text-color-hover: var(--kds-fg-base);
    }
    :host([variant="link"]) {
      --kds-btn-bg-color: transparent;
      --kds-btn-bg-color-hover: transparent;
      --kds-btn-text-color: var(--kds-fg-link-base);
      --kds-btn-text-color-hover: var(--kds-fg-link-hover);
      --kds-btn-text-decoration-hover: underline;
      --kds-btn-padding-inline: 0;
      --kds-btn-height: initial;
    }

    /* Color × Variant combos (override generic rules) */
    :host([variant="outline"][color="positive"]) {
      --kds-btn-text-color: var(--kds-fg-positive-base);
      --kds-btn-text-color-hover: var(--kds-fg-positive-base);
      --kds-btn-border-color: var(--kds-border-positive-emphasis-base);
      --kds-btn-border-color-hover: var(--kds-border-positive-emphasis-hover);
      --kds-btn-bg-color-hover: var(--kds-bg-positive-muted-base);
    }
    :host([variant="transparent"][color="positive"]) {
      --kds-btn-text-color: var(--kds-fg-positive-base);
      --kds-btn-text-color-hover: var(--kds-fg-positive-base);
      --kds-btn-bg-color-hover: var(--kds-bg-positive-muted-hover);
    }

    :host([variant="outline"][color="negative"]) {
      --kds-btn-text-color: var(--kds-fg-negative-base);
      --kds-btn-text-color-hover: var(--kds-fg-negative-base);
      --kds-btn-border-color: var(--kds-border-negative-emphasis-base);
      --kds-btn-border-color-hover: var(--kds-border-negative-emphasis-hover);
      --kds-btn-bg-color-hover: var(--kds-bg-negative-muted-base);
    }
    :host([variant="transparent"][color="negative"]) {
      --kds-btn-text-color: var(--kds-fg-negative-base);
      --kds-btn-text-color-hover: var(--kds-fg-negative-base);
      --kds-btn-bg-color-hover: var(--kds-bg-negative-muted-hover);
    }

    :host([variant="outline"][color="warning"]) {
      --kds-btn-text-color: var(--kds-fg-warning-base);
      --kds-btn-text-color-hover: var(--kds-fg-warning-base);
      --kds-btn-border-color: var(--kds-border-warning-emphasis-base);
      --kds-btn-border-color-hover: var(--kds-border-warning-emphasis-hover);
      --kds-btn-bg-color-hover: var(--kds-bg-warning-muted-base);
    }
    :host([variant="transparent"][color="warning"]) {
      --kds-btn-text-color: var(--kds-fg-warning-base);
      --kds-btn-text-color-hover: var(--kds-fg-warning-base);
      --kds-btn-bg-color-hover: var(--kds-bg-warning-muted-hover);
    }

    :host([variant="outline"][color="info"]) {
      --kds-btn-text-color: var(--kds-fg-info-base);
      --kds-btn-text-color-hover: var(--kds-fg-info-base);
      --kds-btn-border-color: var(--kds-border-info-emphasis-base);
      --kds-btn-border-color-hover: var(--kds-border-info-emphasis-hover);
      --kds-btn-bg-color-hover: var(--kds-bg-info-muted-base);
    }
    :host([variant="transparent"][color="info"]) {
      --kds-btn-text-color: var(--kds-fg-info-base);
      --kds-btn-text-color-hover: var(--kds-fg-info-base);
      --kds-btn-bg-color-hover: var(--kds-bg-info-muted-hover);
    }
  } /* end @layer variant */

  /* ============================
   * PRIORITY
   * ============================ */
  @layer priority {
    :host([priority="primary"]) {
      --kds-btn-bg-color: var(--kds-bg-brand-emphasis-base);
      --kds-btn-bg-color-hover: var(--kds-bg-brand-emphasis-hover);
      --kds-btn-text-color: var(--kds-fg-on-emphasis);
      --kds-btn-text-color-hover: var(--kds-fg-on-emphasis);
      --kds-btn-text-decoration-hover: none;
      --kds-btn-border-color: transparent;
      --kds-btn-border-color-hover: transparent;
    }

    :host([priority="secondary"]) {
      --kds-btn-bg-color: transparent;
      --kds-btn-bg-color-hover: var(--kds-bg-neutral-muted-base);
      --kds-btn-text-color: var(--kds-fg-base);
      --kds-btn-text-color-hover: var(--kds-fg-base);
      --kds-btn-border-color: var(--kds-border-neutral-emphasis-base);
      --kds-btn-border-color-hover: var(--kds-border-neutral-emphasis-hover);
      --kds-btn-text-decoration-hover: none;
    }

    :host([priority="tertiary"]) {
      --kds-btn-bg-color: transparent;
      --kds-btn-bg-color-hover: var(--kds-bg-neutral-muted-hover);
      --kds-btn-text-color: var(--kds-fg-base);
      --kds-btn-text-color-hover: var(--kds-fg-base);
      --kds-btn-text-decoration-hover: none;
    }

    :host([priority="link"]) {
      --kds-btn-bg-color: transparent;
      --kds-btn-bg-color-hover: transparent;
      --kds-btn-text-color: var(--kds-fg-link-base);
      --kds-btn-text-color-hover: var(--kds-fg-link-hover);
      --kds-btn-text-decoration-hover: underline;
      --kds-btn-padding-inline: 0;
      --kds-btn-height: initial;
      --kds-btn-border-color: transparent;
      --kds-btn-border-color-hover: transparent;
    }
  } /* end @layer priority */
`;