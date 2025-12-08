# Checkbox & Radio: Quick Implementation Reference

This document provides ready-to-use code snippets for implementing the checkbox and radio components.

---

## Part 1: kds-checkbox Implementation

### File: `src/kds-checkbox.component.ts`

**Template Structure:**
```typescript
import { html, LitElement, PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { checkboxStyles } from "./kds-checkbox.styles.js";

/** @internal Global counter for generating unique IDs */
let uid = 0;

/**
 * @summary A checkbox form control with label, help text, and validation.
 * @documentation URL
 * @status beta
 * @since 1.0
 *
 * @description
 * kds-checkbox is a form-associated component that wraps a native checkbox input.
 * It supports labels, error messages, help text, and three-state (indeterminate) mode.
 * All styling is customizable via CSS custom properties (--mod-checkbox-*).
 *
 * @slot label - Custom label content (used when `label` property is absent)
 * @slot error - Custom error content (used when `error-message` is absent)
 * @slot help-text - Helper text displayed below checkbox
 *
 * @cssprop --mod-checkbox-size - Size of checkbox control
 * @cssprop --mod-checkbox-border-width - Border width
 * @cssprop --mod-checkbox-border-radius - Border radius
 * @cssprop --mod-checkbox-border-color - Border color
 * @cssprop --mod-checkbox-border-color-hover - Border color on hover
 * @cssprop --mod-checkbox-border-color-focus - Border color on focus
 * @cssprop --mod-checkbox-bg-color - Background color
 * @cssprop --mod-checkbox-bg-color-checked - Background color when checked
 * @cssprop --mod-checkbox-check-color - Checkmark color
 * @cssprop --mod-checkbox-label-gap - Gap between control and label
 * @cssprop --mod-focus-ring-width - Focus ring width
 * @cssprop --mod-focus-ring-color - Focus ring color
 *
 * @csspart control - The visual checkbox element
 * @csspart label - The label element
 * @csspart error - Error message container
 * @csspart help-text - Help text container
 *
 * @event change - Native change event. Emitted when checkbox state changes.
 * @event input - Native input event. Emitted when checkbox state changes.
 * @event kds-change - Custom event with detail: { checked: boolean, value: string }
 */
@customElement("kds-checkbox")
export class KdsCheckbox extends LitElement {
  static formAssociated = true;
  static styles = checkboxStyles;
  static shadowRootOptions: ShadowRootInit = {
    mode: "open" as ShadowRootMode,
    delegatesFocus: true,
  };

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  /**
   * Whether the checkbox is checked.
   */
  @property({ type: Boolean, reflect: true }) checked = false;

  /**
   * The value submitted when the checkbox is checked.
   */
  @property({ type: String }) value = "on";

  /**
   * The name of the checkbox (for form submission).
   */
  @property({ type: String }) name?: string;

  /**
   * Label text displayed next to checkbox.
   */
  @property({ type: String }) label?: string;

  /**
   * Visually hides label while keeping it accessible.
   */
  @property({ type: Boolean, attribute: "hide-label" }) hideLabel = false;

  /**
   * Whether the checkbox is disabled.
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Whether the checkbox is in an invalid state.
   */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /**
   * Whether the checkbox is required.
   */
  @property({ type: Boolean, reflect: true }) required = false;

  /**
   * Error message shown when invalid.
   */
  @property({ type: String, attribute: "error-message" }) errorMessage?: string;

  /**
   * Help text displayed below checkbox.
   */
  @property({ type: String }) helpText?: string;

  /**
   * Three-state: checkbox appears partially checked (neither fully checked nor unchecked).
   * Clicking an indeterminate checkbox typically makes it fully checked.
   */
  @property({ type: Boolean, reflect: true }) indeterminate = false;

  // Internal state

  @state() private _hasLabel = false;
  @state() private _hasError = false;
  @state() private _hasHelpText = false;
  @state() private _checkboxId = `kds-checkbox-${++uid}`;
  @state() private _labelId = `kds-checkbox-label-${uid}`;
  @state() private _errorId = `kds-checkbox-error-${uid}`;
  @state() private _helpTextId = `kds-checkbox-help-${uid}`;

  @query('input[type="checkbox"]') private _native!: HTMLInputElement;
  @query('slot[name="label"]') private _labelSlot!: HTMLSlotElement;
  @query('slot[name="error"]') private _errorSlot!: HTMLSlotElement;
  @query('slot[name="help-text"]') private _helpTextSlot!: HTMLSlotElement;

  override connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      this._labelSlot?.addEventListener("slotchange", this.handleLabelSlotChange);
      this._errorSlot?.addEventListener("slotchange", this.handleErrorSlotChange);
      this._helpTextSlot?.addEventListener("slotchange", this.handleHelpTextSlotChange);
    });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._labelSlot?.removeEventListener("slotchange", this.handleLabelSlotChange);
    this._errorSlot?.removeEventListener("slotchange", this.handleErrorSlotChange);
    this._helpTextSlot?.removeEventListener("slotchange", this.handleHelpTextSlotChange);
  }

  protected override firstUpdated() {
    this.updateValidity();
    if (this.indeterminate && this._native) {
      this._native.indeterminate = true;
    }
  }

  override updated(changed: PropertyValues<this>) {
    if (changed.has("indeterminate") && this._native) {
      this._native.indeterminate = this.indeterminate;
    }

    if (
      changed.has("checked") ||
      changed.has("required") ||
      changed.has("disabled")
    ) {
      this.updateValidity();
    }
  }

  override focus() {
    this._native?.focus();
  }

  override blur() {
    this._native?.blur();
  }

  private updateValidity() {
    if (this.disabled) {
      this.internals.setValidity({}, "");
      return;
    }

    const isValid = !this.required || this.checked;

    this.internals.setValidity(
      { valueMissing: !isValid },
      isValid ? "" : "This field is required",
      this._native
    );
  }

  /**
   * Called by the browser when the form is reset.
   * @internal
   */
  formResetCallback() {
    this.checked = this.hasAttribute("checked");
    this.updateValidity();
  }

  /**
   * Called by the browser when a containing fieldset is disabled.
   * @internal
   */
  formDisabledCallback(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  private handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.indeterminate = target.indeterminate;

    // Update form value
    this.internals.setFormValue(this.checked ? this.value : null);

    // Update validity
    this.updateValidity();

    // Re-dispatch native events for framework compatibility
    this.dispatchEvent(
      new Event("change", { bubbles: true, composed: true })
    );
    this.dispatchEvent(
      new Event("input", { bubbles: true, composed: true })
    );

    // Emit custom event with detail
    this.dispatchEvent(
      new CustomEvent("kds-change", {
        detail: { checked: this.checked, value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  };

  private handleLabelSlotChange = () => {
    this._hasLabel = (this._labelSlot?.assignedElements().length ?? 0) > 0;
  };

  private handleErrorSlotChange = () => {
    this._hasError = (this._errorSlot?.assignedElements().length ?? 0) > 0;
  };

  private handleHelpTextSlotChange = () => {
    this._hasHelpText =
      (this._helpTextSlot?.assignedElements().length ?? 0) > 0;
  };

  override render() {
    // Build aria-describedby to link error and help text
    const describedByIds: string[] = [];
    if (this.errorMessage || this._hasError) describedByIds.push(this._errorId);
    if (this.helpText || this._hasHelpText) describedByIds.push(this._helpTextId);
    const ariaDescribedBy =
      describedByIds.length > 0 ? describedByIds.join(" ") : undefined;

    // Determine if we should show custom label/error/help slots
    const showLabel = this.label || this._hasLabel;
    const showError = this.errorMessage || this._hasError;
    const showHelpText = this.helpText || this._hasHelpText;

    return html`
      <div class="wrapper">
        <div class="checkbox-group">
          <input
            type="checkbox"
            class="native-checkbox"
            id=${this._checkboxId}
            name=${ifDefined(this.name)}
            .checked=${this.checked}
            .indeterminate=${this.indeterminate}
            .disabled=${this.disabled}
            ?required=${this.required}
            aria-invalid=${this.invalid ? "true" : "false"}
            aria-describedby=${ifDefined(ariaDescribedBy)}
            @change=${this.handleChange}
          />

          <div class="control-and-label">
            <div class="control" part="control">
              <svg
                class="checkmark"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M13 4L6 11L3 8"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="indeterminate-mark"></div>
            </div>

            ${showLabel
              ? html`
                  <label for=${this._checkboxId} part="label" class="label">
                    ${this.label}
                    <slot name="label"></slot>
                  </label>
                `
              : null}
          </div>
        </div>

        ${showError
          ? html`
              <div id=${this._errorId} part="error" class="error">
                ${this.errorMessage}
                <slot name="error"></slot>
              </div>
            `
          : null}

        ${showHelpText
          ? html`
              <div id=${this._helpTextId} part="help-text" class="help-text">
                ${this.helpText}
                <slot name="help-text"></slot>
              </div>
            `
          : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kds-checkbox": KdsCheckbox;
  }
}
```

### File: `src/kds-checkbox.styles.ts`

```typescript
import { css } from "lit";

export const checkboxStyles = css`
  :host {
    display: block;
    position: relative;

    /* Control sizing */
    --checkbox-size: var(--mod-checkbox-size, 1.25rem);
    --checkbox-border-width: var(
      --mod-checkbox-border-width,
      var(--kds-border-width-xs)
    );
    --checkbox-border-radius: var(
      --mod-checkbox-border-radius,
      var(--kds-border-radius-xs)
    );

    /* Colors */
    --checkbox-border-color: var(
      --mod-checkbox-border-color,
      var(--kds-border-neutral-emphasis-base)
    );
    --checkbox-border-color-hover: var(
      --mod-checkbox-border-color-hover,
      var(--kds-border-neutral-emphasis-hover)
    );
    --checkbox-border-color-focus: var(
      --mod-checkbox-border-color-focus,
      var(--kds-border-info-emphasis-base)
    );
    --checkbox-bg-color: var(
      --mod-checkbox-bg-color,
      var(--kds-bg-surface-base)
    );
    --checkbox-bg-color-checked: var(
      --mod-checkbox-bg-color-checked,
      var(--kds-bg-brand-emphasis-base)
    );
    --checkbox-check-color: var(
      --mod-checkbox-check-color,
      var(--kds-fg-on-emphasis)
    );

    /* Label styling */
    --label-color: var(--mod-label-color, var(--kds-fg-base));
    --label-font-size: var(--mod-label-font-size, var(--kds-font-size-md));
    --label-font-weight: var(--mod-label-font-weight, var(--kds-font-weight-regular));
    --checkbox-label-gap: var(--mod-checkbox-label-gap, var(--kds-space-md));

    /* Error/Help text */
    --error-color: var(
      --mod-error-color,
      var(--kds-fg-negative-base)
    );
    --help-text-color: var(
      --mod-help-text-color,
      var(--kds-fg-neutral-base)
    );
    --help-text-font-size: var(
      --mod-help-text-font-size,
      var(--kds-font-size-sm)
    );

    /* Focus ring */
    --focus-ring-width: var(
      --mod-focus-ring-width,
      var(--kds-border-width-xs)
    );
    --focus-ring-color: var(
      --mod-focus-ring-color,
      var(--checkbox-border-color-focus)
    );
  }

  :host([disabled]) {
    opacity: var(--kds-base-opacity-disabled, 0.5);
    cursor: not-allowed;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--kds-space-sm);
  }

  .checkbox-group {
    display: flex;
    align-items: flex-start;
    gap: var(--checkbox-label-gap);
  }

  .native-checkbox {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .control-and-label {
    display: flex;
    align-items: center;
    gap: var(--checkbox-label-gap);
    cursor: pointer;
  }

  .native-checkbox:disabled ~ .control-and-label {
    cursor: not-allowed;
  }

  .control {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--checkbox-size);
    height: var(--checkbox-size);
    border: var(--checkbox-border-width) solid var(--checkbox-border-color);
    border-radius: var(--checkbox-border-radius);
    background-color: var(--checkbox-bg-color);
    transition: all 120ms ease;
    cursor: pointer;

    &:hover {
      border-color: var(--checkbox-border-color-hover);
    }
  }

  .native-checkbox:focus-visible ~ .control-and-label .control {
    border-color: var(--checkbox-border-color-focus);
    box-shadow: 0 0 0 var(--focus-ring-width) var(--focus-ring-color);
  }

  .native-checkbox:checked ~ .control-and-label .control {
    background-color: var(--checkbox-bg-color-checked);
    border-color: var(--checkbox-bg-color-checked);
  }

  .checkmark {
    width: calc(var(--checkbox-size) * 0.6);
    height: calc(var(--checkbox-size) * 0.6);
    color: var(--checkbox-check-color);
    opacity: 0;
    transition: opacity 120ms ease;
  }

  .native-checkbox:checked ~ .control-and-label .checkmark {
    opacity: 1;
  }

  .indeterminate-mark {
    position: absolute;
    width: calc(var(--checkbox-size) * 0.5);
    height: calc(var(--checkbox-size) * 0.2);
    background-color: var(--checkbox-check-color);
    border-radius: 1px;
    opacity: 0;
    transition: opacity 120ms ease;
  }

  .native-checkbox:indeterminate ~ .control-and-label {
    .control {
      background-color: var(--checkbox-bg-color-checked);
      border-color: var(--checkbox-bg-color-checked);
    }

    .indeterminate-mark {
      opacity: 1;
    }
  }

  :host([invalid]) .control {
    border-color: var(--kds-border-negative-emphasis-base);

    &:focus-visible {
      box-shadow: 0 0 0 var(--focus-ring-width)
        var(--kds-border-negative-emphasis-base);
    }
  }

  .label {
    color: var(--label-color);
    font-size: var(--label-font-size);
    font-weight: var(--label-font-weight);
    font-family: var(--kds-font-family);
    line-height: 1.2;
    cursor: pointer;
  }

  :host([required]) .label::after {
    margin-inline-start: 0.125rem;
    content: "*";
    color: var(--kds-fg-negative-base);
  }

  .error {
    color: var(--error-color);
    font-size: var(--help-text-font-size);
    margin-inline-start: calc(var(--checkbox-size) + var(--checkbox-label-gap));
    line-height: 1.4;
  }

  .help-text {
    color: var(--help-text-color);
    font-size: var(--help-text-font-size);
    margin-inline-start: calc(var(--checkbox-size) + var(--checkbox-label-gap));
    line-height: 1.4;
  }
`;
```

---

## Part 2: kds-radio Implementation (Summary)

### File: `src/kds-radio.component.ts`

**Key Differences from Checkbox:**
- No indeterminate state
- Simpler styling (circular control)
- Designed to be used within `kds-radio-group` context
- Still form-associated for standalone use

```typescript
// Main pattern differences:
@customElement("kds-radio")
export class KdsRadio extends LitElement {
  static formAssociated = true; // Can be used standalone
  
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: String }) value = ""; // REQUIRED for form submission
  @property({ type: String }) name?: string; // Shared within group
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) label?: string;

  // Circular control instead of square
  // Simpler SVG (filled circle instead of checkmark)
  // Event handling pattern same as checkbox
  // BUT: No indeterminate, no help text (managed by group)
}
```

### File: `src/kds-radio-group.component.ts`

**Key Concepts:**
- Extends `LitElement` (not form-associated itself)
- Uses fieldset + legend (like `kds-input-group`)
- Listens to child radio changes
- Manages shared name and roving tabindex
- Handles group-level validation

```typescript
@customElement("kds-radio-group")
export class KdsRadioGroup extends LitElement {
  @property({ type: String }) value?: string; // Currently selected value
  @property({ type: String }) name?: string; // Shared name
  @property({ type: String }) label?: string; // Legend text
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) invalid = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: String, attribute: "error-message" }) errorMessage?: string;
  @property({ type: String }) direction: "row" | "column" = "column";
  @property({ type: String }) gap: "sm" | "md" | "lg" = "md";

  // Core responsibilities:
  // 1. Manage roving tabindex among radio children
  // 2. Sync name across children
  // 3. Handle child radio change events
  // 4. Manage form value and validity
  // 5. Handle keyboard navigation (arrows)
}
```

---

## Part 3: Integration Examples

### Demo for index.html

```html
<section>
  <h2>Checkbox Examples</h2>
  
  <div style="margin-bottom: 2rem;">
    <h3>Basic Checkbox</h3>
    <kds-checkbox label="I agree to terms"></kds-checkbox>
  </div>

  <div style="margin-bottom: 2rem;">
    <h3>Required Checkbox with Error</h3>
    <kds-checkbox
      name="confirm"
      required
      invalid
      label="Confirm action"
      error-message="You must confirm to continue"
    ></kds-checkbox>
  </div>

  <div style="margin-bottom: 2rem;">
    <h3>Checkbox with Help Text</h3>
    <kds-checkbox
      name="newsletter"
      label="Subscribe to newsletter"
      help-text="We send updates once a month"
    ></kds-checkbox>
  </div>

  <div style="margin-bottom: 2rem;">
    <h3>Indeterminate Checkbox (Select All)</h3>
    <kds-checkbox
      id="select-all"
      indeterminate
      label="Select all items"
      aria-label="Select all items"
    ></kds-checkbox>
  </div>

  <div style="margin-bottom: 2rem;">
    <h3>Multiple Checkboxes</h3>
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <kds-checkbox name="opt1" value="yes" label="Option 1"></kds-checkbox>
      <kds-checkbox name="opt2" value="yes" label="Option 2"></kds-checkbox>
      <kds-checkbox name="opt3" value="yes" label="Option 3"></kds-checkbox>
    </div>
  </div>
</section>

<section>
  <h2>Radio Group Examples</h2>

  <div style="margin-bottom: 2rem;">
    <h3>Basic Radio Group</h3>
    <kds-radio-group label="Choose an option" name="choice">
      <kds-radio value="option1" label="Option 1"></kds-radio>
      <kds-radio value="option2" label="Option 2"></kds-radio>
      <kds-radio value="option3" label="Option 3"></kds-radio>
    </kds-radio-group>
  </div>

  <div style="margin-bottom: 2rem;">
    <h3>Horizontal Radio Group</h3>
    <kds-radio-group label="Size" name="size" direction="row" gap="lg">
      <kds-radio value="sm" label="Small"></kds-radio>
      <kds-radio value="md" label="Medium"></kds-radio>
      <kds-radio value="lg" label="Large"></kds-radio>
    </kds-radio-group>
  </div>

  <div style="margin-bottom: 2rem;">
    <h3>Required Radio Group with Error</h3>
    <kds-radio-group
      label="Delivery Method"
      name="delivery"
      required
      invalid
      error-message="Please select a delivery option"
      help-text="Standard takes 5-7 business days"
    >
      <kds-radio value="standard" label="Standard (Free)"></kds-radio>
      <kds-radio value="express" label="Express (+$10)"></kds-radio>
    </kds-radio-group>
  </div>
</section>
```

### Script imports for index.html

```html
<script type="module" src="/src/kds-checkbox.component.ts"></script>
<script type="module" src="/src/kds-radio.component.ts"></script>
<script type="module" src="/src/kds-radio-group.component.ts"></script>
```

---

## Implementation Order

1. **Start with kds-checkbox**
   - Simpler standalone component
   - Establishes form-associated pattern
   - Sets styling foundation
   
2. **Then kds-radio**
   - Similar to checkbox but simpler
   - Can be used standalone for testing
   
3. **Finally kds-radio-group**
   - Builds on radio coordination
   - Implements roving tabindex
   - Most complex keyboard handling

---

## Testing Checklist

- [ ] Checkbox: Basic check/uncheck
- [ ] Checkbox: Three-state (indeterminate)
- [ ] Checkbox: Form submission (value included when checked)
- [ ] Checkbox: Validation (required state)
- [ ] Checkbox: Keyboard navigation (Space, Tab)
- [ ] Checkbox: Custom slots (label, error, help-text)
- [ ] Radio: Individual check/uncheck
- [ ] Radio: Form submission (value included when checked)
- [ ] Radio: Name attribute shared
- [ ] Radio Group: Only one can be selected at a time
- [ ] Radio Group: Keyboard navigation (Arrows, Home/End)
- [ ] Radio Group: Roving tabindex (single Tab stop)
- [ ] Radio Group: Group validation (required = any selected)
- [ ] Radio Group: Direction control (row/column)
- [ ] Radio Group: Gap control (sm/md/lg)
- [ ] All: Screen reader announcements
- [ ] All: Disabled state styling
- [ ] All: Invalid state styling
- [ ] All: CSS custom property overrides

