# KDS (Key Design System) - Lit Web Components

A Lit-based web component library implementing the Key Design System with comprehensive theming and accessibility features.

## Components

- **kds-button** - Clickable action element with priority, color, and variant styling
- **kds-button-group** - Layout container for grouping buttons
- **kds-text-input** - Form text input with validation and adornments
- **kds-input-group** - Fieldset-based wrapper for grouping form controls
- **kds-checkbox** - Form checkbox with three-state support
- **kds-checkbox-group** - Container for multiple checkboxes
- **kds-radio** - Form radio button
- **kds-radio-group** - Container enforcing single-selection
- **kds-progress-circle** - Circular progress indicator
- **kds-alert-contextual** - Status message component

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Storybook

This project uses Storybook for component documentation and development.

### Running Storybook

```bash
# Start Storybook development server
npm run storybook

# Build Storybook for deployment
npm run build-storybook
```

Storybook will open at `http://localhost:6006` with interactive documentation for all components.

### Custom Elements Manifest

Component metadata is automatically generated from TypeScript source files using the Custom Elements Manifest (CEM) Analyzer. This powers Storybook's autodocs feature.

```bash
# Generate custom-elements.json
npm run cem

# Watch mode (regenerate on file changes)
npm run cem:watch
```

The manifest is generated in `custom-elements.json` and should be regenerated after component changes.

### Story Files

Stories are located alongside components in the `src/` directory:
- `src/kds-{component}.stories.ts`

Each story file includes:
- **Default** - Basic component usage
- **Playground** - Interactive controls for experimentation
- **Size variants** - All available sizes
- **State variations** - Disabled, loading, error states
- **Usage examples** - Real-world scenarios
- **Accessibility demos** - ARIA patterns and keyboard navigation

## CSS Linting

```bash
# Lint CSS
npm run lint:css

# Auto-fix CSS issues
npm run lint:css:fix
```

## Tech Stack

- **Lit 3.x** - Web Components framework
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **Storybook 9** - Component documentation
- **Custom Elements Manifest** - Automated component documentation

## Design Tokens

System tokens are defined in `tokens.css` (auto-generated, DO NOT EDIT). Components use a three-tier theming system:

1. System tokens (`--kds-*`)
2. Component-level variables
3. Component modifiers (`--mod-*`)

See [WARP.md](./WARP.md) for detailed architecture and component patterns.

## Browser Support

Modern browsers with Web Components support:
- Chrome/Edge 79+
- Firefox 63+
- Safari 13.1+

## License

[Add license information]
