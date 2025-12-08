import { LitElement, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { checkboxStyles } from "./kds-checkbox.styles.js";

/** @internal Global counter for generating unique IDs */
let uid = 0;

/**
 * @summary A checkbox input with label, error, and help text support
 * @documentation https://example.com/docs/checkbox
 * @status beta
 * @since 1.0
 *
 * @description
 * A fully accessible checkbox component with form association support. Extends native checkbox
 * functionality with custom styling, validation, three-state support (indeterminate), and
 * comprehensive error/help text handling. Can be used standalone or within `kds-input-group`.
 *
 * @slot - Default slot for checkbox label text
 * @slot help-text - Optional help text shown below the checkbox
 * @slot error-message - Error message shown when invalid
 *
 * @event change - Fired when the checked state changes (native event)
 * @event input - Fired when the checkbox is toggled (native event)
 * @event kds-change - Fired when checked state changes. Detail: { checked: boolean, value: string }
 * @event kds-focus - Fired when checkbox receives focus
 * @event kds-blur - Fired when checkbox loses focus
 *
 * @cssprop --mod-checkbox-size - Size of the checkbox indicator
 * @cssprop --mod-checkbox-color - Color of the checked indicator
 * @cssprop --mod-checkbox-border-color - Border color of the checkbox
 * @cssprop --mod-checkbox-background - Background color when checked
 * @cssprop --mod-checkbox-border-radius - Border radius of the checkbox
 *
 * @csspart base - The root container element
 * @csspart control - The checkbox control wrapper
 * @csspart input - The native input element
 * @csspart indicator - The custom checkbox indicator
 * @csspart label - The label text container
 * @csspart help-text - The help text container
 * @csspart error-message - The error message container
 *
 * @example
 * ```html
 * <kds-checkbox name="terms" value="accepted" required>
 *   I agree to the terms and conditions
 * </kds-checkbox>
 *
 * <kds-checkbox
 *   name="newsletter"
 *   value="yes"
 *   help-text="We'll send you monthly updates"
 *   checked>
 *   Subscribe to newsletter
 * </kds-checkbox>
 * ```
 */
@customElement("kds-checkbox")
export class KdsCheckbox extends LitElement {
  static styles = checkboxStyles;
  static formAssociated = true;

  static shadowRootOptions: ShadowRootInit = {
    mode: "open" as ShadowRootMode,
    delegatesFocus: true,
  };

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  @query(".native-input") private _native!: HTMLInputElement;

  @state() private _helpTextId = `kds-checkbox-help-${++uid}`;
  @state() private _errorId = `kds-checkbox-error-${++uid}`;
  @state() private _inputId = `kds-checkbox-${++uid}`;

  /**
   * The name of the checkbox, submitted as a name/value pair with form data.
   */
  @property({ type: String })
  name?: string;

  /**
   * The value of the checkbox, submitted with the name when the checkbox is checked.
   */
  @property({ type: String })
  value = "on";

  /**
   * Whether the checkbox is checked.
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * The checkbox's size.
   */
  @property({ reflect: true })
  size: "sm" | "md" = "md";

  /**
   * Disables the checkbox.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Makes the checkbox a required field.
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Indicates the checkbox is in an invalid state.
   */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /**
   * Puts the checkbox in an indeterminate state (neither checked nor unchecked).
   */
  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  /**
   * The checkbox's help text. Alternatively, use the help-text slot.
   */
  @property({ type: String, attribute: "help-text" })
  helpText?: string;

  /**
   * The checkbox's error message. Alternatively, use the error-message slot.
   */
  @property({ type: String, attribute: "error-message" })
  errorMessage?: string;

  override connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      this.updateValidity();
    });
  }

  protected override firstUpdated() {
    this.updateIndeterminate();
  }

  protected override updated(changed: Map<PropertyKey, unknown>) {
    if (changed.has("checked")) {
      this.internals.setFormValue(this.checked ? this.value : null);
      this.updateValidity();

      // Clear indeterminate when checked state changes
      if (this.indeterminate) {
        this.indeterminate = false;
      }
    }

    if (changed.has("indeterminate")) {
      this.updateIndeterminate();
    }

    const validityAffecting = ["required", "checked"] as const;
    if (validityAffecting.some((prop) => changed.has(prop))) {
      this.updateValidity();
    }
  }

  private updateIndeterminate() {
    if (this._native) {
      this._native.indeterminate = this.indeterminate;
    }
  }

  private handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;

    // Re-dispatch native event for framework compatibility
    this.dispatchEvent(
      new Event("change", {
        bubbles: true,
        composed: true,
      })
    );

    // Emit custom prefixed event with detail
    this.dispatchEvent(
      new CustomEvent("kds-change", {
        detail: { checked: this.checked, value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  };

  private handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;

    // Re-dispatch native event
    this.dispatchEvent(
      new Event("input", {
        bubbles: true,
        composed: true,
      })
    );
  };

  private handleFocus = () => {
    this.dispatchEvent(
      new CustomEvent("kds-focus", {
        bubbles: true,
        composed: true,
      })
    );
  };

  private handleBlur = () => {
    this.dispatchEvent(
      new CustomEvent("kds-blur", {
        bubbles: true,
        composed: true,
      })
    );
  };

  private updateValidity() {
    if (this.disabled) {
      this.internals.setValidity({}, "");
      return;
    }

    const validity = this._native?.validity;
    if (!validity) return;

    if (validity.valid) {
      this.internals.setValidity({}, "");
    } else {
      const flags: Record<string, boolean> = {};
      if (validity.valueMissing) flags.valueMissing = true;

      this.internals.setValidity(
        flags,
        this._native.validationMessage,
        this._native
      );
    }
  }

  /**
   * Checks for validity and shows the browser's validation message if invalid.
   */
  reportValidity() {
    this.updateValidity();
    return this.internals.reportValidity();
  }

  /**
   * Checks for validity but doesn't show a validation message.
   */
  checkValidity() {
    this.updateValidity();
    return this.internals.checkValidity();
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
    this.checked = this.hasAttribute("checked");
    this.indeterminate = false;
    this.updateValidity();
  }

  render() {
    const hasHelpText = this.helpText || this.querySelector('[slot="help-text"]');
    const hasErrorMessage = this.errorMessage || this.querySelector('[slot="error-message"]');

    const describedByIds: string[] = [];
    if (hasHelpText) describedByIds.push(this._helpTextId);
    if (this.invalid && hasErrorMessage) describedByIds.push(this._errorId);
    const ariaDescribedBy =
      describedByIds.length > 0 ? describedByIds.join(" ") : undefined;

    const classes = {
      checkbox: true,
      [this.size]: true,
      checked: this.checked,
      indeterminate: this.indeterminate,
      invalid: this.invalid,
      disabled: this.disabled,
    };

    return html`
      <div part="base" class=${classMap(classes)}>
        <label part="label" class="label">
          <input
            part="input"
            class="native-input"
            id=${this._inputId}
            type="checkbox"
            name=${ifDefined(this.name)}
            value=${this.value}
            .checked=${live(this.checked)}
            .indeterminate=${live(this.indeterminate)}
            ?disabled=${this.disabled}
            ?required=${this.required}
            aria-describedby=${ifDefined(ariaDescribedBy)}
            aria-invalid=${this.invalid ? "true" : "false"}
            @change=${this.handleChange}
            @input=${this.handleInput}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          />
          <span part="indicator" class="indicator">
            <svg class="checkmark" viewBox="0 0 16 16">
              <path
                class=${this.indeterminate ? "indeterminate-mark" : "check-mark"}
                d=${this.indeterminate
                  ? "M3 8 L13 8"
                  : "M3 8 L6.5 11.5 L13 4.5"}
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <slot></slot>
        </label>

        ${hasHelpText || (this.invalid && hasErrorMessage)
          ? html`
              <div
                part="describedby"
                class="describedby"
                id=${this._helpTextId}
              >
                ${hasHelpText
                  ? html`
                      <div part="help-text" class="help-text">
                        <slot name="help-text">${this.helpText}</slot>
                      </div>
                    `
                  : null}
                ${this.invalid && hasErrorMessage
                  ? html`
                      <div
                        part="error-message"
                        class="error-message"
                        id=${this._errorId}
                        role="alert"
                      >
                        <slot name="error-message">${this.errorMessage}</slot>
                      </div>
                    `
                  : null}
              </div>
            `
          : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kds-checkbox": KdsCheckbox;
  }
}
