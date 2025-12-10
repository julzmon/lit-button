import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './kds-radio-group.component.js';
import './kds-radio.component.js';

const meta: Meta = {
  title: 'Components/RadioGroup',
  component: 'kds-radio-group',
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

export const Playground: Story = {
  args: {
    label: 'Choose an option',
    helpText: '',
    errorMessage: '',
    value: '',
    size: 'md',
    disabled: false,
    required: false,
    invalid: false,
  },
  render: (args) => html`
    <kds-radio-group
      .label=${args.label}
      name="playground"
      .helpText=${args.helpText}
      .errorMessage=${args.errorMessage}
      .value=${args.value}
      .size=${args.size}
      .disabled=${args.disabled}
      .required=${args.required}
      .invalid=${args.invalid}
    >
      <kds-radio value="option1">Option 1</kds-radio>
      <kds-radio value="option2">Option 2</kds-radio>
      <kds-radio value="option3">Option 3</kds-radio>
    </kds-radio-group>
  `,
};

export const Default: Story = {
  render: () => html`
    <kds-radio-group label="Choose a color" name="color">
      <kds-radio value="red">Red</kds-radio>
      <kds-radio value="green">Green</kds-radio>
      <kds-radio value="blue">Blue</kds-radio>
    </kds-radio-group>
  `,
};

export const WithValue: Story = {
  render: () => html`
    <kds-radio-group label="Choose a size" name="size" value="medium">
      <kds-radio value="small">Small</kds-radio>
      <kds-radio value="medium">Medium</kds-radio>
      <kds-radio value="large">Large</kds-radio>
    </kds-radio-group>
  `,
};

export const WithHelpText: Story = {
  render: () => html`
    <kds-radio-group
      label="Delivery Method"
      name="delivery"
      help-text="Choose how you'd like to receive your order"
      value="pickup"
    >
      <kds-radio value="pickup">Store Pickup</kds-radio>
      <kds-radio value="shipping">Home Delivery</kds-radio>
      <kds-radio value="express">Express Delivery</kds-radio>
    </kds-radio-group>
  `,
};

export const Required: Story = {
  render: () => html`
    <kds-radio-group label="Select payment method" name="payment" required>
      <kds-radio value="credit">Credit Card</kds-radio>
      <kds-radio value="debit">Debit Card</kds-radio>
      <kds-radio value="paypal">PayPal</kds-radio>
    </kds-radio-group>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <kds-radio-group label="Disabled Group" name="disabled-group" disabled value="option2">
      <kds-radio value="option1">Option 1</kds-radio>
      <kds-radio value="option2">Option 2</kds-radio>
      <kds-radio value="option3">Option 3</kds-radio>
    </kds-radio-group>
  `,
};

export const InvalidState: Story = {
  render: () => html`
    <kds-radio-group
      label="Choose an option"
      name="invalid-group"
      invalid
      error-message="Please select one of the options above."
      required
    >
      <kds-radio value="option1">Option 1</kds-radio>
      <kds-radio value="option2">Option 2</kds-radio>
      <kds-radio value="option3">Option 3</kds-radio>
    </kds-radio-group>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <kds-radio-group label="Small Size" name="size-sm" size="sm" value="2">
        <kds-radio value="1">Option 1</kds-radio>
        <kds-radio value="2">Option 2</kds-radio>
        <kds-radio value="3">Option 3</kds-radio>
      </kds-radio-group>

      <kds-radio-group label="Medium Size" name="size-md" size="md" value="2">
        <kds-radio value="1">Option 1</kds-radio>
        <kds-radio value="2">Option 2</kds-radio>
        <kds-radio value="3">Option 3</kds-radio>
      </kds-radio-group>
    </div>
  `,
};

export const WithDescriptions: Story = {
  render: () => html`
    <kds-radio-group label="Select a plan" name="plan" value="pro">
      <kds-radio value="basic">
        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
          <strong>Basic Plan</strong>
          <span style="font-size: 0.875rem; color: #666;">$9/month - Perfect for individuals</span>
        </div>
      </kds-radio>

      <kds-radio value="pro">
        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
          <strong>Pro Plan</strong>
          <span style="font-size: 0.875rem; color: #666;">$29/month - Great for small teams</span>
        </div>
      </kds-radio>

      <kds-radio value="enterprise">
        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
          <strong>Enterprise Plan</strong>
          <span style="font-size: 0.875rem; color: #666;">Custom pricing - For large organizations</span>
        </div>
      </kds-radio>
    </kds-radio-group>
  `,
};

export const KeyboardNavigation: Story = {
  render: () => html`
    <div style="padding: 1rem; background: #f5f5f5; border-radius: 4px;">
      <p style="margin: 0 0 1rem 0; font-size: 0.875rem;">
        <strong>Keyboard Navigation:</strong><br>
        • Arrow keys to navigate between options<br>
        • Space to select the focused option<br>
        • Tab to move focus in/out of the group
      </p>
      <kds-radio-group label="Try keyboard navigation" name="keyboard" value="2">
        <kds-radio value="1">Option 1</kds-radio>
        <kds-radio value="2">Option 2</kds-radio>
        <kds-radio value="3">Option 3</kds-radio>
        <kds-radio value="4">Option 4</kds-radio>
      </kds-radio-group>
    </div>
  `,
};

export const FormExample: Story = {
  render: () => html`
    <form
      style="display: flex; flex-direction: column; gap: 2rem; max-width: 500px; padding: 2rem; border: 1px solid #ddd; border-radius: 8px;"
      @submit=${(e: Event) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        console.log('Form data:', Object.fromEntries(formData));
        alert('Form submitted! Check console.');
      }}
    >
      <h3 style="margin: 0 0 1rem 0;">Survey Form</h3>

      <kds-radio-group label="How satisfied are you?" name="satisfaction" required>
        <kds-radio value="very-satisfied">Very Satisfied</kds-radio>
        <kds-radio value="satisfied">Satisfied</kds-radio>
        <kds-radio value="neutral">Neutral</kds-radio>
        <kds-radio value="dissatisfied">Dissatisfied</kds-radio>
      </kds-radio-group>

      <kds-radio-group
        label="Would you recommend us?"
        name="recommend"
        help-text="Your feedback helps us improve"
        required
      >
        <kds-radio value="yes">Yes</kds-radio>
        <kds-radio value="maybe">Maybe</kds-radio>
        <kds-radio value="no">No</kds-radio>
      </kds-radio-group>

      <button type="submit" style="padding: 0.75rem; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Submit Survey
      </button>
    </form>
  `,
};
