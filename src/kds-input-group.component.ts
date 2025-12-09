import { LitElement, html } from "lit";
import type { PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import "./kds-alert-contextual.component.js";
import { inputGroupStyles } from "./kds-input-group.styles.js";

/**
 * @summary A fieldset-based wrapper for combining inputs with buttons, selects, or other components.
 * @documentation URL
 * @status beta
 * @since 1.0
 *
 * @description
 * `kds-input-group` is a composite component that wraps multiple form controls into a cohesive unit.
 * It uses a native `<fieldset>` for semantic grouping and automatically propagates state (size, invalid, disabled)
 * to all slotted child components. This makes it ideal for building input combos like search boxes with buttons,
 * inputs with prefix/suffix selects, or any scenario where multiple controls should act as a unified group.
 *
 * The legend element is always rendered for accessibility (fieldset requires legend), but can be visually hidden
 * using the `hide-label` attribute while remaining accessible to screen readers.
 *
 * Key features:
 * - Automatic state propagation to child components (size, invalid, disabled)
 * - Flexible layout: place any number of controls in the default slot in sequence
 * - Built-in error and help text with proper ARIA associations
 * - Native fieldset disabled support cascades to all child controls
 * - Responsive to slot content changes with automatic updates
 * - Required legend for semantic HTML with optional visual hiding
 *
 * @slot legend - Custom legend content (used when `label` property is absent)
 * @slot - Default slot for grouped form controls (order determines visual shaping)
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
 * @csspart group - The flex row wrapper for all controls (unchanged)
 * @csspart error - Container for error message
 * @csspart help-text - Container for help text
 *
 * @example
 * ```html
 * <!-- Search input with button -->
 * <kds-input-group label="Search" size="md">
 *   <kds-text-input placeholder="Enter search term"></kds-text-input>
 *   <kds-button slot="end" variant="primary">Search</kds-button>
 * </kds-input-group>
 * ```
 *
 * @example
 * ```html
 * <!-- Input with prefix select and suffix button -->
 * <kds-input-group label="Phone Number" required>
 *   <select slot="start">
 *     <option>+1</option>
 *     <option>+44</option>
 *   </select>
 *   <kds-text-input type="tel"></kds-text-input>
 *   <kds-button slot="end" variant="secondary">Verify</kds-button>
 * </kds-input-group>
 * ```
 *
 * @example
 * ```html
 * <!-- Visually hidden legend (accessible to screen readers) -->
 * <kds-input-group label="Search" hide-label>
 *   <kds-text-input placeholder="Search..."></kds-text-input>
 *   <kds-button slot="end" variant="primary">Go</kds-button>
 * </kds-input-group>
 * ```
 */

/** @internal Global counter for generating unique IDs */
let uid = 0;

@customElement("kds-input-group")
export class KdsInputGroup extends LitElement {
  static styles = inputGroupStyles;
  static shadowRootOptions: ShadowRootInit = {
    mode: "open" as ShadowRootMode,
    delegatesFocus: true,
  };

  /**
   * Text label rendered as the fieldset legend.
   */
  @property({ type: String }) label?: string;

  /**
   * Helper text displayed below the group.
   * Can also be provided via the `help-text` slot.
   */
  @property({ type: String, attribute: "help-text" }) helpText?: string;

  /**
   * Error message shown below the group when invalid (if no `error` slot provided).
   */
  @property({ type: String, attribute: "error-message" }) errorMessage?: string;

  /**
   * Marks the group as required, showing a required indicator on the legend.
   */
  @property({ type: Boolean, reflect: true }) required = false;

  /**
   * Visually hides the legend while keeping it accessible to screen readers.
   * Uses the sr-only pattern (position: absolute with 1px dimensions).
   */
  @property({ type: Boolean, attribute: 'hide-label' }) hideLabel = false;

  /**
   * Controls the size of the group, affecting all child components.
   *
   * - `sm`: Small
   * - `md`: Medium (default)
   */
  @property({ reflect: true })
  size: "sm" | "md" = "md";

  /**
   * Whether the group is in an invalid state.
   * This will be applied to all child components and shows error styling.
   */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /**
   * Disables all child form controls in the group.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Layout direction for the group. Use 'column' for radio/checkbox groups.
   */
  @property({ reflect: true })
  direction: "row" | "column" = "row";

  /**
   * Gap size between grouped elements.
   */
  @property({ reflect: true })
  gap: "none" | "sm" | "md" | "lg" = "md";

  /**
   * The value of the selected radio (for radio groups).
   * Automatically tracks which radio is checked.
   */
  @property({ type: String })
  value?: string;

  // Internal state

  /* Removed start/end slot tracking in refactor: single default slot now */

  /** @internal Tracks whether help-text slot has assigned content */
  @state() private _hasHelpContent = false;

  /** @internal Unique ID for the legend element, used for accessibility */
  private _legendId = `kds-input-group-legend-${++uid}`;

  /** @internal Unique ID for the help text element, used for aria-describedby */
  private _helpTextId = `kds-input-group-help-${++uid}`;

  /** @internal Unique ID for the error element, used for aria-describedby */
  private _errorId = `kds-input-group-error-${++uid}`;

  /**
   * Lifecycle: Called after the component renders for the first time.
   * Ensures slotted elements receive initial property values (size, invalid, disabled).
   */
  protected firstUpdated() {
    // Capture any pre-rendered slotted help content so the wrapper renders immediately
    this._hasHelpContent = this.querySelector('[slot="help-text"]') !== null;
    this.updateSlottedElements();
  }

  /**
   * Lifecycle: Called after any property changes and re-render.
   * Propagates size, invalid, and disabled state to slotted child components.
   *
   * @param changedProperties - Map of changed properties and their previous values
   */
  protected updated(changedProperties: PropertyValues) {
    if (changedProperties.has('size') || changedProperties.has('invalid') || changedProperties.has('disabled')) {
      this.updateSlottedElements();
    }

    // Update radio tabindex when value changes
    if (changedProperties.has('value')) {
      this.updateRadioTabIndexes();
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    // Listen for radio change events
    this.addEventListener('kds-change', this.handleRadioChange as EventListener);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('kds-change', this.handleRadioChange as EventListener);
  }

  /**
   * Propagates the group's size, invalid, and disabled state to all slotted elements.
   * This ensures child components (like inputs, buttons, selects) inherit the group's state.
   *
   * Only updates properties that exist on each slotted element (duck typing approach).
   */
  private updateSlottedElements() {
    const slots = this.shadowRoot?.querySelectorAll('slot');
    slots?.forEach(slot => {
      const assignedElements = slot.assignedElements();
      assignedElements.forEach(element => {
        // Apply size to all slotted elements that support it
        if ('size' in element && this.size) {
          (element as any).size = this.size;
        }

        // Apply invalid state to form control elements
        if ('invalid' in element) {
          (element as any).invalid = this.invalid;
        }

        // Apply disabled state to form control elements
        if ('disabled' in element && this.disabled) {
          (element as any).disabled = this.disabled;
        }

        // Hide labels on text inputs inside group (legend provides the label context)
        if (element.tagName === 'KDS-TEXT-INPUT') {
          (element as any).hideLabel = true;
        }
      });
    });
  }

  /**
   * Handles slot content changes.
   * Propagates properties to newly slotted elements and updates border radius.
   */
  private handleSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    const assignedElements = slot.assignedElements();
    if (slot.name === 'help-text') {
      this._hasHelpContent = assignedElements.length > 0;
    }
    assignedElements.forEach(element => {
      if ('size' in element && this.size) (element as any).size = this.size;
      if ('invalid' in element) (element as any).invalid = this.invalid;
      if ('disabled' in element && this.disabled) (element as any).disabled = this.disabled;
      if (element.tagName === 'KDS-TEXT-INPUT') (element as any).hideLabel = true;
    });

    // Update radio state when slots change
    this.updateRadioTabIndexes();
  };

  /**
   * Handles radio button change events for coordinating radio groups.
   */
  private handleRadioChange = (event: CustomEvent) => {
    const target = event.target as any;

    // Only handle radio events
    if (target.tagName?.toLowerCase() !== 'kds-radio') {
      return;
    }

    // Update value and emit group change event
    this.value = event.detail.value;

    // Update checked state of all radios in group
    this.getRadios().forEach(radio => {
      radio.checked = radio.value === this.value;
    });

    this.updateRadioTabIndexes();

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
   * Only one radio should be tabbable at a time.
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
   * Renders the input group component.
   *
   * Structure:
   * - fieldset wrapper for semantic grouping and native disabled support
   * - legend (if provided via property or slot)
   * - group container with start/main/end slots for flexible layouts
   * - error message (if invalid and error content provided)
   * - help text (if provided)
   *
   * Accessibility features:
   * - aria-invalid reflects invalid state
   * - aria-describedby links to help text and/or error message
   * - native fieldset disabled attribute cascades to all form controls
   * - unique IDs generated for legend, help text, and error elements
   */
  render() {
    const hasError = this.invalid && this.errorMessage;
    const hasHelpText = !!this.helpText || this._hasHelpContent;

    const groupClasses = {
      group: true,
      [this.size]: true,
      invalid: this.invalid
    };

    const legendClasses = {
      legend: true,
      'sr-only': this.hideLabel
    };

    // Build aria-describedby from available help/error text
    const describedByIds: string[] = [];
    if (hasHelpText) describedByIds.push(this._helpTextId);
    if (hasError) describedByIds.push(this._errorId);
    const ariaDescribedBy = describedByIds.length > 0 ? describedByIds.join(' ') : undefined;

    return html`
      <fieldset
        part="fieldset"
        class="fieldset"
        ?disabled=${this.disabled}
        aria-invalid=${this.invalid ? 'true' : 'false'}
        aria-describedby=${ifDefined(ariaDescribedBy)}
      >
        <legend part="legend" id=${this._legendId} class=${classMap(legendClasses)}>
          ${this.label ? this.label : html`<slot name="legend"></slot>`}
        </legend>

        <div part="group" class=${classMap(groupClasses)}>
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>

        ${this.invalid ? html`
          <div part="error" class="error-block" id=${this._errorId}>
            ${this.errorMessage ? html`
              <kds-alert-contextual status="negative" size="sm">${this.errorMessage}</kds-alert-contextual>
            ` : html`<slot name="error"></slot>`}
          </div>
        ` : null}

        ${ (hasHelpText || this._hasHelpContent) ? html`
          <div part="help-text" class="help-text-wrapper" id=${this._helpTextId}>
            ${this.helpText ? html`<span class="help-text">${this.helpText}</span>` : html`<slot name="help-text" @slotchange=${this.handleSlotChange}></slot>`}
          </div>
        ` : null }
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kds-input-group": KdsInputGroup;
  }
}
