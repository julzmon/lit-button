import { LitElement, html, PropertyDeclaration } from "lit";
import { customElement, property } from "lit/decorators.js";
import { buttonGroupStyles } from "./kds-button-group.styles.js";

/**
 * @summary A flexible container for grouping multiple buttons together.
 * @documentation URL
 * @status beta
 * @since 1.0
 *
 * @description
 * `kds-button-group` provides a flexible container for organizing multiple buttons with various
 * layout options. It supports horizontal and vertical orientations, configurable spacing (including
 * connected buttons with shared borders), alignment control, and responsive behavior with equal-width
 * distribution that adapts to container size.
 *
 * Key features:
 * - Flexible gap control: from no spacing (connected borders) to XL spacing
 * - Row or column direction with alignment control
 * - Connected button mode (gap="none") with proper border radius management
 * - Equal-width responsive mode with container query breakpoints
 * - Focus management with proper z-index stacking
 * - Automatic border collapse for connected buttons
 *
 * @slot - Default slot for button children (kds-button components)
 *
 * @cssprop --mod-button-group-gap - Custom gap value (overrides gap property)
 * @cssprop --mod-btn-border-radius - Applied to button children to control corner radius (used in gap="none" mode)
 *
 *
 * @example
 * ```html
 * <!-- Default spaced buttons -->
 * <kds-button-group>
 *   <kds-button>First</kds-button>
 *   <kds-button>Second</kds-button>
 *   <kds-button>Third</kds-button>
 * </kds-button-group>
 * ```
 *
 * @example
 * ```html
 * <!-- Connected buttons (no gap) -->
 * <kds-button-group gap="none">
 *   <kds-button>First</kds-button>
 *   <kds-button>Second</kds-button>
 *   <kds-button>Third</kds-button>
 * </kds-button-group>
 * ```
 *
 * @example
 * ```html
 * <!-- Vertical button stack -->
 * <kds-button-group direction="column" gap="sm">
 *   <kds-button>First</kds-button>
 *   <kds-button>Second</kds-button>
 *   <kds-button>Third</kds-button>
 * </kds-button-group>
 * ```
 *
 * @example
 * ```html
 * <!-- Equal width responsive buttons -->
 * <kds-button-group stretch>
 *   <kds-button>First</kds-button>
 *   <kds-button>Second</kds-button>
 *   <kds-button>Third</kds-button>
 * </kds-button-group>
 * ```
 */
@customElement("kds-button-group")
export class KdsButtonGroup extends LitElement {
  static override styles = buttonGroupStyles;
  shadowRootOptions: ShadowRootInit = {
    mode: "open" as ShadowRootMode,
    delegatesFocus: true,
  };

  /**
   * Controls spacing between buttons. When set to "none", buttons are visually
   * connected with shared borders and proper corner radius management.
   */
  @property({ reflect: true, useDefault: true } as PropertyDeclaration)
  gap: "none" | "sm" | "md" | "lg" | "xl" = "md";

  /**
   * Controls button orientation (horizontal or vertical layout).
   */
  @property({ reflect: true, useDefault: true } as PropertyDeclaration)
  direction: "row" | "column" = "row";

  /**
   * Controls alignment along the main axis using CSS justify-content.
   */
  @property({ reflect: true, useDefault: true } as PropertyDeclaration)
  justify: "start" | "center" | "end" = "start";

  /**
   * When true, buttons distribute at equal widths and stack vertically
   * on smaller containers via container query (30rem breakpoint).
   */
  @property({ reflect: true, type: Boolean } as PropertyDeclaration)
  stretch = false;

  /**
   * When true, buttons stack vertically at the 30rem container breakpoint
   * without equal-width distribution. Buttons maintain their natural width.
   */
  @property({ reflect: true, type: Boolean } as PropertyDeclaration)
  autoStack = false;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kds-button-group": KdsButtonGroup;
  }
}
