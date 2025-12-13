import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './kds-input-group.component.js';
import './kds-text-input.component.js';

const meta: Meta = {
  title: 'Components/InputGroup',
  component: 'kds-input-group',
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Personal Information',
    helpText: '',
    errorMessage: '',
    disabled: false,
    required: false,
    invalid: false,
  },
  render: (args) => html`
    <kds-input-group
      .label=${args.label}
      .helpText=${args.helpText}
      .errorMessage=${args.errorMessage}
      .disabled=${args.disabled}
      .required=${args.required}
      .invalid=${args.invalid}
    >
      <kds-text-input label="First Name" name="firstName"></kds-text-input>
      <kds-text-input label="Last Name" name="lastName"></kds-text-input>
    </kds-input-group>
  `,
};

export const WithHelpText: Story = {
  render: () => html`
    <kds-input-group
      label="Shipping Address"
      help-text="Where should we ship your order?"
    >
      <kds-text-input label="Street Address" name="street"></kds-text-input>
      <kds-text-input label="City" name="city"></kds-text-input>
      <kds-text-input label="Postal Code" name="zip"></kds-text-input>
    </kds-input-group>
  `,
};

export const Required: Story = {
  render: () => html`
    <kds-input-group label="Contact Details" required>
      <kds-text-input label="Email" type="email" name="email" required></kds-text-input>
      <kds-text-input label="Phone" type="tel" name="phone"></kds-text-input>
    </kds-input-group>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <kds-input-group label="Read-only Information" disabled>
      <kds-text-input label="Account ID" value="ACC-12345" name="accountId"></kds-text-input>
      <kds-text-input label="Status" value="Active" name="status"></kds-text-input>
    </kds-input-group>
  `,
};

export const InvalidState: Story = {
  render: () => html`
    <kds-input-group
      label="Payment Information"
      invalid
      error-message="Please check the payment details below."
    >
      <kds-text-input label="Card Number" value="1234" invalid name="cardNumber"></kds-text-input>
      <kds-text-input label="CVV" invalid name="cvv"></kds-text-input>
    </kds-input-group>
  `,
};

export const ComplexForm: Story = {
  render: () => html`
    <form style="display: flex; flex-direction: column; gap: 2rem; max-width: 600px;">
      <kds-input-group label="Personal Details" required>
        <kds-text-input label="First Name" name="firstName" required></kds-text-input>
        <kds-text-input label="Last Name" name="lastName" required></kds-text-input>
        <kds-text-input label="Date of Birth" type="date" name="dob"></kds-text-input>
      </kds-input-group>

      <kds-input-group label="Contact Information" help-text="How can we reach you?">
        <kds-text-input label="Email" type="email" name="email" required></kds-text-input>
        <kds-text-input label="Phone" type="tel" name="phone"></kds-text-input>
      </kds-input-group>

      <kds-input-group label="Address">
        <kds-text-input label="Street" name="street"></kds-text-input>
        <kds-text-input label="City" name="city"></kds-text-input>
        <kds-text-input label="State/Province" name="state"></kds-text-input>
        <kds-text-input label="Postal Code" name="zip"></kds-text-input>
      </kds-input-group>
    </form>
  `,
};
