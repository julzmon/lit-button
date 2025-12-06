import { html, LitElement, PropertyDeclaration } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { buttonStyles } from './kds-button.styles.js';
/**
 * @summary A clickable element for triggering actions.
 * @documentation URL
 * @status beta
 * @since 1.0
 *
 * @description
 * Styling is driven by **host attributes** and CSS **layers**: `base < variant < priority`.
 * The shadow DOM **reads `--mod-btn-*` first** and falls back to internal `--kds-*` tokens.
 * This means inline or page-level `--mod-btn-*` overrides always beat color/variant/priority.
 *
 * **Precedence (highest → lowest):**
 * 1) Inline/page `--mod-btn-*`
 * 2) `priority` layer
 * 3) `variant` layer (incl. color×variant combos)
 * 4) base `--kds-*` defaults
 *
 * **Combining props:** `color="…"` selects a family. `variant="outline"`/`transparent`
 * change treatment; text + border reflect the family color (e.g., `color="positive" variant="outline"`).
 * `priority` still overrides both via the higher layer.
 *
 * @slot Default slot used for projecting a button label.
 * @slot start - For icon or element before the label.
 * @slot end - For icon or element after the label.
 *
 * @cssprop --mod-btn-height - Button height.
 * @cssprop --mod-btn-min-width - Minimum width.
 * @cssprop --mod-btn-padding-inline - Horizontal padding.
 * @cssprop --mod-btn-gap - Gap between label and start/end slots.
 * @cssprop --mod-btn-margin-block - External block margin (top/bottom).
 * @cssprop --mod-btn-margin-left - External left margin.
 * @cssprop --mod-btn-margin-right - External right margin.
 * @cssprop --mod-btn-text-color - Text color.
 * @cssprop --mod-btn-text-color-hover - Text color on hover.
 * @cssprop --mod-btn-font-size - Font size.
 * @cssprop --mod-btn-font-weight - Font weight.
 * @cssprop --mod-btn-line-height - Line height (unitless recommended).
 * @cssprop --mod-btn-border-width-block-start - Border width for block-start (top).
 * @cssprop --mod-btn-border-width-block-end - Border width for block-end (bottom).
 * @cssprop --mod-btn-border-width-inline-start - Border width for inline-start (left in LTR).
 * @cssprop --mod-btn-border-width-inline-end - Border width for inline-end (right in LTR).
 * @cssprop --mod-btn-border-radius-top-left - Border radius for top-left corner.
 * @cssprop --mod-btn-border-radius-top-right - Border radius for top-right corner.
 * @cssprop --mod-btn-border-radius-bottom-right - Border radius for bottom-right corner.
 * @cssprop --mod-btn-border-radius-bottom-left - Border radius for bottom-left corner.
 * @cssprop --mod-btn-border-color - Global border color fallback.
 * @cssprop --mod-btn-border-color-block-start - Border color for block-start (top).
 * @cssprop --mod-btn-border-color-block-end - Border color for block-end (bottom).
 * @cssprop --mod-btn-border-color-inline-start - Border color for inline-start (left in LTR).
 * @cssprop --mod-btn-border-color-inline-end - Border color for inline-end (right in LTR).
 * @cssprop --mod-btn-border-color-hover - Global border color on hover.
 * @cssprop --mod-btn-border-color-block-start-hover - Border color for block-start on hover.
 * @cssprop --mod-btn-border-color-block-end-hover - Border color for block-end on hover.
 * @cssprop --mod-btn-border-color-inline-start-hover - Border color for inline-start on hover.
 * @cssprop --mod-btn-border-color-inline-end-hover - Border color for inline-end on hover.
 * @cssprop --mod-btn-background-color - Background color (wins over attributes/layers).
 * @cssprop --mod-btn-background-color-hover - Background color on hover.
 * @cssprop --mod-btn-text-decoration-hover - Text decoration on hover.
 *
 * @event blur - Emitted when the button loses focus.
 * @event focus - Emitted when the button gains focus.
 */

@customElement('kds-button')
export class KDSButton extends LitElement {
  static override styles = buttonStyles;
  shadowRootOptions: ShadowRootInit = {
    mode: 'open' as ShadowRootMode,
    delegatesFocus: true,
  };

  // ---------- Visual API ----------

  /**
   * Defines the visual priority of the button. When set, it overrides
   * the `color` and `variant` properties to enforce consistent styling.
   *
   * - `primary`: Main action (default style)
   * - `secondary`: Secondary action
   * - `tertiary`: Low emphasis or subtle action
   */
  @property({ type: String, reflect: true })
  priority?: 'primary' | 'secondary' | 'tertiary';

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
  color?: 'neutral' | 'positive' | 'negative' | 'warning' | 'info';

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
  variant?: 'solid' | 'outline' | 'transparent' | 'link';

  /**
   * Controls the button size.
   *
   * - `xs`: Extra small
   * - `sm`: Small
   * - `md`: Medium (default)
   * - `lg`: Large
   */
  @property({ reflect: true, useDefault: true } as PropertyDeclaration)
  size: 'xs' | 'sm' | 'md' | 'lg' = 'md';

  /**
   * Sets the tab order of the button element.
   */
  @property({ type: Number })
  tabindex?: number;


  // ---------- Button-only API ----------

  /**
   * The native button `type` attribute.
   *
   * - `button` (default)
   * - `submit`
   * - `reset`
   *
   * This attribute is ignored when `href` is present.
   */
  @property({ type: String })
  type: HTMLButtonElement['type'] = 'button';

  /**
   * Disables the button, preventing user interaction.
   * This attribute is ignored when `href` is present.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The `name` attribute used when the button is inside a form.
   * This attribute is ignored when `href` is present.
   */
  @property({ type: String })
  name?: string;

  /**
   * The `value` attribute submitted with the form when clicked.
   * This attribute is ignored when `href` is present.
   */
  @property({ type: String })
  value?: string;

  /**
   * The `form` attribute specifying the form the button is associated with.
   *   This attribute is ignored when `href` is present.
   */
  @property({ type: String })
  form?: string;

  // ---------- Link-only API ----------

  /**
 * When set, the component renders as an anchor tag instead of a button.
 */
  @property({ type: String })
  href?: string;

  /**
   * Tells the browser where to open the link. Only used when `href` is present.
   **/
  @property() target?: '_blank' | '_parent' | '_self' | '_top';

  /** When using `href`, this attribute will map to the underlying link's `rel` attribute. */
  @property({ type: String }) rel?: string;

  // ---------- ARIA API ----------
  @property({ attribute: 'aria-label' }) override ariaLabel: string | null = null;
  @property({ attribute: 'aria-labelledby' }) ariaLabelledby?: string;
  @property({ attribute: 'aria-describedby' }) ariaDescribedby?: string;

  // Reference to the inner button or anchor
  @query('button, a') private element?: HTMLButtonElement | HTMLAnchorElement;


  // Internal: ensure rel security if opening a new tab
  private get _computedRel(): string | undefined {
    if (this.target === '_blank') {
      return this.rel ? `${this.rel} noopener noreferrer` : 'noopener noreferrer';
    }
    return this.rel;
  }


  /**
   * Sets focus on the button and anchor.
   * Useful for programmatically triggering focus-related behavior.
   */
  override focus(options: FocusOptions) {
    this.element?.focus(options)
  }

  /**
   * Removes focus on the button and anchor.
   * Useful for programmatically triggering blur-related behavior.
   */
  override blur() {
    this.element?.blur()
  }


  private _applyAriaAttributes(el: HTMLElement) {
    // Pass-through a few common ARIA attrs and any host aria-* attributes
    if (this.ariaLabel) el.setAttribute('aria-label', this.ariaLabel);
    if (this.ariaLabelledby) el.setAttribute('aria-labelledby', this.ariaLabelledby);
    if (this.ariaDescribedby) el.setAttribute('aria-describedby', this.ariaDescribedby);

    for (const name of this.getAttributeNames()) {
      if (name.startsWith('aria-')) {
        const val = this.getAttribute(name);
        if (val) el.setAttribute(name, val);
      }
    }
  }


  protected override updated() {
    // After render, make sure ARIA is applied to the inner control
    if (this.element) this._applyAriaAttributes(this.element);
  }

  override render() {
    const baseClass = 'button'
    // Render anchor tag if href is provided
    if (this.href) {
      return html`
        <a
          class=${baseClass}
          href=${ifDefined(this.disabled ? undefined : this.href)}
          tabindex=${ifDefined(this.disabled ? -1 : this.tabindex)}
          target=${ifDefined(this.target)}
          rel=${ifDefined(this._computedRel)}
        >
          <slot name="start"></slot>
          <slot></slot>
          <slot name="end"></slot>
        </a>
      `;
    }

    // Render button tag with form-related attributes
    return html`
      <button
        class=${baseClass}
        ?disabled=${this.disabled}
        type=${this.type}
        name=${ifDefined(this.name)}
        value=${ifDefined(this.value)}
        form=${ifDefined(this.form)}
        tabindex=${ifDefined(this.tabindex)}
      >
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
      </button>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'kds-button': KDSButton;
  }
}
