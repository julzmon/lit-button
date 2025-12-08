# Checkbox & Radio: Industry Standards Comparison

This document shows how the planned kds-checkbox and kds-radio components align with leading web component libraries and WAI-ARIA standards.

---

## Component Structure Comparison

### Adobe Spectrum (React/Web Components)

**Spectrum Checkbox:**
```jsx
<Checkbox name="test" isRequired>
  Accept terms
</Checkbox>
```
- Separate standalone component
- Wraps native input
- Supports indeterminate
- Custom styling via CSS variables
- Full form association

**Spectrum RadioGroup:**
```jsx
<RadioGroup label="Options" isRequired>
  <Radio value="a">Option A</Radio>
  <Radio value="b">Option B</Radio>
</RadioGroup>
```
- Radio group container
- Individual radio components
- Roving tabindex for keyboard nav
- Group-level validation

✅ **Our Plan Matches:** Separate components, form-associated, container pattern for groups

---

### Shoelace (Web Components)

**Shoelace Checkbox:**
```html
<sl-checkbox name="test" required>Accept terms</sl-checkbox>
```
- Standalone form component
- Label content as slot
- Help text + invalid slots
- ElementInternals for form
- Native + custom events

**Shoelace Radio Group:**
```html
<sl-radio-group name="choice" required>
  <sl-label slot="label">Choose one</sl-label>
  <sl-radio value="a">Option A</sl-radio>
  <sl-radio value="b">Option B</sl-radio>
</sl-radio-group>
```
- Radio group container
- RadioGroup manages state
- Roving tabindex navigation
- Event emitters for changes

✅ **Our Plan Matches:** Form association, slot patterns, separate components

---

### WebAwesome (Spectrum Web Components)

**Structure:**
- `<sp-checkbox>`  - Standalone
- `<sp-radio>`     - Individual
- `<sp-radio-group>` - Container
- Similar to Spectrum + Shoelace hybrid

✅ **Our Plan Matches:** Same separation and coordination pattern

---

## Detailed Comparison Table

| Feature | Adobe Spectrum | Shoelace | WebAwesome | **KDS Plan** |
|---------|---|---|---|---|
| **Checkbox Component** | ✓ Standalone | ✓ Standalone | ✓ Standalone | ✓ Standalone |
| **Radio Component** | ✓ Individual | ✓ Individual | ✓ Individual | ✓ Individual |
| **Radio Group** | ✓ Container | ✓ Container | ✓ Container | ✓ Container |
| **Native Input Wrapped** | ✓ Yes | ✓ Yes | ✓ Yes | ✓ Yes |
| **Form Association (ElementInternals)** | ✓ Yes | ✓ Yes | ✓ Yes | ✓ Yes |
| **Label Slot** | ✓ Yes | ✓ Yes | ✓ Yes | ✓ Yes |
| **Error Slot** | ✓ Yes | ✓ Yes | ✓ Yes | ✓ Yes |
| **Help Text Slot** | ✓ Yes | ✓ Yes | ✓ Yes | ✓ Yes |
| **Indeterminate Checkbox** | ✓ Yes | ✓ Yes | ✓ Yes | ✓ Yes |
| **Three-state Cycle** | ✓ Yes | ✓ Yes | ✓ Yes | ✓ Yes |
| **Roving Tabindex (Radio)** | ✓ Yes | ✓ Yes | ✓ Yes | ✓ Yes |
| **CSS Custom Properties** | ✓ Yes | ✓ Yes | ✓ Yes | ✓ Yes |
| **Native + Custom Events** | ✓ Yes | ✓ Yes | ✓ Yes | ✓ Yes |
| **Fieldset-based Group** | ✗ No | ✗ No | ✗ No | ✓ Yes |
| **Direction Control (row/col)** | ✓ Yes | ✓ Yes | ✓ Yes | ✓ Yes |

✅ **KDS Plan is aligned with industry standards** with one addition: fieldset-based radio group (better semantic HTML)

---

## WAI-ARIA Compliance

### W3C ARIA Checkbox Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/

**Requirements:**
- ✅ `role="checkbox"` (implicit via semantic checkbox or explicit)
- ✅ `aria-checked` state (true, false, mixed for indeterminate)
- ✅ Label text accessible via aria-label or associated label
- ✅ Keyboard: Space to toggle
- ✅ Cannot use global aria-readonly on disabled
- ✅ Use native input for maximum compatibility

**Our Implementation:**
```typescript
<input
  type="checkbox"
  id=${this._checkboxId}
  .checked=${this.checked}
  .indeterminate=${this.indeterminate}
  aria-invalid=${this.invalid}
  aria-describedby=${ariaDescribedBy}
/>
<label for=${this._checkboxId}>...</label>
```

✅ **Fully Compliant:** Native input + associated label + ARIA attributes

---

### W3C ARIA Radio Group Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/radio/

**Requirements:**
- ✅ `role="group"` on container (implicit via fieldset)
- ✅ `aria-labelledby` links group to legend/label
- ✅ Individual radios not hidden (use roving tabindex)
- ✅ Keyboard: Tab enters group, Arrows move selection, Home/End extremes
- ✅ Only one radio has `tabindex="0"`
- ✅ Others have `tabindex="-1"`
- ✅ Manage focus internally as user navigates with arrows

**Our Implementation:**
```typescript
<fieldset>
  <legend>Choose one</legend>
  <input
    type="radio"
    .checked=${this.checked}
    tabindex=${this.selected ? 0 : -1}
    aria-describedby=${ariaDescribedBy}
  />
  <!-- Other radios... -->
</fieldset>
```

✅ **Fully Compliant:** Fieldset + roving tabindex + native inputs

---

## Keyboard Navigation Comparison

### Checkbox - All Libraries Match

| Key | Action | Our Plan |
|-----|--------|----------|
| Tab | Focus in | ✅ |
| Shift+Tab | Focus out | ✅ |
| Space | Toggle | ✅ |
| Enter | Form submit | ✅ (native) |

### Radio Group - All Libraries Match

| Key | Action | Spectrum | Shoelace | KDS Plan |
|-----|--------|----------|----------|----------|
| Tab | Enter group | ✓ | ✓ | ✓ |
| Shift+Tab | Leave group | ✓ | ✓ | ✓ |
| Arrow Right | Next radio | ✓ | ✓ | ✓ |
| Arrow Down | Next radio | ✓ | ✓ | ✓ |
| Arrow Left | Prev radio | ✓ | ✓ | ✓ |
| Arrow Up | Prev radio | ✓ | ✓ | ✓ |
| Home | First radio | ✓ | ✓ | ✓ |
| End | Last radio | ✓ | ✓ | ✓ |

---

## Form Integration Pattern

### ElementInternals API Usage

All modern component libraries use the same pattern:

```typescript
// Adobe Spectrum, Shoelace, WebAwesome, KDS
export class Checkbox extends LitElement {
  static formAssociated = true;
  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  private handleChange = (event: Event) => {
    const value = (event.target as HTMLInputElement).checked
      ? this.value
      : null;

    // Update form
    this.internals.setFormValue(value);

    // Update validity
    const isValid = !this.required || this.checked;
    this.internals.setValidity(
      { valueMissing: !isValid },
      isValid ? '' : 'This field is required'
    );
  };

  formResetCallback() {
    this.checked = this.hasAttribute('checked');
  }

  formDisabledCallback(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
```

✅ **KDS Matches:** Same ElementInternals pattern as industry standard

---

## CSS Customization Pattern

### CSS Custom Properties Architecture

**Adobe Spectrum:**
```css
--spectrum-checkbox-size
--spectrum-checkbox-border-width
--spectrum-checkbox-border-radius
/* ...70+ properties for full theming... */
```

**Shoelace:**
```css
--sl-checkbox-size
--sl-checkbox-border-width
--sl-checkbox-border-radius
/* ...similar comprehensive set... */
```

**KDS Plan:**
```css
--mod-checkbox-size              /* Modifier override */
--mod-checkbox-border-width      /* Modifier override */
--mod-checkbox-border-radius     /* Modifier override */
/* Fallback to... */
--kds-space-md                   /* KDS design tokens */
--kds-border-radius-xs
/* Fallback to... */
1.25rem                          /* Hardcoded default */
```

✅ **KDS Improves:** Three-tier fallback system (modifier → token → default)
vs. single-tier (per-library var → default)

---

## Event Emission Pattern

### All Libraries Emit Native + Custom Events

**Shoelace Example:**
```typescript
private handleChange = (event: Event) => {
  // Re-dispatch native
  this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));

  // Custom event with detail
  this.dispatchEvent(new CustomEvent('sl-change', {
    detail: { checked: this.checked },
    bubbles: true,
    composed: true
  }));
};
```

**KDS Plan:**
```typescript
private handleChange = (event: Event) => {
  // Re-dispatch native
  this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

  // Custom event with detail
  this.dispatchEvent(new CustomEvent('kds-change', {
    detail: { checked: this.checked, value: this.value },
    bubbles: true,
    composed: true
  }));
};
```

✅ **KDS Matches:** Native + custom events, composed, bubbling

---

## Unique KDS Advantages

### 1. Fieldset-Based Radio Group
**vs. Other Libraries** (div-based container)

**Other Libraries:**
```html
<div role="radiogroup">
  <radio>...</radio>
</div>
```

**KDS Plan:**
```html
<fieldset>
  <legend>Label</legend>
  <radio>...</radio>
</fieldset>
```

**Benefit:** Better semantic HTML, native fieldset disabled support, legend always accessible

### 2. Three-Tier CSS Fallback
**vs. Single-Tier**

**Others:**
```css
--spectrum-checkbox-size: 1.25rem;
```

**KDS:**
```css
--checkbox-size: var(--mod-checkbox-size, var(--kds-space-lg, 1.25rem));
```

**Benefit:** Consistent with design tokens, supports page-level theme overrides, respects global design system

### 3. Built-in Integration with kds-input-group
**vs. No native grouping**

**Others:** No built-in way to group checkboxes/radios with other controls

**KDS:** Can be used within `kds-input-group` for mixed control groups

---

## Testing Compatibility

### Screen Reader Testing (NVDA, JAWS, VoiceOver)

**Expected Announcements:**

**Checkbox:**
```
"Unchecked checkbox, Accept terms, required"
[User presses Space]
"Checked checkbox, Accept terms"
```

**Radio Group:**
```
"Group, Choose one, required"
"Radio button, Option A, not checked, 1 of 3"
[User presses Down]
"Radio button, Option B, not checked, 2 of 3"
[User presses Space]
"Radio button, Option B, checked, 2 of 3"
```

### All Libraries Should Produce Same Output ✅

---

## Migration Path from Other Libraries

### From Shoelace to KDS

```html
<!-- Shoelace -->
<sl-checkbox name="test" required>Accept</sl-checkbox>

<!-- KDS -->
<kds-checkbox name="test" required label="Accept"></kds-checkbox>
```

**Changes:**
- Tag name: `sl-checkbox` → `kds-checkbox`
- Event: `sl-change` → `kds-change`
- Label: Slot content → Property or slot

### From Adobe Spectrum to KDS

```jsx
// Spectrum
<Checkbox name="test" isRequired>Accept</Checkbox>

// KDS
<kds-checkbox name="test" required label="Accept"></kds-checkbox>
```

**Changes:**
- Tag name: `Checkbox` → `kds-checkbox`
- Props: React `isRequired` → HTML `required`
- Label: Slot content → Property or slot

---

## Browser Support

### Target Browser Support (Based on KDS Constraints)

**Features Used:**
- ElementInternals API ✅ (Chrome 77+, Safari 16.4+, Firefox 94+)
- CSS Nesting ✅ (Chrome 120+, Safari 18+, Firefox 128+)
- CSS Custom Properties ✅ (All modern)
- Web Components / Shadow DOM ✅ (All modern)
- Lit v3 ✅ (ES2020+)

**Minimum ES2020 Requirement** (per tsconfig.json)

✅ **Compatible with KDS project requirements**

---

## Conclusion

The planned kds-checkbox and kds-radio components:

1. ✅ **Follow industry standards** (Adobe Spectrum, Shoelace, WebAwesome)
2. ✅ **Comply with WAI-ARIA patterns** (Checkbox, Radio Group)
3. ✅ **Use modern Web APIs** (ElementInternals, Shadow DOM, CSS nesting)
4. ✅ **Integrate with KDS design system** (Tokens, CSS layers, custom properties)
5. ✅ **Match existing component patterns** (kds-text-input, kds-button, kds-input-group)
6. ✅ **Support framework integration** (React, Vue, Angular via custom events)
7. ✅ **Enable custom theming** (Three-tier CSS fallback system)
8. ✅ **Provide accessibility** (ARIA, keyboard nav, screen reader support)

**Recommendation:** Proceed with implementation of kds-checkbox (Phase 1), then kds-radio + kds-radio-group

