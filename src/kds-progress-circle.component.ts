import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { progressCircleStyles } from "./kds-progress-circle.styles.js";

@customElement("kds-progress-circle")
export class KdsProgressCircle extends LitElement {
  static styles = progressCircleStyles;

  /** Accessible name override. */
  @property({ type: String }) label?: string;

  /** Visual size mapping to token-based dimensions. */
  @property({ reflect: true })
  size: "xs" | "sm" | "md" | "lg" | "xl" = "md";

  render() {
    return html`
      <svg
        viewBox="0 0 50 50"
        focusable="false"
        role=${this.label ? "status" : nothing}
        aria-label=${this.label ?? nothing}
      >
        <circle
          class="track"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke-width="5"
        />
        <circle
          class="indicator"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke-width="5"
        />
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kds-progress-circle": KdsProgressCircle;
  }
}
