# Checkbox & Radio Components - Quick Start Guide

## 📋 Documents Overview

You now have 5 planning documents. Here's what's in each:

### 1. **COMPONENT-PLAN-SUMMARY.md** ← START HERE
Quick overview of the decision (separate components) with key properties, events, and implementation phases. 2-3 minute read. Perfect for getting oriented.

### 2. **COMPONENT-PLAN-CHECKBOX-RADIO.md**
Deep architectural plan with design decisions, form validation patterns, accessibility requirements, and implementation phases. Comprehensive reference. 10-15 minute read.

### 3. **CHECKBOX-RADIO-EXAMPLES.md**
Real-world usage examples, layout patterns, keyboard navigation details, and slot composition examples. Copy-paste ready HTML + JavaScript patterns.

### 4. **CHECKBOX-RADIO-CODE-REFERENCE.md**
Ready-to-use TypeScript code snippets for implementation. Component shells, styling templates, and event handling patterns. Start implementing from here.

### 5. **CHECKBOX-RADIO-STANDARDS-ANALYSIS.md**
Comparison with Adobe Spectrum, Shoelace, WebAwesome, and WAI-ARIA standards. Validates that our approach is industry-standard.

---

## 🎯 Quick Decision Summary

### Architecture: SEPARATE COMPONENTS ✅

Create three separate components:

```
kds-checkbox          (standalone binary input)
├─ Form-associated
├─ Native <input type="checkbox"> wrapped
├─ Label + error + help-text slots
├─ Three-state support (indeterminate)
└─ Events: change, input, kds-change

kds-radio             (individual radio button)
├─ Form-associated
├─ Native <input type="radio"> wrapped
├─ Can be standalone or in group
└─ Events: change, input, kds-change

kds-radio-group       (fieldset container/coordinator)
├─ Manages radio children
├─ Roving tabindex for keyboard nav
├─ Group-level validation
├─ Direction + gap layout control
└─ Event: kds-change with selected value
```

### Why Separate?
1. Different semantics (independent vs. grouped)
2. Different form behaviors (multiple vs. single)
3. Different keyboard patterns (Space vs. Arrows)
4. Matches industry standards (Spectrum, Shoelace, WebAwesome)
5. Better future flexibility

---

## 📦 Implementation Roadmap

### Phase 1: kds-checkbox (Weeks 1-2)
**Effort:** ~300-400 lines code + tests

**Deliverables:**
- [ ] `src/kds-checkbox.component.ts` (180-200 lines)
- [ ] `src/kds-checkbox.styles.ts` (180-220 lines)
- [ ] Demo in `index.html`
- [ ] Updated `.github/copilot-instructions.md`

**Key Features:**
- Form association (ElementInternals)
- Native input wrapped
- Label, error, help-text slots
- Three-state support
- Required/invalid validation
- CSS customization (--mod-*)

**Definition of Done:**
- ✅ Form integration works (submits value when checked)
- ✅ Keyboard nav works (Space toggle, Tab focus)
- ✅ Screen reader announces correctly
- ✅ CSS custom properties customizable
- ✅ All slots optional + functional

---

### Phase 2: kds-radio (Weeks 2-3)
**Effort:** ~260-330 lines code

**Deliverables:**
- [ ] `src/kds-radio.component.ts` (140-170 lines)
- [ ] `src/kds-radio.styles.ts` (120-160 lines)
- [ ] Works standalone + in groups
- [ ] Demo in `index.html`

**Key Features:**
- Form association (ElementInternals)
- Works standalone or in group
- Required value property
- Simple styling (circular)

**Definition of Done:**
- ✅ Can be used standalone
- ✅ Form submission works
- ✅ Styled consistently with checkbox

---

### Phase 3: kds-radio-group (Weeks 3-4)
**Effort:** ~350-450 lines code

**Deliverables:**
- [ ] `src/kds-radio-group.component.ts` (220-280 lines)
- [ ] `src/kds-radio-group.styles.ts` (130-170 lines)
- [ ] Complete demo in `index.html`
- [ ] Full documentation

**Key Features:**
- Fieldset-based container
- Child radio coordination
- Roving tabindex management
- Group-level validation
- Direction/gap layout control
- Error + help-text support

**Definition of Done:**
- ✅ Only one radio selectable at a time
- ✅ Roving tabindex works (single Tab stop, arrow nav)
- ✅ Group validation functional (required = at least one)
- ✅ Keyboard nav per WAI-ARIA (arrows, Home/End)
- ✅ Screen readers announce group + selection
- ✅ Direction/gap customizable

---

## 🔍 Technical Checklist

### Form Association
- [ ] `static formAssociated = true`
- [ ] `new ElementInternals()` in constructor
- [ ] `internals.setFormValue()` on change
- [ ] `internals.setValidity()` for validation
- [ ] `formResetCallback()` implemented
- [ ] `formDisabledCallback()` implemented

### Keyboard Navigation
- [ ] Checkbox: Space toggles
- [ ] Radio: Space selects (if standalone)
- [ ] Radio Group: Arrows navigate
- [ ] Radio Group: Home/End navigate extremes
- [ ] Radio Group: Roving tabindex managed
- [ ] All: Tab/Shift+Tab move focus in/out

### Accessibility
- [ ] `aria-invalid` reflects invalid state
- [ ] `aria-required` reflects required state
- [ ] `aria-describedby` links to error/help text
- [ ] Native inputs used (no custom click handling)
- [ ] Labels associated via `for`/`id`
- [ ] Tested with screen reader (NVDA or JAWS)

### Events
- [ ] Native `change` event emitted
- [ ] Native `input` event emitted (checkbox)
- [ ] Custom `kds-change` event with detail
- [ ] All events bubble + composed
- [ ] Event handler tests pass

### Styling
- [ ] CSS custom properties `--mod-*` work
- [ ] Fallback to `--kds-*` tokens
- [ ] Fallback to hardcoded values
- [ ] Hover states work
- [ ] Focus states visible
- [ ] Invalid state styled
- [ ] Disabled state styled

### Slots
- [ ] Label slot optional
- [ ] Error slot optional
- [ ] Help-text slot optional
- [ ] Slot content displays correctly
- [ ] No content when slot unused

---

## 🚀 Getting Started

### Step 1: Read Summary
Read `COMPONENT-PLAN-SUMMARY.md` (5-10 minutes)

### Step 2: Review Architecture
Scan `COMPONENT-PLAN-CHECKBOX-RADIO.md` sections on:
- Form Association & Validation
- Event Handling Strategy
- Accessibility Requirements

### Step 3: Look at Examples
Browse `CHECKBOX-RADIO-EXAMPLES.md` for real HTML/JavaScript patterns

### Step 4: Start Coding
Use `CHECKBOX-RADIO-CODE-REFERENCE.md` code snippets as templates

### Step 5: Reference Standards
Check `CHECKBOX-RADIO-STANDARDS-ANALYSIS.md` when uncertain about patterns

---

## 📚 Reference Sections by Topic

### "How do I implement form association?"
→ `COMPONENT-PLAN-CHECKBOX-RADIO.md` - "Form Association & Validation Pattern"
→ `CHECKBOX-RADIO-CODE-REFERENCE.md` - "Form Association Pattern" code

### "What keyboard navigation is required?"
→ `COMPONENT-PLAN-CHECKBOX-RADIO.md` - "Event Handling Strategy"
→ `CHECKBOX-RADIO-EXAMPLES.md` - "Accessibility Keyboard Navigation"

### "How do radio groups coordinate?"
→ `COMPONENT-PLAN-CHECKBOX-RADIO.md` - Component Composition section
→ `CHECKBOX-RADIO-EXAMPLES.md` - "kds-radio Event Flow"

### "What CSS properties do I need?"
→ `COMPONENT-PLAN-CHECKBOX-RADIO.md` - "Styling Strategy"
→ `CHECKBOX-RADIO-CODE-REFERENCE.md` - Styles file templates

### "Is this approach industry-standard?"
→ `CHECKBOX-RADIO-STANDARDS-ANALYSIS.md` - Compare with Spectrum/Shoelace

### "How do I structure slots?"
→ `CHECKBOX-RADIO-EXAMPLES.md` - "Slot Composition Examples"

### "What are the HTML patterns?"
→ `CHECKBOX-RADIO-EXAMPLES.md` - "Basic usage" sections

---

## 🎨 Design System Alignment

### Checkbox Sizing
```css
--checkbox-size: var(--mod-checkbox-size, 1.25rem);
```

Customizable via:
1. `--mod-checkbox-size` (page-level override)
2. `var(--kds-space-lg)` (design token fallback)
3. `1.25rem` (hardcoded default)

### Color Integration
Uses KDS color tokens:
- `--kds-border-neutral-emphasis-base` (default state)
- `--kds-border-info-emphasis-base` (focus state)
- `--kds-bg-brand-emphasis-base` (checked state)
- `--kds-border-negative-emphasis-base` (invalid state)
- `--kds-fg-on-emphasis` (checkmark color)

### Consistent with
- `kds-button` (form integration, events, CSS pattern)
- `kds-text-input` (label/error/help-text slots)
- `kds-input-group` (fieldset pattern for radio-group)

---

## ✅ Success Metrics

**For Phase 1 (checkbox):**
- Form submits correct value when checked/unchecked
- Required checkbox validation works
- Keyboard navigation follows WAI-ARIA
- Screen reader announces state changes
- CSS properties customizable
- No console errors in dev/build

**For Phase 2 (radio):**
- Can be used standalone or in group
- Form submission works
- Styling consistent with checkbox

**For Phase 3 (radio-group):**
- Only one radio selected at a time
- Roving tabindex (single Tab stop)
- Arrow navigation moves selection
- Group-level validation works
- Screen reader announces group + current selection

---

## 🤔 FAQ

### Q: Should checkbox and radio be in the same file?
**A:** No. They have different semantics and usage patterns. Separate files allow independent iteration.

### Q: Does radio-group need to use fieldset?
**A:** Yes. Fieldset is semantic HTML for grouping related controls. Plus:
- Native browser support for disabled cascading
- Legend always accessible to screen readers
- Better semantic structure than `role="radiogroup"` on div

### Q: What if I want size variants (sm/md/lg)?
**A:** Future enhancement. Currently, one size customizable via `--mod-checkbox-size`.

### Q: Can I use checkboxes inside radio-group?
**A:** No, radio-group expects only radio children. Use `kds-input-group` for mixed controls.

### Q: Do I need to implement "Select All" checkbox logic?
**A:** No, that's user code. The indeterminate state is built-in for UI, but logic is up to the application.

### Q: What about label wrapping the control?
**A:** Don't wrap native input in shadow DOM. Use `for`/`id` association instead. This is standard Lit/Web Components pattern.

### Q: Should custom event detail match native event detail?
**A:** No need. Native events have no useful detail. Custom `kds-change` includes `{ checked, value }` which is what applications need.

---

## 📖 Related KDS Components

### Already Implemented:
- `kds-button` - Use for form submission, groups
- `kds-text-input` - Form text input, validation pattern
- `kds-input-group` - Mixed control grouping
- `kds-progress-circle` - Example of ARIA semantics

### Complement Checkbox/Radio:
- `kds-input-group` - Wrap checkbox/radio with button, select, etc.
- `kds-button-group` - Layout buttons near form controls
- `kds-text-input` - Mix with checkboxes for conditional fields

---

## 🔗 External References

### WAI-ARIA Patterns
- [Checkbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)
- [Radio Group Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)

### Industry Examples
- [Adobe Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/)
- [Shoelace Components](https://shoelace.style/)
- [WebAwesome (Spectrum WC)](https://opensource.adobe.com/spectrum-web-components/)

### Web Component APIs
- [ElementInternals](https://html.spec.whatwg.org/#the-elementinternals-interface)
- [Web Components](https://html.spec.whatwg.org/#web-components)
- [Shadow DOM](https://dom.spec.whatwg.org/#shadow-trees)

### Lit Documentation
- [Lit Elements](https://lit.dev/docs/components/overview/)
- [Reactive Properties](https://lit.dev/docs/components/properties/)
- [Event Handling](https://lit.dev/docs/components/events/)

---

## 📝 Next Actions

1. **Review this summary** (5 minutes)
2. **Read `COMPONENT-PLAN-SUMMARY.md`** (10 minutes)
3. **Scan `COMPONENT-PLAN-CHECKBOX-RADIO.md`** (15 minutes)
4. **Provide feedback** on architecture decisions
5. **Start Phase 1** (implement kds-checkbox)

---

**Questions?** Review the appropriate document above, or check the FAQ section.

