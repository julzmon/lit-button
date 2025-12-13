import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './kds-alert-contextual.component.js';

interface AlertArgs {
  status: 'info' | 'positive' | 'warning' | 'negative';
  size: 'sm' | 'md';
  message: string;
}

const meta: Meta<AlertArgs> = {
  title: 'Components/AlertContextual',
  component: 'kds-alert-contextual',
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['info', 'positive', 'warning', 'negative'],
      description: 'Alert semantic status',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Alert size',
    },
    message: {
      control: 'text',
      description: 'Alert message content',
    },
    shadowRootOptions: {
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<AlertArgs>;

export const Default: Story = {
  args: {
    status: 'info',
    size: 'md',
    message: 'This is an informational message.',
  },
  render: ({ status, size, message }) => html`
    <kds-alert-contextual .status=${status} .size=${size}>
      ${message}
    </kds-alert-contextual>
  `,
};

export const Playground: Story = {
  args: {
    status: 'info',
    size: 'md',
    message: 'This is an alert message',
  },
  render: ({ status, size, message }) => html`
    <kds-alert-contextual .status=${status} .size=${size}>
      ${message}
    </kds-alert-contextual>
  `,
};export const AllStatuses: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <kds-alert-contextual status="info">
        This is informational content that provides helpful context.
      </kds-alert-contextual>

      <kds-alert-contextual status="positive">
        Success! Your changes have been saved successfully.
      </kds-alert-contextual>

      <kds-alert-contextual status="warning">
        Warning: This action cannot be undone. Please proceed with caution.
      </kds-alert-contextual>

      <kds-alert-contextual status="negative">
        Error: Unable to process your request. Please try again.
      </kds-alert-contextual>
    </div>
  `,
};

export const Info: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px;">
      <kds-alert-contextual status="info">
        Your account will be automatically renewed on December 31, 2025.
      </kds-alert-contextual>

      <kds-alert-contextual status="info">
        <strong>Did you know?</strong> You can customize your notification preferences in settings.
      </kds-alert-contextual>

      <kds-alert-contextual status="info">
        New features available! Check out our latest updates in the release notes.
      </kds-alert-contextual>
    </div>
  `,
};

export const Positive: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px;">
      <kds-alert-contextual status="positive">
        Profile updated successfully!
      </kds-alert-contextual>

      <kds-alert-contextual status="positive">
        <strong>Payment received.</strong> Your subscription has been activated.
      </kds-alert-contextual>

      <kds-alert-contextual status="positive">
        File uploaded successfully. Processing will begin shortly.
      </kds-alert-contextual>
    </div>
  `,
};

export const Warning: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px;">
      <kds-alert-contextual status="warning">
        Your storage is almost full. Please upgrade or delete old files.
      </kds-alert-contextual>

      <kds-alert-contextual status="warning">
        <strong>Session expiring soon.</strong> You will be logged out in 5 minutes.
      </kds-alert-contextual>

      <kds-alert-contextual status="warning">
        This feature is deprecated and will be removed in the next major version.
      </kds-alert-contextual>
    </div>
  `,
};

export const Negative: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px;">
      <kds-alert-contextual status="negative">
        Unable to connect to the server. Please check your internet connection.
      </kds-alert-contextual>

      <kds-alert-contextual status="negative">
        <strong>Payment failed.</strong> Your credit card was declined.
      </kds-alert-contextual>

      <kds-alert-contextual status="negative">
        Access denied. You don't have permission to view this resource.
      </kds-alert-contextual>
    </div>
  `,
};

export const WithComplexContent: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 700px;">
      <kds-alert-contextual status="info">
        <h4 style="margin: 0 0 0.5rem 0;">System Maintenance Scheduled</h4>
        <p style="margin: 0 0 0.5rem 0;">
          Our services will be temporarily unavailable on Saturday, December 14, from 2:00 AM to 6:00 AM EST.
        </p>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>All data will be preserved</li>
          <li>No action required from users</li>
          <li>Services will resume automatically</li>
        </ul>
      </kds-alert-contextual>

      <kds-alert-contextual status="warning">
        <h4 style="margin: 0 0 0.5rem 0;">Security Alert</h4>
        <p style="margin: 0;">
          We detected unusual activity on your account. If this wasn't you, please:
        </p>
        <ol style="margin: 0.5rem 0 0 0; padding-left: 1.25rem;">
          <li>Change your password immediately</li>
          <li>Review recent account activity</li>
          <li>Enable two-factor authentication</li>
        </ol>
      </kds-alert-contextual>
    </div>
  `,
};

export const InFormContext: Story = {
  render: () => html`
    <form style="max-width: 500px; display: flex; flex-direction: column; gap: 1.5rem;">
      <kds-alert-contextual status="info">
        All fields marked with * are required.
      </kds-alert-contextual>

      <!-- Form fields would go here -->
      <div style="padding: 2rem; border: 1px dashed #ccc; border-radius: 4px; text-align: center; color: #666;">
        Form fields...
      </div>

      <kds-alert-contextual status="negative">
        <strong>Validation Error:</strong> Please correct the errors above before submitting.
      </kds-alert-contextual>
    </form>
  `,
};

export const InlineWithContent: Story = {
  render: () => html`
    <div style="max-width: 700px; display: flex; flex-direction: column; gap: 2rem;">
      <section>
        <h3 style="margin: 0 0 1rem 0;">Account Settings</h3>

        <kds-alert-contextual status="positive" style="margin-bottom: 1rem;">
          Your email address has been verified successfully.
        </kds-alert-contextual>

        <div style="padding: 1rem; border: 1px solid #ddd; border-radius: 4px;">
          <p style="margin: 0;">Settings content goes here...</p>
        </div>
      </section>

      <section>
        <h3 style="margin: 0 0 1rem 0;">Billing Information</h3>

        <kds-alert-contextual status="warning" style="margin-bottom: 1rem;">
          Your trial ends in 3 days. Add a payment method to continue using premium features.
        </kds-alert-contextual>

        <div style="padding: 1rem; border: 1px solid #ddd; border-radius: 4px;">
          <p style="margin: 0;">Billing details...</p>
        </div>
      </section>
    </div>
  `,
};

export const Responsive: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div style="max-width: 800px;">
        <kds-alert-contextual status="info">
          This alert adapts to its container width. Try resizing your browser window.
        </kds-alert-contextual>
      </div>

      <div style="max-width: 400px;">
        <kds-alert-contextual status="warning">
          Narrower container with a longer message that might wrap to multiple lines.
        </kds-alert-contextual>
      </div>

      <div style="max-width: 250px;">
        <kds-alert-contextual status="negative">
          Very narrow alert container.
        </kds-alert-contextual>
      </div>
    </div>
  `,
};
