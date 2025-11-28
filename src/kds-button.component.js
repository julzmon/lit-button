var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { buttonStyles } from "./kds-button.styles.js";
/**
 * @summary A clickable element for triggering actions.
 * @documentation URL
 * @status beta
 * @since 1.0
 *
 * @dependency kds-spinner
 *
 * @event kds-blur - Emitted when the button loses focus.
 * @event kds-focus - Emitted when the button gains focus.
 *
 * @slot - Default slot for button label.
 * @slot start - For icon or element before the label.
 * @slot end - For icon or element after the label.
 *
 * @cssprop --mod-btn-height - Button height
 * @cssprop --mod-btn-min-width - Button minimum width
 * @cssprop --mod-btn-padding-inline - Button padding on left/right
 * @cssprop --mod-btn-gap - Space between the default slot and start/end slot elements
 * @cssprop --mod-btn-color - Button text color
 * @cssprop --mod-btn-color-hover - Button text hover color
 * @cssprop --mod-btn-font-size - Button font size
 * @cssprop --mod-btn-line-height - Button line height
 * @cssprop --mod-btn-border-width - Button border width
 * @cssprop --mod-btn-border-radius - Button border radius
 * @cssprop --mod-btn-border-color - Button border color
 * @cssprop --mod-btn-border-color-hover - Button border hover color
 * @cssprop --mod-btn-background-color - Button background color
 * @cssprop --mod-btn-background-color-hover - Button background hover color
 *
 * @csspart base - Container for the dfault slot (label/content)
 * @csspart start - Container for the start (icon)
 * @csspart end - Container for the end (icon)
 */
let KdsButton = class KdsButton extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Controls the button size.
         *
         * - `xs`: Extra small
         * - `sm`: Small
         * - `md`: Medium (default)
         * - `lg`: Large
         */
        this.size = "md";
        /**
         * The native button `type` attribute.
         *
         * - `button` (default)
         * - `submit`
         * - `reset`
         */
        this.type = "button";
        /**
         * Disables the button, preventing user interaction.
         */
        this.disabled = false;
    }
    render() {
        // Build class map for styling based on component properties
        const classes = {
            button: true,
            [this.size]: true,
            // Only apply color and variant if no priority is set
            ...(this.priority
                ? {}
                : {
                    ...(this.color && { [this.color]: true }),
                    ...(this.variant && { [this.variant]: true }),
                }),
            // Priority always takes precedence
            ...(this.priority && { [this.priority]: true }),
        };
        // Render anchor tag if href is provided
        if (this.href) {
            return html `
        <a
          part="base"
          class=${classMap(classes)}
          ?disabled=${this.disabled}
          href=${this.href}
          tabindex=${ifDefined(this.tabindex)}
        >
          <slot name="start" part="start"></slot>
          <slot></slot>
          <slot name="end" part="end"></slot>
        </a>
      `;
        }
        // Render button tag with form-related attributes
        return html `
      <button
        part="base"
        role="button"
        class=${classMap(classes)}
        ?disabled=${this.disabled}
        type=${this.type}
        name=${ifDefined(this.name)}
        value=${ifDefined(this.value)}
        form=${ifDefined(this.form)}
        tabindex=${ifDefined(this.tabindex)}
      >
        <slot name="start" part="start"></slot>
        <slot></slot>
        <slot name="end" part="end"></slot>
      </button>
    `;
    }
};
KdsButton.styles = buttonStyles;
KdsButton.shadowRootOptions = {
    mode: "open",
    delegatesFocus: true,
};
__decorate([
    property({ type: String, reflect: true })
], KdsButton.prototype, "priority", void 0);
__decorate([
    property({ type: String, reflect: true })
], KdsButton.prototype, "color", void 0);
__decorate([
    property({ type: String, reflect: true })
], KdsButton.prototype, "variant", void 0);
__decorate([
    property({ reflect: true, useDefault: true })
], KdsButton.prototype, "size", void 0);
__decorate([
    property({ type: String })
], KdsButton.prototype, "type", void 0);
__decorate([
    property({ type: String })
], KdsButton.prototype, "href", void 0);
__decorate([
    property({ type: Boolean })
], KdsButton.prototype, "disabled", void 0);
__decorate([
    property({ type: String })
], KdsButton.prototype, "name", void 0);
__decorate([
    property({ type: String })
], KdsButton.prototype, "value", void 0);
__decorate([
    property({ type: String })
], KdsButton.prototype, "form", void 0);
__decorate([
    property({ type: Number })
], KdsButton.prototype, "tabindex", void 0);
KdsButton = __decorate([
    customElement("kds-button")
], KdsButton);
export { KdsButton };
