var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { inputGroupStyles } from "./kds-input-group.styles.js";
/**
 * @summary A fieldset-based wrapper for combining inputs with buttons, selects, or other components.
 * @documentation URL
 * @status beta
 * @since 1.0
 *
 * @event kds-input-group-change - Emitted when any slotted form control value changes
 *
 * @slot legend - Custom legend content (used when `legend` property is absent)
 * @slot start - Slot for components at the start (left side) of the group
 * @slot - Default slot for the main input component(s)
 * @slot end - Slot for components at the end (right side) of the group
 * @slot error - Custom error content (used when `error-message` is absent)
 * @slot help-text - Helper text displayed below the group for additional guidance
 *
 * @cssprop --mod-input-group-border-radius - Border radius for the group
 * @cssprop --mod-input-group-border-width - Border width for group elements
 * @cssprop --mod-input-group-border-color - Border color for group elements
 * @cssprop --mod-input-group-border-color-invalid - Border color when invalid
 * @cssprop --mod-legend-color - Legend text color
 * @cssprop --mod-legend-font-size - Legend font size
 * @cssprop --mod-legend-font-weight - Legend font weight
 * @cssprop --mod-legend-margin-bottom - Legend bottom margin
 *
 * @csspart fieldset - The fieldset element wrapper
 * @csspart legend - The legend element
 * @csspart group - The container holding all grouped elements
 * @csspart start - Container for start slot content
 * @csspart main - Container for the main input element(s)
 * @csspart end - Container for end slot content
 * @csspart error - Container for error message
 * @csspart help-text - Container for help text
 */
let uid = 0;
let KdsInputGroup = class KdsInputGroup extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Marks the group as required, showing a required indicator on the legend.
         */
        this.required = false;
        /**
         * Controls the size of the group, affecting all child components.
         *
         * - `sm`: Small
         * - `md`: Medium (default)
         */
        this.size = "md";
        /**
         * Whether the group is in an invalid state.
         * This will be applied to all child components and shows error styling.
         */
        this.invalid = false;
        /**
         * Disables all child form controls in the group.
         */
        this.disabled = false;
        // Internal state
        this._hasLegendSlot = false;
        this._hasErrorSlot = false;
        this._hasHelpTextSlot = false;
        this._legendId = `kds-input-group-legend-${++uid}`;
        this._helpTextId = `kds-input-group-help-${++uid}`;
        this._errorId = `kds-input-group-error-${++uid}`;
        this.handleLegendSlotChange = () => {
            const nodes = this._legendSlot?.assignedNodes({ flatten: true }) || [];
            this._hasLegendSlot = nodes.some(n => n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent?.trim()));
        };
        this.handleErrorSlotChange = () => {
            const nodes = this._errorSlot?.assignedNodes({ flatten: true }) || [];
            this._hasErrorSlot = nodes.some(n => n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent?.trim()));
        };
        this.handleHelpTextSlotChange = () => {
            const nodes = this._helpTextSlot?.assignedNodes({ flatten: true }) || [];
            this._hasHelpTextSlot = nodes.some(n => n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent?.trim()));
        };
        this.handleSlotChange = () => {
            this.updateSlottedElements();
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.updateComplete.then(() => {
            this._legendSlot?.addEventListener('slotchange', this.handleLegendSlotChange);
            this._errorSlot?.addEventListener('slotchange', this.handleErrorSlotChange);
            this._helpTextSlot?.addEventListener('slotchange', this.handleHelpTextSlotChange);
        });
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._legendSlot?.removeEventListener('slotchange', this.handleLegendSlotChange);
        this._errorSlot?.removeEventListener('slotchange', this.handleErrorSlotChange);
        this._helpTextSlot?.removeEventListener('slotchange', this.handleHelpTextSlotChange);
    }
    firstUpdated() {
        this.updateSlottedElements();
    }
    updated(changedProperties) {
        if (changedProperties.has('size') || changedProperties.has('invalid') || changedProperties.has('disabled')) {
            this.updateSlottedElements();
        }
    }
    updateSlottedElements() {
        const slots = this.shadowRoot?.querySelectorAll('slot');
        slots?.forEach(slot => {
            const assignedElements = slot.assignedElements();
            assignedElements.forEach(element => {
                // Apply size to all slotted elements that support it
                if ('size' in element && this.size) {
                    element.size = this.size;
                }
                // Apply invalid state to form control elements
                if ('invalid' in element) {
                    element.invalid = this.invalid;
                }
                // Apply disabled state to form control elements
                if ('disabled' in element && this.disabled) {
                    element.disabled = this.disabled;
                }
            });
        });
    }
    render() {
        const hasLegend = this.legend || this._hasLegendSlot;
        const hasError = this.invalid && (this.errorMessage || this._hasErrorSlot);
        const hasHelpText = this.helpText || this._hasHelpTextSlot;
        const groupClasses = {
            group: true,
            [this.size]: true,
            'invalid': this.invalid
        };
        // Build aria-describedby from available help/error text
        const describedByIds = [];
        if (hasHelpText)
            describedByIds.push(this._helpTextId);
        if (hasError)
            describedByIds.push(this._errorId);
        const ariaDescribedBy = describedByIds.length > 0 ? describedByIds.join(' ') : undefined;
        return html `
      <fieldset
        part="fieldset"
        class="fieldset"
        ?disabled=${this.disabled}
        aria-invalid=${this.invalid ? 'true' : 'false'}
        aria-describedby=${ifDefined(ariaDescribedBy)}
      >
        ${hasLegend ? html `
          <legend part="legend" id=${this._legendId} class="legend">
            ${this.legend ? this.legend : html `<slot name="legend"></slot>`}
          </legend>
        ` : ''}

        <div part="group" class=${classMap(groupClasses)}>
          <div part="start" class="start">
            <slot name="start" @slotchange=${this.handleSlotChange}></slot>
          </div>
          
          <div part="main" class="main">
            <slot @slotchange=${this.handleSlotChange}></slot>
          </div>
          
          <div part="end" class="end">
            <slot name="end" @slotchange=${this.handleSlotChange}></slot>
          </div>
        </div>

        ${hasError ? html `
          <div part="error" class="error" id=${this._errorId}>
            <div class="error-message">
              <span class="error-icon" aria-hidden="true">⚠</span>
              <span class="error-text">
                ${this.errorMessage ? this.errorMessage : html `<slot name="error"></slot>`}
              </span>
            </div>
          </div>
        ` : ''}

        ${hasHelpText ? html `
          <div part="help-text" class="help-text-wrapper" id=${this._helpTextId}>
            ${this.helpText ? html `<span class="help-text">${this.helpText}</span>` : html `<slot name="help-text"></slot>`}
          </div>
        ` : ''}
      </fieldset>
    `;
    }
};
KdsInputGroup.styles = inputGroupStyles;
KdsInputGroup.shadowRootOptions = {
    mode: "open",
    delegatesFocus: true,
};
__decorate([
    property({ type: String })
], KdsInputGroup.prototype, "legend", void 0);
__decorate([
    property({ type: String, attribute: "help-text" })
], KdsInputGroup.prototype, "helpText", void 0);
__decorate([
    property({ type: String, attribute: "error-message" })
], KdsInputGroup.prototype, "errorMessage", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], KdsInputGroup.prototype, "required", void 0);
__decorate([
    property({ reflect: true })
], KdsInputGroup.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], KdsInputGroup.prototype, "invalid", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], KdsInputGroup.prototype, "disabled", void 0);
__decorate([
    state()
], KdsInputGroup.prototype, "_hasLegendSlot", void 0);
__decorate([
    state()
], KdsInputGroup.prototype, "_hasErrorSlot", void 0);
__decorate([
    state()
], KdsInputGroup.prototype, "_hasHelpTextSlot", void 0);
__decorate([
    state()
], KdsInputGroup.prototype, "_legendId", void 0);
__decorate([
    state()
], KdsInputGroup.prototype, "_helpTextId", void 0);
__decorate([
    state()
], KdsInputGroup.prototype, "_errorId", void 0);
__decorate([
    query('slot[name="legend"]')
], KdsInputGroup.prototype, "_legendSlot", void 0);
__decorate([
    query('slot[name="error"]')
], KdsInputGroup.prototype, "_errorSlot", void 0);
__decorate([
    query('slot[name="help-text"]')
], KdsInputGroup.prototype, "_helpTextSlot", void 0);
KdsInputGroup = __decorate([
    customElement("kds-input-group")
], KdsInputGroup);
export { KdsInputGroup };
