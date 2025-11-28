import { LitElement, html } from "lit";
import type { PropertyValues } from "lit";
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
 * @description
 * `kds-input-group` is a composite component that wraps multiple form controls into a cohesive unit.
 * It uses a native `<fieldset>` for semantic grouping and automatically propagates state (size, invalid, disabled)
 * to all slotted child components. This makes it ideal for building input combos like search boxes with buttons,
 * inputs with prefix/suffix selects, or any scenario where multiple controls should act as a unified group.
 *
 * The legend element is always rendered for accessibility (fieldset requires legend), but can be visually hidden
 * using the `hide-legend` attribute while remaining accessible to screen readers.
 *
 * Key features:
 * - Automatic state propagation to child components (size, invalid, disabled)
 * - Flexible layout with start/main/end slots for custom arrangements
 * - Built-in error and help text with proper ARIA associations
 * - Native fieldset disabled support cascades to all child controls
 * - Responsive to slot content changes with automatic updates
 * - Required legend for semantic HTML with optional visual hiding
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
 *
 * @example
 * ```html
 * <!-- Search input with button -->
 * <kds-input-group legend="Search" size="md">
 *   <kds-text-input placeholder="Enter search term"></kds-text-input>
 *   <kds-button slot="end" variant="primary">Search</kds-button>
 * </kds-input-group>
 * ```
 *
 * @example
 * ```html
 * <!-- Input with prefix select and suffix button -->
 * <kds-input-group legend="Phone Number" required>
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
 * <kds-input-group legend="Search" hide-legend>
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
  @property({ type: String }) legend?: string;

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
  @property({ type: Boolean, attribute: 'hide-legend' }) hideLegend = false;

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

  // Internal state

  /** @internal Tracks whether the error slot has content */
  @state() private _hasErrorSlot = false;

  /** @internal Tracks whether the help-text slot has content */
  @state() private _hasHelpTextSlot = false;

  /** @internal Unique ID for the legend element, used for accessibility */
  @state() private _legendId = `kds-input-group-legend-${++uid}`;

  /** @internal Unique ID for the help text element, used for aria-describedby */
  @state() private _helpTextId = `kds-input-group-help-${++uid}`;

  /** @internal Unique ID for the error element, used for aria-describedby */
  @state() private _errorId = `kds-input-group-error-${++uid}`;

  /** @internal Reference to the error slot for change detection */
  @query('slot[name="error"]') private _errorSlot!: HTMLSlotElement;

  /** @internal Reference to the help-text slot for change detection */
  @query('slot[name="help-text"]') private _helpTextSlot!: HTMLSlotElement;

  /**
   * Lifecycle: Called when the component is added to the DOM.
   * Sets up slot change listeners to detect when slotted content changes.
   */
  override connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      this._errorSlot?.addEventListener('slotchange', this.handleErrorSlotChange);
      this._helpTextSlot?.addEventListener('slotchange', this.handleHelpTextSlotChange);
    });
  }

  /**
   * Lifecycle: Called when the component is removed from the DOM.
   * Cleans up slot change listeners to prevent memory leaks.
   */
  override disconnectedCallback() {
    super.disconnectedCallback();
    this._errorSlot?.removeEventListener('slotchange', this.handleErrorSlotChange);
    this._helpTextSlot?.removeEventListener('slotchange', this.handleHelpTextSlotChange);
  }

  /**
   * Lifecycle: Called after the component renders for the first time.
   * Ensures slotted elements receive initial property values (size, invalid, disabled).
   */
  protected firstUpdated() {
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
  }

  /**
   * Handles changes to the error slot.
   * Updates internal state to track whether the error slot has meaningful content.
   */
  private handleErrorSlotChange = () => {
    const nodes = this._errorSlot?.assignedNodes({ flatten: true }) || [];
    this._hasErrorSlot = nodes.some(n => n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent?.trim()));
  };

  /**
   * Handles changes to the help-text slot.
   * Updates internal state to track whether the help-text slot has meaningful content.
   */
  private handleHelpTextSlotChange = () => {
    const nodes = this._helpTextSlot?.assignedNodes({ flatten: true }) || [];
    this._hasHelpTextSlot = nodes.some(n => n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent?.trim()));
  };

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
      });
    });
  }

  /**
   * Generic slot change handler that triggers property propagation.
   * Called when any slot's content changes (start, main, end slots).
   */
  private handleSlotChange = () => {
    this.updateSlottedElements();
  };

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
    const hasError = this.invalid && (this.errorMessage || this._hasErrorSlot);
    const hasHelpText = this.helpText || this._hasHelpTextSlot;

    const groupClasses = {
      group: true,
      [this.size]: true,
      'invalid': this.invalid
    };

    const legendClasses = {
      legend: true,
      'sr-only': this.hideLegend
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
          ${this.legend ? this.legend : html`<slot name="legend"></slot>`}
        </legend>

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

        ${hasError ? html`
          <div part="error" class="error" id=${this._errorId}>
            <div class="error-message">
              <span class="error-icon" aria-hidden="true">⚠</span>
              <span class="error-text">
                ${this.errorMessage ? this.errorMessage : html`<slot name="error"></slot>`}
              </span>
            </div>
          </div>
        ` : ''}

        ${hasHelpText ? html`
          <div part="help-text" class="help-text-wrapper" id=${this._helpTextId}>
            ${this.helpText ? html`<span class="help-text">${this.helpText}</span>` : html`<slot name="help-text"></slot>`}
          </div>
        ` : ''}
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kds-input-group": KdsInputGroup;
  }
}
