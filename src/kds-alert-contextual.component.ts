import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { alertContextualStyles } from "./kds-alert-contextual.styles.js";

/**
 * @summary A contextual alert component for displaying status messages.
 * @documentation https://...
 * @status beta
 * @since 1.0
 *
 * @description
 * Displays an icon and message with semantic styling based on the alert status.
 * Supports four status types (info, positive, negative, warning) and two sizes (sm, md).
 * The component uses KDS design tokens for consistent theming and supports color customization
 * through CSS custom properties.
 *
 * @slot - Default slot for the alert message text
 *
 * @cssprop --mod-alert-font-size - Font size of the alert text
 * @cssprop --mod-alert-icon-size - Size of the status icon
 * @cssprop --mod-alert-color - Text and icon color
 * @cssprop --mod-alert-gap - Gap between icon and text
 *
 * @example
 * ```html
 * <kds-alert-contextual status="positive" size="md">Success!</kds-alert-contextual>
 * <kds-alert-contextual status="negative" size="sm">Error occurred</kds-alert-contextual>
 * <kds-alert-contextual status="warning">Warning message</kds-alert-contextual>
 * ```
 */
@customElement("kds-alert-contextual")
export class KdsAlertContextual extends LitElement {
  static styles = alertContextualStyles;
  static shadowRootOptions = {
    mode: "open" as ShadowRootMode,
    delegatesFocus: true,
  };

  /**
   * The status/type of the alert.
   * - `info`: Information status (blue)
   * - `positive`: Success/positive status (green)
   * - `negative`: Error/negative status (red)
   * - `warning`: Warning status (orange/amber)
   */
  @property({ reflect: true, useDefault: true })
  status: "info" | "positive" | "negative" | "warning" = "info";

  /**
   * The size of the alert.
   * - `sm`: Small size
   * - `md`: Medium size (default)
   */
  @property({ reflect: true, useDefault: true })
  size: "sm" | "md" = "md";

  render() {
    return html`
      <div class="icon" aria-hidden="true">
        ${this._renderIcon()}
      </div>
      <span>
        <slot></slot>
      </span>
    `;
  }

  private _renderIcon() {
    switch (this.status) {
      case "info":
        return html`
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
            <text x="12" y="16" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">i</text>
          </svg>
        `;
      case "positive":
        return html`
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
            <polyline points="8 12 11 15 16 9" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `;
      case "negative":
        return html`
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
            <line x1="8" y1="8" x2="16" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <line x1="16" y1="8" x2="8" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        `;
      case "warning":
        return html`
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
            <polygon points="12 6 6 18 18 18" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/>
          </svg>
        `;
      default:
        return html``;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kds-alert-contextual": KdsAlertContextual;
  }
}
