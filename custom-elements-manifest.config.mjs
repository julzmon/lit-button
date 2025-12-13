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
            if (decl.members) {
              decl.members = decl.members.filter((m) => {
                const jsDoc = (m.jsDoc || '').toLowerCase();
                const hasInternalTag = jsDoc.includes('@internal') || jsDoc.includes('@private') || jsDoc.includes('@ignore');
                const isState = (m.kind === 'field' || m.kind === 'property') && /@state\(\)/.test(jsDoc);
                // Hide Lit @state() and anything annotated internal/private/ignore
                if (hasInternalTag || isState) return false;

                // Optionally hide non-reflected props (keep public attributes only)
                if (m.kind === 'field' || m.kind === 'property') {
                  // analyzer marks attributes separately; when no attribute name is present, treat as non-public
                  const hasAttribute = !!m.attribute;
                  // Keep properties explicitly intended as public (with attribute mapping)
                  if (!hasAttribute) return false;
                }
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
