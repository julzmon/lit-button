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
import { live } from "lit/directives/live.js";
import { textInputStyles } from "./kds-text-input.styles.js";
/**
 * @summary A text input field with validation, form integration, and adornment slots.
 * @documentation URL
 * @status beta
 * @since 1.0
 *
 * @event input - Native input event. Emitted on each keystroke. Bubbles and composes.
 * @event change - Native change event. Emitted on commit/blur. Bubbles and composes.
 * @event kds-blur - Emitted when the input loses focus.
 * @event kds-focus - Emitted when the input gains focus.
 * @event kds-text-input - Emitted on each keystroke with `{ value: string }`.
 * @event kds-change - Emitted on commit/blur with `{ value: string }`.
 *
 * @slot label - Custom label content (used when `label` property is absent).
 * @slot start - Leading adornment (icon, text, etc.).
 * @slot end - Trailing adornment (icon, button, etc.).
 * @slot error - Custom error content (used when `error-message` is absent).
 * @slot help-text - Helper text displayed below the input for additional guidance.
 *
 * @cssprop --mod-input-height - Input height
 * @cssprop --mod-input-padding-inline - Input horizontal padding
 * @cssprop --mod-input-gap - Gap between adornments and field
 * @cssprop --mod-input-color - Input text color
 * @cssprop --mod-input-font-size - Input font size
 * @cssprop --mod-input-line-height - Input line height
 * @cssprop --mod-input-border-width - Input border width
 * @cssprop --mod-input-border-radius - Input border radius
 * @cssprop --mod-input-border-color - Input border color
 * @cssprop --mod-input-border-color-hover - Input border hover color
 * @cssprop --mod-input-border-color-focus - Input border focus color
 * @cssprop --mod-input-background-color - Input background color
 * @cssprop --mod-placeholder-color - Placeholder text color
 * @cssprop --mod-placeholder-style - Placeholder font style
 * @cssprop --mod-label-color - Label text color
 * @cssprop --mod-label-font-size - Label font size
 * @cssprop --mod-label-font-weight - Label font weight
 * @cssprop --mod-label-margin-bottom - Label bottom margin
 * @cssprop --mod-focus-ring-width - Focus ring width
 * @cssprop --mod-focus-ring-color - Focus ring color
 * @cssprop --mod-focus-ring-color-invalid - Focus ring color when invalid
 */
let uid = 0;
let KdsTextInput = class KdsTextInput extends LitElement {
    constructor() {
        super();
        /**
         * Current value of the input.
         */
        this.value = "";
        /**
         * Controls the input size.
         *
         * - `sm`: Small
         * - `md`: Medium (default)
         */
        this.size = "md";
        /**
         * Native input `type` (e.g., "text", "email", "number").
         */
        this.type = "text";
        /**
         * Marks the field as required.
         */
        this.required = false;
        /**
         * Disables the control and prevents interaction.
         * Reflected to allow CSS styling with `:host([disabled])`.
         */
        this.disabled = false;
        /**
         * Makes the field read-only (non-editable).
         * Reflected to allow CSS styling with `:host([readonly])`.
         */
        this.readonly = false;
        /**
         * Sets the invalid state and updates `aria-invalid`.
         * Reflected to allow CSS styling with `:host([invalid])`.
         */
        this.invalid = false;
        /**
         * Shows a clear button when the field has a value.
         * Clicking the button or pressing Escape clears the input.
         */
        this.clearable = false;
        // Internal state / refs
        this._hasStart = false;
        this._hasEnd = false;
        this._hasErrorSlot = false;
        this._hasHelpTextSlot = false;
        this._showClear = false;
        this._inputId = `kds-text-input-${++uid}`;
        this._showPassword = false;
        this.hadUserInteraction = false;
        // Event handlers
        this.handleInput = (event) => {
            const target = event.target;
            this.value = target.value;
            this._showClear = !!this.value;
            // Re-dispatch native input for framework ergonomics
            this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
            this.dispatchEvent(new CustomEvent("kds-text-input", {
                detail: { value: this.value },
                bubbles: true,
                composed: true
            }));
        };
        this.handleChange = (event) => {
            const target = event.target;
            this.value = target.value;
            this._showClear = !!this.value;
            // Re-dispatch native change for framework ergonomics
            this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
            this.dispatchEvent(new CustomEvent("kds-change", {
                detail: { value: this.value },
                bubbles: true,
                composed: true
            }));
            this.updateValidity();
        };
        this.handleFocus = (event) => {
            this.dispatchEvent(new CustomEvent("kds-focus", {
                detail: { originalEvent: event },
                bubbles: true,
                composed: true
            }));
        };
        this.handleBlur = (event) => {
            this.dispatchEvent(new CustomEvent("kds-blur", {
                detail: { originalEvent: event },
                bubbles: true,
                composed: true
            }));
        };
        this.handleStartSlotChange = () => {
            this._hasStart = this._startSlot?.assignedElements().length > 0;
        };
        this.handleEndSlotChange = () => {
            this._hasEnd = this._endSlot?.assignedElements().length > 0;
        };
        this.handleErrorSlotChange = () => {
            this._hasErrorSlot = this._errorSlot?.assignedElements().length > 0;
        };
        this.handleHelpTextSlotChange = () => {
            this._hasHelpTextSlot = this._helpTextSlot?.assignedElements().length > 0;
        };
        this.handleKeyDown = (event) => {
            // Submit form on Enter
            if (event.key === 'Enter' && this.internals.form) {
                try {
                    this.internals.form.requestSubmit();
                }
                catch {
                    // Fallback: dispatch a submit event if requestSubmit isn't supported
                    this.internals.form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                }
            }
            // Clear on Escape when clearable
            if (event.key === 'Escape' && this.clearable && this.value) {
                event.preventDefault();
                this.handleClearClick();
            }
        };
        this.internals = this.attachInternals();
    }
    connectedCallback() {
        super.connectedCallback();
        this.updateComplete.then(() => {
            this._startSlot?.addEventListener('slotchange', this.handleStartSlotChange);
            this._endSlot?.addEventListener('slotchange', this.handleEndSlotChange);
            this._errorSlot?.addEventListener('slotchange', this.handleErrorSlotChange);
            this._helpTextSlot?.addEventListener('slotchange', this.handleHelpTextSlotChange);
        });
    }
    overridedisconnectedCallback() {
        super.disconnectedCallback();
        this._startSlot?.removeEventListener('slotchange', this.handleStartSlotChange);
        this._endSlot?.removeEventListener('slotchange', this.handleEndSlotChange);
        this._errorSlot?.removeEventListener('slotchange', this.handleErrorSlotChange);
        this._helpTextSlot?.removeEventListener('slotchange', this.handleHelpTextSlotChange);
    }
    /**
     * Initialize internal state based on initial value/attributes so
     * the clear button appears immediately when appropriate.
     */
    firstUpdated() {
        this._showClear = !!this.value;
    }
    /**
     * Sets focus to the input element.
     */
    focus() { this._native?.focus(); }
    /**
     * Removes focus from the input element.
     */
    blur() { this._native?.blur(); }
    /**
     * Selects all text in the input element.
     */
    select() { this._native?.select(); }
    handleClearClick() {
        this.hadUserInteraction = true;
        this.value = '';
        if (this._native)
            this._native.value = '';
        this._native?.focus();
        try {
            const Quiet = window.QuietInputEvent;
            if (typeof Quiet === 'function') {
                this.dispatchEvent(new Quiet());
            }
        }
        catch (e) {
            // ignore
        }
        if (this._native) {
            this._native.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true, cancelable: false }));
        }
        this.dispatchEvent(new CustomEvent("kds-text-input", { detail: { value: this.value }, bubbles: true, composed: true }));
        this.dispatchEvent(new CustomEvent("kds-change", { detail: { value: this.value }, bubbles: true, composed: true }));
    }
    buildValidityFlags(validity) {
        const flags = {};
        const keys = [
            'badInput', 'customError', 'patternMismatch', 'rangeOverflow', 'rangeUnderflow',
            'stepMismatch', 'tooLong', 'tooShort', 'typeMismatch', 'valueMissing'
        ];
        for (const key of keys) {
            if (validity[key])
                flags[key] = true;
        }
        return flags;
    }
    updateValidity() {
        // Disabled controls are never invalid
        if (this.disabled) {
            this._native?.setCustomValidity('');
            this.internals.setValidity({}, '');
            return;
        }
        // Respect explicit invalid flag as a custom error
        if (this.invalid) {
            const message = this.errorMessage ?? '';
            this._native?.setCustomValidity(message);
            this.internals.setValidity({ customError: true }, message, this._native);
            return;
        }
        else {
            this._native?.setCustomValidity('');
        }
        if (!this._native)
            return;
        const validity = this._native.validity;
        const flags = this.buildValidityFlags(validity);
        const message = this._native.validationMessage || '';
        // When valid, pass empty flags to mark valid
        this.internals.setValidity(validity.valid ? {} : flags, validity.valid ? '' : message, this._native);
    }
    /**
     * Called when a containing fieldset is disabled.
     * @internal
     */
    formDisabledCallback(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * Called when the form is reset.
     * @internal
     */
    formResetCallback() {
        this.hadUserInteraction = false;
        this.value = this.getAttribute('value') ?? '';
        this._showClear = !!this.value;
        this.updateValidity();
    }
    /**
     * Checks the input's validity and returns `true` if valid, `false` otherwise.
     * Also updates the internal validity state.
     */
    checkValidity() {
        this.updateValidity();
        return this.internals.checkValidity();
    }
    /**
     * Checks the input's validity and reports it to the user.
     * Returns `true` if valid, `false` otherwise.
     * When invalid, shows the browser's native validation UI.
     */
    reportValidity() {
        this.updateValidity();
        return this.internals.reportValidity();
    }
    updated(changed) {
        const validityAffecting = [
            'value', 'invalid', 'required', 'pattern', 'maxlength', 'minlength', 'min', 'max', 'step', 'type', 'readonly', 'disabled'
        ];
        if (validityAffecting.some(prop => changed.has(prop))) {
            this.updateValidity();
        }
        // Keep clear-button visibility in sync with external value changes
        if (changed.has('value')) {
            this._showClear = !!this.value;
        }
    }
    render() {
        const inputClasses = {
            input: true,
            invalid: this.invalid,
            'has-start': this._hasStart,
            'has-end': this._hasEnd,
            'user-interacted': this.hadUserInteraction
        };
        const describedByIds = [];
        if (this._hasHelpTextSlot || this.helpText) {
            describedByIds.push(`${this._inputId}-help`);
        }
        if (this.invalid && (this.errorMessage || this._hasErrorSlot)) {
            describedByIds.push(`${this._inputId}-error`);
        }
        const ariaDescribedBy = describedByIds.length > 0 ? describedByIds.join(' ') : undefined;
        const inputType = this.type === 'password' && this._showPassword ? 'text' : this.type;
        return html `
      <label id="label" part="label" for=${this._inputId}><slot name="label">${this.label}</slot></label>

      <div class=${classMap(inputClasses)}>
        <slot name="start"></slot>

        <input
          class="native-input"
          id=${this._inputId}
          type=${ifDefined(inputType)}
          name=${ifDefined(this.name)}
          .value=${live(this.value)}
          placeholder=${ifDefined(this.placeholder)}
          ?required=${this.required}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?autofocus=${this.hasAttribute('autofocus')}
          autocomplete=${ifDefined(this.autocomplete)}
          autocapitalize=${ifDefined(this.getAttribute('autocapitalize'))}
          autocorrect=${ifDefined(this.getAttribute('autocorrect'))}
          enterkeyhint=${ifDefined(this.getAttribute('enterkeyhint'))}
          inputmode=${ifDefined(this.getAttribute('inputmode'))}
          spellcheck=${ifDefined(this.getAttribute('spellcheck'))}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          step=${ifDefined(this.step)}
          maxLength=${ifDefined(this.maxlength)}
          minLength=${ifDefined(this.minlength)}
          pattern=${ifDefined(this.pattern)}
          aria-invalid=${this.invalid ? "true" : "false"}
          aria-describedby=${ifDefined(ariaDescribedBy)}
          @input=${this.handleInput}
          @change=${this.handleChange}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          @keydown=${this.handleKeyDown}
        />

        ${this.clearable && this._showClear && !this.disabled && !this.readonly ? html `
          <button
          type="button"
          class="input-action-btn"
          aria-label="Clear input"
          @click=${() => this.handleClearClick()}
          >✕</button>
          ` : null}

        ${this.type === 'password' && !this.disabled && !this.readonly ? html `
          <button
            type="button"
            class="input-action-btn"
            aria-label=${this._showPassword ? 'Hide password' : 'Show password'}
            aria-pressed=${this._showPassword ? 'true' : 'false'}
            aria-controls=${this._inputId}
            @click=${() => { this._showPassword = !this._showPassword; this._native?.focus(); }}
          >${this._showPassword ? '👁' : '🙈'}</button>
        ` : null}

        <slot name="end"></slot>

      </div>

      ${this.invalid || this._hasErrorSlot ? html `
        <div id="${this._inputId}-error" role="alert" part="error" class="error">
          ${this.errorMessage ? html `
            <div class="error-message">
              <span class="error-icon" aria-hidden="true">⚠</span>
              <span class="error-text">${this.errorMessage}</span>
            </div>
          ` : html `
            <slot name="error"></slot>
          `}
        </div>
      ` : null}

      <div id="${this._inputId}-help" part="help-text" class="help-text-wrapper">
        <slot name="help-text">${this.helpText}</slot>
      </div>
    `;
    }
};
KdsTextInput.formAssociated = true;
KdsTextInput.styles = textInputStyles;
KdsTextInput.shadowRootOptions = {
    mode: "open",
    delegatesFocus: true,
};
__decorate([
    property({ type: String })
], KdsTextInput.prototype, "value", void 0);
__decorate([
    property({ type: String })
], KdsTextInput.prototype, "placeholder", void 0);
__decorate([
    property({ type: String })
], KdsTextInput.prototype, "label", void 0);
__decorate([
    property({ reflect: true })
], KdsTextInput.prototype, "size", void 0);
__decorate([
    property({ type: String })
], KdsTextInput.prototype, "type", void 0);
__decorate([
    property({ type: String })
], KdsTextInput.prototype, "name", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], KdsTextInput.prototype, "required", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], KdsTextInput.prototype, "disabled", void 0);
__decorate([
    property({ type: String })
], KdsTextInput.prototype, "helpText", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], KdsTextInput.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], KdsTextInput.prototype, "invalid", void 0);
__decorate([
    property({ type: String, attribute: "error-message" })
], KdsTextInput.prototype, "errorMessage", void 0);
__decorate([
    property({ type: String })
], KdsTextInput.prototype, "autocomplete", void 0);
__decorate([
    property({ type: Number })
], KdsTextInput.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], KdsTextInput.prototype, "max", void 0);
__decorate([
    property({ type: Number })
], KdsTextInput.prototype, "step", void 0);
__decorate([
    property({ attribute: "maxlength", type: Number })
], KdsTextInput.prototype, "maxlength", void 0);
__decorate([
    property({ attribute: "minlength", type: Number })
], KdsTextInput.prototype, "minlength", void 0);
__decorate([
    property({ type: String })
], KdsTextInput.prototype, "pattern", void 0);
__decorate([
    property({ attribute: 'clearable', type: Boolean, reflect: true })
], KdsTextInput.prototype, "clearable", void 0);
__decorate([
    state()
], KdsTextInput.prototype, "_hasStart", void 0);
__decorate([
    state()
], KdsTextInput.prototype, "_hasEnd", void 0);
__decorate([
    state()
], KdsTextInput.prototype, "_hasErrorSlot", void 0);
__decorate([
    state()
], KdsTextInput.prototype, "_hasHelpTextSlot", void 0);
__decorate([
    state()
], KdsTextInput.prototype, "_showClear", void 0);
__decorate([
    state()
], KdsTextInput.prototype, "_inputId", void 0);
__decorate([
    state()
], KdsTextInput.prototype, "_showPassword", void 0);
__decorate([
    query('.native-input')
], KdsTextInput.prototype, "_native", void 0);
__decorate([
    query('slot[name="start"]')
], KdsTextInput.prototype, "_startSlot", void 0);
__decorate([
    query('slot[name="end"]')
], KdsTextInput.prototype, "_endSlot", void 0);
__decorate([
    query('slot[name="error"]')
], KdsTextInput.prototype, "_errorSlot", void 0);
__decorate([
    query('slot[name="help-text"]')
], KdsTextInput.prototype, "_helpTextSlot", void 0);
KdsTextInput = __decorate([
    customElement("kds-text-input")
], KdsTextInput);
export { KdsTextInput };
