import { LitElement, html, PropertyDeclaration } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from 'lit/directives/class-map.js';
import { buttonStyles } from "./lit-button.styles.js";

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
        class=${classMap(classes)}
        ?disabled=${this.disabled}
        type=${this.type}
        name=${this.name || ''}
        value=${this.value || ''}
        form=${this.form || ''}
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