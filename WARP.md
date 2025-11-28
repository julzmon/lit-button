# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a component library built with **Lit** (Web Components) implementing a design system called "KDS" (Key Design System). The library consists of reusable, customizable UI components with comprehensive theming via CSS custom properties.

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

## Architecture

### Component Structure

Each component follows a consistent pattern with two files:

1. **`*.component.ts`** - Component logic
   - Extends `LitElement`
   - Uses Lit decorators (`@customElement`, `@property`, `@state`, `@query`)
   - Implements `render()` method returning `html` tagged templates
   - All components use `delegatesFocus: true` in shadow root options

2. **`*.styles.ts`** - Component styles
   - Exports a `css` tagged template
   - Uses CSS custom properties extensively for theming
   - Follows a pattern: `--mod-*` for component modifiers, `--kds-*` for system tokens

### Current Components

- **`kds-button`** - Button with priority levels, colors, variants, sizes, slots for icons
- **`kds-text-input`** - Form-associated text input with validation, clearable option, adornments
- **`kds-input-group`** - Wrapper for combining inputs with buttons/other components
- **`kds-progress-circle`** - Circular progress indicator (determinate/indeterminate)

### Design Tokens

The `tokens.css` file is **auto-generated** (do not edit directly). It defines the entire design system:
- Color palette (gray, red, yellow, green, blue scales)
- Spacing scale (`--kds-size-*`)
- Typography (`--kds-font-*`)
- Border radii/widths (`--kds-border-*`)
- Animation timing (`--kds-animation-*`)
- Elevation/shadows
- Theme-specific tokens (light/dark mode via `[data-mode="light"]` and `[data-mode="dark"]`)

### Theming System

Components expose two levels of customization:

1. **System tokens** (`--kds-*`) - Global design decisions, defined in `tokens.css`
2. **Component modifiers** (`--mod-*`) - Component-specific overrides that fall back to system tokens

Example from button:
```css
--kds-btn-height: var(--mod-btn-height, var(--kds-button-input-height-md));
```

### Property Patterns

Components use consistent property naming:
- `size`: Usually `"xs" | "sm" | "md" | "lg"` with `"md"` as default
- `variant`: Style variations like `"solid" | "outline" | "transparent" | "link"`
- `color`: Semantic colors like `"neutral" | "positive" | "negative" | "warning" | "info"`
- `disabled`: Boolean, reflects to attribute for CSS styling via `:host([disabled])`
- `invalid`: Boolean for validation state
- Form-related: `name`, `value`, `form`, `type`

### Form Association

`kds-text-input` uses the **ElementInternals API** for form participation:
- Sets `static formAssociated = true`
- Creates `this.internals = this.attachInternals()` in constructor
- Can integrate with native form validation and submission

### Event Patterns

Components emit both native events and custom prefixed events:
- Native: `input`, `change`, `blur`, `focus` (bubbling)
- Custom: `kds-text-input`, `kds-change`, `kds-blur`, `kds-focus` (with detail payloads)

### Accessibility

- Components use proper ARIA attributes (`role`, `aria-label`, `aria-labelledby`, `aria-describedby`, etc.)
- Progress components handle both `role="progressbar"` (determinate) and `role="status"` (indeterminate)
- Focus management via `delegatesFocus: true` and proper tabindex handling
- Labels and descriptions properly associated with controls

## Code Conventions

- **TypeScript strict mode** enabled (`tsconfig.json`)
- **Experimental decorators** enabled for Lit
- **Import extensions**: Always use `.js` in imports (for ES modules), even when importing `.ts` files
  - Example: `import { buttonStyles } from "./kds-button.styles.js";`
- **Naming**:
  - Components: `kds-{component-name}` (kebab-case)
  - Classes: `Kds{ComponentName}` (PascalCase)
  - CSS classes: kebab-case
  - CSS custom properties: `--kds-*` or `--mod-*`
- **Slots**: Use `name="start"` and `name="end"` for before/after content
- **Parts**: Expose `part` attributes for external styling (`part="base"`, etc.)

## Styling Guidelines

- Use CSS nesting syntax (`&:hover`, `&.class-name`)
- Always provide fallback chains: `var(--mod-*, var(--kds-*, fallback))`
- Reflect important state to host attributes for CSS targeting: `:host([disabled])`, `:host([invalid])`
- Use Lit directives: `classMap()`, `styleMap()`, `ifDefined()`, `live()`

## Testing & Validation

- There are **no test files** in this repository currently
- Validation is done manually via the demo page at `index.html`
- Check TypeScript compilation with `npm run build`
- Check styles with `npm run lint:css`

## Adding New Components

When creating a new component:

1. Create `src/kds-{name}.component.ts` with the component class
2. Create `src/kds-{name}.styles.ts` with styles
3. Add comprehensive JSDoc comments including:
   - `@summary`, `@documentation`, `@status`, `@since`
   - `@event` for all emitted events
   - `@slot` for all slots
   - `@cssprop` for all CSS custom properties
   - `@csspart` for all shadow parts
4. Export the component in the global `HTMLElementTagNameMap` interface
5. Add demo markup to `index.html`
6. Follow the existing property and event naming patterns
7. Use `reflect: true` for properties that should affect CSS via attribute selectors
8. Implement proper accessibility attributes
