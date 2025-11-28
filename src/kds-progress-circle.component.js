var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { styleMap } from "lit/directives/style-map.js";
import { progressCircleStyles } from "./kds-progress-circle.styles.js";
/**
 * @summary Circular indicator for determinate progress values or indeterminate loading states.
 * @documentation URL
 * @status beta
 * @since 1.0
 *
 * @cssprop --mod-progress-size - Preferred size of the control.
 * @cssprop --mod-progress-indicator-color - Color of the active progress arc.
 * @cssprop --mod-progress-speed - Animation duration for indeterminate mode.
 * @cssprop --mod-progress-spinner-arc - Sweep angle used when spinning.
 * @cssprop --kds-progress-track-color - Color of the inactive track.
 *
 */
let KdsProgressCircle = class KdsProgressCircle extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Preset sizes mapped to design tokens.
         *
         * - `xs`: Extra small
         * - `sm`: Small
         * - `md`: Medium (default)
         * - `lg`: Large
         * - `xl`: Extra large
         */
        this.size = "md";
        this.arcDeg = 0;
    }
    willUpdate(_changed) {
        super.willUpdate(_changed);
        const progressValue = this.getProgressValue();
        const determinate = progressValue !== undefined;
        this.classList.toggle("is-determinate", determinate);
        this.classList.toggle("is-indeterminate", !determinate);
        if (determinate) {
            const clamped = Math.min(100, Math.max(0, progressValue));
            this.arcDeg = (clamped / 100) * 360;
        }
    }
    getProgressValue() {
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
        const hostManagesSemantics = this.hasAttribute("role") ||
            this.hasAttribute("aria-valuenow") ||
            this.hasAttribute("aria-valuemin") ||
            this.hasAttribute("aria-valuemax");
        const hostProvidesName = Boolean(hostLabel || hostLabelledBy);
        const manageInternally = hasLabel || (!hostManagesSemantics && hostProvidesName);
        const clamped = determinate
            ? Math.min(100, Math.max(0, progressValue))
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
                ? this.label
                : hostLabel ?? undefined
            : undefined;
        const ariaLabelledBy = manageInternally && !hasLabel ? hostLabelledBy ?? undefined : undefined;
        const ariaDescribedBy = manageInternally ? hostDescribedBy ?? undefined : undefined;
        const ariaLive = manageInternally && !determinate ? "polite" : undefined;
        const ariaHidden = manageInternally ? undefined : "true";
        const ariaValueNow = manageInternally && determinate ? String(clamped) : undefined;
        const ariaValueMin = manageInternally && determinate ? "0" : undefined;
        const ariaValueMax = manageInternally && determinate ? "100" : undefined;
        return html `
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
        <div class="track"></div>
        <div
          class="indicator"
          style=${styleMap(indicatorStyle)}
        ></div>
      </div>
    `;
    }
};
KdsProgressCircle.styles = progressCircleStyles;
__decorate([
    property({ type: Number })
], KdsProgressCircle.prototype, "progress", void 0);
__decorate([
    property({ type: String })
], KdsProgressCircle.prototype, "label", void 0);
__decorate([
    property({ reflect: true })
], KdsProgressCircle.prototype, "size", void 0);
KdsProgressCircle = __decorate([
    customElement("kds-progress-circle")
], KdsProgressCircle);
export { KdsProgressCircle };
