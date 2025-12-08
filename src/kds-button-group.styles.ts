import { css } from "lit";

export const buttonGroupStyles = css`
  :host {
    display: flex;
    position: relative;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: wrap;
    gap: var(--kds-space-md);

    /* Internal CSS variables for button border separation */
    --separator: rgba(255, 255, 255, 0.3);
    --separator-hover: rgba(255, 255, 255, 0.3);
  }

  :host([gap="sm"]) {
    gap: var(--mod-button-group-gap, var(--kds-space-sm));
  }

  :host([gap="md"]) {
    gap: var(--mod-button-group-gap, var(--kds-space-md));
  }

  :host([gap="lg"]) {
    gap: var(--mod-button-group-gap, var(--kds-space-lg));
  }

  :host([gap="xl"]) {
    gap: var(--mod-button-group-gap, var(--kds-space-xl));
  }

  /* Gap="none" mode: connected buttons with collapsed borders */
  :host([gap="none"]) {
    flex-wrap: nowrap;
    gap: 0;

    /* Ensure slotted elements have proper positioning and can be overlapped */
    & ::slotted(*) {
      position: relative;
      z-index: 0;
      margin-block: 0;
      margin-inline-end: 0;
    }

    /* Apply -1px margin collapse to all non-first buttons */
    & ::slotted(kds-button:nth-child(n+2)) {
      margin-inline-start: calc(-1 * var(--kds-button-group-border-width, var(--kds-border-width-xs)));

      /* Add white border on inline-start (left) side for visual separation */
      --mod-btn-border-color-inline-start: var(--separator);
      --mod-btn-border-color-inline-start-hover: var(--separator);
    }

    /* Secondary outlined buttons: keep collapsed margins, no border override */
    & ::slotted(kds-button[priority="secondary"][variant="outline"]:nth-child(n+2)),
    & ::slotted(kds-button[priority="secondary"]:not([variant]):nth-child(n+2)) {
      --mod-btn-border-color-inline-start: unset;
      --mod-btn-border-color-inline-start-hover: unset;
      margin-block-start: 0;
      margin-inline-end: 0;
    }

    /* Focus stacking: raise focused button above neighbors */
    & ::slotted(*:focus),
    & ::slotted(*:focus-within) {
      z-index: 5;
    }
  }

  /* Border radius adjustments for gap=none row direction */
  :host([gap="none"]) ::slotted(kds-button:first-of-type:last-of-type) {
    --mod-btn-border-radius-top-left: var(--kds-border-radius-sm);
    --mod-btn-border-radius-top-right: var(--kds-border-radius-sm);
    --mod-btn-border-radius-bottom-right: var(--kds-border-radius-sm);
    --mod-btn-border-radius-bottom-left: var(--kds-border-radius-sm);
  }

  :host([gap="none"]) ::slotted(kds-button:first-of-type:not(:last-of-type)) {
    --mod-btn-border-radius-top-left: var(--kds-border-radius-sm);
    --mod-btn-border-radius-top-right: 0;
    --mod-btn-border-radius-bottom-right: 0;
    --mod-btn-border-radius-bottom-left: var(--kds-border-radius-sm);
  }

  :host([gap="none"]) ::slotted(kds-button:last-of-type:not(:first-of-type)) {
    --mod-btn-border-radius-top-left: 0;
    --mod-btn-border-radius-top-right: var(--kds-border-radius-sm);
    --mod-btn-border-radius-bottom-right: var(--kds-border-radius-sm);
    --mod-btn-border-radius-bottom-left: 0;
  }

  :host([gap="none"]) ::slotted(kds-button:not(:first-of-type):not(:last-of-type)) {
    --mod-btn-border-radius-top-left: 0;
    --mod-btn-border-radius-top-right: 0;
    --mod-btn-border-radius-bottom-right: 0;
    --mod-btn-border-radius-bottom-left: 0;
  }

  /* Gap="none" + column direction: vertical connected buttons */
  :host([gap="none"][direction="column"]) {
    /* Reset row margins and border colors for column */
    & ::slotted(*) {
      margin-inline-start: 0;
      margin-inline-end: 0;
      margin-block-end: 0;
    }

    /* Apply -1px margin collapse to all non-first buttons */
    & ::slotted(kds-button:nth-child(n+2)) {
      margin-block-start: calc(
        -1 * var(--kds-button-group-border-width, var(--kds-border-width-xs))
      );
      /* Add white border on block-start (top) side for visual separation */
      --mod-btn-border-color-block-start: var(--separator-hover);
      --mod-btn-border-color-block-start-hover: var(--separator-hover);
      --mod-btn-border-color-inline-start: transparent;
      --mod-btn-border-color-inline-start-hover: transparent;
      margin-inline-start: 0;
      margin-inline-end: 0;
    }

    /* Secondary outlined buttons: keep collapsed margins, no border override */
    & ::slotted(kds-button[priority="secondary"][variant="outline"]:nth-child(n+2)),
    & ::slotted(kds-button[priority="secondary"]:not([variant]):nth-child(n+2)) {
      --mod-btn-border-color-block-start: unset;
      --mod-btn-border-color-block-start-hover: unset;
      margin-block-start: calc(
        -1 * var(--kds-button-group-border-width, var(--kds-border-width-xs))
      );
    }
  }

  /* Border radius adjustments for gap=none column direction */
  :host([gap="none"][direction="column"]) ::slotted(kds-button:first-of-type:last-of-type) {
    --mod-btn-border-radius-top-left: var(--kds-border-radius-sm);
    --mod-btn-border-radius-top-right: var(--kds-border-radius-sm);
    --mod-btn-border-radius-bottom-right: var(--kds-border-radius-sm);
    --mod-btn-border-radius-bottom-left: var(--kds-border-radius-sm);
  }

  :host([gap="none"][direction="column"]) ::slotted(kds-button:first-of-type:not(:last-of-type)) {
    --mod-btn-border-radius-top-left: var(--kds-border-radius-sm);
    --mod-btn-border-radius-top-right: var(--kds-border-radius-sm);
    --mod-btn-border-radius-bottom-right: 0;
    --mod-btn-border-radius-bottom-left: 0;
  }

  :host([gap="none"][direction="column"]) ::slotted(kds-button:last-of-type:not(:first-of-type)) {
    --mod-btn-border-radius-top-left: 0;
    --mod-btn-border-radius-top-right: 0;
    --mod-btn-border-radius-bottom-right: var(--kds-border-radius-sm);
    --mod-btn-border-radius-bottom-left: var(--kds-border-radius-sm);
  }

  :host([gap="none"][direction="column"]) ::slotted(kds-button:not(:first-of-type):not(:last-of-type)) {
    --mod-btn-border-radius-top-left: 0;
    --mod-btn-border-radius-top-right: 0;
    --mod-btn-border-radius-bottom-right: 0;
    --mod-btn-border-radius-bottom-left: 0;
  }

  /* Stretch mode: equal-width buttons with container queries */
  :host([stretch]) {
    container-type: inline-size;
    inline-size: 100%;
    display: flex;
    flex-direction: row;

    & ::slotted(*) {
      flex: 1 1 0;
      min-inline-size: 0;
    }
  }

  /* Auto-stack mode: stack buttons at 30rem breakpoint with natural width */
  :host([auto-stack]) {
    container-type: inline-size;
    inline-size: 100%;
    display: flex;
    flex-direction: row;
  }

  /* Direction variants */
  :host([direction="column"]) {
    flex-direction: column;
    /* No inline-start borders in column mode */
    --separator: transparent;
  }

  /* Justify variants */
  :host([justify="center"]) {
    justify-content: center;
  }

  :host([justify="end"]) {
    flex-direction: row-reverse;
  }

  /* Responsive breakpoint: switch to column when container is narrow */
  /* Applies to both stretch (equal-width) and auto-stack (natural width) modes */
  @container (inline-size < 30rem) {
    :host([stretch]) {
      flex-direction: column;
      & ::slotted(*) {
        inline-size: 100%;
        flex: 0 0 auto;
      }
    }

    :host([auto-stack]) {
      flex-direction: column;
      justify-content: flex-start;
      & ::slotted(*) {
        inline-size: 100%;
      }
    }
  }

  /* Ensure all slotted buttons have proper positioning context */
  ::slotted(*) {
    position: relative;
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    ::slotted(*) {
      transition: none !important;
    }
  }
`;
