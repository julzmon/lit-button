import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './kds-text-input.component.js';

const meta: Meta = {
  title: 'Components/TextInput',
  component: 'kds-text-input',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'url', 'number'],
    },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    invalid: { control: 'boolean' },
    clearable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    size: 'md',
    type: 'text',
    disabled: false,
    readonly: false,
    required: false,
    invalid: false,
    clearable: false,
  },
  render: (args) => html`
    <kds-text-input
      .label=${args.label}
      .placeholder=${args.placeholder}
      .size=${args.size}
      .type=${args.type}
      .disabled=${args.disabled}
      .readonly=${args.readonly}
      .required=${args.required}
      .invalid=${args.invalid}
      .clearable=${args.clearable}
    ></kds-text-input>
  `,
};

export const Playground: Story = {
  args: {
    label: 'Input Label',
    placeholder: 'Enter text...',
    size: 'md',
    disabled: false,
    readonly: false,
    required: false,
    invalid: false,
    clearable: false,
  },
  render: (args) => html`
    <kds-text-input
      .label=${args.label}
      .placeholder=${args.placeholder}
      .size=${args.size}
      .disabled=${args.disabled}
      .readonly=${args.readonly}
      .required=${args.required}
      .invalid=${args.invalid}
      .clearable=${args.clearable}
    ></kds-text-input>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <kds-text-input size="sm" label="Small Input" placeholder="Small size"></kds-text-input>
      <kds-text-input size="md" label="Medium Input" placeholder="Medium size"></kds-text-input>
    </div>
  `,
};

export const WithHelpText: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <kds-text-input
        label="Email"
        type="email"
        placeholder="you@example.com"
        help-text="We'll never share your email with anyone."
      ></kds-text-input>

      <kds-text-input
        label="Password"
        type="password"
        help-text="Must be at least 8 characters long."
      ></kds-text-input>
    </div>
  `,
};

export const ValidationStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <kds-text-input
        label="Required Field"
        required
        placeholder="This field is required"
      ></kds-text-input>

      <kds-text-input
        label="Invalid Email"
        type="email"
        value="invalid-email"
        invalid
        error-message="Please enter a valid email address."
      ></kds-text-input>

      <kds-text-input
        label="Valid Input"
        value="John Doe"
      ></kds-text-input>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <kds-text-input
        label="Disabled Empty"
        disabled
        placeholder="Cannot edit"
      ></kds-text-input>

      <kds-text-input
        label="Disabled with Value"
        value="This field is disabled"
        disabled
      ></kds-text-input>
    </div>
  `,
};

export const Readonly: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <kds-text-input
        label="Read-only Field"
        value="This cannot be edited"
        readonly
      ></kds-text-input>

      <kds-text-input
        label="Account ID"
        value="ACC-12345-XYZ"
        readonly
        help-text="Your unique account identifier"
      ></kds-text-input>
    </div>
  `,
};

export const WithIcons: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <kds-text-input label="Email" type="email" placeholder="you@example.com">
        <svg slot="start" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </kds-text-input>

      <kds-text-input label="Search" placeholder="Search...">
        <svg slot="start" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </kds-text-input>

      <kds-text-input label="Website" type="url" placeholder="https://example.com">
        <svg slot="end" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      </kds-text-input>
    </div>
  `,
};

export const Clearable: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <kds-text-input
        label="Clearable Input"
        value="Clear me"
        clearable
        help-text="Click the × button to clear"
      ></kds-text-input>

      <kds-text-input
        label="Search with Clear"
        placeholder="Type to search..."
        clearable
      >
        <svg slot="start" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </kds-text-input>
    </div>
  `,
};

export const InputTypes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <kds-text-input label="Text" type="text" placeholder="Enter text"></kds-text-input>
      <kds-text-input label="Email" type="email" placeholder="you@example.com"></kds-text-input>
      <kds-text-input label="Password" type="password" placeholder="Enter password"></kds-text-input>
      <kds-text-input label="Telephone" type="tel" placeholder="+1 (555) 000-0000"></kds-text-input>
      <kds-text-input label="URL" type="url" placeholder="https://example.com"></kds-text-input>
      <kds-text-input label="Number" type="number" placeholder="0"></kds-text-input>
    </div>
  `,
};

export const WithConstraints: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <kds-text-input
        label="Min/Max Length"
        minlength="5"
        maxlength="20"
        help-text="Between 5 and 20 characters"
      ></kds-text-input>

      <kds-text-input
        label="Pattern Validation"
        pattern="[A-Z]{2}[0-9]{4}"
        placeholder="AB1234"
        help-text="Format: 2 uppercase letters + 4 digits"
      ></kds-text-input>

      <kds-text-input
        label="Number Range"
        type="number"
        min="0"
        max="100"
        step="5"
        help-text="Value between 0-100, increments of 5"
      ></kds-text-input>
    </div>
  `,
};

export const FormExample: Story = {
  render: () => html`
    <form
      style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px; padding: 2rem; border: 1px solid #ddd; border-radius: 8px;"
      @submit=${(e: Event) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        console.log('Form data:', Object.fromEntries(formData));
        alert('Form submitted! Check console for data.');
      }}
    >
      <h3 style="margin: 0 0 1rem 0;">Contact Form</h3>

      <kds-text-input
        label="Full Name"
        name="fullName"
        required
        placeholder="John Doe"
      ></kds-text-input>

      <kds-text-input
        label="Email Address"
        name="email"
        type="email"
        required
        placeholder="you@example.com"
      >
        <svg slot="start" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </kds-text-input>

      <kds-text-input
        label="Phone Number"
        name="phone"
        type="tel"
        placeholder="+1 (555) 000-0000"
        help-text="Optional"
      ></kds-text-input>

      <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 0.5rem;">
        <button type="reset" style="padding: 0.5rem 1rem; cursor: pointer;">Reset</button>
        <button type="submit" style="padding: 0.5rem 1rem; cursor: pointer; background: #0066cc; color: white; border: none; border-radius: 4px;">
          Submit
        </button>
      </div>
    </form>
  `,
};

export const HiddenLabel: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; max-width: 600px;">
      <kds-text-input
        label="Search"
        hide-label
        placeholder="Search..."
        style="flex: 1;"
      >
        <svg slot="start" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </kds-text-input>
    </div>
  `,
};
