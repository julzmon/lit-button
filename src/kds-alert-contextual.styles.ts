import { css } from "lit";

export const alertContextualStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    gap: var(--gap);

    /* Default component variables */
    --font-size: var(--mod-alert-contexual-font-size, var(--kds-font-size-md));
    --icon-size: var(--mod-alert-contexual-icon-size, var(--kds-icon-size-md));
    --color: var(--mod-alert-contexual-color, var(--kds-fg-info-base));
    --gap: var(--mod-alert-contexual-gap, var(--kds-space-sm));

    /* Typography */
    color: var(--color);
    font-size: var(--font-size);
    font-weight: var(--kds-font-weight-bold);
    font-family: var(--kds-font-family);
    line-height: var(--kds-font-line-height-text);
  }

  /* Size variants */
  :host([size="sm"]) {
    --font-size: var(--kds-font-size-sm);
    --icon-size: var(--kds-icon-size-sm);
    --gap: var(--kds-space-sm);
  }

  /* Status color variants */
  :host([status="info"]) {
    --color: var(--kds-fg-info-base);
  }

  :host([status="positive"]) {
    --color: var(--kds-fg-positive-base);
  }

  :host([status="negative"]) {
    --color: var(--kds-fg-negative-base);
  }

  :host([status="warning"]) {
    --color: var(--kds-fg-warning-base);
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--icon-size);
    height: var(--icon-size);
    color: var(--color);
  }

  .icon svg {
    width: 100%;
    height: 100%;
  }
`;
