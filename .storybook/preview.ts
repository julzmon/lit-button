import type { Preview } from '@storybook/web-components-vite'
import { setCustomElementsManifest } from '@storybook/web-components';
import { html } from 'lit';
import customElements from '../custom-elements.json';
import '../tokens.css';

setCustomElementsManifest(customElements);

// Add global styles for Storybook
const style = document.createElement('style');
style.textContent = `
  body {
    font-family: system-ui, -apple-system, sans-serif;
    background-color: var(--kds-bg-surface-base);
    color: var(--kds-fg-base);
  }
`;
document.head.appendChild(style);

const preview: Preview = {
  decorators: [
    (story) => html`
      <div style="padding: 1rem;">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
      expanded: true,
      // Hide internal/private-ish props globally
      exclude: [
        'shadowRootOptions',
        'internals',
        /^(#|_).*$/, // private fields and underscore-prefixed
        'uid',
        'inputId',
        'helpTextId',
        'errorId',
      ],
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
    docs: {
      toc: true,
      source: { excludeDecorators: true },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    shadowRootOptions: {
      table: { disable: true },
    },
    internals: { table: { disable: true } },
  },
};

export default preview;