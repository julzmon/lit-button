import { LitElement, html, PropertyDeclaration } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { buttonStyles } from "./kds-button.styles.js";

/**
 * @summary A clickable element for triggering actions.
 * @documentation URL
 * @status beta
 * @since 1.0
 *
 * @dependency kds-spinner
 *
 * @event kds-blur - Emitted when the button loses focus.
 * @event kds-focus - Emitted when the button gains focus.
 *
 * @slot - Default slot for button label.
 * @slot start - For icon or element before the label.
 * @slot end - For icon or element after the label.
 *
 * @cssprop --mod-btn-height - Button height
 * @cssprop --mod-btn-min-width - Button minimum width
 * @cssprop --mod-btn-padding-inline - Button padding on left/right
 * @cssprop --mod-btn-gap - Space between the default slot and start/end slot elements
 * @cssprop --mod-btn-color - Button text color
 * @cssprop --mod-btn-color-hover - Button text hover color
 * @cssprop --mod-btn-font-size - Button font size
 * @cssprop --mod-btn-line-height - Button line height
 * @cssprop --mod-btn-border-width - Button border width
 * @cssprop --mod-btn-border-radius - Button border radius
 * @cssprop --mod-btn-border-color - Button border color
 * @cssprop --mod-btn-border-color-hover - Button border hover color
 * @cssprop --mod-btn-background-color - Button background color
 * @cssprop --mod-btn-background-color-hover - Button background hover color
 *
 * @csspart base - Container for the dfault slot (label/content)
 * @csspart start - Container for the start (icon)
 * @csspart end - Container for the end (icon)
 */

@customElement("kds-button")
export class KdsButton extends LitElement {
  static styles = buttonStyles;
  static shadowRootOptions: ShadowRootInit = {
    mode: "open" as ShadowRootMode,
    delegatesFocus: true,
  };

  /**
   * Defines the visual priority of the button. When set, it overrides
   * the `color` and `variant` properties to enforce consistent styling.
   *
   * - `primary`: Main action (default style)
   * - `secondary`: Secondary action
   * - `tertiary`: Low emphasis or subtle action
   */
  @property({ type: String, reflect: true })
  priority?: "primary" | "secondary" | "tertiary";

  /**
   * Sets the semantic color of the button.
   * Ignored if `priority` is set.
   *
   * - `neutral`: Default styling
   * - `positive`: Success or confirmation
   * - `negative`: Destructive or error
   * - `warning`: Caution or warning
   * - `info`: Informational context
   */
  @property({ type: String, reflect: true })
  color?: "neutral" | "positive" | "negative" | "warning" | "info";

  /**
   * Controls the button's style variant.
   * Ignored if `priority` is set.
   *
   * - `solid`: Filled background
   * - `outline`: Transparent with border
   * - `transparent`: No border or fill
   * - `link`: Styled as a text link
   */
  @property({ type: String, reflect: true })
  variant?: "solid" | "outline" | "transparent" | "link";

  /**
   * Controls the button size.
   *
   * - `xs`: Extra small
   * - `sm`: Small
   * - `md`: Medium (default)
   * - `lg`: Large
   */
  @property({ reflect: true, useDefault: true } as PropertyDeclaration)
  size: "xs" | "sm" | "md" | "lg" = "md";

  /**
   * The native button `type` attribute.
   *
   * - `button` (default)
   * - `submit`
   * - `reset`
   */
  @property({ type: String })
  type: HTMLButtonElement["type"] = "button";

  /**
   * When set, the component renders as an anchor tag instead of a button.
   */
  @property({ type: String })
  href?: string;

  /**
   * Disables the button, preventing user interaction.
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * The `name` attribute used when the button is inside a form.
   */
  @property({ type: String })
  name?: string;

  /**
   * The `value` attribute submitted with the form when clicked.
   */
  @property({ type: String })
  value?: string;

  /**
   * The `form` attribute specifying the form the button is associated with.
   */
  @property({ type: String })
  form?: string;

  /**
   * Sets the tab order of the button element.
   */
  @property({ type: Number })
  tabindex?: number;

  render() {
    // Build class map for styling based on component properties
    const classes = {
      button: true,
      [this.size as string]: true,
      // Only apply color and variant if no priority is set
      ...(this.priority
        ? {}
        : {
            ...(this.color && { [this.color]: true }),
            ...(this.variant && { [this.variant]: true }),
          }),
      // Priority always takes precedence
      ...(this.priority && { [this.priority]: true }),
    };

    // Render anchor tag if href is provided
    if (this.href) {
      return html`
        <a
          part="base"
          class=${classMap(classes)}
          ?disabled=${this.disabled}
          href=${this.href}
          tabindex=${ifDefined(this.tabindex)}
        >
          <slot name="start" part="start"></slot>
          <slot></slot>
          <slot name="end" part="end"></slot>
        </a>
      `;
    }

    // Render button tag with form-related attributes
    return html`
      <button
        part="base"
        role="button"
        class=${classMap(classes)}
        ?disabled=${this.disabled}
        type=${this.type}
        name=${ifDefined(this.name)}
        value=${ifDefined(this.value)}
        form=${ifDefined(this.form)}
        tabindex=${ifDefined(this.tabindex)}
      >
        <slot name="start" part="start"></slot>
        <slot></slot>
        <slot name="end" part="end"></slot>
      </button>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "kds-button": KdsButton;
  }
}
