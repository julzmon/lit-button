# Checkbox & Radio Component Plan - Visual Summary

## Architecture Decision Tree

```
Should checkbox and radio be together?
│
├─ NO - Different semantics
│   ├─ Checkbox: Multiple independent selections
│   ├─ Radio: Single selection from group
│   └─ Different form behavior + keyboard nav
│
├─ NO - Different use cases
│   ├─ Checkbox: Feature toggles, confirmations, filters
│   ├─ Radio: Exclusive choice, single preference
│   └─ Usually don't appear together
│
├─ NO - Industry standard
│   ├─ Adobe Spectrum: Separate
│   ├─ Shoelace: Separate
│   ├─ WebAwesome: Separate
│   └─ All recommend separate components
│
└─ YES - But use a GROUP container for radios
    ├─ kds-radio works standalone
    ├─ kds-radio-group coordinates children
    └─ Similar to kds-text-input + kds-input-group pattern

DECISION: ✅ Create 3 separate components
├─ kds-checkbox (standalone)
├─ kds-radio (standalone or in group)
└─ kds-radio-group (container for radios)
```

---

## Component Structure

```
┌─────────────────────────────────────────────────────────────┐
│                     kds-checkbox                             │
│  Form-associated, standalone binary input control            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📋 Properties:                                             │
│  ├─ checked: boolean                                        │
│  ├─ value: string                                           │
│  ├─ label?: string                                          │
│  ├─ disabled: boolean                                       │
│  ├─ invalid: boolean                                        │
│  ├─ required: boolean                                       │
│  ├─ errorMessage?: string                                   │
│  ├─ helpText?: string                                       │
│  └─ indeterminate: boolean ⭐ (three-state)                 │
│                                                              │
│  📤 Events: change, input, kds-change                       │
│  📌 Slots: label, error, help-text                          │
│  🎨 Parts: control, label, error, help-text                │
│                                                              │
│  Pattern: Wraps <input type="checkbox">                     │
│  Form: ElementInternals for validation                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      kds-radio                               │
│  Form-associated, works standalone or in group              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📋 Properties:                                             │
│  ├─ checked: boolean                                        │
│  ├─ value: string (REQUIRED for group)                      │
│  ├─ name?: string                                           │
│  ├─ label?: string                                          │
│  └─ disabled: boolean                                       │
│                                                              │
│  📤 Events: change, input, kds-change                       │
│  📌 Slots: label                                            │
│  🎨 Parts: control, label                                   │
│                                                              │
│  Pattern: Wraps <input type="radio">                        │
│  Design: Minimal (circular control)                         │
│  Designed for: Groups or standalone use                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   kds-radio-group                            │
│  Fieldset-based container & coordinator                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📋 Properties:                                             │
│  ├─ value?: string (currently selected)                     │
│  ├─ name?: string (shared name)                             │
│  ├─ label?: string (legend)                                 │
│  ├─ disabled: boolean                                       │
│  ├─ invalid: boolean                                        │
│  ├─ required: boolean                                       │
│  ├─ errorMessage?: string                                   │
│  ├─ helpText?: string                                       │
│  ├─ direction: 'row' | 'column'                             │
│  └─ gap: 'sm' | 'md' | 'lg'                                 │
│                                                              │
│  📤 Events: kds-change                                      │
│  📌 Slots: legend, default (radios), error, help-text       │
│  🎨 Parts: fieldset, legend, group, error, help-text        │
│                                                              │
│  Pattern: <fieldset> with <legend>                          │
│  Responsibilities:                                          │
│    1. Manage child radios                                   │
│    2. Sync name across children                             │
│    3. Roving tabindex (single Tab stop)                     │
│    4. Group-level validation                                │
│    5. Layout control (direction/gap)                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Visual Layout Examples

### kds-checkbox

**Default (vertical stack):**
```
┌───────────────────────────┐
│ ☑ Option 1                │
│ ☐ Option 2                │
│ ☑ Option 3                │
└───────────────────────────┘
```

**With label + help text:**
```
┌─────────────────────────────────────┐
│ Choose options                      │
│                                     │
│ ☑ Option 1                          │
│   Help text for option 1            │
│                                     │
│ ☐ Option 2                          │
│   Help text for option 2            │
│                                     │
│ Error (if invalid)                  │
└─────────────────────────────────────┘
```

**Indeterminate (select all pattern):**
```
┌─────────────────────────────────────┐
│ ☒ Select all (indeterminate state)  │ ← Shows dash, not checkmark
│                                     │
│ ☑ Item 1                            │ ← Can be checked
│ ☑ Item 2                            │ ← Or unchecked
│ ☐ Item 3                            │
└─────────────────────────────────────┘
```

### kds-radio-group

**Vertical (default):**
```
┌─────────────────────────────┐
│ Choose one                  │
│                             │
│ ◉ Option A (selected)       │
│ ○ Option B                  │
│ ○ Option C                  │
│                             │
│ Help text                   │
└─────────────────────────────┘
```

**Horizontal (direction="row"):**
```
┌──────────────────────────────────────┐
│ Size:  ◉ Small  ○ Medium  ○ Large   │
└──────────────────────────────────────┘
```

**With legend + large gap:**
```
╔═══════════════════════════════════╗
║ Delivery Method                   ║
║ (This is the <legend>)            ║
║                                   ║
║ ◉ Standard Shipping (Free)        ║
║                                   ║ ← gap="lg"
║ ○ Express (2-3 days, +$10)        ║
║                                   ║ ← gap="lg"
║ ○ Overnight (1 day, +$25)         ║
║                                   ║
║ Delivery takes 5-7 business days  ║
║ unless express option selected.   ║
╚═══════════════════════════════════╝
```

---

## Event Flow Diagrams

### kds-checkbox Event Flow

```
User clicks checkbox
         ↓
  Native input fires change
         ↓
Component.handleChange() triggered
         ↓
      ├─ Update checked property
      ├─ Update indeterminate (if applicable)
      ├─ Call internals.setFormValue(value or null)
      ├─ Update validity via internals.setValidity()
      └─ Fire events:
         ├─ Re-dispatch native "change" (bubbling, composed)
         ├─ Re-dispatch native "input" (bubbling, composed)
         └─ Dispatch custom "kds-change" with:
            { checked: boolean, value: string }
         ↓
Application listeners respond
```

### kds-radio-group Event Flow

```
User clicks radio in group
         ↓
  kds-radio fires "kds-change"
         ↓
kds-radio-group listens (slotted child event)
         ↓
Group updates:
   ├─ Set this.value = radio's value
   ├─ Update roving tabindex (only this radio gets tabindex=0)
   ├─ Call internals.setFormValue(value)
   ├─ Update validity (required = at least one selected)
   └─ Fire "kds-change" with:
      { value: string }
         ↓
Application listeners respond
```

---

## Keyboard Navigation Diagram

### kds-checkbox

```
Start with form:
┌─────────────────────────────┐
│ ☐ Agree to terms            │
│                             │
│ [Submit] button             │
└─────────────────────────────┘

User presses Tab:
  → Focus moves to checkbox ✓

User presses Space:
  → Checkbox toggles ✓ → ☑ Agree to terms

User presses Tab:
  → Focus moves to Submit button

User presses Enter or Space:
  → Form submits (if valid)
```

### kds-radio-group

```
Radio Group (3 options):
┌──────────────────────────┐
│ (●) Option A (selected)  │ ← Has tabindex="0"
│ ( ) Option B             │ ← Has tabindex="-1"
│ ( ) Option C             │ ← Has tabindex="-1"
└──────────────────────────┘

User presses Tab:
  → Focus enters group, lands on selected radio (A)
  → Visual focus on Option A ✓

User presses Down Arrow:
  → Selection moves to B (visual focus moves, no browser focus change)
  → tabindex changes: A gets -1, B gets 0
  → Screen reader announces "Option B, not selected"

User presses Home:
  → Selection jumps to A
  → tabindex resets: B gets -1, A gets 0

User presses Space:
  → Select current radio (A)
  → Fire change event
  → kds-radio-group updates form value

User presses Shift+Tab:
  → Focus leaves group entirely
```

**Key:** Only ONE radio has `tabindex="0"` at a time. This is the "roving tabindex" pattern.

---

## Form Submission Behavior

### Checkbox Form Values

```html
<form>
  <kds-checkbox name="opt1" value="yes" label="Option 1"></kds-checkbox>
  <kds-checkbox name="opt2" value="yes" label="Option 2"></kds-checkbox>
  <kds-checkbox name="opt3" value="yes" label="Option 3"></kds-checkbox>
  <button type="submit">Submit</button>
</form>
```

**If opt1 and opt3 are checked:**
```
FormData:
  opt1=yes
  opt3=yes
  (opt2 is absent, not sent)

JavaScript:
  form.value = { opt1: 'yes', opt3: 'yes' }
```

### Radio Group Form Values

```html
<form>
  <kds-radio-group name="choice" label="Pick one">
    <kds-radio value="a" label="A"></kds-radio>
    <kds-radio value="b" label="B"></kds-radio>
    <kds-radio value="c" label="C"></kds-radio>
  </kds-radio-group>
  <button type="submit">Submit</button>
</form>
```

**If "B" is selected:**
```
FormData:
  choice=b
  (only ONE value, the selected one)

JavaScript:
  form.value = { choice: 'b' }
```

---

## CSS Custom Property Hierarchy

### Checkbox Styling Chain

```
┌────────────────────────────────────────────────────┐
│ 1️⃣ Page-level override (highest priority)         │
│    <style>                                         │
│      :root {                                       │
│        --mod-checkbox-size: 1.5rem;               │
│      }                                             │
│    </style>                                        │
│    ↓                                               │
│ 2️⃣ Component CSS                                  │
│    :host {                                        │
│      --checkbox-size: var(--mod-checkbox-size,   │
│        var(--kds-space-lg, 1.25rem)               │
│      );                                            │
│    }                                               │
│    ↓ (if --mod-checkbox-size not set)             │
│ 3️⃣ Design token                                   │
│    --kds-space-lg = 1.25rem (from tokens.css)     │
│    ↓ (if --kds-space-lg not set)                  │
│ 4️⃣ Hardcoded default (lowest priority)           │
│    1.25rem                                        │
└────────────────────────────────────────────────────┘

Result: Checkbox uses 1.5rem (from page override)
```

---

## Comparison: Before & After

### Before: User Needs Both Controls

```
Separate libraries, separate import, separate learning curves:
├─ Shoelace checkbox: <sl-checkbox>
├─ Shoelace radio: <sl-radio>
├─ Adobe checkbox: <sp-checkbox>
├─ Adobe radio: <sp-radio>
└─ No unified design system
```

### After: KDS Unified

```
Single design system, consistent patterns:
├─ kds-checkbox (form-associated, slots, validation)
├─ kds-radio (form-associated, works in groups)
├─ kds-radio-group (fieldset-based, coordinating)
└─ All use:
   ├─ KDS design tokens (--kds-*)
   ├─ CSS custom property overrides (--mod-*)
   ├─ Same event patterns (native + custom)
   ├─ Same validation (ElementInternals)
   └─ Same accessibility (ARIA, keyboard nav)
```

---

## Validation State Machine

### Checkbox Validation

```
┌─────────────────────────────────────────────────────┐
│ checkbox state:                                     │
│   checked: false (unchecked)                        │
│   required: true                                    │
│   disabled: false                                   │
└─────────────────────────────────────────────────────┘

Validation logic:
  isValid = !required || checked
           = !true || false
           = false

Result: ❌ INVALID
        errorMessage: "This field is required"

─────────────────────────────────────────────────────

User clicks checkbox:
  checked: true ✓

isValid = !true || true
        = true

Result: ✅ VALID
        errorMessage: ""
```

### Radio Group Validation

```
┌──────────────────────────────────────────────────────┐
│ radio-group state:                                   │
│   value: undefined (no selection)                    │
│   required: true                                     │
│   disabled: false                                    │
│   children: [radio-a, radio-b, radio-c]             │
└──────────────────────────────────────────────────────┘

Validation logic:
  selectedRadio = find(children where checked=true)
  isValid = !required || !!selectedRadio
          = !true || !!undefined
          = false

Result: ❌ INVALID
        errorMessage: "Please select an option"

─────────────────────────────────────────────────────

User presses Down arrow, then Space to select radio-b:
  value: "b" ✓
  selectedRadio: radio-b

isValid = !true || !!radio-b
        = true

Result: ✅ VALID
        errorMessage: ""
```

---

## Implementation Sequence

```
┌──────────────────────────────────────────────────┐
│ Phase 1: kds-checkbox (2 weeks)                  │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│ Files: .component.ts (.styles.ts                 │
│ Size: ~400 lines                                 │
│ Focus: Form association, slots, validation      │
│ Tests: Form submit, keyboard, ARIA              │
└──────────────────────────────────────────────────┘
           ↓ (Build on patterns from checkbox)
┌──────────────────────────────────────────────────┐
│ Phase 2: kds-radio (1 week)                      │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│ Files: .component.ts + .styles.ts                │
│ Size: ~300 lines                                 │
│ Focus: Similar to checkbox, standalone use      │
│ Tests: Works solo and with group                │
└──────────────────────────────────────────────────┘
           ↓ (Coordinate radios)
┌──────────────────────────────────────────────────┐
│ Phase 3: kds-radio-group (1.5 weeks)             │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│ Files: .component.ts + .styles.ts                │
│ Size: ~400 lines                                 │
│ Focus: Fieldset, roving tabindex, coordination  │
│ Tests: Group behavior, keyboard nav, ARIA       │
└──────────────────────────────────────────────────┘

Total: ~1,100 lines code | ~4-5 weeks | 3 components
```

---

## Quick Start Checklist

- [ ] Read `CHECKBOX-RADIO-QUICKSTART.md` (this file)
- [ ] Review `COMPONENT-PLAN-SUMMARY.md` (decision overview)
- [ ] Scan `COMPONENT-PLAN-CHECKBOX-RADIO.md` (architecture)
- [ ] Check `CHECKBOX-RADIO-EXAMPLES.md` (usage patterns)
- [ ] Use `CHECKBOX-RADIO-CODE-REFERENCE.md` (implementation)
- [ ] Validate against `CHECKBOX-RADIO-STANDARDS-ANALYSIS.md`

**Ready to start Phase 1?**
→ Begin with `CHECKBOX-RADIO-CODE-REFERENCE.md` kds-checkbox section

