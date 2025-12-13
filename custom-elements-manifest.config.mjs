// Custom Elements Manifest generation with post-processing to strip internals
export default {
  globs: ['src/**/*.component.ts'],
  outdir: '.',
  litelement: true,
  exclude: ['src/**/*.styles.ts'],
  /**
   * Post-process hook supported by @custom-elements-manifest/analyzer.
   * Filters out members marked with @internal/@private JSDoc and non-public internals.
   */
  plugins: [
    {
      name: 'hide-internals',
      packageLinkPhase({ customElementsManifest }) {
        for (const module of customElementsManifest.modules ?? []) {
          for (const decl of module.declarations ?? []) {
            // Process class members (properties, events, methods)
            // Keep properties as the primary public API surface
            if (decl.members) {
              decl.members = decl.members.filter((m) => {
                const jsDoc = (m.jsDoc || '').toLowerCase();
                const hasInternalTag = jsDoc.includes('@internal') || jsDoc.includes('@private') || jsDoc.includes('@ignore');
                const isState = (m.kind === 'field' || m.kind === 'property') && /@state\(\)/.test(jsDoc);

                // Hide Lit @state() and anything annotated internal/private/ignore
                if (hasInternalTag || isState) return false;

                // Hide members with privacy: "private" set by analyzer
                if (m.privacy === 'private' || m.privacy === 'protected') return false;

                // Hide underscore-prefixed members (naming convention for private)
                if (m.name && m.name.startsWith('_')) return false;

                // Hide common internal method patterns
                if (m.kind === 'method' && m.name && (
                  m.name.startsWith('handle') ||
                  m.name.startsWith('update') ||
                  m.name.startsWith('render') && m.name !== 'render'
                )) {
                  // Keep only if explicitly documented as public
                  const isPubliclyDocumented = jsDoc.includes('@public');
                  if (!isPubliclyDocumented) return false;
                }

                // Keep properties even if they have attribute mapping (avoid losing Properties in Docs)
                return true;
              });
            }

            // Keep only documented events (with names starting with 'kds-')
            if (decl.events) {
              decl.events = decl.events.filter((e) => {
                const jsDoc = (e.jsDoc || '').toLowerCase();
                const hasInternalTag = jsDoc.includes('@internal') || jsDoc.includes('@private') || jsDoc.includes('@ignore');
                if (hasInternalTag) return false;
                return typeof e.name === 'string' ? e.name.startsWith('kds-') : true;
              });
            }

            // Drop attributes entirely to prevent duplicate entries in Storybook Docs tables
            if (decl.attributes) {
              decl.attributes = [];
            }

            // Slots: keep named public slots; drop unnamed/internal if tagged
            if (decl.slots) {
              decl.slots = decl.slots.filter((s) => {
                const jsDoc = (s.jsDoc || '').toLowerCase();
                const hasInternalTag = jsDoc.includes('@internal') || jsDoc.includes('@private') || jsDoc.includes('@ignore');
                if (hasInternalTag) return false;
                return true;
              });
            }
          }
        }
        return customElementsManifest;
      },
    },
  ],
};
