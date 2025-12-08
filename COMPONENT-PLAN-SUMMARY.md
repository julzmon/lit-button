# Checkbox & Radio Component Plan - Summary

## Decision: Separate Components + Reuse Existing ✅

Create **two new components** and enhance one existing:
- **`kds-checkbox`** - Standalone binary input with label, error, help text
- **`kds-radio`** - Individual radio button (designed for groups)
- **`kds-input-group` (enhanced)** - Existing fieldset-based container, enhanced to coordinate radio/checkbox children

**Key Insight:** Your existing `kds-input-group` already has 80% of what's needed for radio/checkbox groups! It has fieldset structure, legend, error/help text, disabled propagation, and ARIA support. We just need to add:
- Layout control (`direction`, `gap` properties)
- Radio coordination (`value` property, roving tabindex)
- Detection logic to identify when children are radios vs. other controls

---

## Why This Approach?

1. **Semantic Correctness** - Different HTML semantics and form behaviors
2. **Different UX Patterns** - Checkboxes independent, radios grouped
3. **Reuse Existing Infrastructure** - `kds-input-group` already provides fieldset, legend, error/help text ✅
4. **Fewer Components** - 2 new components instead of 3 (checkbox, radio vs. checkbox, radio, radio-group)
5. **More Flexible** - Enhanced `kds-input-group` can group radios, checkboxes, or mixed controls
6. **Bundle Efficiency** - Users import only what they need

---

## Architecture Overview

### kds-checkbox
```
┌─────────────────────────────┐
│ [☑] Label text              │
│                             │
│ Error message (if invalid)  │
│ Help text                   │
└─────────────────────────────┘
```

**Type:** Form-associated standalone component
**Key Features:**
- Native `<input type="checkbox">` wrapped in custom element
- Label, error message, help text with slots
- Three-state support (indeterminate)
- CSS customization via `--mod-checkbox-*` props
- Events: native (`change`, `input`) + custom (`kds-change`)

---

### kds-radio + kds-radio-group
```
Radio Group Label
┌────────────────────┐
│ (●) Option 1       │
│ ( ) Option 2       │
│ ( ) Option 3       │
│                    │
│ Help text          │
│ Error (if invalid) │
└────────────────────┘
```

**kds-radio Type:** Form-associated component (works standalone or in group)
**kds-radio-group Type:** Fieldset-based container/coordinator

**Key Features:**
- Individual radios wrap native `<input type="radio">`
- Radio group manages shared name and roving tabindex
- Support for vertical and horizontal layouts
- Group-level validation (any selected = valid if required)
- Smart keyboard nav: Tab enters group, arrows move within

---

## Form Association Pattern

Both components use `ElementInternals` for proper form integration:

```typescript
@customElement("kds-checkbox")
export class KdsCheckbox extends LitElement {
  static formAssociated = true;
  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  private handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;

    // Update form value
    this.internals.setFormValue(this.checked ? this.value : null);

    // Update validity
    this.updateValidity();

    // Emit events
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent("kds-change", {
      detail: { checked: this.checked, value: this.value }
    }));
  };
}
```

---

## Key Properties

### kds-checkbox
- `checked: boolean` - Current checked state
- `value: string` - Form submission value
- `name?: string` - HTML name attribute
- `label?: string` - Display label text
- `disabled: boolean` - Disable control
- `invalid: boolean` - Invalid state styling
- `required: boolean` - Validation requirement
- `errorMessage?: string` - Error text
- `helpText?: string` - Help text
- `indeterminate: boolean` - Three-state

### kds-radio
- `checked: boolean` - Currently selected
- `value: string` - **REQUIRED** for form
- `name?: string` - Shared in group
- `label?: string` - Display label
- `disabled: boolean` - Disable control

### kds-radio-group
- `value?: string` - Currently selected radio value
- `name?: string` - Shared name for children
- `label?: string` - Legend text
- `disabled: boolean` - Disable group
- `invalid: boolean` - Invalid state
- `required: boolean` - Validation requirement
- `errorMessage?: string` - Error text
- `helpText?: string` - Help text
- `direction: 'row' | 'column'` - Layout direction
- `gap: 'sm' | 'md' | 'lg'` - Spacing

---

## Slots

### kds-checkbox
- `label` - Custom label HTML
- `error` - Custom error HTML
- `help-text` - Custom help text HTML

### kds-radio
- `label` - Custom label HTML

### kds-radio-group
- `legend` - Custom legend HTML
- (default) - Radio children
- `error` - Custom error HTML
- `help-text` - Custom help text HTML

---

## CSS Parts

### kds-checkbox
- `control` - The checkbox box element
- `label` - The label text
- `error` - Error container
- `help-text` - Help text container

### kds-radio
- `control` - The radio circle
- `label` - The label text

### kds-radio-group
- `fieldset` - The fieldset wrapper
- `legend` - The legend element
- `group` - The container for radios
- `error` - Error container
- `help-text` - Help text container

---

## CSS Custom Properties

### All Use `--mod-*` Override Pattern

**kds-checkbox:**
```css
--mod-checkbox-size              /* Control size */
--mod-checkbox-border-width
--mod-checkbox-border-radius
--mod-checkbox-border-color
--mod-checkbox-border-color-hover
--mod-checkbox-border-color-focus
--mod-checkbox-bg-color
--mod-checkbox-bg-color-checked
--mod-checkbox-check-color       /* Checkmark color */
--mod-checkbox-label-gap
--mod-focus-ring-width
--mod-focus-ring-color
```

**kds-radio:**
```css
--mod-radio-size                 /* Control size (circular) */
--mod-radio-border-width
--mod-radio-border-color
--mod-radio-border-color-hover
--mod-radio-border-color-focus
--mod-radio-bg-color
--mod-radio-bg-color-checked
--mod-radio-check-color
--mod-radio-label-gap
--mod-focus-ring-width
--mod-focus-ring-color
```

**kds-radio-group:**
```css
--mod-radio-group-gap            /* Gap between radio options */
--mod-radio-group-direction      /* row or column */
--mod-legend-color
--mod-legend-font-size
--mod-error-color
--mod-help-text-color
```

All fallback to `--kds-*` design tokens → hardcoded defaults

---

## Events

### kds-checkbox
| Event | When | Detail | Composed |
|-------|------|--------|----------|
| `change` | User toggles | — | ✓ |
| `input` | User toggles | — | ✓ |
| `kds-change` | User toggles | `{ checked, value }` | ✓ |

### kds-radio
| Event | When | Detail | Composed |
|-------|------|--------|----------|
| `change` | User selects | — | ✓ |
| `input` | User selects | — | ✓ |
| `kds-change` | User selects | `{ checked, value }` | ✓ |

### kds-radio-group
| Event | When | Detail |
|-------|------|--------|
| `kds-change` | Any radio changes | `{ value }` |

---

## Keyboard Navigation

### kds-checkbox
- **Tab / Shift+Tab** - Focus in/out
- **Space** - Toggle checked state

### kds-radio (Standalone)
- **Tab / Shift+Tab** - Focus in/out
- **Space** - Select

### kds-radio-group
- **Tab** - Focus enters group (selected or first radio)
- **Shift+Tab** - Focus leaves group
- **Arrow Right / Down** - Select next radio
- **Arrow Left / Up** - Select previous radio
- **Home** - Select first radio
- **End** - Select last radio

Implementation uses **roving tabindex**:
- Only selected radio has `tabindex="0"`
- Others have `tabindex="-1"`
- Group manages this automatically

---

## Accessibility

### ARIA Attributes Applied Automatically

**kds-checkbox:**
- `aria-invalid` - Reflects `invalid` state
- `aria-required` - Reflects `required` state
- `aria-describedby` - Links to error/help text IDs

**kds-radio:**
- (Implicit via native input)
- Can be used with accessible names

**kds-radio-group:**
- `role="group"` (via fieldset)
- `aria-labelledby` - Links to legend
- `aria-describedby` - Links to error/help text
- `aria-required` - If group is required

### Implementation Guidance
- Use native inputs internally (maximum browser support)
- All label associations automatic via IDs
- Error/help text linked via `aria-describedby`
- No custom keyboard handling needed (native behavior works)

---

## Validation Strategy

### kds-checkbox Validation
```
If required && !checked → invalid (valueMissing)
Otherwise → valid
```

### kds-radio-group Validation
```
If required && no radio selected → invalid (valueMissing)
If any radio selected → valid
```

Both use `ElementInternals.setValidity()` for proper form integration.

---

## Implementation Phases

### Phase 1: kds-checkbox (Priority 1)
Foundation for form-associated pattern. Standalone and simple.
- [ ] Component + styles
- [ ] Form association
- [ ] Validation
- [ ] Events + slots
- [ ] Demo + docs
- [ ] ~150-200 lines component + 180-220 lines styles

### Phase 2: kds-radio (Priority 2)
Build on checkbox pattern. Similar implementation.
- [ ] Component + styles
- [ ] Works standalone or in group context
- [ ] ~120-150 lines component + 140-180 lines styles

### Phase 3: kds-radio-group (Priority 3)
Most complex. Fieldset-based, roving tabindex, coordination.
- [ ] Container component
- [ ] Child radio coordination
- [ ] Roving tabindex management
- [ ] Keyboard navigation
- [ ] ~200-250 lines component + 150-200 lines styles

### Phase 4: Advanced (Future)
- Indeterminate state styling improvements
- Custom check/radio icons via slots
- "Select all" checkbox pattern
- Checkbox list composite

---

## Code References

**See these files for detailed examples:**
- `COMPONENT-PLAN-CHECKBOX-RADIO.md` - Full architectural plan with design decisions
- `CHECKBOX-RADIO-EXAMPLES.md` - Usage examples and layout patterns
- `CHECKBOX-RADIO-CODE-REFERENCE.md` - Ready-to-use code snippets and templates

---

## Integration with Existing Components

### Pattern Consistency
- Form association: Same as `kds-text-input`
- Slot pattern: label/error/help-text slots
- CSS customization: `--mod-*` + `--kds-*` fallback chain
- Event pattern: Native + custom events
- Styling: CSS custom properties + layers

### Can Be Used With
- `kds-button` - Wrapped in button groups for forms
- `kds-input-group` - Grouped controls (checkbox + select, etc.)
- `kds-text-input` - Mixed in forms
- Form wrapper library (validates via ElementInternals)

---

## Success Criteria

✅ **Technical:**
- Form association works (ElementInternals)
- Events bubble and compose properly
- CSS custom properties fully themeable
- Keyboard navigation follows WAI-ARIA patterns
- Screen readers announce correctly

✅ **Design:**
- Consistent with existing KDS components
- CSS nesting and layers used appropriately
- Size variants support (sm/md/lg if needed)
- Color variants integrated with KDS tokens

✅ **Documentation:**
- JSDoc comments complete
- CSS parts documented
- CSS properties documented
- Examples in index.html
- Works standalone and in compositions

---

## Notes

1. **Native Input Hiding** - Use absolute positioning + opacity 0, not `display: none` or `visibility: hidden` (preserves click target size)

2. **Roving Tabindex** - Critical for radio groups. Only one focusable radio at a time, arrow keys move selection seamlessly

3. **Indeterminate State** - Only on checkbox. Click on indeterminate moves to fully checked (third-state cycle: unchecked → indeterminate → checked)

4. **Form Value Semantics** - Checkbox submits value only if checked. Radio group submits selected value. Use `internals.setFormValue()`

5. **Label Association** - Never use implicit label wrapping native input (won't work in shadow DOM). Use `for`/`id` or just label next to control

6. **Styling Native Input** - Don't try to style the native `<input>`. Hide it and style a custom element (div) that mirrors its state

---

## Questions to Validate

1. **Size variants?** (sm/md/lg like buttons?) - Currently: just one size, customizable via `--mod-checkbox-size`
2. **Checkbox groups** Provide a container component like `kds-checkbox-group`? - Currently: No, users flex + gaps
3. **Inline radios?** Always support direction="row"? - Yes, already in plan
4. **Integration tests?** Test checkbox + radio-group together? - Yes, phase 4 could be "checkbox list"

