import { LitElement, html } from "lit";
import type { PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import "./kds-alert-contextual.component.js";
import { checkboxGroupStyles } from "./kds-checkbox-group.styles.js";

/**
 * @summary A fieldset-based wrapper for grouping multiple checkbox controls.
 * @documentation https://...
 * @status beta
 * @since 1.0
 *
 * @description
 * `kds-checkbox-group` is a composite component that wraps multiple `kds-checkbox` elements into a cohesive group.
 * It uses a native `<fieldset>` for semantic grouping and automatically propagates state (size, invalid, disabled)
 * to all slotted checkbox children. This makes it ideal for presenting a set of related options where users can
 * select zero or more items independently.
 *
 * The legend element is always rendered for accessibility (fieldset requires legend), but can be visually hidden
 * using the `hide-label` attribute while remaining accessible to screen readers.
 *
 * Key features:
 * - Automatic state propagation to child checkboxes (size, invalid, disabled)
 * - Flexible layout: vertical (column) or horizontal (row) with customizable gaps
 * - Built-in error and help text with proper ARIA associations
 * - Native fieldset disabled support cascades to all child controls
 * - Responsive to slot content changes with automatic updates
 * - Required legend for semantic HTML with optional visual hiding
 * - Multiple selection support (zero or more items can be checked)
 *
 * @slot legend - Custom legend content (used when `label` property is absent)
 * @slot - Default slot for grouped checkbox controls
 * @slot help-text - Helper text displayed below the group for additional guidance
 *
 * @cssprop --mod-checkbox-group-gap - Gap size between checkboxes (uses token fallback)
 * @cssprop --mod-legend-color - Legend text color
 * @cssprop --mod-legend-font-size - Legend font size
 *
 * @example
 * ```html
 * <kds-checkbox-group label="Select your interests">
 *   <kds-checkbox name="interests" value="sports">Sports</kds-checkbox>
 *   <kds-checkbox name="interests" value="music">Music</kds-checkbox>
 *   <kds-checkbox name="interests" value="reading">Reading</kds-checkbox>
 * </kds-checkbox-group>
 * ```
 *
 * @example
 * ```html
 * <kds-checkbox-group
 *   label="Required Agreements"
 *   required
 *   error-message="You must agree to all terms"
 *   help-text="Please read carefully">
 *   <kds-checkbox name="terms" value="privacy">I agree to the Privacy Policy</kds-checkbox>
 *   <kds-checkbox name="terms" value="service">I agree to the Terms of Service</kds-checkbox>
 * </kds-checkbox-group>
 * ```
 */

/** @internal Global counter for generating unique IDs */
let uid = 0;

@customElement("kds-checkbox-group")
export class KdsCheckboxGroup extends LitElement {
  static styles = checkboxGroupStyles;
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

  /**
   * Text label rendered as the fieldset legend.
   */
  @property({ type: String }) label?: string;

  /**
   * Helper text displayed below the group.
   */
  @property({ type: String, attribute: "help-text" }) helpText?: string;

  /**
   * Error message shown when invalid.
   */
  @property({ type: String, attribute: "error-message" }) errorMessage?: string;

  /**
   * Marks the group as required.
   */
  @property({ type: Boolean, reflect: true }) required = false;

  /**
   * Visually hides the legend while keeping it accessible to screen readers.
   */
  @property({ type: Boolean, attribute: "hide-label" }) hideLabel = false;

  /**
   * Controls the size of the checkboxes in the group.
   * - `sm`: Small
   * - `md`: Medium (default)
   */
  @property({ reflect: true })
  size: "sm" | "md" = "md";

  /**
   * Whether the group is in an invalid state.
   */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /**
   * Disables all child checkboxes in the group.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Layout direction for the group.
   */
  @property({ reflect: true })
  direction: "row" | "column" = "column";

  /**
   * Gap size between grouped checkboxes.
   */
  @property({ reflect: true })
  gap: "xs" | "sm" | "md" | "lg" = "md";

  /**
   * The values of all checked checkboxes in the group.
   */
  @property({ type: Array }) value: string[] = [];

  // Internal state

  /** @internal Tracks whether help-text slot has assigned content */
  @state() private _hasHelpContent = false;

  /** @internal Unique ID for the legend element */
  private _legendId = `kds-checkbox-group-legend-${++uid}`;

  /** @internal Unique ID for the help text element */
  private _helpTextId = `kds-checkbox-group-help-${++uid}`;

  /** @internal Unique ID for the error element */
  private _errorId = `kds-checkbox-group-error-${++uid}`;

  protected firstUpdated() {
    this._hasHelpContent = this.querySelector('[slot="help-text"]') !== null;
    this.updateSlottedElements();
  }

  protected updated(changedProperties: PropertyValues) {
    if (changedProperties.has('size') || changedProperties.has('invalid') || changedProperties.has('disabled')) {
      this.updateSlottedElements();
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('kds-change', this.handleCheckboxChange as EventListener);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('kds-change', this.handleCheckboxChange as EventListener);
  }

  /**
   * Propagates the group's size, invalid, and disabled state to all slotted checkboxes.
   */
  private updateSlottedElements() {
    const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
    if (!slot) return;

    const assignedElements = slot.assignedElements();
    assignedElements.forEach(element => {
      if (element.tagName?.toLowerCase() !== 'kds-checkbox') return;

      const checkbox = element as any;
      if ('size' in checkbox) checkbox.size = this.size;
      if ('invalid' in checkbox) checkbox.invalid = this.invalid;
      if ('disabled' in checkbox && this.disabled) checkbox.disabled = this.disabled;
    });
  }

  /**
   * Handles slot content changes.
   */
  private handleSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    const assignedElements = slot.assignedElements();

    if (slot.name === 'help-text') {
      this._hasHelpContent = assignedElements.length > 0;
    }

    this.updateSlottedElements();
  };

  /**
   * Handles checkbox change events and tracks group values.
   */
  private handleCheckboxChange = (event: CustomEvent) => {
    const target = event.target as any;

    if (target.tagName?.toLowerCase() !== 'kds-checkbox') {
      return;
    }

    // Update value array
    this.updateGroupValue();

    // Emit group-level change event
    this.dispatchEvent(
      new CustomEvent("kds-change", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  };

  /**
   * Updates the group's value array from checked checkboxes.
   */
  private updateGroupValue() {
    const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
    if (!slot) {
      this.value = [];
      return;
    }

    const checkboxes = slot.assignedElements().filter(el =>
      el.tagName?.toLowerCase() === 'kds-checkbox'
    );

    this.value = checkboxes
      .filter((checkbox: any) => checkbox.checked)
      .map((checkbox: any) => checkbox.value);

    this.internals.setFormValue(JSON.stringify(this.value));
  }

  /**
   * Checks validity of the group.
   * For now, basic implementation. Can be extended for min/max selection requirements.
   */
  checkValidity(): boolean {
    if (this.required && this.value.length === 0) {
      this.invalid = true;
      this.internals.setValidity(
        { valueMissing: true },
        "Please select at least one option"
      );
      return false;
    }

    this.invalid = false;
    this.internals.setValidity({});
    return true;
  }

  /**
   * Reports validity and shows validation message if invalid.
   */
  reportValidity(): boolean {
    return this.checkValidity();
  }

  /**
   * Called when a containing fieldset is disabled.
   */
  formDisabledCallback(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.updateSlottedElements();
  }

  /**
   * Called when the form is reset.
   */
  formResetCallback() {
    const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
    if (!slot) return;

    const checkboxes = slot.assignedElements().filter(el =>
      el.tagName?.toLowerCase() === 'kds-checkbox'
    );

    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = false;
      checkbox.indeterminate = false;
    });

    this.value = [];
    this.internals.setFormValue(JSON.stringify(this.value));
  }

  render() {
    const hasHelpText = !!this.helpText || this._hasHelpContent;

    const groupClasses = {
      group: true,
      [this.size]: true,
      [this.direction]: true,
      [this.gap]: true,
      invalid: this.invalid
    };

    const legendClasses = {
      legend: true,
      'sr-only': this.hideLabel
    };

    const describedByIds: string[] = [];
    if (hasHelpText) describedByIds.push(this._helpTextId);
    if (this.invalid && this.errorMessage) describedByIds.push(this._errorId);
    const ariaDescribedBy = describedByIds.length > 0 ? describedByIds.join(' ') : undefined;

    return html`
      <fieldset
        class="fieldset"
        ?disabled=${this.disabled}
        aria-invalid=${this.invalid ? 'true' : 'false'}
        aria-describedby=${ifDefined(ariaDescribedBy)}
      >
        <legend id=${this._legendId} class=${classMap(legendClasses)}>
          ${this.label ? this.label : html`<slot name="legend"></slot>`}
        </legend>

        <div class=${classMap(groupClasses)}>
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>

        ${this.invalid && this.errorMessage ? html`
          <div class="error-block" id=${this._errorId}>
            <kds-alert-contextual status="negative" size="sm">${this.errorMessage}</kds-alert-contextual>
          </div>
        ` : ''}

        ${hasHelpText ? html`
          <div class="help-text-wrapper" id=${this._helpTextId}>
            ${this.helpText ? html`<span class="help-text">${this.helpText}</span>` : html`<slot name="help-text" @slotchange=${this.handleSlotChange}></slot>`}
          </div>
        ` : ''}
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kds-checkbox-group": KdsCheckboxGroup;
  }
}
