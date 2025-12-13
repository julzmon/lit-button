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
    transition: background-color 200ms, color 200ms;
  }

  /* Apply data-mode attribute to root for theme switching */
  :root[data-mode="dark"] {
    background-color: var(--kds-bg-surface-base);
    color: var(--kds-fg-base);
  }

  :root[data-mode="light"] {
    background-color: var(--kds-bg-surface-base);
    color: var(--kds-fg-base);
  }
`;
document.head.appendChild(style);

const preview: Preview = {
  globalTypes: {
    colorMode: {
      name: 'Color Mode',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' }
        ],
        dynamicTitle: true
      }
    }
  },
  decorators: [
    (story, context) => {
      // Apply data-mode attribute to root based on toolbar selection
      const colorMode = context.globals.colorMode || 'light';
      document.documentElement.setAttribute('data-mode', colorMode);

      return html`${story()}`;
    },
  ],
  parameters: {
    layout: 'centered',
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
      disable: true,
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