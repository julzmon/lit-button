# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Quick Start for AI Agents

**The Big Picture:** This is a Lit Web Components library for the KDS (Key Design System). Each component is a two-file unit: `*.component.ts` (logic) + `*.styles.ts` (CSS). Components are heavily themeable via `--mod-*` CSS properties that layer over `--kds-*` tokens (auto-generated in `tokens.css`). The library uses **CSS Layers** for style precedence and **form association** for inputs. No tests exist—verify via `npm run build` and manual testing on `index.html`.

## Project Overview

This is a **Lit Web Components** library implementing the **KDS (Key Design System)**. The project builds reusable, themeable UI components with comprehensive CSS custom property theming and accessibility features.

**Tech Stack:**
- Lit (v3.x) - Web Components framework
- TypeScript (strict mode, experimental decorators, `useDefineForClassFields: false`)
- Vite - Build tool and dev server
- Stylelint - CSS linting
- ES2020 target with DOM types

## Development Commands

### Running the Dev Server
```bash
npm run dev
```
Starts Vite dev server. The demo page (`index.html`) showcases all components with live reloading.

### Building
```bash
npm run build
```
Compiles TypeScript and bundles with Vite. Build artifacts go to `dist/`.

### Linting
```bash
npm run lint:css          # Check CSS/styles for issues
npm run lint:css:fix      # Auto-fix CSS issues
```
Note: TypeScript linting is handled via `tsc` during the build process. There's no separate `npm run lint` command.

### Preview Production Build
```bash
npm run preview
```

## Component Architecture

### File Structure

Each component consists of two files:

1. **`src/kds-{name}.component.ts`** - Component logic
   - Extends `LitElement`
   - Uses decorators: `@customElement`, `@property`, `@state`, `@query`
   - Implements `render()` returning `html` template
   - Shadow root with `delegatesFocus: true`
   - Always includes `declare global { interface HTMLElementTagNameMap { ... } }`

2. **`src/kds-{name}.styles.ts`** - Component styles
   - Exports `css` tagged template literal
   - Uses CSS custom properties for theming
   - CSS nesting syntax enabled (with `&`)

### Component Composition

Composite components (like `kds-button-group`) manage child components and apply layout/styling:
- **`kds-button-group`**: Container for multiple `kds-button` children with layout control (gap, direction, stretch)
- **`kds-input-group`**: Fieldset-based wrapper organizing form controls
- Use `<slot>` for projecting children; track with `@query` + slotchange listeners when styling depends on content

### Component Template

```typescript
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { componentStyles } from "./kds-component.styles.js";

/**
 * @summary Brief component description
 * @documentation https://...
 * @status beta
 * @since 1.0
 *
 * @slot - Default slot description
 * @slot start - Before content
 * @slot end - After content
 *
 * @cssprop --mod-component-property - Description
 *
 * @event kds-event - Description with detail type
 */
@customElement("kds-component")
export class KdsComponent extends LitElement {
  static styles = componentStyles;
  static shadowRootOptions: ShadowRootInit = {
    mode: "open" as ShadowRootMode,
    delegatesFocus: true,
  };

  @property({ reflect: true })
  size: "sm" | "md" = "md";

  render() {
    return html`<div>...</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "kds-component": KdsComponent;
  }
}
```

## Critical Patterns From Codebase

### TypeScript Configuration
- `experimentalDecorators: true` - Required for Lit decorators
- `useDefineForClassFields: false` - Critical for Lit decorator behavior
- `target: ES2020` with `module: ES2020`
- Strict mode enabled with additional checks: `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`

### Property Declaration Patterns

**Standard Properties:**
```typescript
@property({ reflect: true })
size: "xs" | "sm" | "md" | "lg" = "md";

@property({ type: String })
name?: string;

@property({ type: Boolean, reflect: true })
disabled = false;

@property({ type: String, attribute: "error-message" })
errorMessage?: string;
```

**Important patterns:**
- Use `reflect: true` for properties that need to be styled via `:host([attr])` selectors
- Use `attribute: "kebab-case"` to map camelCase properties to kebab-case attributes
- Boolean properties should reflect for CSS styling
- Optional properties use `?:` TypeScript syntax
- Provide defaults inline when appropriate

**State Management:**
```typescript
@state() private _hasStart = false;
@state() private _showClear = false;
```

**Query Decorators:**
```typescript
@query('.native-input') private _native!: HTMLInputElement;
@query('slot[name="start"]') private _startSlot!: HTMLSlotElement;
```

### Unique ID Generation Pattern

Components that need unique IDs for accessibility use a module-level counter:

```typescript
/** @internal Global counter for generating unique IDs */
let uid = 0;

@customElement("kds-component")
export class KdsComponent extends LitElement {
  @state() private _inputId = `kds-component-${++uid}`;
  @state() private _helpTextId = `kds-component-help-${++uid}`;
}
```

### Conditional Rendering Patterns

**Never use empty string for falsy templates:**
```typescript
// ✅ Correct - use null or nothing
${condition ? html`<div>...</div>` : null}
${condition ? html`<div>...</div>` : ''}

// In ternary expressions within attributes
aria-label=${condition ? 'label' : undefined}
```

**Use ifDefined for optional attributes:**
```typescript
import { ifDefined } from "lit/directives/if-defined.js";

<input
  name=${ifDefined(this.name)}
  aria-describedby=${ifDefined(ariaDescribedBy)}
/>
```

**Use live() for form inputs:**
```typescript
import { live } from "lit/directives/live.js";

<input .value=${live(this.value)} />
```

### Slot Change Handlers Pattern

Components track slot content to conditionally render containers:

```typescript
@state() private _hasStart = false;
@query('slot[name="start"]') private _startSlot!: HTMLSlotElement;

override connectedCallback() {
  super.connectedCallback();
  this.updateComplete.then(() => {
    this._startSlot?.addEventListener('slotchange', this.handleStartSlotChange);
  });
}

override disconnectedCallback() {
  super.disconnectedCallback();
  this._startSlot?.removeEventListener('slotchange', this.handleStartSlotChange);
}

private handleStartSlotChange = () => {
  this._hasStart = this._startSlot?.assignedElements().length > 0;
};
```

### Class Map Pattern

Always use `classMap` from Lit for dynamic classes:

```typescript
import { classMap } from "lit/directives/class-map.js";

render() {
  const classes = {
    button: true,  // Base class always present
    [this.size]: true,  // Dynamic class from property
    primary: this.priority === 'primary',  // Conditional
    invalid: this.invalid
  };

  return html`<div class=${classMap(classes)}>...</div>`;
}
```

### Event Handling Patterns

**Emit BOTH native and custom events:**

```typescript
private handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  this.value = target.value;

  // Re-dispatch native event for framework compatibility
  this.dispatchEvent(new Event('input', {
    bubbles: true,
    composed: true
  }));

  // Emit custom prefixed event with detail
  this.dispatchEvent(new CustomEvent('kds-text-input', {
    detail: { value: this.value },
    bubbles: true,
    composed: true
  }));
};
```

**Arrow function event handlers as class fields:**
```typescript
private handleClick = (event: Event) => {
  // Implementation
};

// Used in template:
@click=${this.handleClick}
```

**Keyboard event handling:**
```typescript
private handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && this.internals.form) {
    this.internals.form.requestSubmit();
  }
  if (event.key === 'Escape' && this.clearable) {
    event.preventDefault();
    this.clearValue();
  }
};
```

### Form Association Pattern

For form-associated components:

```typescript
@customElement("kds-text-input")
export class KdsTextInput extends LitElement {
  static formAssociated = true;

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  @property({ type: String }) value = "";

  private handleInput = (event: Event) => {
    this.value = (event.target as HTMLInputElement).value;
    this.internals.setFormValue(this.value);
    // Emit events...
  };

  /**
   * Called when a containing fieldset is disabled.
   * @internal
   */
  formDisabledCallback(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  /**
   * Called when the form is reset.
   * @internal
   */
  formResetCallback() {
    this.value = this.getAttribute('value') ?? '';
    this.updateValidity();
  }

  checkValidity() {
    this.updateValidity();
    return this.internals.checkValidity();
  }

  reportValidity() {
    this.updateValidity();
    return this.internals.reportValidity();
  }
}
```

### Lifecycle Method Patterns

**firstUpdated for initialization:**
```typescript
protected override firstUpdated() {
  this._showClear = !!this.value;
}
```

**updated for reactive updates:**
```typescript
override updated(changed: PropertyValues<this>) {
  const validityAffecting = ['value', 'required', 'pattern'] as const;
  if (validityAffecting.some(prop => changed.has(prop as any))) {
    this.updateValidity();
  }
}
```

**willUpdate for pre-render logic:**
```typescript
protected willUpdate(_changed: PropertyValues): void {
  super.willUpdate(_changed);

  const progressValue = this.getProgressValue();
  this.classList.toggle("is-determinate", progressValue !== undefined);
}
```

## Naming Conventions

### Components & Files
- Component tags: `kds-{name}` (kebab-case)
- Class names: `Kds{Name}` (PascalCase)
- File names: `kds-{name}.component.ts` and `kds-{name}.styles.ts`

### CSS
- System tokens: `--kds-*` (defined in `tokens.css`)
- Component modifiers: `--mod-*` (component-specific overrides)
- CSS classes: kebab-case
- Component-scoped CSS vars: `--{prop}` for locals (e.g. `--kds-button-height`); expose override points as `--mod-{component}-{prop}` and chain to tokens (`--mod-btn-bg` → `--kds-bg-*`)
- Always use fallback chains: `var(--mod-prop, var(--kds-prop, fallback))`

### Properties
- Standard size prop: `size: "xs" | "sm" | "md" | "lg"` (default `"md"`)
- Color prop: `color: "neutral" | "positive" | "negative" | "warning" | "info"`
- Variant prop: `variant: "solid" | "outline" | "transparent"`
- Boolean states: `disabled`, `invalid`, `required`, `readonly`, `clearable`
- Use `reflect: true` for properties that affect CSS via `:host([attr])`

### Events
- Emit both native events (`input`, `change`, `focus`, `blur`) AND custom prefixed events
- Custom events: `kds-{event-name}` with detail payload
- Example:
  ```typescript
  this.dispatchEvent(new CustomEvent('kds-change', {
    detail: { value: this.value },
    bubbles: true,
    composed: true
  }));
  ```

## Import Convention

**CRITICAL:** Always use `.js` extensions in imports, even for TypeScript files:

```typescript
// ✅ Correct
import { buttonStyles } from "./kds-button.styles.js";

// ❌ Wrong
import { buttonStyles } from "./kds-button.styles.ts";
import { buttonStyles } from "./kds-button.styles";
```

## Styling Patterns

### CSS Custom Properties Architecture

**Three-tier system:**

1. **System tokens** (`--kds-*`) - Defined in `tokens.css` (auto-generated, DO NOT EDIT)
2. **Component-level variables** (local scope) - Define in `:host` with fallbacks to tokens
3. **Component modifiers** (`--mod-*`) - External override points

```css
:host {
  /* Component var with fallback chain: modifier → token → hardcoded */
  --component-height: var(--mod-component-height, var(--kds-button-input-height-md));
  --component-color: var(--mod-component-color, var(--kds-fg-base));
  --component-radius: var(--mod-component-radius, var(--kds-border-radius-sm));
}

.button {
  /* Reference component vars, not tokens directly */
  height: var(--component-height);
  color: var(--component-color);
  border-radius: var(--component-radius);
}
```

**Critical pattern from button component:**
```css
.button {
  /* Define local CSS vars that reference component-level vars */
  --kds-btn-height: var(--mod-btn-height, var(--kds-button-input-height-md));
  --kds-btn-color: var(--mod-btn-color, var(--kds-fg-on-emphasis));
  --kds-btn-bg-color: var(--mod-btn-background-color, var(--kds-bg-neutral-emphasis-base));

  /* Then use the local vars */
  height: var(--kds-btn-height);
  color: var(--kds-btn-color);
  background-color: var(--kds-btn-bg-color);

  /* Variants override local vars */
  &.primary {
    --kds-btn-bg-color: var(--kds-bg-brand-emphasis-base);
  }
}
```

### Size Variants Pattern

**Always define size modifiers as nested rules:**

```css
.button {
  /* Base/default size in main block or as md */
  --kds-btn-height: var(--kds-button-input-height-md);
  --kds-btn-font-size: var(--kds-font-size-md);

  &.xs {
    --kds-btn-height: var(--kds-button-input-height-xs);
    --kds-btn-font-size: var(--kds-font-size-xs);
  }

  &.sm {
    --kds-btn-height: var(--kds-button-input-height-sm);
    --kds-btn-font-size: var(--kds-font-size-sm);
  }

  &.lg {
    --kds-btn-height: var(--kds-button-input-height-lg);
    --kds-btn-font-size: var(--kds-font-size-lg);
  }
}
```

**Or use `:host()` attribute selectors:**
```css
:host([size="sm"]) {
  --input-height: var(--kds-button-input-height-sm);
  --input-font-size: var(--kds-font-size-sm);
}

:host([size="md"]) {
  --input-height: var(--kds-button-input-height-md);
  --input-font-size: var(--kds-font-size-md);
}
```

### State Styling Pattern

**Use `:host()` attribute selectors for component-level states:**

```css
:host([disabled]) {
  cursor: not-allowed;
  opacity: var(--kds-base-opacity-disabled, 0.5);
}

:host([invalid]) {
  .input {
    border-color: var(--kds-border-negative-emphasis-base);
  }
}

:host([required]) .label::after {
  content: "*";
  color: var(--kds-fg-negative-base);
}
```

**Use class selectors for internal states:**
```css
.button {
  &:hover:not(:disabled) {
    background-color: var(--kds-btn-bg-color-hover);
  }

  &:focus-visible {
    outline: var(--kds-border-width-sm) solid var(--kds-border-info-emphasis-base);
    outline-offset: var(--kds-border-width-sm);
  }

  &:disabled {
    cursor: not-allowed;
  }

  &.invalid {
    border-color: var(--kds-border-negative-emphasis-base);
  }
}
```

### CSS Nesting Pattern

**Always use modern CSS nesting with `&`:**

```css
.component {
  display: flex;

  /* Pseudo-classes */
  &:hover {
    background: gray;
  }

  /* Pseudo-elements */
  &::before {
    content: "";
  }

  /* Modifiers */
  &.active {
    color: blue;
  }

  /* BEM-style suffixes */
  &-icon {
    margin-inline-end: var(--kds-space-sm);
  }

  /* Descendant selectors */
  & .child {
    padding: 1rem;
  }

  /* Nested complex selectors */
  &.primary.solid {
    background: blue;
  }
}
```

**For ::slotted selectors, use explicit `&`:**
```css
.group {
  display: flex;

  & ::slotted(*) {
    margin: 0;
  }

  & ::slotted(kds-button) {
    flex: 1;
  }
}
```

### CSS Layers Pattern

Use `@layer` to establish precedence for style overrides (from `kds-button.styles.ts`):

```css
@layer base, variant, priority;

@layer base {
  :host {
    /* Default token values */
    --kds-btn-height: var(--kds-button-input-height-md);
    --kds-btn-bg-color: var(--kds-bg-neutral-emphasis-base);
  }
}

@layer variant {
  :host([variant="outline"]) {
    /* Override base for outline variant */
    --kds-btn-bg-color: transparent;
    --kds-btn-border-color: var(--kds-border-neutral-emphasis-base);
  }
}

@layer priority {
  :host([priority="primary"]) {
    /* Highest precedence: priority overrides variant */
    --kds-btn-bg-color: var(--kds-bg-brand-emphasis-base);
  }
}
```

**Layer precedence:** `base < variant < priority` (later layers win). This allows component modifiers (`--mod-*` inline styles) to always win since inline styles beat layers.

### Color Variant Pattern

Components use semantic color tokens that change based on variant:

```css
.button {
  /* Base solid style */
  --kds-btn-bg-color: var(--kds-bg-neutral-emphasis-base);
  --kds-btn-color: var(--kds-fg-on-emphasis);

  /* Negative color solid */
  &.negative {
    --kds-btn-bg-color: var(--kds-bg-negative-emphasis-base);
    --kds-btn-bg-color-hover: var(--kds-bg-negative-emphasis-hover);
  }

  /* Negative color outline */
  &.negative.outline {
    --kds-btn-bg-color: transparent;
    --kds-btn-bg-color-hover: var(--kds-bg-negative-muted-base);
    --kds-btn-color: var(--kds-fg-negative-base);
    --kds-btn-border-color: var(--kds-border-negative-emphasis-base);
  }

  /* Negative color transparent */
  &.negative.transparent {
    --kds-btn-bg-color: transparent;
    --kds-btn-bg-color-hover: var(--kds-bg-negative-muted-hover);
    --kds-btn-color: var(--kds-fg-negative-base);
  }
}
```

### Transition Pattern

```css
.button {
  transition:
    var(--kds-animation-duration-normal) background-color,
    var(--kds-animation-duration-normal) color,
    var(--kds-animation-duration-normal) border,
    var(--kds-animation-duration-normal) box-shadow;
}

/* Always include reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none !important;
  }
}
```

### Slotted Content Styling

```css
/* Style projected content */
::slotted([slot="start"]),
::slotted([slot="end"]) {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
}

/* Structural pseudo-classes with slotted */
.group {
  & ::slotted(*:first-child) {
    border-radius: var(--radius) 0 0 var(--radius);
  }

  & ::slotted(*:last-child) {
    border-radius: 0 var(--radius) var(--radius) 0;
  }

  & ::slotted(*:not(:first-child)) {
    margin-inline-start: calc(-1 * var(--border-width));
  }
}
```

### Advanced CSS Techniques

**Container queries (progress-circle):**
```css
:host {
  container-type: size;

  --stroke-width: clamp(
    2px,
    calc(0.12 * min(100cqw, 100cqh)),
    8px
  );
}
```

**Conic gradients for progress:**
```css
.indicator::before {
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    var(--color) var(--arc-deg),
    transparent var(--arc-deg) 360deg
  );
}
```

**Radial gradient masks:**
```css
.track {
  background: radial-gradient(
    farthest-side,
    transparent calc(100% - var(--stroke-width)),
    var(--track-color) calc(100% - var(--stroke-width))
  );
}
```

### Focus Styling Pattern

```css
.input {
  outline: none; /* Remove default */
  border: 1px solid var(--border-color);
  transition: border-color 120ms, box-shadow 120ms;

  &:focus-within {
    border-color: var(--border-color-focus);
    box-shadow: 0 0 0 var(--ring-width) var(--ring-color);
  }
}

/* Button focus uses outline */
.button {
  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: var(--kds-border-width-sm) solid var(--kds-border-info-emphasis-base);
    outline-offset: var(--kds-border-width-sm);
  }
}
```

## Accessibility Requirements

Always implement:

- Proper ARIA attributes (`aria-label`, `aria-describedby`, `aria-invalid`, `aria-live`, `role`)
- Keyboard navigation (native elements preferred, Enter/Escape handling)
- Focus management via `delegatesFocus: true`
- Screen reader support (use `.sr-only` class for visually-hidden text)
- Associate labels with inputs via unique IDs and `for` attribute or `aria-labelledby`
- Link help text and errors via `aria-describedby` with space-separated IDs
- Use `role="alert"` for error containers
- Support `aria-valuenow`, `aria-valuemin`, `aria-valuemax` for progress indicators
- Respect `prefers-reduced-motion` for animations

### ARIA DescribedBy Pattern

```typescript
render() {
  const describedByIds: string[] = [];
  if (this.helpText) describedByIds.push(this._helpTextId);
  if (this.invalid && this.errorMessage) describedByIds.push(this._errorId);
  const ariaDescribedBy = describedByIds.length > 0 ? describedByIds.join(' ') : undefined;

  return html`
    <input
      aria-describedby=${ifDefined(ariaDescribedBy)}
      aria-invalid=${this.invalid ? 'true' : 'false'}
    />
    <div id=${this._helpTextId}>${this.helpText}</div>
    <div id=${this._errorId} role="alert">${this.errorMessage}</div>
  `;
}
```

### SR-Only Pattern

```css
.sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border-width: 0 !important;
}
```

### Progressive Enhancement for ARIA

From progress-circle: Check if host provides ARIA attributes, only add internal ones if needed:

```typescript
const hostManagesSemantics =
  this.hasAttribute("role") ||
  this.hasAttribute("aria-valuenow");

const role = hostManagesSemantics ? undefined : "progressbar";
const ariaLabel = hostManagesSemantics ? undefined : this.label;
```

## Form Association

For form controls, use the ElementInternals API:

```typescript
export class KdsInput extends LitElement {
  static formAssociated = true;
  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  @property() value = "";

  private handleInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.internals.setFormValue(this.value);
    // Emit events...
  }

  /**
   * Called when a containing fieldset is disabled.
   * @internal
   */
  formDisabledCallback(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  /**
   * Called when the form is reset.
   * @internal
   */
  formResetCallback() {
    this.value = this.getAttribute('value') ?? '';
    this.updateValidity();
  }

  checkValidity() {
    this.updateValidity();
    return this.internals.checkValidity();
  }

  reportValidity() {
    this.updateValidity();
    return this.internals.reportValidity();
  }

  private updateValidity() {
    if (this.disabled) {
      this.internals.setValidity({}, '');
      return;
    }

    const validity = this._native.validity;
    const flags = this.buildValidityFlags(validity);
    this.internals.setValidity(
      validity.valid ? {} : flags,
      validity.validationMessage,
      this._native
    );
  }

  private buildValidityFlags(validity: ValidityState) {
    const flags: any = {};
    const keys: (keyof ValidityState)[] = [
      'badInput', 'customError', 'patternMismatch', 'rangeOverflow',
      'rangeUnderflow', 'stepMismatch', 'tooLong', 'tooShort',
      'typeMismatch', 'valueMissing'
    ];
    for (const key of keys) {
      if (validity[key]) flags[key] = true;
    }
    return flags;
  }
}
```

## Lit Directives Usage

Common directives to use:

```typescript
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";

// In render():
const classes = { active: this.active, disabled: this.disabled };
return html`
  <button
    class=${classMap(classes)}
    aria-label=${ifDefined(this.label)}
  ></button>
`;
```

## Slots Pattern

Standard slot naming:

```typescript
render() {
  return html`
    <button>
      <slot name="start"></slot>
      <slot></slot>
      <slot name="end"></slot>
    </button>
  `;
}
```

## Documentation Requirements

Every component must include comprehensive JSDoc with:

```typescript
/**
 * @summary One-line description
 * @documentation https://example.com/docs
 * @status stable|beta|experimental
 * @since 1.0
 *
 * @description
 * Detailed multi-paragraph description...
 *
 * @slot - Default slot for content
 * @slot start - Prefix content
 * @slot end - Suffix content
 *
 * @event kds-change - Fired when value changes. Detail: { value: string }
 * @event kds-focus - Fired on focus
 *
 * @cssprop --mod-component-height - Component height
 * @cssprop --mod-component-color - Text color
 *
 * @example
 * ```html
 * <kds-component size="md">Content</kds-component>
 * ```
 */
```

## Current Components

- **`kds-button`** - Clickable action element with priority, color, and variant styling; supports pending state with spinner
- **`kds-button-group`** - Layout container for grouping buttons with customizable gap, direction, and equal-width stretch mode
- **`kds-text-input`** - Form text input with validation, error messages, help text, and start/end slot adornments
- **`kds-input-group`** - Fieldset-based wrapper for grouping related form controls
- **`kds-progress-circle`** - Circular progress indicator with determinate/indeterminate modes and ARIA semantics
- **`kds-checkbox`** - Form checkbox with label, validation, and indeterminate state
- **`kds-checkbox-group`** - Fieldset wrapper for organizing multiple checkboxes
- **`kds-radio`** - Form radio button with label and validation
- **`kds-radio-group`** - Fieldset wrapper for organizing radio buttons
- **`kds-alert-contextual`** - Contextual alert/message component with color variants

## Design Tokens

**DO NOT EDIT** `tokens.css` - it's auto-generated.

Token categories:
- Colors: `--kds-fg-*`, `--kds-bg-*`, `--kds-border-*`
- Spacing: `--kds-space-*`, `--kds-size-*`
- Typography: `--kds-font-family`, `--kds-font-size-*`, `--kds-font-weight-*`
- Borders: `--kds-border-radius-*`, `--kds-border-width-*`
- Shadows: `--kds-shadow-*`
- Animation: `--kds-animation-duration-*`

Theme modes via `[data-mode="light"]` and `[data-mode="dark"]` on `<body>`.

## Development Workflow

```bash
npm run dev      # Start Vite dev server with hot reload
npm run build    # TypeScript compile + Vite build
npm run preview  # Preview production build
npm run lint:css # Lint CSS (auto-fix available)
```

## Testing

- No automated tests currently
- Manual testing via `index.html` demo page
- Verify TypeScript compilation with `npm run build`

## Adding New Components Checklist

When creating a new component:

1. ✅ Create `src/kds-{name}.component.ts` and `src/kds-{name}.styles.ts`
2. ✅ Add comprehensive JSDoc (summary, slots, events, CSS props, examples)
3. ✅ Extend `LitElement` with `delegatesFocus: true`
4. ✅ Use `.js` extensions in imports
5. ✅ Follow property naming conventions (size, color, variant, disabled, etc.)
6. ✅ Use `reflect: true` for CSS-targetable properties
7. ✅ Emit both native and `kds-*` prefixed events
8. ✅ Implement proper ARIA and accessibility
9. ✅ Use CSS custom properties with `--mod-*` / `--kds-*` pattern
10. ✅ Export to `HTMLElementTagNameMap`
11. ✅ Add demo markup to `index.html`
12. ✅ Add script imports in `index.html`

## Common Pitfalls to Avoid

- ❌ Forgetting `.js` extension in imports
- ❌ Not using `reflect: true` when CSS needs attribute selectors
- ❌ Hardcoding values instead of using design tokens
- ❌ Missing `delegatesFocus: true` in shadow root options
- ❌ Not emitting both native and custom events
- ❌ Forgetting to add component to `HTMLElementTagNameMap`
- ❌ Missing ARIA attributes for accessibility
- ❌ Not chaining fallbacks in CSS custom properties
- ❌ Editing `tokens.css` directly (it's generated)
- ❌ **Using CSS `part` attributes** - Do not use `part="..."` in templates or `::part(...)` selectors in styles. Instead, rely on element selectors and CSS custom properties for theming
