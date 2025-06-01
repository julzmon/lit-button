import { LitElement, html, PropertyDeclaration } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { buttonStyles } from "./lit-button.styles.js";

/**
 * @summary Buttons summary.
 * @documentation URL
 * @status stable
 * @since 2.0
 *
 * @dependency kds-spinner
 *
 * @event kds-blur - Emitted when the button loses focus.
 * @event kds-focus - Emitted when the button gains focus.
 * @event kds-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @slot - The button's label.
 * @slot prefix - A presentational prefix icon or similar element.
 * @slot suffix - A presentational suffix icon or similar element.
 *
 * @csspart base - The button's label.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart suffix - The container that wraps the suffix.
 */

@customElement("lit-button")
export class LitButton extends LitElement {
  static styles = buttonStyles;
  static shadowRootOptions: ShadowRootInit = { mode: 'open' as ShadowRootMode, delegatesFocus: true };

  @property({ type: String, reflect: true})
  priority?: "primary" | "secondary" | "tertiary";

  @property({ type: String, reflect: true })
  color?: "neutral" | "positive" | "negative" | "warning" | "info";

  @property ({ type: String, reflect: true})
  variant?: "solid" | "outline" | "transparent" | "link";

  @property({ reflect: true, useDefault: true } as PropertyDeclaration)
  size: "xs" | "sm" | "md" | "lg" = "md";

  @property({ type: String })
  type: HTMLButtonElement['type'] = 'button';

  @property({ type: String })
  url?: string;

  // Native props

  @property({ type: Boolean })
  disabled = false;

  @property({ type: String })
  name?: string;

  @property({ type: String })
  value?: string;

  @property({ type: String })
  form?: string;


  render() {
    const classes = {
      [this.size as string]: true,
      // Only apply color and variant if no priority is set
      ...(this.priority ? {} : {
        ...(this.color && { [this.color]: true }),
        ...(this.variant && { [this.variant]: true })
      }),
      // Priority always takes precedence
      ...(this.priority && { [this.priority]: true })
    };

    return html`
      <button
        part="base"
        class=${classMap(classes)}
        ?disabled=${this.disabled}
        type=${this.type}
        name=${ifDefined(this.name)}
        value=${ifDefined(this.value)}
        form=${ifDefined(this.form)}
        url=${ifDefined(this.url)}
      >
        <slot></slot>
      </button>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'lit-button': LitButton;
  }
}