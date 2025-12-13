import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './kds-button.component.js';

/**
 * A clickable element for triggering actions with comprehensive theming and state support.
 *
 * ## Features
 * - Priority-based styling (primary, secondary, tertiary)
 * - Semantic colors (neutral, positive, negative, warning, info)
 * - Multiple variants (solid, outline, transparent, link)
 * - Pending/loading state with spinner
 * - Full keyboard accessibility
 * - Form association support
 */
const meta: Meta = {
  title: 'Components/Button',
  component: 'kds-button',
  tags: ['autodocs'],
  argTypes: {
    priority: {
      control: 'select',
      options: [undefined, 'primary', 'secondary', 'tertiary'],
      description: 'Visual priority that overrides color and variant',
    },
    color: {
      control: 'select',
      options: [undefined, 'neutral', 'positive', 'negative', 'warning', 'info'],
      description: 'Semantic color (ignored if priority is set)',
    },
    variant: {
      control: 'select',
      options: [undefined, 'solid', 'outline', 'transparent', 'link'],
      description: 'Style variant (ignored if priority is set)',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    pending: {
      control: 'boolean',
      description: 'Shows loading spinner and blocks interaction',
    },
    pendingLabel: {
      control: 'text',
      description: 'Accessible label prefix when pending',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Button type for forms',
    },
    href: {
      control: 'text',
      description: 'When set, renders as a link',
    },
    block: {
      control: 'boolean',
      description: 'Makes button full width',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A highly customizable button component with support for multiple visual styles, states, and behaviors.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * The default button with medium size and neutral styling.
 */
export const Default: Story = {
  args: {
    priority: undefined,
    color: undefined,
    variant: undefined,
    size: 'md',
    disabled: false,
    pending: false,
    pendingLabel: '',
    type: 'button',
    block: false,
  },
  render: (args) => html`
    <kds-button
      .priority=${args.priority}
      .color=${args.color}
      .variant=${args.variant}
      .size=${args.size}
      .disabled=${args.disabled}
      .pending=${args.pending}
      .pendingLabel=${args.pendingLabel}
      .type=${args.type}
      .block=${args.block}
    >
      Button
    </kds-button>
  `,
};

/**
 * All available size variants.
 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <kds-button size="xs">Extra Small</kds-button>
      <kds-button size="sm">Small</kds-button>
      <kds-button size="md">Medium</kds-button>
      <kds-button size="lg">Large</kds-button>
    </div>
  `,
};

/**
 * Priority levels override color and variant for consistent styling.
 */
export const Priorities: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <kds-button priority="primary">Primary</kds-button>
      <kds-button priority="secondary">Secondary</kds-button>
      <kds-button priority="tertiary">Tertiary</kds-button>
    </div>
  `,
};

/**
 * Semantic colors for different contexts (solid variant).
 */
export const Colors: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <kds-button color="neutral">Neutral</kds-button>
      <kds-button color="positive">Positive</kds-button>
      <kds-button color="negative">Negative</kds-button>
      <kds-button color="warning">Warning</kds-button>
      <kds-button color="info">Info</kds-button>
    </div>
  `,
};

/**
 * All style variants with neutral color.
 */
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <kds-button variant="solid">Solid</kds-button>
      <kds-button variant="outline">Outline</kds-button>
      <kds-button variant="transparent">Transparent</kds-button>
      <kds-button variant="link">Link</kds-button>
    </div>
  `,
};

/**
 * Combining colors with the outline variant.
 */
export const OutlineColors: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <kds-button color="neutral" variant="outline">Neutral</kds-button>
      <kds-button color="positive" variant="outline">Positive</kds-button>
      <kds-button color="negative" variant="outline">Negative</kds-button>
      <kds-button color="warning" variant="outline">Warning</kds-button>
      <kds-button color="info" variant="outline">Info</kds-button>
    </div>
  `,
};

/**
 * Combining colors with the transparent variant.
 */
export const TransparentColors: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <kds-button color="neutral" variant="transparent">Neutral</kds-button>
      <kds-button color="positive" variant="transparent">Positive</kds-button>
      <kds-button color="negative" variant="transparent">Negative</kds-button>
      <kds-button color="warning" variant="transparent">Warning</kds-button>
      <kds-button color="info" variant="transparent">Info</kds-button>
    </div>
  `,
};

/**
 * Disabled state prevents interaction.
 */
export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <kds-button disabled>Default Disabled</kds-button>
      <kds-button priority="primary" disabled>Primary Disabled</kds-button>
      <kds-button color="positive" disabled>Positive Disabled</kds-button>
      <kds-button variant="outline" disabled>Outline Disabled</kds-button>
    </div>
  `,
};

/**
 * Pending state shows a spinner and blocks interaction.
 */
export const Pending: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <kds-button pending pending-label="Loading">Default Pending</kds-button>
      <kds-button priority="primary" pending pending-label="Saving">Primary Pending</kds-button>
      <kds-button color="positive" pending pending-label="Processing">Positive Pending</kds-button>
      <kds-button variant="outline" pending pending-label="Loading">Outline Pending</kds-button>
    </div>
  `,
};

/**
 * Buttons with icons in start and end slots.
 */
export const WithIcons: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <kds-button>
        <svg slot="start" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
        With Start Icon
      </kds-button>

      <kds-button>
        With End Icon
        <svg slot="end" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </kds-button>

      <kds-button priority="primary">
        <svg slot="start" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Save Changes
      </kds-button>

      <kds-button color="negative" variant="outline">
        <svg slot="start" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        </svg>
        Delete
      </kds-button>
    </div>
  `,
};

/**
 * Icon-only buttons (no text label).
 */
export const IconOnly: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <kds-button aria-label="Settings">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
        </svg>
      </kds-button>

      <kds-button priority="primary" aria-label="Add new item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </kds-button>

      <kds-button variant="outline" aria-label="Delete">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        </svg>
      </kds-button>

      <kds-button size="sm" aria-label="Close">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </kds-button>
    </div>
  `,
};

/**
 * Full-width block buttons.
 */
export const Block: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <kds-button block>Block Button</kds-button>
      <kds-button priority="primary" block>Primary Block</kds-button>
      <kds-button color="positive" block>Positive Block</kds-button>
      <kds-button variant="outline" block>Outline Block</kds-button>
    </div>
  `,
};

/**
 * Buttons as links using the href attribute.
 */
export const AsLinks: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <kds-button href="https://example.com">Link Button</kds-button>
      <kds-button href="https://example.com" priority="primary">Primary Link</kds-button>
      <kds-button href="https://example.com" variant="link">Text Link</kds-button>
      <kds-button href="https://example.com" target="_blank" rel="noopener noreferrer">
        External Link
        <svg slot="end" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
        </svg>
      </kds-button>
    </div>
  `,
};

/**
 * Different button types for form usage.
 */
export const FormTypes: Story = {
  render: () => html`
    <form
      style="display: flex; gap: 1rem; flex-wrap: wrap; padding: 1rem; border: 1px solid #ccc; border-radius: 4px;"
      onsubmit=${(e: Event) => {
        e.preventDefault();
        alert('Form submitted!');
      }}
    >
      <kds-button type="submit" priority="primary">Submit</kds-button>
      <kds-button type="reset">Reset</kds-button>
      <kds-button type="button">Button</kds-button>
    </form>
  `,
};

/**
 * Comprehensive size comparison across all priorities.
 */
export const AllSizesAllPriorities: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Primary</h4>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <kds-button priority="primary" size="xs">XS</kds-button>
          <kds-button priority="primary" size="sm">SM</kds-button>
          <kds-button priority="primary" size="md">MD</kds-button>
          <kds-button priority="primary" size="lg">LG</kds-button>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Secondary</h4>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <kds-button priority="secondary" size="xs">XS</kds-button>
          <kds-button priority="secondary" size="sm">SM</kds-button>
          <kds-button priority="secondary" size="md">MD</kds-button>
          <kds-button priority="secondary" size="lg">LG</kds-button>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Tertiary</h4>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <kds-button priority="tertiary" size="xs">XS</kds-button>
          <kds-button priority="tertiary" size="sm">SM</kds-button>
          <kds-button priority="tertiary" size="md">MD</kds-button>
          <kds-button priority="tertiary" size="lg">LG</kds-button>
        </div>
      </div>
    </div>
  `,
};

/**
 * All color and variant combinations.
 */
export const ColorVariantMatrix: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      ${['neutral', 'positive', 'negative', 'warning', 'info'].map(
        (color) => html`
          <div>
            <h4 style="margin: 0 0 0.5rem 0; text-transform: capitalize;">${color}</h4>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              <kds-button color=${color} variant="solid">Solid</kds-button>
              <kds-button color=${color} variant="outline">Outline</kds-button>
              <kds-button color=${color} variant="transparent">Transparent</kds-button>
            </div>
          </div>
        `
      )}
    </div>
  `,
};
