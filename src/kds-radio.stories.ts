import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './kds-radio.component.js';

const meta: Meta = {
  title: 'Components/Radio',
  component: 'kds-radio',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Radio option',
    name: 'example',
    value: '1',
    size: 'md',
    checked: false,
    disabled: false,
    required: false,
    invalid: false,
  },
  render: (args) => html`
    <kds-radio
      .name=${args.name}
      .value=${args.value}
      .size=${args.size}
      .checked=${args.checked}
      .disabled=${args.disabled}
      .required=${args.required}
      .invalid=${args.invalid}
    >
      ${args.label}
    </kds-radio>
  `,
};

export const Group: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <h4 style="margin: 0;">Choose a plan:</h4>
      <kds-radio name="plan" value="free">Free Plan</kds-radio>
      <kds-radio name="plan" value="pro" checked>Pro Plan</kds-radio>
      <kds-radio name="plan" value="enterprise">Enterprise Plan</kds-radio>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <h4 style="margin: 0;">Small</h4>
        <kds-radio name="size-sm" value="1" size="sm" checked>Small option 1</kds-radio>
        <kds-radio name="size-sm" value="2" size="sm">Small option 2</kds-radio>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <h4 style="margin: 0;">Medium</h4>
        <kds-radio name="size-md" value="1" size="md" checked>Medium option 1</kds-radio>
        <kds-radio name="size-md" value="2" size="md">Medium option 2</kds-radio>
      </div>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <kds-radio name="disabled" value="1" disabled>Disabled unchecked</kds-radio>
      <kds-radio name="disabled-checked" value="2" checked disabled>Disabled checked</kds-radio>
    </div>
  `,
};

export const WithHelpText: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <kds-radio name="shipping" value="standard" help-text="Delivery in 5-7 business days" checked>
        Standard Shipping
      </kds-radio>

      <kds-radio name="shipping" value="express" help-text="Delivery in 2-3 business days">
        Express Shipping
      </kds-radio>

      <kds-radio name="shipping" value="overnight" help-text="Next business day delivery">
        Overnight Shipping
      </kds-radio>
    </div>
  `,
};

export const ValidationStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.75rem 0;">Required (unchecked)</h4>
        <kds-radio name="required1" value="1" required>Option 1</kds-radio>
        <kds-radio name="required1" value="2" required>Option 2</kds-radio>
      </div>

      <div>
        <h4 style="margin: 0 0 0.75rem 0;">Invalid</h4>
        <kds-radio name="invalid" value="1" invalid error-message="Please make a selection">
          Option 1
        </kds-radio>
      </div>
    </div>
  `,
};

export const ComplexOptions: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <h4 style="margin: 0;">Select a subscription plan:</h4>

      <kds-radio name="subscription" value="basic" checked>
        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
          <strong>Basic Plan - $9/month</strong>
          <span style="font-size: 0.875rem; color: #666;">Up to 5 users, 10GB storage</span>
        </div>
      </kds-radio>

      <kds-radio name="subscription" value="pro">
        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
          <strong>Pro Plan - $29/month</strong>
          <span style="font-size: 0.875rem; color: #666;">Up to 20 users, 100GB storage</span>
        </div>
      </kds-radio>

      <kds-radio name="subscription" value="enterprise">
        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
          <strong>Enterprise Plan - Contact Sales</strong>
          <span style="font-size: 0.875rem; color: #666;">Unlimited users, unlimited storage</span>
        </div>
      </kds-radio>
    </div>
  `,
};
