# Checkbox & Radio: Architecture Comparison

## Quick Reference: Standalone vs. Group Patterns

### kds-checkbox (Standalone Form Control)

```html
<!-- Basic usage -->
<kds-checkbox 
  name="terms" 
  value="agreed"
  label="I agree to terms"
  required
></kds-checkbox>

<!-- With custom label and help text -->
<kds-checkbox 
  name="newsletter"
  value="yes"
  help-text="We send updates once a month"
>
  <span slot="label">Subscribe to <strong>newsletter</strong></span>
</kds-checkbox>

<!-- Invalid with error -->
<kds-checkbox 
  name="age" 
  invalid 
  error-message="You must be 18+ to continue"
></kds-checkbox>

<!-- Three-state (indeterminate) -->
<kds-checkbox 
  indeterminate 
  label="Select all items"
  aria-label="Select all items in list"
></kds-checkbox>
```

**Form Integration:**
```html
<form>
  <kds-checkbox name="option1" value="yes" label="Option 1"></kds-checkbox>
  <kds-checkbox name="option2" value="yes" label="Option 2"></kds-checkbox>
  <kds-checkbox name="option3" value="yes" label="Option 3"></kds-checkbox>
  <button type="submit">Submit</button>
</form>

<!-- Each checkbox submits independently:
  option1=yes (if checked)
  option2=yes (if checked)
  etc.
-->
```

---

### kds-radio (With kds-radio-group Container)

```html
<!-- Basic radio group -->
<kds-radio-group 
  label="Choose an option"
  name="preference"
  required
>
  <kds-radio value="option1" label="Option 1"></kds-radio>
  <kds-radio value="option2" label="Option 2"></kds-radio>
  <kds-radio value="option3" label="Option 3"></kds-radio>
</kds-radio-group>

<!-- Vertical layout (default) -->
<kds-radio-group 
  label="Priority"
  name="priority"
  direction="column"
  gap="md"
>
  <kds-radio value="high" label="High Priority"></kds-radio>
  <kds-radio value="normal" label="Normal"></kds-radio>
  <kds-radio value="low" label="Low"></kds-radio>
</kds-radio-group>

<!-- Horizontal layout -->
<kds-radio-group 
  label="Size"
  name="size"
  direction="row"
  gap="lg"
>
  <kds-radio value="sm" label="Small"></kds-radio>
  <kds-radio value="md" label="Medium"></kds-radio>
  <kds-radio value="lg" label="Large"></kds-radio>
</kds-radio-group>

<!-- With help text and error -->
<kds-radio-group 
  label="Delivery method"
  name="delivery"
  invalid
  error-message="Please select a delivery option"
  help-text="Standard delivery takes 5-7 business days"
>
  <kds-radio value="standard" label="Standard (Free)"></kds-radio>
  <kds-radio value="express" label="Express (+ $10)"></kds-radio>
  <kds-radio value="overnight" label="Overnight (+ $25)"></kds-radio>
</kds-radio-group>
```

**Form Integration:**
```html
<form>
  <kds-radio-group name="choice" label="Pick one" required>
    <kds-radio value="a" label="Choice A"></kds-radio>
    <kds-radio value="b" label="Choice B"></kds-radio>
  </kds-radio-group>
  <button type="submit">Submit</button>
</form>

<!-- Submits single value:
  choice=a (or choice=b, depending on selection)
-->
```

---

## Comparison Matrix

| Aspect | Checkbox | Radio (with Group) |
|--------|----------|-------------------|
| **Selection Model** | Multiple independent | Single from group |
| **Form Submission** | Each = separate field | All = single field |
| **Typical Use** | Feature toggles, confirmations | Exclusive choice |
| **Grouping** | Optional (visual only) | Required (semantic) |
| **Keyboard Nav** | Space/Tab | Arrow keys + Tab/Roving tabindex |
| **Name Attribute** | Individual per checkbox | Shared across group |
| **Validation** | Individual checkbox valid? | Any radio in group selected? |
| **CSS Parts** | control, label, error, help-text | Same + group-level |
| **Slots** | label, error, help-text | label (+ legend, error, help-text on group) |

---

## Component Behavior Details

### kds-checkbox Event Flow

```
User clicks checkbox
    ↓
Native <input type="checkbox"> toggles
    ↓
Change event fires on native input
    ↓
Component detects change
    ↓
Component updates:
  - this.checked = true/false
  - internals.setFormValue()
  - Validity state updated
    ↓
Component fires events:
  - Native "change" (re-dispatched, bubbling, composed)
  - Native "input" (re-dispatched, bubbling, composed)
  - Custom "kds-change" with detail: { checked, value }
    ↓
External listeners can respond
```

### kds-radio Event Flow

```
User clicks radio in group
    ↓
Native <input type="radio"> toggles
    ↓
Radio component fires "kds-change"
    ↓
kds-radio-group listens to child "kds-change"
    ↓
Group updates:
  - this.value = selected radio value
  - Updates roving tabindex
  - Updates form value
  - Updates validity
    ↓
Group fires "kds-change" with detail: { value }
    ↓
Form/listeners respond
```

---

## Layout Examples

### Checkbox Layouts

**Vertical Stack (Typical):**
```
┌─────────────────────┐
│ ☑ Option 1          │
│ □ Option 2          │
│ ☑ Option 3          │
└─────────────────────┘
```

**Inline (Row):**
```
┌────────────────────────────────────┐
│ ☑ Term 1  ☑ Term 2  □ Term 3      │
└────────────────────────────────────┘
```

**With Label & Help Text:**
```
Label
┌─────────────────────┐
│ ☑ Checkbox label    │
│                     │
│ Help text goes here │
│ Error (if invalid)  │
└─────────────────────┘
```

### Radio Group Layouts

**Vertical (Default):**
```
Radio Group Label
┌──────────────────┐
│ (●) Option A     │
│ ( ) Option B     │
│ ( ) Option C     │
│                  │
│ Help text here   │
│ Error (if bad)   │
└──────────────────┘
```

**Horizontal:**
```
Radio Group Label
┌──────────────────────────────────┐
│ (●) Small  ( ) Medium  ( ) Large │
└──────────────────────────────────┘
```

---

## Slot Composition Examples

### kds-checkbox with Slots

```html
<!-- Plain text label -->
<kds-checkbox name="test">
  Basic checkbox label
</kds-checkbox>

<!-- Rich HTML label -->
<kds-checkbox name="terms">
  <span slot="label">
    I agree to the <a href="/terms">terms of service</a>
  </span>
</kds-checkbox>

<!-- Custom error message -->
<kds-checkbox 
  name="confirm" 
  required 
  invalid
>
  <span slot="label">Confirm action</span>
  <span slot="error">You must confirm to continue</span>
</kds-checkbox>

<!-- Help text example -->
<kds-checkbox name="marketing" value="yes">
  <span slot="label">Receive marketing emails</span>
  <span slot="help-text">We only send important updates</span>
</kds-checkbox>

<!-- Everything customized -->
<kds-checkbox name="complex">
  <span slot="label">
    <strong>Multi-part</strong> label with HTML
  </span>
  <div slot="help-text">
    This is a longer helper text explaining what
    this checkbox does in detail.
  </div>
  <span slot="error">Custom error styling</span>
</kds-checkbox>
```

### kds-radio-group with Slots

```html
<!-- Basic group -->
<kds-radio-group name="choice" label="Pick one">
  <kds-radio value="a" label="Option A"></kds-radio>
  <kds-radio value="b" label="Option B"></kds-radio>
</kds-radio-group>

<!-- Custom legend -->
<kds-radio-group name="size">
  <span slot="legend">
    <strong>Select Size:</strong> Required for ordering
  </span>
  <kds-radio value="s" label="Small"></kds-radio>
  <kds-radio value="m" label="Medium"></kds-radio>
  <kds-radio value="l" label="Large"></kds-radio>
</kds-radio-group>

<!-- Group with help text -->
<kds-radio-group name="delivery">
  <span slot="legend">Delivery Method</span>
  <kds-radio value="std" label="Standard (5-7 days)"></kds-radio>
  <kds-radio value="exp" label="Express (2-3 days, +$10)"></kds-radio>
  <span slot="help-text">Choose based on your timeline</span>
</kds-radio-group>

<!-- Group with error -->
<kds-radio-group name="method" invalid>
  <span slot="legend">Payment Method</span>
  <kds-radio value="cc" label="Credit Card"></kds-radio>
  <kds-radio value="pp" label="PayPal"></kds-radio>
  <span slot="error">Select a payment method to continue</span>
</kds-radio-group>
```

---

## Accessibility Keyboard Navigation

### Checkbox Keyboard Behavior

| Key | Action |
|-----|--------|
| **Tab / Shift+Tab** | Navigate in/out of checkbox |
| **Space** | Toggle checked state |
| **Enter** | Activate associated form (if in form) |

**Simple Pattern:**
```
Form with checkboxes:

Tab → Checkbox 1 focused
Space → Toggle
Tab → Checkbox 2 focused
Space → Toggle
Tab → Button focused
```

### Radio Group Keyboard Behavior

| Key | Action |
|-----|--------|
| **Tab / Shift+Tab** | Navigate into group (first or currently selected radio) |
| **Arrow Right / Arrow Down** | Move selection forward |
| **Arrow Left / Arrow Up** | Move selection backward |
| **Home** | Select first radio |
| **End** | Select last radio |

**Roving Tabindex Pattern:**
```
Radio group with 3 options, 2nd selected:

Tab → Focus enters group, focuses 2nd radio (selected)
Down → Selection moves to 3rd radio (no refocus yet)
Right → Focus moves down
Home → Selection back to 1st, focus follows
Shift+Tab → Focus leaves group entirely
```

**Implementation Note:**
- Only one radio in group has `tabindex="0"` at a time
- Others have `tabindex="-1"`
- Group manages this internally
- Users experience single Tab stop, then arrow navigation within

---

## Validation State Examples

### Checkbox Validation

```typescript
// Required checkbox (must be checked)
<kds-checkbox 
  name="terms"
  required
  label="I agree"
></kds-checkbox>

// Component logic:
// If required && !checked → invalid
// If !required || checked → valid
```

### Radio Group Validation

```typescript
// Required radio group (must have selection)
<kds-radio-group 
  name="choice"
  required
  label="Select one"
>
  <kds-radio value="a" label="A"></kds-radio>
  <kds-radio value="b" label="B"></kds-radio>
</kds-radio-group>

// Group logic:
// If required && !selectedRadio → invalid
// If !required || selectedRadio → valid
```

---

## Property Binding Examples

### React / Vue Integration

**React with kds-checkbox:**
```jsx
const [agreed, setAgreed] = useState(false);

<kds-checkbox
  ref={checkboxRef}
  checked={agreed}
  onKdsChange={(e) => setAgreed(e.detail.checked)}
  label="I agree"
/>
```

**Vue with kds-radio-group:**
```vue
<template>
  <kds-radio-group 
    v-model="selectedSize"
    name="size"
    label="Size"
    @kds-change="onSizeChange"
  >
    <kds-radio value="sm" label="Small"></kds-radio>
    <kds-radio value="md" label="Medium"></kds-radio>
    <kds-radio value="lg" label="Large"></kds-radio>
  </kds-radio-group>
</template>

<script setup>
const selectedSize = ref('md');
const onSizeChange = (e) => {
  console.log('Size changed to:', e.detail.value);
};
</script>
```

---

## Implementation Checklist Summary

### kds-checkbox
- [ ] Form-associated component
- [ ] Native input integration
- [ ] Label + error + help-text slots
- [ ] Required/invalid/disabled states
- [ ] Indeterminate support
- [ ] Keyboard navigation (Space/Tab)
- [ ] CSS customization (--mod-*)
- [ ] ARIA attributes
- [ ] Native + custom event emission
- [ ] Demo in index.html
- [ ] Documentation

### kds-radio
- [ ] Form-associated component
- [ ] Native input integration
- [ ] Label slot
- [ ] Keyboard navigation (basic)
- [ ] Works standalone or in group
- [ ] ARIA attributes
- [ ] Event emission
- [ ] Demo in index.html

### kds-radio-group
- [ ] Fieldset-based container
- [ ] Child radio coordination
- [ ] Roving tabindex management
- [ ] Group validation
- [ ] Direction/gap layout
- [ ] Error + help-text support
- [ ] ARIA on group
- [ ] Keyboard navigation (arrows)
- [ ] Demo in index.html
- [ ] Documentation

