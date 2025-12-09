import { LitElement, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import "./kds-alert-contextual.component.js";
import { radioStyles } from "./kds-radio.styles.js";

/** @internal Global counter for generating unique IDs */
let uid = 0;

/**
 * @summary A radio button input with label, error, and help text support
 * @documentation https://example.com/docs/radio
 * @status beta
 * @since 1.0
 *
 * @description
 * A fully accessible radio button component with form association support. Extends native radio
 * functionality with custom styling, validation, and comprehensive error/help text handling.
 * Radio buttons should be used in groups where only one option can be selected at a time.
 *
 * @slot - Default slot for radio label text
 * @slot help-text - Optional help text shown below the radio
 * @slot error-message - Error message shown when invalid
 *
 * @event change - Fired when the radio is selected (native event)
 * @event input - Fired when the radio is toggled (native event)
 * @event kds-change - Fired when radio is selected. Detail: { checked: boolean, value: string }
 * @event kds-focus - Fired when radio receives focus
 * @event kds-blur - Fired when radio loses focus
 *
 * @cssprop --mod-radio-size - Size of the radio indicator
 * @cssprop --mod-radio-color - Color of the checked indicator
 * @cssprop --mod-radio-border-color - Border color of the radio
 * @cssprop --mod-radio-background - Background color when checked
 *
 * @example
 * ```html
 * <kds-radio name="color" value="red" checked>Red</kds-radio>
 * <kds-radio name="color" value="blue">Blue</kds-radio>
 * <kds-radio name="color" value="green">Green</kds-radio>
 *
 * <kds-radio
 *   name="plan"
 *   value="premium"
 *   help-text="Includes all features"
 *   required>
 *   Premium Plan
 * </kds-radio>
 * ```
 */
@customElement("kds-radio")
export class KdsRadio extends LitElement {
  static styles = radioStyles;
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

  @state() private _helpTextId = `kds-radio-help-${++uid}`;
  @state() private _errorId = `kds-radio-error-${++uid}`;
  @state() private _inputId = `kds-radio-${++uid}`;

  /**
   * The name of the radio button, submitted as a name/value pair with form data.
   * All radios in a group must share the same name.
   */
  @property({ type: String })
  name?: string;

  /**
   * The value of the radio button, submitted with the name when selected.
   */
  @property({ type: String })
  value = "";

  /**
   * Whether the radio is checked.
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * The radio's size.
   */
  @property({ reflect: true })
  size: "sm" | "md" = "md";

  /**
   * Disables the radio.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Makes the radio a required field (when in a group, at least one must be selected).
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Indicates the radio is in an invalid state.
   */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /**
   * The radio's help text. Alternatively, use the help-text slot.
   */
  @property({ type: String, attribute: "help-text" })
  helpText?: string;

  /**
   * The radio's error message. Alternatively, use the error-message slot.
   */
  @property({ type: String, attribute: "error-message" })
  errorMessage?: string;

  override connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      this.updateValidity();
    });
  }

  protected override updated(changed: Map<PropertyKey, unknown>) {
    if (changed.has("checked")) {
      this.internals.setFormValue(this.checked ? this.value : null);
      this.updateValidity();
    }

    const validityAffecting = ["required", "checked"] as const;
    if (validityAffecting.some((prop) => changed.has(prop))) {
      this.updateValidity();
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
      radio: true,
      [this.size]: true,
      checked: this.checked,
      invalid: this.invalid,
      disabled: this.disabled,
    };

    return html`
      <div class=${classMap(classes)}>
        <label class="label">
          <input
            class="native-input"
            id=${this._inputId}
            type="radio"
            name=${ifDefined(this.name)}
            value=${this.value}
            .checked=${live(this.checked)}
            ?disabled=${this.disabled}
            ?required=${this.required}
            aria-describedby=${ifDefined(ariaDescribedBy)}
            aria-invalid=${this.invalid ? "true" : "false"}
            @change=${this.handleChange}
            @input=${this.handleInput}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          />
          <slot></slot>
        ${this.invalid && hasErrorMessage
          ? html`
              <div
                class="error-block"
                id=${this._errorId}
                role="alert"
              >
                ${this.errorMessage
                  ? html`
                      <kds-alert-contextual status="negative" size="sm">${this.errorMessage}</kds-alert-contextual>
                    `
                  : html`
                      <slot name="error-message"></slot>
                    `}
              </div>
            `
          : null}
        ${hasHelpText
          ? html`
              <div class="help-text" id=${this._helpTextId}>
                <slot name="help-text">${this.helpText}</slot>
              </div>
            `
          : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kds-radio": KdsRadio;
  }
}
