import { LitElement, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { inputStyles } from "./kds-input.styles.js";

/**
 * @summary A text input field with validation and adornment slots.
 * @documentation URL
 * @status beta
 * @since 1.0
 *
 * @event kds-blur - Emitted when the input loses focus.
 * @event kds-focus - Emitted when the input gains focus.
 * @event kds-input - Emitted on each keystroke with `{ value: string }`.
 * @event kds-change - Emitted on commit/blur with `{ value: string }`.
 *
 * @slot start - Leading adornment (icon, text, etc.).
 * @slot end - Trailing adornment (icon, button, etc.).
 * @slot error - Custom error content (used when `error-message` is absent).
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
 *
 * @csspart error - Wrapper around the error block
 */
let uid = 0;

@customElement("kds-input")
export class KdsInput extends LitElement {
  static styles = inputStyles;
  static shadowRootOptions: ShadowRootInit = {
    mode: "open" as ShadowRootMode,
    delegatesFocus: true,
  };

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
   */
  @property({ type: Boolean }) disabled = false;

  /**
   * Makes the field read-only (non-editable).
   */
  @property({ type: Boolean }) readonly = false;

  /**
   * Sets the invalid state and updates `aria-invalid`.
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
   * Enable the clear button when not blank.
   */
  @property({ attribute: 'clearable', type: Boolean, reflect: true }) clearable = false;

  // Internal state / refs

  @state() private _hasStart = false;
  @state() private _hasEnd = false;
  @state() private _hasErrorSlot = false;
  @state() private _showClear = false;
  @state() private _inputId = `kds-input-${++uid}`;

  @query('.native-input') private _native!: HTMLInputElement;

  private hadUserInteraction = false;

  // Public methods

  focus() { this._native?.focus(); }
  blur() { this._native?.blur(); }
  select() { this._native?.select(); }

  // Event handlers

  private handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this._showClear = !!this.value;
    this.dispatchEvent(new CustomEvent("kds-input", {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  };

  private handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this._showClear = !!this.value;
    this.dispatchEvent(new CustomEvent("kds-change", {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
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

    this.dispatchEvent(new CustomEvent("kds-input", { detail: { value: this.value }, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent("kds-change", { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  private onSlotChange = (slot: HTMLSlotElement, setter: (v: boolean) => void) =>
    setter(slot.assignedElements().length > 0);

  render() {
    const inputClasses = {
      input: true,
      invalid: this.invalid,
      'has-start': this._hasStart,
      'has-end': this._hasEnd,
      'user-interacted': this.hadUserInteraction
    };

    return html`
      <label id="label" for=${this._inputId}>${this.label}</label>

      <div class=${classMap(inputClasses)}>
        <slot
          name="start"
          @slotchange=${(e: Event) =>
        this.onSlotChange(e.target as HTMLSlotElement, v => (this._hasStart = v))}
        ></slot>

        <input
          class="native-input"
          id=${this._inputId}
          type=${ifDefined(this.type as any)}
          name=${ifDefined(this.name)}
          .value=${live(this.value)}
          placeholder=${ifDefined(this.placeholder)}
          ?required=${this.required}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          autocomplete=${ifDefined(this.autocomplete as any)}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          step=${ifDefined(this.step as any)}
          maxLength=${ifDefined(this.maxlength as any)}
          minLength=${ifDefined(this.minlength as any)}
          pattern=${ifDefined(this.pattern)}
          aria-invalid=${this.invalid ? "true" : "false"}
          @input=${this.handleInput}
          @change=${this.handleChange}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
        />

        ${this.clearable && this._showClear && !this.disabled && !this.readonly ? html`
          <button
          type="button"
          class="clear-btn"
          aria-label="Clear input"
          @click=${() => this.handleClearClick()}
          >✕</button>
          ` : null}

                  <slot
                    name="end"
                    @slotchange=${(e: Event) =>
        this.onSlotChange(e.target as HTMLSlotElement, v => (this._hasEnd = v))}
                  ></slot>
      </div>

      ${this.invalid || this._hasErrorSlot ? html`
        <div part="error" class="error">
          ${this.errorMessage ? html`
            <div class="error-message">
              <span class="error-icon">⚠</span>
              <span class="error-text">${this.errorMessage}</span>
            </div>
          ` : html`
            <slot
              name="error"
              @slotchange=${(e: Event) =>
            this.onSlotChange(e.target as HTMLSlotElement, v => (this._hasErrorSlot = v))}
            ></slot>
          `}
        </div>
      ` : null}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kds-input": KdsInput;
  }
}
