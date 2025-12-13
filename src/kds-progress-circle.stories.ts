import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './kds-progress-circle.component.js';

const meta: Meta = {
  title: 'Components/ProgressCircle',
  component: 'kds-progress-circle',
  tags: ['autodocs'],
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100). Omit for indeterminate.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <kds-progress-circle value="75"></kds-progress-circle>
  `,
};

export const Playground: Story = {
  args: {
    progress: 50,
    size: 'md',
    label: 'Loading',
  },
  render: (args) => html`
    <kds-progress-circle
      .progress=${args.progress}
      .size=${args.size}
      .label=${args.label || ''}
    ></kds-progress-circle>
  `,
};

export const Indeterminate: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: center;">
      <kds-progress-circle label="Loading"></kds-progress-circle>
      <p style="margin: 0;">Indeterminate (no value specified)</p>
    </div>
  `,
};

export const Determinate: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
      <kds-progress-circle progress="0" label="0%"></kds-progress-circle>
      <kds-progress-circle progress="25" label="25%"></kds-progress-circle>
      <kds-progress-circle progress="50" label="50%"></kds-progress-circle>
      <kds-progress-circle progress="75" label="75%"></kds-progress-circle>
      <kds-progress-circle progress="100" label="100%"></kds-progress-circle>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: center;">
      <div style="text-align: center;">
        <kds-progress-circle size="sm" progress="60"></kds-progress-circle>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">Small</p>
      </div>

      <div style="text-align: center;">
        <kds-progress-circle size="md" progress="60"></kds-progress-circle>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">Medium</p>
      </div>

      <div style="text-align: center;">
        <kds-progress-circle size="lg" progress="60"></kds-progress-circle>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">Large</p>
      </div>
    </div>
  `,
};

export const WithLabels: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
      <div style="text-align: center;">
        <kds-progress-circle progress="35" label="Uploading"></kds-progress-circle>
        <p style="margin: 0.5rem 0 0 0;">35% Complete</p>
      </div>

      <div style="text-align: center;">
        <kds-progress-circle progress="67" label="Processing"></kds-progress-circle>
        <p style="margin: 0.5rem 0 0 0;">67% Complete</p>
      </div>

      <div style="text-align: center;">
        <kds-progress-circle value="100" label="Done"></kds-progress-circle>
        <p style="margin: 0.5rem 0 0 0;">Finished</p>
      </div>
    </div>
  `,
};

export const UsageExamples: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <kds-progress-circle size="sm" label="Loading"></kds-progress-circle>
        <span>Loading data...</span>
      </div>

      <div style="display: flex; align-items: center; gap: 1rem;">
        <kds-progress-circle size="sm" value="45" label="Upload progress"></kds-progress-circle>
        <div>
          <div style="font-weight: 500;">Uploading file.pdf</div>
          <div style="font-size: 0.875rem; color: #666;">45% complete (2.3 MB / 5.1 MB)</div>
        </div>
      </div>

      <div style="padding: 2rem; border: 1px solid #ddd; border-radius: 8px; text-align: center;">
        <kds-progress-circle size="lg" progress="82" label="Course completion"></kds-progress-circle>
        <h4 style="margin: 1rem 0 0.25rem 0;">Course Progress</h4>
        <p style="margin: 0; color: #666;">82% Complete - Keep going!</p>
      </div>
    </div>
  `,
};

export const AnimatedProgress: Story = {
  render: () => {
    // Simulate progress animation
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      const circle = document.querySelector('#animated-progress') as any;
      if (circle) {
        circle.value = progress;
        if (progress >= 100) {
          clearInterval(interval);
        }
      }
    }, 50);

    return html`
      <div style="text-align: center;">
        <kds-progress-circle
          id="animated-progress"
          progress="0"
          label="Loading"
          size="lg"
        ></kds-progress-circle>
        <p style="margin: 1rem 0 0 0;">Watch the progress animate to 100%</p>
      </div>
    `;
  },
};

export const InDarkMode: Story = {
  render: () => html`
    <div style="background: #1a1a1a; padding: 2rem; border-radius: 8px;">
      <div style="display: flex; gap: 2rem; align-items: center;">
        <kds-progress-circle label="Loading"></kds-progress-circle>
        <kds-progress-circle progress="40"></kds-progress-circle>
        <kds-progress-circle progress="75"></kds-progress-circle>
      </div>
    </div>
  `,
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
