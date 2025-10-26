import { LitElement, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { inputStyles } from "./kds-input.styles.js";

/**
 * @tag kds-input
 * @summary Accessible text input with validation and adornment slots.
 *
 * @description
 * A text field that supports host-driven sizing (`size="sm|md"`), CSS-only
 * focus indication (border color via `:focus-within`), validation states,
 * and optional slotted start/end content. Emits high-level events for input,
 * change, focus, and blur. Designed for tokenized theming via CSS variables.
 *
 * @example
 * ```html
 * <kds-input
 *   label="Email"
 *   name="email"
 *   placeholder="you@example.com"
 *   autocomplete="email"
 *   size="md">
 *   <svg slot="start" aria-hidden="true" viewBox="0 0 16 16"><!-- icon --></svg>
 * </kds-input>
 * ```
 *
 * @fires kds-input  - Fires on each keystroke with `{ value: string }`.
 * @fires kds-change - Fires on commit/blur with `{ value: string }`.
 * @fires kds-focus  - Fires when the native input gains focus `{ originalEvent: FocusEvent }`.
 * @fires kds-blur   - Fires when the native input loses focus `{ originalEvent: FocusEvent }`.
 *
 * @slot start - Leading adornment (icon, text, etc.).
 * @slot end   - Trailing adornment (icon, button, etc.).
 * @slot error - Custom error content (used when `error-message` is absent).
 *
 * @csspart error - Wrapper around the error block.
 *
 * @cssprop --mod-input-height               - Input height (default: `var(--kds-button-input-height-md)`).
 * @cssprop --mod-input-padding-inline       - Horizontal padding (default: `var(--kds-spacing-md)`).
 * @cssprop --mod-input-gap                  - Gap between adornments and field (default: `var(--kds-space-xs)`).
 * @cssprop --mod-input-color                - Text color (default: `var(--kds-fg-base)`).
 * @cssprop --mod-input-font-size            - Font size (default: `var(--kds-font-size-md)`).
 * @cssprop --mod-input-line-height          - Line height (default: `1.5`).
 * @cssprop --mod-input-border-width         - Border width (default: `var(--kds-border-width-xs)`).
 * @cssprop --mod-input-border-radius        - Border radius (default: `var(--kds-border-radius-sm)`).
 * @cssprop --mod-input-border-color         - Border color (default: `var(--kds-border-neutral-emphasis-base)`).
 * @cssprop --mod-input-border-color-hover   - Hover border color (default: `var(--kds-border-neutral-emphasis-hover)`).
 * @cssprop --mod-input-border-color-focus   - Focus border color (default: `var(--kds-border-info-emphasis-base)`).
 * @cssprop --mod-input-background-color     - Background color (default: `var(--kds-bg-surface-base)`).
 * @cssprop --mod-placeholder-color          - Placeholder color (default: `var(--kds-fg-neutral-base)`).
 * @cssprop --mod-placeholder-style          - Placeholder font-style (default: `italic`).
 * @cssprop --mod-label-color                - Label color.
 * @cssprop --mod-label-font-size            - Label font size.
 * @cssprop --mod-label-font-weight          - Label font weight.
 * @cssprop --mod-label-margin-bottom        - Label bottom margin (default: `var(--kds-spacing-2xs)`).
 *
 * @accessibility
 * - The internal `<label>` is associated with `<input>` via `for`/`id`.
 * - When `invalid` is set, `aria-invalid="true"` is applied to the input and
 *   an error message can be provided via `error-message` or the `error` slot.
 * - Focus is indicated with border color (`:focus-within`). Ensure sufficient contrast.
 */
let uid = 0;

@customElement("kds-input")
export class KdsInput extends LitElement {
  /** Component styles (CSS-only focus & host-driven sizes). */
  static styles = inputStyles;

  /** Keep native focus behavior while focusing the first focusable descendant. */
  static shadowRootOptions: ShadowRootInit = { mode: "open", delegatesFocus: true };

  // ─────────────────────────────────────────────────────────────────────────────
  // Public properties / attributes
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Current value of the input.
   * @attr value
   * @type {string}
   * @default ""
   */
  @property({ type: String }) value: string = "";

  /**
   * Placeholder text displayed when the input is empty.
   * @attr placeholder
   * @type {string}
   */
  @property({ type: String }) placeholder?: string;

  /**
   * Text label rendered above the field. Omit if you label externally.
   * @attr label
   * @type {string}
   */
  @property({ type: String }) label?: string;

  /**
   * Visual size of the control. Controls height, padding, and font-size via CSS vars.
   * @attr size
   * @type {"sm"|"md"}
   * @default "md"
   * @reflect
   */
  @property({ reflect: true }) size: "sm" | "md" = "md";

  /**
   * Native input `type` (e.g., "text", "email", "number").
   * @attr type
   * @type {HTMLInputElement['type']}
   * @default "text"
   */
  @property({ type: String }) type: HTMLInputElement["type"] = "text";

  /**
   * Native `name` for form submission.
   * @attr name
   * @type {string}
   */
  @property({ type: String }) name?: string;

  /**
   * Marks the field as required.
   * @attr required
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean }) required = false;

  /**
   * Disables the control and prevents interaction.
   * @attr disabled
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean }) disabled = false;

  /**
   * Makes the field read-only (non-editable).
   * @attr readonly
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean }) readonly = false;

  /**
   * Sets the invalid state and updates `aria-invalid`.
   * @attr invalid
   * @type {boolean}
   * @default false
   * @reflect
   */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /**
   * Error message shown below the field when invalid (if no `error` slot provided).
   * @attr error-message
   * @type {string}
   */
  @property({ type: String, attribute: "error-message" }) errorMessage?: string;

  /**
   * Native `autocomplete` hint.
   * @attr autocomplete
   * @type {HTMLInputElement['autocomplete']}
   */
  @property({ type: String }) autocomplete?: HTMLInputElement["autocomplete"];

  /**
   * Native numeric/date lower bound.
   * @attr min
   * @type {number}
   */
  @property({ type: Number }) min?: number;

  /**
   * Native numeric/date upper bound.
   * @attr max
   * @type {number}
   */
  @property({ type: Number }) max?: number;

  /**
   * Native numeric/date step increment.
   * @attr step
   * @type {number|string}
   */
  @property({ type: Number }) step?: any;

  /**
   * Native maximum length (characters).
   * @attr maxlength
   * @type {number}
   */
  @property({ attribute: "maxlength", type: Number }) maxlength?: number;

  /**
   * Native minimum length (characters).
   * @attr minlength
   * @type {number}
   */
  @property({ attribute: "minlength", type: Number }) minlength?: number;

  /**
   * Native validation pattern (regular expression string).
   * @attr pattern
   * @type {string}
   */
  @property({ type: String }) pattern?: string;

  // ─────────────────────────────────────────────────────────────────────────────
  // Internal state / refs
  // ─────────────────────────────────────────────────────────────────────────────

  /** True if the `start` slot has content. */
  @state() private _hasStart = false;

  /** True if the `end` slot has content. */
  @state() private _hasEnd = false;

  /** True if the `error` slot has content. */
  @state() private _hasErrorSlot = false;

  /** Unique id to associate `<label>` → `<input>`. */
  @state() private _inputId = `kds-input-${++uid}`;

  /** Field wrapper used by CSS for `:focus-within` visuals. */
  @query(".input") private _wrapper!: HTMLDivElement;

  /** Native input element. */
  @query("#input") private _native!: HTMLInputElement;

  // ─────────────────────────────────────────────────────────────────────────────
  // Public methods
  // ─────────────────────────────────────────────────────────────────────────────

  /** Programmatically focus the input. */
  focus() { this._native?.focus(); }

  /** Programmatically blur the input. */
  blur() { this._native?.blur(); }

  /** Select the input’s text. */
  select() { this._native?.select(); }

  // ─────────────────────────────────────────────────────────────────────────────
  // Event emitters
  // ─────────────────────────────────────────────────────────────────────────────

  private handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent("kds-input", {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  };

  private handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
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

  // ─────────────────────────────────────────────────────────────────────────────
  // Slots bookkeeping (optional, used if layout depends on presence)
  // ─────────────────────────────────────────────────────────────────────────────

  private onSlotChange = (slot: HTMLSlotElement, setter: (v: boolean) => void) =>
    setter(slot.assignedElements().length > 0);

  // ─────────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────────

  render() {
    const inputClasses = {
      input: true,
      invalid: this.invalid
    };

    return html`
      ${this.label ? html`<label for=${this._inputId}>${this.label}</label>` : null}

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
