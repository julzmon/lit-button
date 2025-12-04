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
  }

  /* Direction variants */
  :host([direction="column"]) {
    flex-direction: column;
  }

  /* Justify variants */
  :host([justify="center"]) {
    justify-content: center;
  }

  :host([justify="end"]) {
    justify-content: flex-end;
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
      margin-block: 0 !important;
      margin-inline-end: 0 !important;
    }

    /* Collapse borders using negative margin (row/default) */
    & ::slotted(*:nth-child(n+2)) {
      margin-inline-start: calc(
        -1 * var(--kds-button-group-border-width, var(--kds-border-width-xs))
      );
    }

    /* Focus stacking: raise focused button above neighbors */
    & ::slotted(*:focus),
    & ::slotted(*:focus-within) {
      z-index: 5;
    }
  }

  /* Border radius adjustments for gap=none row direction */
  :host([gap="none"]) ::slotted(:first-child:last-child) {
    --mod-btn-border-radius: var(--kds-border-radius-sm) !important;
  }

  :host([gap="none"]) ::slotted(:first-child:not(:last-child)) {
    --mod-btn-border-radius: var(--kds-border-radius-sm) 0 0
      var(--kds-border-radius-sm) !important;
  }

  :host([gap="none"]) ::slotted(:last-child:not(:first-child)) {
    --mod-btn-border-radius: 0 var(--kds-border-radius-sm)
      var(--kds-border-radius-sm) 0 !important;
  }

  :host([gap="none"]) ::slotted(:not(:first-child):not(:last-child)) {
    --mod-btn-border-radius: 0 !important;
  }

  /* Gap="none" + column direction: vertical connected buttons */
  :host([gap="none"][direction="column"]) {
    /* Reset row margins for column */
    & ::slotted(*) {
      margin-inline-start: 0 !important;
      margin-inline-end: 0 !important;
      margin-block-end: 0 !important;
    }

    /* Collapse borders using negative margin on block axis */
    & ::slotted(*:nth-child(n+2)) {
      margin-block-start: calc(
        -1 * var(--kds-button-group-border-width, var(--kds-border-width-xs))
      ) !important;
    }
  }

  /* Border radius adjustments for gap=none column direction */
  :host([gap="none"][direction="column"]) ::slotted(:first-child:last-child) {
    --mod-btn-border-radius: var(--kds-border-radius-sm) !important;
  }

  :host([gap="none"][direction="column"]) ::slotted(:first-child:not(:last-child)) {
    --mod-btn-border-radius: var(--kds-border-radius-sm)
      var(--kds-border-radius-sm) 0 0 !important;
  }

  :host([gap="none"][direction="column"]) ::slotted(:last-child:not(:first-child)) {
    --mod-btn-border-radius: 0 0 var(--kds-border-radius-sm)
      var(--kds-border-radius-sm) !important;
  }

  :host([gap="none"][direction="column"]) ::slotted(:not(:first-child):not(:last-child)) {
    --mod-btn-border-radius: 0 !important;
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

  /* Responsive breakpoint: switch to column when container is narrow */
  /* Uses custom property for breakpoint with 30rem fallback */
  @container (inline-size < 30rem) {
    :host([stretch]) {
      flex-direction: column;
      & ::slotted(*) {
        inline-size: 100%;
        flex: 0 0 auto;
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
