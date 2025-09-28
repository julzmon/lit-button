import { LitElement, PropertyValues, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { styleMap } from "lit/directives/style-map.js";
import { progressCircleStyles } from "./kds-progress-circle.styles.js";

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

  private arcDeg = 0;

  protected willUpdate(_changed: PropertyValues): void {
    super.willUpdate(_changed);

    const progressValue = this.getProgressValue();
    const determinate = progressValue !== undefined;

    this.classList.toggle("is-determinate", determinate);
    this.classList.toggle("is-indeterminate", !determinate);

    if (determinate) {
      const clamped = Math.min(100, Math.max(0, progressValue!));
      this.arcDeg = (clamped / 100) * 360;
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
    const hostLabel = this.getAttribute("aria-label");
    const hostLabelledBy = this.getAttribute("aria-labelledby");
    const hostDescribedBy = this.getAttribute("aria-describedby");
    const hostManagesSemantics =
      this.hasAttribute("role") ||
      this.hasAttribute("aria-valuenow") ||
      this.hasAttribute("aria-valuemin") ||
      this.hasAttribute("aria-valuemax");
    const hostProvidesName = Boolean(hostLabel || hostLabelledBy);
    const manageInternally = hasLabel || (!hostManagesSemantics && hostProvidesName);

    const clamped = determinate
      ? Math.min(100, Math.max(0, progressValue!))
      : 0;

    const indicatorStyle = determinate
      ? { "--arc-deg": `${this.arcDeg}deg` }
      : {};

    const role = manageInternally
      ? determinate
        ? "progressbar"
        : "status"
      : undefined;
    const ariaLabel = manageInternally
      ? hasLabel
        ? this.label!
        : hostLabel ?? undefined
      : undefined;
    const ariaLabelledBy = manageInternally && !hasLabel ? hostLabelledBy ?? undefined : undefined;
    const ariaDescribedBy = manageInternally ? hostDescribedBy ?? undefined : undefined;
    const ariaLive = manageInternally && !determinate ? "polite" : undefined;
    const ariaHidden = manageInternally ? undefined : "true";
    const ariaValueNow = manageInternally && determinate ? String(clamped) : undefined;
    const ariaValueMin = manageInternally && determinate ? "0" : undefined;
    const ariaValueMax = manageInternally && determinate ? "100" : undefined;

    return html`
      <div
        class="ring"
        role=${ifDefined(role)}
        aria-label=${ifDefined(ariaLabel)}
        aria-labelledby=${ifDefined(ariaLabelledBy)}
        aria-describedby=${ifDefined(ariaDescribedBy)}
        aria-live=${ifDefined(ariaLive)}
        aria-valuemin=${ifDefined(ariaValueMin)}
        aria-valuemax=${ifDefined(ariaValueMax)}
        aria-valuenow=${ifDefined(ariaValueNow)}
        aria-hidden=${ifDefined(ariaHidden)}
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
