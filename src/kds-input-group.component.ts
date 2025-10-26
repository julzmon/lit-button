import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { inputGroupStyles } from "./kds-input-group.styles.js";

/**
 * @summary A wrapper component for combining inputs with buttons, selects, or other components.
 * @documentation URL
 * @status beta
 * @since 1.0
 *
 * @slot - Default slot for the input component (should be first)
 * @slot start - Slot for components at the start (left side) of the input
 * @slot end - Slot for components at the end (right side) of the input
 *
 * @cssprop --mod-input-group-border-radius - Border radius for the group
 * @cssprop --mod-input-group-border-width - Border width for group elements
 * @cssprop --mod-input-group-border-color - Border color for group elements
 * @cssprop --mod-input-group-border-color-invalid - Border color when invalid
 *
 * @csspart base - The component's base wrapper
 * @csspart group - The container holding all grouped elements
 * @csspart start - Container for start slot content
 * @csspart input - Container for the input element
 * @csspart end - Container for end slot content
 */

@customElement("kds-input-group")
export class KdsInputGroup extends LitElement {
  static styles = inputGroupStyles;

  /**
   * Controls the size of the group, affecting all child components.
   *
   * - `sm`: Small (32px height)
   * - `md`: Medium (48px height, default)
   */
  @property({ reflect: true })
  size: "sm" | "md" = "md";

  /**
   * Whether the group is in an invalid state.
   * This will be applied to all child components.
   */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /**
   * Controls the placement of attached components.
   * 
   * - `start`: Components are placed at the beginning (left side)
   * - `end`: Components are placed at the end (right side)  
   * - `both`: Components can be placed on both sides
   */
  @property({ reflect: true })
  placement: "start" | "end" | "both" = "end";

  protected firstUpdated() {
    // Apply size and invalid state to slotted elements
    this.updateSlottedElements();
  }

  protected updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('size') || changedProperties.has('invalid')) {
      this.updateSlottedElements();
    }
  }

  private updateSlottedElements() {
    const slots = this.shadowRoot?.querySelectorAll('slot');
    slots?.forEach(slot => {
      const assignedElements = slot.assignedElements();
      assignedElements.forEach(element => {
        // Apply size to all slotted elements that support it
        if ('size' in element && this.size) {
          (element as any).size = this.size;
        }
        
        // Apply invalid state to input elements
        if (slot.name === '' && 'invalid' in element) {
          (element as any).invalid = this.invalid;
        }
      });
    });
  }

  private handleSlotChange = () => {
    this.updateSlottedElements();
  };

  render() {
    const hasStart = this.placement === "start" || this.placement === "both";
    const hasEnd = this.placement === "end" || this.placement === "both";

    const groupClasses = {
      group: true,
      [this.size]: true,
      'has-start': hasStart,
      'has-end': hasEnd,
      'invalid': this.invalid
    };

    return html`
      <div part="base" class="base">
        <div part="group" class=${classMap(groupClasses)}>
          ${hasStart ? html`
            <div part="start" class="start">
              <slot name="start" @slotchange=${this.handleSlotChange}></slot>
            </div>
          ` : ''}
          
          <div part="input" class="input-wrapper">
            <slot @slotchange=${this.handleSlotChange}></slot>
          </div>
          
          ${hasEnd ? html`
            <div part="end" class="end">
              <slot name="end" @slotchange=${this.handleSlotChange}></slot>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kds-input-group": KdsInputGroup;
  }
}