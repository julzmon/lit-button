import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
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
 * @cssprop --mod-button-group-fill-breakpoint - Container width threshold for fillWidth mode (default: 30rem)
 * @cssprop --mod-btn-border-radius - Applied to button children to control corner radius (used in gap="none" mode)
 *
 * @csspart base - The host element (no internal container)
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
 * <kds-button-group fillWidth>
 *   <kds-button>First</kds-button>
 *   <kds-button>Second</kds-button>
 *   <kds-button>Third</kds-button>
 * </kds-button-group>
 *
 * <!-- Custom breakpoint -->
 * <kds-button-group fillWidth="40rem">
 *   <kds-button>First</kds-button>
 *   <kds-button>Second</kds-button>
 * </kds-button-group>
 * ```
 */
@customElement("kds-button-group")
export class KdsButtonGroup extends LitElement {
  static styles = buttonGroupStyles;
  static shadowRootOptions: ShadowRootInit = {
    mode: "open" as ShadowRootMode,
    delegatesFocus: true,
  };

  /**
   * Controls spacing between buttons. When set to "none", buttons are visually
   * connected with shared borders and proper corner radius management.
   */
  @property({
    reflect: true,
    converter: {
      fromAttribute: (value: string | null) => {
        return value || "md";
      },
      toAttribute: (value: string) => {
        // Only reflect if not default
        return value === "md" ? null : value;
      },
    },
  })
  gap: "none" | "sm" | "md" | "lg" | "xl" = "md";

  /**
   * Controls button orientation (horizontal or vertical layout).
   */
  @property({
    reflect: true,
    converter: {
      fromAttribute: (value: string | null) => {
        return value || "row";
      },
      toAttribute: (value: string) => {
        // Only reflect if not default
        return value === "row" ? null : value;
      },
    },
  })
  direction: "row" | "column" = "row";

  /**
   * Controls alignment along the main axis using CSS justify-content.
   */
  @property({
    reflect: true,
    converter: {
      fromAttribute: (value: string | null) => {
        return value || "start";
      },
      toAttribute: (value: string) => {
        // Only reflect if not default
        return value === "start" ? null : value;
      },
    },
  })
  justify: "start" | "center" | "end" = "start";

  /**
   * When true or a custom CSS length (e.g., "30rem"), buttons distribute at equal widths
   * and stack vertically on smaller containers via container query.
   */
  @property({
    type: String,
    attribute: "fill-width",
    reflect: true,
    converter: {
      fromAttribute: (value: string | null) => {
        if (value === null) return false;
        if (value === "") return true;
        return value;
      },
      toAttribute: (value: boolean | string) => {
        if (value === false) return null;
        if (value === true) return "";
        return value;
      },
    },
  })
  fillWidth: boolean | string = false;

  render() {
    const styles: Record<string, string> = {};

    // Apply custom breakpoint if fillWidth is a string value
    if (typeof this.fillWidth === "string" && this.fillWidth !== "") {
      styles["--mod-button-group-fill-breakpoint"] = this.fillWidth;
    }

    return html`<slot style=${styleMap(styles)}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kds-button-group": KdsButtonGroup;
  }
}
