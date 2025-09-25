import { LitElement, PropertyValues, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { styleMap } from "lit/directives/style-map.js";
import { progressCircleStyles } from "./kds-progress-circle.styles.js";

const MIN_VISIBLE_PERCENT = 1;
const DEFAULT_SPINNER_ARC_DEG = 80;

@customElement("kds-progress-circle")
export class KdsProgressCircle extends LitElement {
  static styles = progressCircleStyles;

  /** Determinate progress percentage (0-100). Omit for spinner mode. */
  @property({ type: Number }) progress?: number;

  /** Optional accessible label. */
  @property({ type: String }) label?: string;

  /** Preset sizes mapped to design tokens. */
  @property({ reflect: true })
  size: "xs" | "sm" | "md" | "lg" | "xl" = "md";

  private arcDeg: number = DEFAULT_SPINNER_ARC_DEG;

  protected willUpdate(_changed: PropertyValues): void {
    super.willUpdate(_changed);

    const progressValue = this.getProgressValue();
    const determinate = progressValue !== undefined;

    this.classList.toggle("is-determinate", determinate);
    this.classList.toggle("is-indeterminate", !determinate);

    if (determinate) {
      const clamped = Math.min(100, Math.max(0, progressValue!));
      const normalized = Math.max(MIN_VISIBLE_PERCENT, clamped) / 100;
      this.arcDeg = normalized * 360;
    }
  }

  private getProgressValue(): number | undefined {
    if (this.progress != null && !Number.isNaN(this.progress)) {
      return this.progress;
    }

    if (this.hasAttribute("progress")) {
      const value = Number(this.getAttribute("progress"));
      if (!Number.isNaN(value)) {
        return value;
      }
    }

    return undefined;
  }

  render() {
    const progressValue = this.getProgressValue();
    const determinate = progressValue !== undefined;
    const hasLabel = typeof this.label === "string" && this.label.length > 0;
    const clamped = determinate
      ? Math.min(100, Math.max(0, progressValue!))
      : 0;

    const indicatorStyle = determinate
      ? { "--arc-deg": `${this.arcDeg}deg` }
      : {};

    return html`
      <div
        class="ring"
        role=${ifDefined(hasLabel ? (determinate ? "progressbar" : "status") : undefined)}
        aria-label=${ifDefined(hasLabel ? this.label : undefined)}
        aria-live=${ifDefined(!determinate && hasLabel ? "polite" : undefined)}
        aria-valuemin=${ifDefined(determinate && hasLabel ? "0" : undefined)}
        aria-valuemax=${ifDefined(determinate && hasLabel ? "100" : undefined)}
        aria-valuenow=${ifDefined(
          determinate && hasLabel ? String(Math.round(clamped)) : undefined
        )}
        aria-hidden=${ifDefined(hasLabel ? undefined : "true")}
      >
        <div class="track" part="track"></div>
        <div
          class="indicator"
          part="indicator"
          style=${styleMap(indicatorStyle)}
        ></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kds-progress-circle": KdsProgressCircle;
  }
}
