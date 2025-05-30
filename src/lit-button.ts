import { LitElement, html, PropertyDeclaration } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { buttonStyles } from "./lit-button.styles.js";

@customElement("lit-button")
export class LitButton extends LitElement {
  static styles = buttonStyles;
  static shadowRootOptions: ShadowRootInit = { mode: 'open' as ShadowRootMode, delegatesFocus: true };

  @property({ reflect: true, useDefault: true } as PropertyDeclaration)
  variant: "primary" | "secondary" = "primary";

  @property({ reflect: true, useDefault: true } as PropertyDeclaration)
  size: "small" | "medium" | "large" = "medium";

  @property({ type: String })
  type: HTMLButtonElement['type'] = 'button';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: String })
  name?: string;

  @property({ type: String })
  value?: string;

  @property({ type: String })
  form?: string;

  render() {
    return html`
      <button
        ?disabled=${this.disabled}
        type=${this.type}
        variant=${this.variant}
        size=${this.size}
        name=${this.name || ''}
        value=${this.value || ''}
        form=${this.form || ''}
      >
        <slot></slot>
      </button>
    `;
  }
}
