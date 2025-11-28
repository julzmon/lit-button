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
 */

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
  @state() private _hasLegendSlot = false;
  @state() private _hasErrorSlot = false;
  @state() private _hasHelpTextSlot = false;
  @state() private _legendId = `kds-input-group-legend-${++uid}`;
  @state() private _helpTextId = `kds-input-group-help-${++uid}`;
  @state() private _errorId = `kds-input-group-error-${++uid}`;

  @query('slot[name="legend"]') private _legendSlot!: HTMLSlotElement;
  @query('slot[name="error"]') private _errorSlot!: HTMLSlotElement;
  @query('slot[name="help-text"]') private _helpTextSlot!: HTMLSlotElement;

  override connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      this._legendSlot?.addEventListener('slotchange', this.handleLegendSlotChange);
      this._errorSlot?.addEventListener('slotchange', this.handleErrorSlotChange);
      this._helpTextSlot?.addEventListener('slotchange', this.handleHelpTextSlotChange);
    });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._legendSlot?.removeEventListener('slotchange', this.handleLegendSlotChange);
    this._errorSlot?.removeEventListener('slotchange', this.handleErrorSlotChange);
    this._helpTextSlot?.removeEventListener('slotchange', this.handleHelpTextSlotChange);
  }

  protected firstUpdated() {
    this.updateSlottedElements();
  }

  protected updated(changedProperties: PropertyValues) {
    if (changedProperties.has('size') || changedProperties.has('invalid') || changedProperties.has('disabled')) {
      this.updateSlottedElements();
    }
  }

  private handleLegendSlotChange = () => {
    const nodes = this._legendSlot?.assignedNodes({ flatten: true }) || [];
    this._hasLegendSlot = nodes.some(n => n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent?.trim()));
  };

  private handleErrorSlotChange = () => {
    const nodes = this._errorSlot?.assignedNodes({ flatten: true }) || [];
    this._hasErrorSlot = nodes.some(n => n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent?.trim()));
  };

  private handleHelpTextSlotChange = () => {
    const nodes = this._helpTextSlot?.assignedNodes({ flatten: true }) || [];
    this._hasHelpTextSlot = nodes.some(n => n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent?.trim()));
  };

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

  private handleSlotChange = () => {
    this.updateSlottedElements();
  };

  render() {
    const hasLegend = this.legend || this._hasLegendSlot;
    const hasError = this.invalid && (this.errorMessage || this._hasErrorSlot);
    const hasHelpText = this.helpText || this._hasHelpTextSlot;

    const groupClasses = {
      group: true,
      [this.size]: true,
      'invalid': this.invalid
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
        ${hasLegend ? html`
          <legend part="legend" id=${this._legendId} class="legend">
            ${this.legend ? this.legend : html`<slot name="legend"></slot>`}
          </legend>
        ` : ''}

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
