import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './kds-checkbox-group.component.js';
import './kds-checkbox.component.js';

const meta: Meta = {
  title: 'Components/CheckboxGroup',
  component: 'kds-checkbox-group',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Select your preferences',
    helpText: '',
    errorMessage: '',
    size: 'md',
    disabled: false,
    required: false,
    invalid: false,
  },
  render: (args) => html`
    <kds-checkbox-group
      .label=${args.label}
      .helpText=${args.helpText}
      .errorMessage=${args.errorMessage}
      .size=${args.size}
      .disabled=${args.disabled}
      .required=${args.required}
      .invalid=${args.invalid}
    >
      <kds-checkbox value="email">Email notifications</kds-checkbox>
      <kds-checkbox value="sms">SMS notifications</kds-checkbox>
      <kds-checkbox value="push">Push notifications</kds-checkbox>
    </kds-checkbox-group>
  `,
};

export const WithHelpText: Story = {
  render: () => html`
    <kds-checkbox-group
      label="Marketing Preferences"
      help-text="Choose how you'd like to hear from us"
    >
      <kds-checkbox value="newsletter">Weekly newsletter</kds-checkbox>
      <kds-checkbox value="updates">Product updates</kds-checkbox>
      <kds-checkbox value="offers">Special offers</kds-checkbox>
    </kds-checkbox-group>
  `,
};

export const Required: Story = {
  render: () => html`
    <kds-checkbox-group label="Required Selection" required>
      <kds-checkbox value="terms">Accept terms and conditions</kds-checkbox>
      <kds-checkbox value="privacy">Accept privacy policy</kds-checkbox>
    </kds-checkbox-group>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <kds-checkbox-group label="Disabled Group" disabled>
      <kds-checkbox value="option1" checked>Option 1</kds-checkbox>
      <kds-checkbox value="option2">Option 2</kds-checkbox>
      <kds-checkbox value="option3" checked>Option 3</kds-checkbox>
    </kds-checkbox-group>
  `,
};

export const InvalidState: Story = {
  render: () => html`
    <kds-checkbox-group
      label="Choose at least one option"
      invalid
      error-message="Please select at least one preference."
      required
    >
      <kds-checkbox value="option1">Option 1</kds-checkbox>
      <kds-checkbox value="option2">Option 2</kds-checkbox>
      <kds-checkbox value="option3">Option 3</kds-checkbox>
    </kds-checkbox-group>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <kds-checkbox-group label="Small Size" size="sm">
        <kds-checkbox value="1">Option 1</kds-checkbox>
        <kds-checkbox value="2">Option 2</kds-checkbox>
        <kds-checkbox value="3">Option 3</kds-checkbox>
      </kds-checkbox-group>

      <kds-checkbox-group label="Medium Size" size="md">
        <kds-checkbox value="1">Option 1</kds-checkbox>
        <kds-checkbox value="2">Option 2</kds-checkbox>
        <kds-checkbox value="3">Option 3</kds-checkbox>
      </kds-checkbox-group>
    </div>
  `,
};

export const FormExample: Story = {
  render: () => html`
    <form
      style="display: flex; flex-direction: column; gap: 2rem; max-width: 500px; padding: 2rem; border: 1px solid #ddd; border-radius: 8px;"
      @submit=${(e: Event) => {
        e.preventDefault();
        alert('Form submitted!');
      }}
    >
      <h3 style="margin: 0 0 1rem 0;">Account Settings</h3>

      <kds-checkbox-group label="Notification Preferences" required>
        <kds-checkbox name="notifications" value="email" checked>Email</kds-checkbox>
        <kds-checkbox name="notifications" value="sms">SMS</kds-checkbox>
        <kds-checkbox name="notifications" value="push" checked>Push</kds-checkbox>
      </kds-checkbox-group>

      <kds-checkbox-group
        label="Features to Enable"
        help-text="Select the features you want to use"
      >
        <kds-checkbox name="features" value="darkMode">Dark mode</kds-checkbox>
        <kds-checkbox name="features" value="analytics" checked>Analytics</kds-checkbox>
        <kds-checkbox name="features" value="beta">Beta features</kds-checkbox>
      </kds-checkbox-group>

      <button type="submit" style="padding: 0.75rem; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Save Settings
      </button>
    </form>
  `,
};
