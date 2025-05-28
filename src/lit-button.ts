import { LitElement, html, PropertyDeclaration } from "lit";
import { customElement, property } from "lit/decorators.js";
import { buttonStyles } from "./lit-button.styles.js";

@customElement("lit-button")
export class LitButton extends LitElement {
  static styles = buttonStyles;

  @property({ reflect: true, useDefault: true } as PropertyDeclaration)
  variant: "primary" | "secondary" = "primary";

  @property({ reflect: true, useDefault: true } as PropertyDeclaration)
  size: "small" | "medium" | "large" = "medium";

  // Native button properties are automatically included
  [key: string]: any;

  render() {
    return html`
      <button
        variant=${this.variant}
        size=${this.size}
        ...=${this.getButtonProps()}
      >
        <slot></slot>
      </button>
    `;
  }

  private getButtonProps() {
    const props: Record<string, any> = {};
    for (const key in this) {
      if (key in HTMLButtonElement.prototype) {
        props[key] = this[key];
      }
    }
    return props;
  }
}
