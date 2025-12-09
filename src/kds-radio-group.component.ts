import { LitElement, html } from "lit";
import type { PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import "./kds-alert-contextual.component.js";
import { radioGroupStyles } from "./kds-radio-group.styles.js";

/**
 * @summary A fieldset-based wrapper for grouping multiple radio controls.
 * @documentation https://...
 * @status beta
 * @since 1.0
 *
 * @description
 * `kds-radio-group` is a composite component that wraps multiple `kds-radio` elements into a cohesive group.
 * It uses a native `<fieldset>` for semantic grouping and automatically propagates state (size, invalid, disabled)
 * to all slotted radio children. This enforces single-selection behavior across the group (only one radio can
 * be checked at a time), making it ideal for presenting a set of mutually exclusive options.
 *
 * The legend element is always rendered for accessibility (fieldset requires legend), but can be visually hidden
 * using the `hide-label` attribute while remaining accessible to screen readers.
 *
 * Key features:
 * - Automatic state propagation to child radios (size, invalid, disabled)
 * - Flexible layout: vertical (column) or horizontal (row) with customizable gaps
 * - Built-in error and help text with proper ARIA associations
 * - Native fieldset disabled support cascades to all child controls
 * - Single selection enforcement: only one radio can be checked at a time
 * - Responsive to slot content changes with automatic updates
 * - Required legend for semantic HTML with optional visual hiding
 * - Roving tabindex for keyboard navigation (Arrow keys move between options)
 *
 * @slot legend - Custom legend content (used when `label` property is absent)
 * @slot - Default slot for grouped radio controls
 * @slot help-text - Helper text displayed below the group for additional guidance
 *
 * @cssprop --mod-radio-group-gap - Gap size between radios (uses token fallback)
 * @cssprop --mod-legend-color - Legend text color
 * @cssprop --mod-legend-font-size - Legend font size
 *
 * @example
 * ```html
 * <kds-radio-group label="Choose a size">
 *   <kds-radio name="size" value="small">Small</kds-radio>
 *   <kds-radio name="size" value="medium" checked>Medium</kds-radio>
 *   <kds-radio name="size" value="large">Large</kds-radio>
 * </kds-radio-group>
 * ```
 *
 * @example
 * ```html
 * <kds-radio-group
 *   label="Account Type"
 *   required
 *   error-message="Please select an account type"
 *   help-text="Choose the option that best fits your needs">
 *   <kds-radio name="account" value="personal">Personal Account</kds-radio>
 *   <kds-radio name="account" value="business">Business Account</kds-radio>
 * </kds-radio-group>
 * ```
 */

/** @internal Global counter for generating unique IDs */
let uid = 0;

@customElement("kds-radio-group")
export class KdsRadioGroup extends LitElement {
  static styles = radioGroupStyles;
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
   * Controls the size of the radios in the group.
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
   * Disables all child radios in the group.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Layout direction for the group.
   */
  @property({ reflect: true })
  direction: "row" | "column" = "column";

  /**
   * Gap size between grouped radios.
   */
  @property({ reflect: true })
  gap: "xs" | "sm" | "md" | "lg" = "md";

  /**
   * The value of the selected radio in the group.
   */
  @property({ type: String })
  value: string = "";

  // Internal state

  /** @internal Tracks whether help-text slot has assigned content */
  @state() private _hasHelpContent = false;

  /** @internal Unique ID for the legend element */
  private _legendId = `kds-radio-group-legend-${++uid}`;

  /** @internal Unique ID for the help text element */
  private _helpTextId = `kds-radio-group-help-${++uid}`;

  /** @internal Unique ID for the error element */
  private _errorId = `kds-radio-group-error-${++uid}`;

  protected firstUpdated() {
    this._hasHelpContent = this.querySelector('[slot="help-text"]') !== null;
    this.updateSlottedElements();
    this.updateRadioTabIndexes();
  }

  protected updated(changedProperties: PropertyValues) {
    if (changedProperties.has('size') || changedProperties.has('invalid') || changedProperties.has('disabled')) {
      this.updateSlottedElements();
    }

    if (changedProperties.has('value')) {
      this.updateRadioTabIndexes();
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('kds-change', this.handleRadioChange as EventListener);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('kds-change', this.handleRadioChange as EventListener);
  }

  /**
   * Propagates the group's size, invalid, and disabled state to all slotted radios.
   */
  private updateSlottedElements() {
    const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
    if (!slot) return;

    const assignedElements = slot.assignedElements();
    assignedElements.forEach(element => {
      if (element.tagName?.toLowerCase() !== 'kds-radio') return;

      const radio = element as any;
      if ('size' in radio) radio.size = this.size;
      if ('invalid' in radio) radio.invalid = this.invalid;
      if ('disabled' in radio && this.disabled) radio.disabled = this.disabled;
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

    assignedElements.forEach(element => {
      if (element.tagName?.toLowerCase() !== 'kds-radio') return;
      const radio = element as any;
      if ('size' in radio) radio.size = this.size;
      if ('invalid' in radio) radio.invalid = this.invalid;
      if ('disabled' in radio && this.disabled) radio.disabled = this.disabled;
    });

    this.updateRadioTabIndexes();
  };

  /**
   * Handles radio change events and maintains single selection.
   */
  private handleRadioChange = (event: CustomEvent) => {
    const target = event.target as any;

    if (target.tagName?.toLowerCase() !== 'kds-radio') {
      return;
    }

    // Update value and sync all radios
    this.value = event.detail.value;

    const radios = this.getRadios();
    radios.forEach(radio => {
      radio.checked = radio.value === this.value;
    });

    this.updateRadioTabIndexes();
    this.internals.setFormValue(this.value);

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
   * Gets all radio buttons in the default slot.
   */
  private getRadios(): any[] {
    const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
    if (!slot) return [];

    return slot.assignedElements().filter(el =>
      el.tagName?.toLowerCase() === 'kds-radio'
    );
  }

  /**
   * Implements roving tabindex for radio button keyboard navigation.
   * Only one radio should be tabbable at a time (the checked one, or first if none checked).
   */
  private updateRadioTabIndexes() {
    const radios = this.getRadios();
    if (radios.length === 0) return;

    // Find checked radio or default to first
    let focusableIndex = 0;
    if (this.value) {
      const checkedIndex = radios.findIndex(r => r.value === this.value);
      if (checkedIndex !== -1) focusableIndex = checkedIndex;
    }

    // Set tabindex: 0 for focusable radio, -1 for others
    radios.forEach((radio, index) => {
      radio.tabIndex = index === focusableIndex ? 0 : -1;
    });
  }

  /**
   * Checks validity of the group.
   */
  checkValidity(): boolean {
    if (this.required && !this.value) {
      this.invalid = true;
      this.internals.setValidity(
        { valueMissing: true },
        "Please select an option"
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

    const radios = slot.assignedElements().filter(el =>
      el.tagName?.toLowerCase() === 'kds-radio'
    );

    radios.forEach((radio: any) => {
      radio.checked = false;
    });

    this.value = "";
    this.internals.setFormValue("");
    this.updateRadioTabIndexes();
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
    "kds-radio-group": KdsRadioGroup;
  }
}
