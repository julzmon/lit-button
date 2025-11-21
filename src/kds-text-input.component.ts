import { LitElement, html } from "lit";
import type { PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { inputStyles } from "./kds-text-input.styles.js";

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

@customElement("kds-text-input")
export class KdsTextInput extends LitElement {
  static formAssociated = true;
  static styles = inputStyles;
  static shadowRootOptions: ShadowRootInit = {
    mode: "open" as ShadowRootMode,
    delegatesFocus: true,
  };

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  /**
   * Current value of the input.
   */
  @property({ type: String }) value: string = "";

  /**
   * Placeholder text displayed when the input is empty.
   */
  @property({ type: String }) placeholder?: string;

  /**
   * Text label rendered above the field.
   */
  @property({ type: String }) label?: string;

  /**
   * Controls the input size.
   *
   * - `sm`: Small
   * - `md`: Medium (default)
   */
  @property({ reflect: true }) size: "sm" | "md" = "md";

  /**
   * Native input `type` (e.g., "text", "email", "number").
   */
  @property({ type: String }) type: HTMLInputElement["type"] = "text";

  /**
   * Native `name` for form submission.
   */
  @property({ type: String }) name?: string;

  /**
   * Marks the field as required.
   */
  @property({ type: Boolean, reflect: true }) required = false;

  /**
   * Disables the control and prevents interaction.
   * Reflected to allow CSS styling with `:host([disabled])`.
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Helper text displayed below the field.
   * Can also be provided via the `help-text` slot.
   */
  @property({ type: String }) helpText?: string;

  /**
   * Makes the field read-only (non-editable).
   * Reflected to allow CSS styling with `:host([readonly])`.
   */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /**
   * Sets the invalid state and updates `aria-invalid`.
   * Reflected to allow CSS styling with `:host([invalid])`.
   */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /**
   * Error message shown below the field when invalid (if no `error` slot provided).
   */
  @property({ type: String, attribute: "error-message" }) errorMessage?: string;

  /**
   * Native `autocomplete` hint.
   */
  @property({ type: String }) autocomplete?: HTMLInputElement["autocomplete"];

  // Typing hint attributes will be read directly from host attributes at render time

  /**
   * Native numeric/date lower bound.
   */
  @property({ type: Number }) min?: number;

  /**
   * Native numeric/date upper bound.
   */
  @property({ type: Number }) max?: number;

  /**
   * Native numeric/date step increment.
   */
  @property({ type: Number }) step?: any;

  /**
   * Native maximum length (characters).
   */
  @property({ attribute: "maxlength", type: Number }) maxlength?: number;

  /**
   * Native minimum length (characters).
   */
  @property({ attribute: "minlength", type: Number }) minlength?: number;

  /**
   * Native validation pattern (regular expression string).
   */
  @property({ type: String }) pattern?: string;

  /**
   * Shows a clear button when the field has a value.
   * Clicking the button or pressing Escape clears the input.
   */
  @property({ attribute: 'clearable', type: Boolean, reflect: true }) clearable = false;

  // Internal state / refs

  @state() private _hasStart = false;
  @state() private _hasEnd = false;
  @state() private _hasErrorSlot = false;
  @state() private _hasHelpTextSlot = false;
  @state() private _showClear = false;
  @state() private _inputId = `kds-text-input-${++uid}`;
  @state() private _showPassword = false;

  @query('.native-input') private _native!: HTMLInputElement;
  @query('slot[name="start"]') private _startSlot!: HTMLSlotElement;
  @query('slot[name="end"]') private _endSlot!: HTMLSlotElement;
  @query('slot[name="error"]') private _errorSlot!: HTMLSlotElement;
  @query('slot[name="help-text"]') private _helpTextSlot!: HTMLSlotElement;

  private hadUserInteraction = false;

  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      this._startSlot?.addEventListener('slotchange', this.handleStartSlotChange);
      this._endSlot?.addEventListener('slotchange', this.handleEndSlotChange);
      this._errorSlot?.addEventListener('slotchange', this.handleErrorSlotChange);
      this._helpTextSlot?.addEventListener('slotchange', this.handleHelpTextSlotChange);
    });
  }

  disconnectedCallback() {
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
  protected firstUpdated() {
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

  // Event handlers

  private handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
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

  private handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
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

  private handleFocus = (event: FocusEvent) => {
    this.dispatchEvent(new CustomEvent("kds-focus", {
      detail: { originalEvent: event },
      bubbles: true,
      composed: true
    }));
  };

  private handleBlur = (event: FocusEvent) => {
    this.dispatchEvent(new CustomEvent("kds-blur", {
      detail: { originalEvent: event },
      bubbles: true,
      composed: true
    }));
  };

  private handleClearClick() {
    this.hadUserInteraction = true;
    this.value = '';
    if (this._native) this._native.value = '';
    this._native?.focus();

    try {
      const Quiet = (window as any).QuietInputEvent;
      if (typeof Quiet === 'function') {
        this.dispatchEvent(new Quiet());
      }
    } catch (e) {
      // ignore
    }

    if (this._native) {
      this._native.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true, cancelable: false }));
    }

    this.dispatchEvent(new CustomEvent("kds-text-input", { detail: { value: this.value }, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent("kds-change", { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  private handleStartSlotChange = () => {
    this._hasStart = this._startSlot?.assignedElements().length > 0;
  };

  private handleEndSlotChange = () => {
    this._hasEnd = this._endSlot?.assignedElements().length > 0;
  };

  private handleErrorSlotChange = () => {
    this._hasErrorSlot = this._errorSlot?.assignedElements().length > 0;
  };

  private handleHelpTextSlotChange = () => {
    this._hasHelpTextSlot = this._helpTextSlot?.assignedElements().length > 0;
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    // Submit form on Enter
    if (event.key === 'Enter' && this.internals.form) {
      try {
        this.internals.form.requestSubmit();
      } catch {
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

  private buildValidityFlags(validity: ValidityState): Partial<Record<keyof ValidityState, boolean>> {
    const flags: any = {};
    const keys: (keyof ValidityState)[] = [
      'badInput', 'customError', 'patternMismatch', 'rangeOverflow', 'rangeUnderflow',
      'stepMismatch', 'tooLong', 'tooShort', 'typeMismatch', 'valueMissing'
    ];
    for (const key of keys) {
      if (validity[key]) flags[key] = true;
    }
    return flags;
  }

  private updateValidity() {
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
    } else {
      this._native?.setCustomValidity('');
    }

    if (!this._native) return;

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
  formDisabledCallback(isDisabled: boolean) {
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

  updated(changed: PropertyValues<this>) {
    const validityAffecting = [
      'value','invalid','required','pattern','maxlength','minlength','min','max','step','type','readonly','disabled'
    ] as const;
    if (validityAffecting.some(prop => changed.has(prop as any))) {
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

    const describedByIds: string[] = [];
    if (this._hasHelpTextSlot || this.helpText) {
      describedByIds.push(`${this._inputId}-help`);
    }

    if (this.invalid && (this.errorMessage || this._hasErrorSlot)) {
      describedByIds.push(`${this._inputId}-error`);
    }
    const ariaDescribedBy = describedByIds.length > 0 ? describedByIds.join(' ') : undefined;

    const inputType = this.type === 'password' && this._showPassword ? 'text' : this.type;

    return html`
      <label id="label" for=${this._inputId}><slot name="label">${this.label}</slot></label>

      <div class=${classMap(inputClasses)}>
        <slot name="start"></slot>

        <input
          class="native-input"
          id=${this._inputId}
          type=${ifDefined(inputType as any)}
          name=${ifDefined(this.name)}
          .value=${live(this.value)}
          placeholder=${ifDefined(this.placeholder)}
          ?required=${this.required}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?autofocus=${this.hasAttribute('autofocus')}
          autocomplete=${ifDefined(this.autocomplete as any)}
          autocapitalize=${ifDefined(this.getAttribute('autocapitalize') as any)}
          autocorrect=${ifDefined(this.getAttribute('autocorrect') as any)}
          enterkeyhint=${ifDefined(this.getAttribute('enterkeyhint') as any)}
          inputmode=${ifDefined(this.getAttribute('inputmode') as any)}
          spellcheck=${ifDefined(this.getAttribute('spellcheck') as any)}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          step=${ifDefined(this.step as any)}
          maxLength=${ifDefined(this.maxlength as any)}
          minLength=${ifDefined(this.minlength as any)}
          pattern=${ifDefined(this.pattern)}
          aria-invalid=${this.invalid ? "true" : "false"}
          aria-describedby=${ifDefined(ariaDescribedBy)}
          @input=${this.handleInput}
          @change=${this.handleChange}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          @keydown=${this.handleKeyDown}
        />

        ${this.type === 'password' && !this.disabled && !this.readonly ? html`
          <button
            type="button"
            class="input-action-btn"
            aria-label=${this._showPassword ? 'Hide password' : 'Show password'}
            aria-pressed=${this._showPassword ? 'true' : 'false'}
            aria-controls=${this._inputId}
            @click=${() => { this._showPassword = !this._showPassword; this._native?.focus(); }}
          >${this._showPassword ? '👁' : '🙈'}</button>
        ` : null}

        ${this.clearable && this._showClear && !this.disabled && !this.readonly ? html`
          <button
          type="button"
          class="input-action-btn"
          aria-label="Clear input"
          @click=${() => this.handleClearClick()}
          >✕</button>
          ` : null}

        <slot name="end"></slot>

      </div>

      ${this.invalid || this._hasErrorSlot ? html`
        <div id="${this._inputId}-error" role="alert" part="error" class="error">
          ${this.errorMessage ? html`
            <div class="error-message">
              <span class="error-icon" aria-hidden="true">⚠</span>
              <span class="error-text">${this.errorMessage}</span>
            </div>
          ` : html`
            <slot name="error"></slot>
          `}
        </div>
      ` : null}

      <div id="${this._inputId}-help" part="help-text" class="help-text-wrapper">
        <slot name="help-text">${this.helpText}</slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kds-text-input": KdsTextInput;
  }
}
