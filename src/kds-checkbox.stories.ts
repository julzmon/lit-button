import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './kds-checkbox.component.js';

const meta: Meta = {
  title: 'Components/Checkbox',
  component: 'kds-checkbox',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
    size: 'md',
    checked: false,
    indeterminate: false,
    disabled: false,
    required: false,
    invalid: false,
  },
  render: (args) => html`
    <kds-checkbox
      .size=${args.size}
      .checked=${args.checked}
      .indeterminate=${args.indeterminate}
      .disabled=${args.disabled}
      .required=${args.required}
      .invalid=${args.invalid}
    >
      ${args.label}
    </kds-checkbox>
  `,
};

export const Playground: Story = {
  args: {
    label: 'Checkbox Label',
    size: 'md',
    checked: false,
    indeterminate: false,
    disabled: false,
    required: false,
    invalid: false,
  },
  render: (args) => html`
    <kds-checkbox
      .size=${args.size}
      .checked=${args.checked}
      .indeterminate=${args.indeterminate}
      .disabled=${args.disabled}
      .required=${args.required}
      .invalid=${args.invalid}
    >
      ${args.label}
    </kds-checkbox>
  `,
};

export const Checked: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <kds-checkbox checked>Checked checkbox</kds-checkbox>
      <kds-checkbox>Unchecked checkbox</kds-checkbox>
    </div>
  `,
};

export const Indeterminate: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <kds-checkbox indeterminate>Indeterminate state</kds-checkbox>
      <kds-checkbox checked>Checked state</kds-checkbox>
      <kds-checkbox>Unchecked state</kds-checkbox>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <kds-checkbox size="sm">Small checkbox</kds-checkbox>
      <kds-checkbox size="md">Medium checkbox</kds-checkbox>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <kds-checkbox disabled>Disabled unchecked</kds-checkbox>
      <kds-checkbox checked disabled>Disabled checked</kds-checkbox>
      <kds-checkbox indeterminate disabled>Disabled indeterminate</kds-checkbox>
    </div>
  `,
};

export const WithHelpText: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <kds-checkbox help-text="You must accept the terms to continue.">
        Accept terms and conditions
      </kds-checkbox>

      <kds-checkbox help-text="We'll send you updates about your order." checked>
        Subscribe to newsletter
      </kds-checkbox>
    </div>
  `,
};

export const ValidationStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <kds-checkbox required>Required field (unchecked)</kds-checkbox>

      <kds-checkbox required checked>Required field (checked)</kds-checkbox>

      <kds-checkbox invalid error-message="You must accept the terms.">
        Accept terms
      </kds-checkbox>
    </div>
  `,
};

export const GroupExample: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <h4 style="margin: 0;">Select your interests:</h4>
      <kds-checkbox name="interests" value="tech">Technology</kds-checkbox>
      <kds-checkbox name="interests" value="design" checked>Design</kds-checkbox>
      <kds-checkbox name="interests" value="business">Business</kds-checkbox>
      <kds-checkbox name="interests" value="science" checked>Science</kds-checkbox>
    </div>
  `,
};

export const SelectAllPattern: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <kds-checkbox indeterminate>
        <strong>Select All</strong>
      </kds-checkbox>
      <div style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
        <kds-checkbox checked>Option 1</kds-checkbox>
        <kds-checkbox>Option 2</kds-checkbox>
        <kds-checkbox checked>Option 3</kds-checkbox>
      </div>
    </div>
  `,
};
