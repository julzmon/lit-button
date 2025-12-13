import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './kds-button-group.component.js';
import './kds-button.component.js';

/**
 * A flexible container for grouping multiple buttons together with various layout options.
 *
 * ## Features
 * - Horizontal and vertical layouts
 * - Configurable spacing (including connected buttons)
 * - Alignment control
 * - Equal-width responsive mode
 * - Automatic border management for connected buttons
 */
const meta: Meta = {
  title: 'Components/ButtonGroup',
  component: 'kds-button-group',
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Spacing between buttons (none = connected)',
    },
    direction: {
      control: 'select',
      options: ['row', 'column'],
      description: 'Button orientation',
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Alignment along main axis',
    },
    stretch: {
      control: 'boolean',
      description: 'Equal width distribution',
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default button group with medium spacing.
 */
export const Default: Story = {
  args: {
    gap: 'md',
    direction: 'row',
    justify: 'start',
    stretch: false,
  },
  render: (args) => html`
    <kds-button-group
      .gap=${args.gap}
      .direction=${args.direction}
      .justify=${args.justify}
      .stretch=${args.stretch}
    >
      <kds-button>First</kds-button>
      <kds-button>Second</kds-button>
      <kds-button>Third</kds-button>
    </kds-button-group>
  `,
};

/**
 * All available gap sizes.
 */
export const GapSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">None (Connected)</h4>
        <kds-button-group gap="none">
          <kds-button>First</kds-button>
          <kds-button>Second</kds-button>
          <kds-button>Third</kds-button>
        </kds-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Small</h4>
        <kds-button-group gap="sm">
          <kds-button>First</kds-button>
          <kds-button>Second</kds-button>
          <kds-button>Third</kds-button>
        </kds-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Medium</h4>
        <kds-button-group gap="md">
          <kds-button>First</kds-button>
          <kds-button>Second</kds-button>
          <kds-button>Third</kds-button>
        </kds-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Large</h4>
        <kds-button-group gap="lg">
          <kds-button>First</kds-button>
          <kds-button>Second</kds-button>
          <kds-button>Third</kds-button>
        </kds-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Extra Large</h4>
        <kds-button-group gap="xl">
          <kds-button>First</kds-button>
          <kds-button>Second</kds-button>
          <kds-button>Third</kds-button>
        </kds-button-group>
      </div>
    </div>
  `,
};

/**
 * Connected buttons with shared borders (gap="none").
 */
export const Connected: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Primary Buttons</h4>
        <kds-button-group gap="none">
          <kds-button priority="primary">First</kds-button>
          <kds-button priority="primary">Second</kds-button>
          <kds-button priority="primary">Third</kds-button>
        </kds-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Outline Buttons</h4>
        <kds-button-group gap="none">
          <kds-button variant="outline">First</kds-button>
          <kds-button variant="outline">Second</kds-button>
          <kds-button variant="outline">Third</kds-button>
        </kds-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Mixed States</h4>
        <kds-button-group gap="none">
          <kds-button variant="outline">Left</kds-button>
          <kds-button variant="outline" disabled>Center</kds-button>
          <kds-button variant="outline">Right</kds-button>
        </kds-button-group>
      </div>
    </div>
  `,
};

/**
 * Vertical button groups (column direction).
 */
export const Vertical: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">With Gap</h4>
        <kds-button-group direction="column" gap="md">
          <kds-button>First</kds-button>
          <kds-button>Second</kds-button>
          <kds-button>Third</kds-button>
        </kds-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Connected</h4>
        <kds-button-group direction="column" gap="none">
          <kds-button variant="outline">First</kds-button>
          <kds-button variant="outline">Second</kds-button>
          <kds-button variant="outline">Third</kds-button>
        </kds-button-group>
      </div>
    </div>
  `,
};

/**
 * Button alignment along the main axis.
 */
export const Alignment: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Start (Default)</h4>
        <kds-button-group justify="start">
          <kds-button>First</kds-button>
          <kds-button>Second</kds-button>
          <kds-button>Third</kds-button>
        </kds-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Center</h4>
        <kds-button-group justify="center">
          <kds-button>First</kds-button>
          <kds-button>Second</kds-button>
          <kds-button>Third</kds-button>
        </kds-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">End</h4>
        <kds-button-group justify="end">
          <kds-button>First</kds-button>
          <kds-button>Second</kds-button>
          <kds-button>Third</kds-button>
        </kds-button-group>
      </div>
    </div>
  `,
};

/**
 * Equal-width distribution with the stretch property.
 */
export const Stretch: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Without Stretch</h4>
        <kds-button-group>
          <kds-button>Short</kds-button>
          <kds-button>Medium Length</kds-button>
          <kds-button>Very Long Button Text</kds-button>
        </kds-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">With Stretch</h4>
        <kds-button-group stretch>
          <kds-button>Short</kds-button>
          <kds-button>Medium Length</kds-button>
          <kds-button>Very Long Button Text</kds-button>
        </kds-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Stretch + Connected</h4>
        <kds-button-group stretch gap="none">
          <kds-button variant="outline">One</kds-button>
          <kds-button variant="outline">Two</kds-button>
          <kds-button variant="outline">Three</kds-button>
        </kds-button-group>
      </div>
    </div>
  `,
};

/**
 * Groups with different button priorities.
 */
export const WithPriorities: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Mixed Priorities</h4>
        <kds-button-group>
          <kds-button priority="primary">Primary</kds-button>
          <kds-button priority="secondary">Secondary</kds-button>
          <kds-button priority="tertiary">Tertiary</kds-button>
        </kds-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Action Group</h4>
        <kds-button-group justify="end">
          <kds-button priority="tertiary">Cancel</kds-button>
          <kds-button priority="primary">Save</kds-button>
        </kds-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Connected Primary Group</h4>
        <kds-button-group gap="none">
          <kds-button priority="primary">Option 1</kds-button>
          <kds-button priority="primary">Option 2</kds-button>
          <kds-button priority="primary">Option 3</kds-button>
        </kds-button-group>
      </div>
    </div>
  `,
};

/**
 * Groups with semantic colors.
 */
export const WithColors: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Destructive Actions</h4>
        <kds-button-group justify="end">
          <kds-button>Cancel</kds-button>
          <kds-button color="negative">Delete</kds-button>
        </kds-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Status Toggle</h4>
        <kds-button-group gap="none">
          <kds-button color="positive" variant="outline">Approve</kds-button>
          <kds-button color="negative" variant="outline">Reject</kds-button>
        </kds-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">All Colors</h4>
        <kds-button-group>
          <kds-button color="neutral">Neutral</kds-button>
          <kds-button color="positive">Positive</kds-button>
          <kds-button color="negative">Negative</kds-button>
          <kds-button color="warning">Warning</kds-button>
          <kds-button color="info">Info</kds-button>
        </kds-button-group>
      </div>
    </div>
  `,
};

/**
 * Groups with icons and various button content.
 */
export const WithIcons: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Text Editor Actions</h4>
        <kds-button-group gap="none">
          <kds-button variant="outline" aria-label="Bold">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
              <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
            </svg>
          </kds-button>
          <kds-button variant="outline" aria-label="Italic">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="19" y1="4" x2="10" y2="4"/>
              <line x1="14" y1="20" x2="5" y2="20"/>
              <line x1="15" y1="4" x2="9" y2="20"/>
            </svg>
          </kds-button>
          <kds-button variant="outline" aria-label="Underline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/>
              <line x1="4" y1="21" x2="20" y2="21"/>
            </svg>
          </kds-button>
        </kds-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Navigation</h4>
        <kds-button-group>
          <kds-button>
            <svg slot="start" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Previous
          </kds-button>
          <kds-button>
            Next
            <svg slot="end" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </kds-button>
        </kds-button-group>
      </div>
    </div>
  `,
};

/**
 * Real-world usage examples.
 */
export const UsageExamples: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 3rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Form Actions</h4>
        <kds-button-group justify="end">
          <kds-button priority="tertiary">Cancel</kds-button>
          <kds-button priority="secondary">Save Draft</kds-button>
          <kds-button priority="primary">Publish</kds-button>
        </kds-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Pagination</h4>
        <kds-button-group justify="center">
          <kds-button variant="outline" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </kds-button>
          <kds-button variant="solid">1</kds-button>
          <kds-button variant="outline">2</kds-button>
          <kds-button variant="outline">3</kds-button>
          <kds-button variant="outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </kds-button>
        </kds-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Toggle Group</h4>
        <kds-button-group gap="none">
          <kds-button variant="solid">Day</kds-button>
          <kds-button variant="outline">Week</kds-button>
          <kds-button variant="outline">Month</kds-button>
        </kds-button-group>
      </div>

      <div style="max-width: 300px;">
        <h4 style="margin: 0 0 0.5rem 0;">Modal Actions (Vertical)</h4>
        <kds-button-group direction="column" gap="sm" stretch>
          <kds-button priority="primary" block>Confirm Action</kds-button>
          <kds-button priority="tertiary" block>Cancel</kds-button>
        </kds-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Toolbar</h4>
        <kds-button-group gap="sm">
          <kds-button-group gap="none">
            <kds-button variant="outline" size="sm" aria-label="Align left">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="17" y1="10" x2="3" y2="10"/>
                <line x1="21" y1="6" x2="3" y2="6"/>
                <line x1="21" y1="14" x2="3" y2="14"/>
                <line x1="17" y1="18" x2="3" y2="18"/>
              </svg>
            </kds-button>
            <kds-button variant="outline" size="sm" aria-label="Align center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="10" x2="6" y2="10"/>
                <line x1="21" y1="6" x2="3" y2="6"/>
                <line x1="21" y1="14" x2="3" y2="14"/>
                <line x1="18" y1="18" x2="6" y2="18"/>
              </svg>
            </kds-button>
            <kds-button variant="outline" size="sm" aria-label="Align right">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="21" y1="10" x2="7" y2="10"/>
                <line x1="21" y1="6" x2="3" y2="6"/>
                <line x1="21" y1="14" x2="3" y2="14"/>
                <line x1="21" y1="18" x2="7" y2="18"/>
              </svg>
            </kds-button>
          </kds-button-group>

          <kds-button-group gap="none">
            <kds-button variant="outline" size="sm" aria-label="Bulleted list">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="8" y1="6" x2="21" y2="6"/>
                <line x1="8" y1="12" x2="21" y2="12"/>
                <line x1="8" y1="18" x2="21" y2="18"/>
                <line x1="3" y1="6" x2="3.01" y2="6"/>
                <line x1="3" y1="12" x2="3.01" y2="12"/>
                <line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
            </kds-button>
            <kds-button variant="outline" size="sm" aria-label="Numbered list">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="10" y1="6" x2="21" y2="6"/>
                <line x1="10" y1="12" x2="21" y2="12"/>
                <line x1="10" y1="18" x2="21" y2="18"/>
                <path d="M4 6h1v4"/>
                <path d="M4 10h2"/>
                <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>
              </svg>
            </kds-button>
          </kds-button-group>
        </kds-button-group>
      </div>
    </div>
  `,
};

/**
 * Responsive behavior demonstration.
 */
export const Responsive: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div style="max-width: 600px;">
        <h4 style="margin: 0 0 0.5rem 0;">Stretch Mode (Resize to see behavior)</h4>
        <p style="margin: 0 0 1rem 0; font-size: 14px; color: #666;">
          Buttons distribute equally and stack on smaller containers (below 30rem)
        </p>
        <kds-button-group stretch>
          <kds-button>Option One</kds-button>
          <kds-button>Option Two</kds-button>
          <kds-button>Option Three</kds-button>
        </kds-button-group>
      </div>

      <div style="max-width: 400px;">
        <h4 style="margin: 0 0 0.5rem 0;">In Narrow Container</h4>
        <kds-button-group stretch>
          <kds-button>First</kds-button>
          <kds-button>Second</kds-button>
          <kds-button>Third</kds-button>
        </kds-button-group>
      </div>
    </div>
  `,
};
