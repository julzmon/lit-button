# Checkbox & Radio Component Plan

## Architecture Decision: Separate vs. Combined

### Recommendation: **SEPARATE COMPONENTS** ✅

While both are binary input controls, we recommend creating:
- **`kds-checkbox`** - For multiple independent selections
- **`kds-radio`** - For single selection from a group (with `kds-radio-group` container)

**Rationale:**
1. **Different semantics**: Radio buttons must be grouped with shared `name`; checkboxes are independent
2. **Different sizing/spacing**: Radio buttons often appear in vertical groups; checkboxes mixed with text
3. **Different validation**: Radio groups validate as a unit; individual checkboxes validate independently
4. **Library patterns**: Adobe (Spectrum), Shoelace, WebAwesome all separate these
5. **Future flexibility**: Allows independent styling, behavior, and enhancement paths
6. **Smaller bundles**: Users can import only what they need

---

## Component Structure

### 1. **kds-checkbox** (Standalone)

**Files:**
- `src/kds-checkbox.component.ts`
- `src/kds-checkbox.styles.ts`

**Architecture:**
- Extends `LitElement`
- Form-associated component (`static formAssociated = true`)
- Uses native `<input type="checkbox">` internally for max compatibility
- Emits both native (`change`, `input`) and custom (`kds-change`) events
- Shadow DOM with `delegatesFocus: true`

**Key Features:**
```typescript
@property({ type: Boolean, reflect: true }) checked = false;
@property({ type: String }) value = "on";
@property({ type: Boolean, reflect: true }) disabled = false;
@property({ type: Boolean, reflect: true }) invalid = false;
@property({ type: Boolean, reflect: true }) required = false;
@property({ type: String }) name?: string;
@property({ type: String }) label?: string;
@property({ type: Boolean, attribute: 'hide-label' }) hideLabel = false;
@property({ type: String, attribute: 'error-message' }) errorMessage?: string;
@property({ type: String }) helpText?: string;
@property({ type: Boolean, reflect: true }) indeterminate = false; // Three-state
```

**Slots:**
- `label` - Custom label content
- `error` - Custom error content
- `help-text` - Custom help text

**CSS Parts:**
- `control` - The visual checkbox element (the box)
- `label` - The label text
- `error` - Error message container
- `help-text` - Help text container

**Layout Pattern (Similar to kds-text-input):**
```
┌─────────────────────────────────┐
│ [☑] Label text      (optional)  │
│                                 │
│ Error message (if invalid)      │
│ Help text                       │
└─────────────────────────────────┘
```

---

### 2. **kds-radio** (Part of a Group)

**Files:**
- `src/kds-radio.component.ts`
- `src/kds-radio.styles.ts`
- `src/kds-radio-group.component.ts` (Container/Coordinator)
- `src/kds-radio-group.styles.ts`

#### 2a. **kds-radio** (Individual Element)

**Architecture:**
- Extends `LitElement`
- Form-associated component (`static formAssociated = true`)
- Uses native `<input type="radio">` internally
- Standalone but designed to be used within `kds-radio-group`
- Can still work without group container (for advanced use cases)

**Key Properties:**
```typescript
@property({ type: Boolean, reflect: true }) checked = false;
@property({ type: String }) value = ""; // Required for radio groups
@property({ type: String }) name?: string;
@property({ type: Boolean, reflect: true }) disabled = false;
@property({ type: String }) label?: string;
@property({ type: Boolean, attribute: 'hide-label' }) hideLabel = false;
```

**Slots:**
- `label` - Custom label content

**CSS Parts:**
- `control` - The visual radio button
- `label` - The label text

**Layout (Minimal - horizontal inline):**
```
(●) Label
```

#### 2b. **kds-radio-group** (Container)

**Architecture:**
- Similar to `kds-input-group` (fieldset-based coordinator)
- Manages shared `name` across radio children
- Handles group-level validation and state
- Propagates disabled state to children

**Key Properties:**
```typescript
@property({ type: String }) label?: string;
@property({ type: Boolean, attribute: 'hide-label' }) hideLabel = false;
@property({ type: String }) value?: string; // Current selected radio value
@property({ type: Boolean, reflect: true }) disabled = false;
@property({ type: Boolean, reflect: true }) invalid = false;
@property({ type: Boolean, reflect: true }) required = false;
@property({ type: String, attribute: 'error-message' }) errorMessage?: string;
@property({ type: String }) helpText?: string;
@property({ type: String }) direction: 'row' | 'column' = 'column'; // Layout direction
@property({ type: String }) gap: 'sm' | 'md' | 'lg' = 'md'; // Spacing
```

**Slots:**
- `legend` - Custom legend content
- Default - Radio children
- `error` - Custom error content
- `help-text` - Custom help text

**CSS Parts:**
- `fieldset` - The fieldset wrapper
- `legend` - The legend element
- `group` - The container for radios

**Layout Pattern:**
```
╔════════════════════════════╗
║ Radio Group Label          ║
║ (●) Option 1               ║
║ ( ) Option 2               ║
║ ( ) Option 3               ║
║                            ║
║ Error message (if invalid) ║
║ Help text                  ║
╚════════════════════════════╝
```

---

## Form Association & Validation

### Checkbox Validation Pattern

```typescript
private internals: ElementInternals;

constructor() {
  super();
  this.internals = this.attachInternals();
}

private updateValidity() {
  if (this.disabled) {
    this.internals.setValidity({}, '');
    return;
  }

  const isValid = !this.required || this.checked;

  this.internals.setValidity(
    { valueMissing: !isValid },
    isValid ? '' : 'This field is required',
    this._native
  );
}

formResetCallback() {
  this.checked = this.hasAttribute('checked');
  this.updateValidity();
}

formDisabledCallback(isDisabled: boolean) {
  this.disabled = isDisabled;
}
```

### Radio Group Validation Pattern

```typescript
// Radio group manages group-level validation
private updateGroupValidity() {
  const selectedRadio = this.getSelectedRadio(); // Find checked radio child
  const isValid = !this.required || !!selectedRadio;

  this.internals.setValidity(
    { valueMissing: !isValid },
    isValid ? '' : 'Please select an option'
  );
}

// Each radio updates parent group when checked
private handleRadioChange = (event: CustomEvent) => {
  const radio = event.target as KdsRadio;
  if (radio.checked) {
    this.value = radio.value;
    this.updateGroupValidity();
  }
};
```

---

## Event Handling Strategy

### **kds-checkbox** Events

| Event | When | Detail | Bubbles |
|-------|------|--------|---------|
| `change` (native) | User toggles checkbox | — | ✓ |
| `input` (native) | User toggles checkbox | — | ✓ |
| `kds-change` (custom) | User toggles checkbox | `{ checked: boolean, value: string }` | ✓ |

**Implementation:**
```typescript
private handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  this.checked = target.checked;
  this.internals.setFormValue(this.checked ? this.value : null);
  this.updateValidity();

  // Re-dispatch native
  this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

  // Custom event
  this.dispatchEvent(new CustomEvent('kds-change', {
    detail: { checked: this.checked, value: this.value },
    bubbles: true,
    composed: true
  }));
};
```

### **kds-radio** Events

| Event | When | Detail | Bubbles |
|-------|------|--------|---------|
| `change` (native) | User selects radio | — | ✓ |
| `kds-change` (custom) | User selects radio | `{ checked: boolean, value: string }` | ✓ |

Note: `kds-radio-group` listens to child radio changes and manages state

### **kds-radio-group** Events

| Event | When | Detail |
|-------|------|--------|
| `kds-change` | Any child radio changes | `{ value: string }` |

---

## Styling Strategy

### CSS Custom Properties Structure

Follow the existing pattern from `kds-text-input`:

**Checkbox:**
```css
:host {
  /* Control sizing */
  --checkbox-size: var(--mod-checkbox-size, 1.25rem);
  --checkbox-border-width: var(--mod-checkbox-border-width, var(--kds-border-width-xs));
  --checkbox-border-radius: var(--mod-checkbox-border-radius, var(--kds-border-radius-xs));

  /* Colors */
  --checkbox-border-color: var(--mod-checkbox-border-color, var(--kds-border-neutral-emphasis-base));
  --checkbox-border-color-hover: var(--mod-checkbox-border-color-hover, var(--kds-border-neutral-emphasis-hover));
  --checkbox-border-color-focus: var(--mod-checkbox-border-color-focus, var(--kds-border-info-emphasis-base));
  --checkbox-bg-color: var(--mod-checkbox-bg-color, var(--kds-bg-surface-base));
  --checkbox-bg-color-checked: var(--mod-checkbox-bg-color-checked, var(--kds-bg-brand-emphasis-base));
  --checkbox-check-color: var(--mod-checkbox-check-color, var(--kds-fg-on-emphasis));

  /* Label styling */
  --label-color: var(--mod-label-color, var(--kds-fg-base));
  --label-font-size: var(--mod-label-font-size, var(--kds-font-size-md));
  --label-gap: var(--mod-checkbox-label-gap, var(--kds-space-md));

  /* Error/Help text */
  --error-color: var(--mod-error-color, var(--kds-fg-negative-base));
  --help-text-color: var(--mod-help-text-color, var(--kds-fg-neutral-base));
  --help-text-font-size: var(--mod-help-text-font-size, var(--kds-font-size-sm));

  /* Focus ring */
  --focus-ring-width: var(--mod-checkbox-focus-ring-width, var(--kds-border-width-xs));
  --focus-ring-color: var(--mod-checkbox-focus-ring-color, var(--checkbox-border-color-focus));
}
```

**Radio (Similar structure, adjusted for circular shape):**
```css
:host {
  --radio-size: var(--mod-radio-size, 1.25rem);
  --radio-border-radius: var(--mod-radio-border-radius, 50%); /* Circle */
  /* ... other props same pattern ... */
}
```

**Radio Group (Based on kds-input-group):**
```css
:host {
  display: block;
  --radio-group-gap: var(--mod-radio-group-gap, var(--kds-space-md));
  /* ... legend and group styling ... */
}

.group {
  display: flex;
  flex-direction: var(--radio-group-direction, column);
  gap: var(--radio-group-gap);
}
```

### Focus & Hover States

```css
.control {
  border-color: var(--checkbox-border-color);
  background: var(--checkbox-bg-color);
  transition: all 120ms ease;

  &:hover:not(:disabled) {
    border-color: var(--checkbox-border-color-hover);
  }

  &:focus-visible {
    border-color: var(--checkbox-border-color-focus);
    box-shadow: 0 0 0 var(--focus-ring-width) var(--focus-ring-color);
  }
}

:host([invalid]) .control {
  border-color: var(--kds-border-negative-emphasis-base);

  &:focus-visible {
    box-shadow: 0 0 0 var(--focus-ring-width) var(--kds-border-negative-emphasis-base);
  }
}

:host([disabled]) {
  opacity: var(--kds-base-opacity-disabled, 0.5);
  cursor: not-allowed;
}
```

### Checked State & Indeterminate

**Checkbox with native input:**
```css
.control {
  /* Styled representation, not the native input */

  input[type="checkbox"]:checked ~ .check-icon {
    opacity: 1;
  }

  input[type="checkbox"]:indeterminate ~ .check-icon {
    opacity: 1;
    /* Use minus icon instead of checkmark */
  }
}
```

---

## Accessibility Requirements

### ARIA Attributes

**Checkbox:**
- `aria-invalid` - Reflects `invalid` property
- `aria-required` - Reflects `required` property
- `aria-describedby` - Links to error/help text IDs (if present)
- `aria-label` or associated `<label>` for standalone checkboxes

**Radio:**
- `aria-invalid` - On radio group element
- `aria-required` - On radio group element
- `aria-describedby` - On radio group (error/help text)
- Each radio has implicit `aria-checked` via native input

**Radio Group:**
- `role="group"` (implicit via fieldset)
- `aria-labelledby` - Links to legend ID
- `aria-describedby` - Links to error/help text IDs

### Keyboard Navigation

**Checkbox:**
- `Space` - Toggle checked state
- `Tab` / `Shift+Tab` - Navigate focus
- Enter - Confirm (in forms)

**Radio Group:**
- `Tab` / `Shift+Tab` - Focus into group (first or selected radio)
- `Arrow Keys` (→ ↓) - Move selection forward in group
- `Arrow Keys` (← ↑) - Move selection backward
- `Home` / `End` - Jump to first/last option
- Automatic roving tabindex management

### Screen Reader Testing Checklist

- [ ] Checkbox announces as "checkbox"
- [ ] Label associates correctly with native input
- [ ] "Checked" state announced when toggled
- [ ] "Required" announced when `required` is set
- [ ] Error message announced when invalid
- [ ] Help text announced via `aria-describedby`
- [ ] Radio group announces as "group"
- [ ] Legend associates with group
- [ ] "Selected" option announced clearly
- [ ] Arrow key navigation works (no custom handling needed)

---

## Implementation Phases

### Phase 1: kds-checkbox (Foundation)
- [ ] Component structure with form association
- [ ] Native input integration (no custom styling of native element)
- [ ] Label/error/help-text slots
- [ ] Basic styling with CSS custom properties
- [ ] Validation via ElementInternals
- [ ] Event handling (native + custom)
- [ ] Demo in index.html
- [ ] JSDoc documentation

### Phase 2: kds-radio (Individual Element)
- [ ] Component structure (similar to checkbox)
- [ ] Name/value management for groups
- [ ] Minimal styling (controls look small)
- [ ] Same slot/event patterns
- [ ] Demo in index.html

### Phase 3: kds-radio-group (Container/Coordinator)
- [ ] Fieldset-based wrapper (like kds-input-group)
- [ ] Child radio coordination
- [ ] Roving tabindex for keyboard nav
- [ ] Group-level validation
- [ ] Direction/gap layout control
- [ ] Demo with multiple radio options
- [ ] Integration test with kds-radio children

### Phase 4: Advanced Features (Future)
- [ ] Indeterminate checkbox state
- [ ] Custom check icons (svg slots)
- [ ] Radio group with sub-labels/descriptions
- [ ] Checkbox list pattern component
- [ ] Integration with form submission flows

---

## File Structure Summary

```
src/
  kds-checkbox.component.ts       (150-200 lines)
  kds-checkbox.styles.ts          (180-220 lines)

  kds-radio.component.ts          (120-150 lines)
  kds-radio.styles.ts             (140-180 lines)

  kds-radio-group.component.ts    (200-250 lines)
  kds-radio-group.styles.ts       (150-200 lines)

Total: ~1000-1200 lines of code (similar to existing kds-text-input + kds-input-group)
```

---

## Design System Alignment

### Token Usage Pattern

Follow existing `kds-text-input` precedent:

```typescript
// From tokens.css (auto-generated, DO NOT EDIT):
--kds-space-md
--kds-space-lg
--kds-font-size-md
--kds-font-size-sm
--kds-border-radius-xs
--kds-border-width-xs
--kds-fg-base
--kds-fg-on-emphasis
--kds-fg-negative-base
--kds-bg-surface-base
--kds-bg-brand-emphasis-base
--kds-border-neutral-emphasis-base
--kds-border-info-emphasis-base
--kds-border-negative-emphasis-base
--kds-base-opacity-disabled
```

All controlled via `--mod-*` properties for override flexibility.

---

## Best Practice References

### Shoelace (Web Awesome)
- Form association using ElementInternals ✓
- Separate control + label styling ✓
- Event parity (native + custom) ✓
- CSS custom properties for theming ✓
- Roving tabindex for groups ✓

### Adobe Spectrum
- Separate checkbox/radio components ✓
- Radio group as container ✓
- Three-state checkbox ✓
- Validation framework integration ✓

### WAI-ARIA Patterns
- Accessible Checkbox Pattern - https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
- Accessible Radio Group - https://www.w3.org/WAI/ARIA/apg/patterns/radio/

---

## Next Steps

1. **Review & Feedback** - Validate this plan aligns with project goals
2. **Implement Phase 1** - Start with kds-checkbox
3. **Test Accessibility** - Verify with screen readers and keyboard nav
4. **Iterate on Styling** - Ensure consistency with existing components
5. **Add to Documentation** - Update copilot-instructions.md

