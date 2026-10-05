# Visual Design System

## Core Principles

This design system is built to avoid the "AI template" look. We prioritize:
- **Typography** over decoration
- **Spacing** over borders
- **Hierarchy** over uniformity
- **Subtle color** over saturation
- **Intentional layouts** over card everything

---

## Typography

### Font Families
- **Serif**: Instrument Serif (headings, editorial content)
- **Sans**: DM Sans (UI elements, body text)

### Type Scale
```javascript
// Headings (Serif)
h1: 38px (desktop) / 32px (mobile)
h2: 32px / 28px
h3: 24px / 20px
h4: 20px / 18px

// Body (Sans)
body: 14px / 13.5px
small: 12.5px / 12px
tiny: 11.5px / 11px
```

### Typography Hierarchy
1. **Primary**: Serif headings (32-38px)
2. **Secondary**: Sans labels (11.5-12px uppercase, tracking-widest)
3. **Tertiary**: Body text (13.5-14px)
4. **Quaternary**: Muted text (12px, text-ink-muted)

### Letter Spacing
- Uppercase labels: `tracking-[0.12em]` to `tracking-[0.16em]`
- Serif headings: `tracking-tight` or `-0.02em`
- Body text: `normal`

---

## Color Palette

### Philosophy
Colors are muted, editorial, and intentional. No saturation overload.

### Backgrounds
- **Paper**: #F7F5F0 (main background)
- **Surface**: #FCFBF8 (cards, panels)
- **Cream**: #F1EDE4 (subtle distinction)
- **White**: #FCFBF8 (high contrast areas)

### Text
- **Ink**: #202421 (primary text)
- **Ink Soft**: #3B403C (secondary text)
- **Ink Muted**: #68706B (tertiary text)
- **Ink Faint**: #9AA09A (labels, metadata)

### Accents (Use Sparingly)
- **Pine**: #294A3A (primary action, success)
- **Pine Deep**: #1E382C (hover states)
- **Pine Soft**: #E4EAE4 (subtle backgrounds)
- **Clay**: #C96B4B (errors, warnings, attention)
- **Clay Deep**: #A95538 (error hover)
- **Clay Soft**: #F7E7DD (error backgrounds)
- **Sage**: #A8BFA8 (AI, special features)

### Borders & Lines
- **Line**: #DEDCD5 (subtle borders)
- **Ink/20**: rgba(32,36,33,0.2) (focus states)

### Forbidden
- ❌ Purple (#8B5CF6, #A855F7, etc.)
- ❌ Gradients
- ❌ Neon/bright colors
- ❌ Black (#000000) - use ink instead
- ❌ Pure white (#FFFFFF) - use paper/white

---

## Spacing

### Spacing Scale
```javascript
4: 0.25rem (4px)
6: 0.375rem (6px)
8: 0.5rem (8px)
12: 0.75rem (12px)
16: 1rem (16px)
20: 1.25rem (20px)
24: 1.5rem (24px)
32: 2rem (32px)
40: 2.5rem (40px)
48: 3rem (48px)
64: 4rem (64px)
```

### Layout Spacing
- **Tight**: 4-8px (inline elements, badges)
- **Comfortable**: 12-16px (card padding, form fields)
- **Generous**: 24-32px (section spacing)
- **Loose**: 40-64px (page margins, hero sections)

### Component Spacing
- **Button padding**: sm (6px), md (10px), lg (10px)
- **Card padding**: 20px (standard)
- **Form field gap**: 8px
- **List item gap**: 12-16px

---

## Layout Patterns

### Rule 1: Not Everything is a Card
Avoid card overuse. Use appropriate layout patterns:

**When to use cards:**
- Course tiles
- Dashboard widgets
- Modal content
- Sidebar items

**When NOT to use cards:**
- Page headers
- Text-heavy content
- Forms
- Lists (use borders instead)

### Layout Variants

#### 1. Editorial (Typography-led)
- Serif headings
- Generous whitespace
- Minimal borders
- Example: Course detail page

#### 2. Grid-based (Data-led)
- Clean borders
- No backgrounds
- Aligned columns
- Example: StatCard "divided" variant

#### 3. Stacked (List-led)
- Border-bottom separators
- No cards
- Clear hierarchy
- Example: ActivityTimeline, LessonList

#### 4. Sectioned (Module-led)
- Horizontal rules
- Grouped content
- Subtle backgrounds
- Example: Settings page

### Container Widths
- **Shell**: 1280px (max content width)
- **Narrow**: 640px (text content)
- **Wide**: 100% (full-width sections)

---

## Borders & Edges

### Philosophy
Borders are subtle, not heavy. Use them to define structure, not decorate.

### Border Colors
- **Line**: #DEDCD5 (standard borders)
- **Ink/20**: rgba(32,36,33,0.2) (focus states)
- **Pine/30**: rgba(41,74,58,0.3) (active states)
- **Clay/30**: rgba(201,107,75,0.3) (error states)

### Border Widths
- **Subtle**: 1px (most borders)
- **Focus**: 2px (focus rings)
- **Active**: 2px (active states)

### Corner Radius
- **Sharp**: 0px (editorial, strict)
- **Subtle**: 2-4px (cards, buttons)
- **Rounded**: 8px (special cases only)

### Rule: Avoid Over-rounding
- ❌ `rounded-xl`, `rounded-2xl`
- ❌ Everything with rounded corners
- ✅ Sharp edges for editorial feel
- ✅ Subtle rounding (2-4px) for UI elements

---

## Shadows

### Philosophy
Shadows are subtle, lifting elements without dominating.

### Shadow Scale
- **Subtle**: `0 1px 2px rgba(27,30,27,0.05)` (buttons, inputs)
- **Card**: `0 1px 3px rgba(27,30,27,0.06), 0 4px 16px rgba(27,30,27,0.05)` (cards, modals)
- **No shadow**: Default for most elements

### Rule: Avoid Heavy Shadows
- ❌ `shadow-lg`, `shadow-xl`
- ❌ Colored shadows
- ✅ Subtle, gray shadows
- ✅ Use sparingly

---

## Components: Visual Patterns

### Buttons
- **Primary**: Pine background, no gradient
- **Secondary**: Outline with line border
- **Tertiary**: Ghost/quiet (no background)
- **No rounded corners** or subtle (2-4px)
- **No shadows** except on hover

### Cards
- **Border**: 1px line
- **Background**: White/surface
- **Shadow**: Card shadow only
- **Padding**: 20px standard
- **No gradients**
- **No heavy rounding**

### Inputs
- **Border**: 1px line
- **Focus**: Pine ring (2px)
- **Background**: White
- **No rounded corners** or subtle (2-4px)
- **No shadows**

### Progress Bars
- **Height**: 3px (thin, editorial)
- **Track**: Cream
- **Fill**: Pine
- **No rounded ends** (or subtle)

### Badges
- **Background**: Soft color (pine-soft, clay-soft)
- **Text**: Muted color
- **No borders** or subtle
- **No shadows**
- **Minimal padding**

---

## Hierarchy & Emphasis

### Visual Hierarchy
1. **Serif headings** (32-38px) - Primary
2. **Uppercase labels** (11.5px, tracking-widest) - Secondary
3. **Body text** (13.5-14px) - Tertiary
4. **Muted text** (12px) - Quaternary

### Emphasis Techniques
- **Bold**: Font weight
- **Color**: Pine for primary actions
- **Size**: Larger serif headings
- **Position**: Top-left for primary
- **Spacing**: Generous for emphasis

### What NOT to do for emphasis
- ❌ Gradients
- ❌ Glows
- ❌ Bright colors
- ❌ Heavy shadows
- ❌ All caps for body text

---

## Layout Examples

### Editorial Layout (Course Detail)
```
[Serif H1: Course Title]
[Meta: Author · Duration · Level]

[Editorial description text]

[Section: Curriculum]
  [Border-top]
  [Module 1]
    [Lesson 1]
    [Lesson 2]
```

### Dashboard Layout
```
[Stats Grid: Divided layout]
  [Border-bottom/right]
  [Label: Uppercase]
  [Value: Serif 32px]

[Section: Activity]
  [Border-top]
  [Timeline: Border-bottom items]
```

### List Layout (Courses)
```
[Course Card]
  [Border: 1px line]
  [Cover: Solid color]
  [Title: Serif 20px]
  [Meta: Muted 12px]
```

---

## Anti-Patterns (What to Avoid)

### ❌ Template Look
- Everything is a card
- Everything has rounded corners
- Everything has a gradient
- Everything is purple
- Generic stock photos
- Overused shadows
- Excessive spacing

### ✅ Editorial Look
- Typography-led design
- Sharp or subtle edges
- Solid colors, no gradients
- Muted, intentional palette
- Generous whitespace
- Subtle borders
- Consistent hierarchy

---

## Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile Adaptations
- Reduce padding (20px → 16px)
- Smaller font sizes (38px → 32px)
- Stack grids (2 cols → 1 col)
- Hide decorative elements

---

## Accessibility

### Color Contrast
- All text meets WCAG AA (4.5:1)
- Interactive elements meet AAA (7:1)
- Focus indicators: 2px pine ring

### Focus States
- Visible focus ring on all interactive elements
- No outline removal
- Keyboard navigation support

### Motion
- Respect `prefers-reduced-motion`
- Animation duration < 300ms
- No auto-playing animations

---

## Implementation Guidelines

### When Adding New Components
1. Check existing patterns first
2. Use serif for headings
3. Use sans for UI text
4. Apply subtle borders (1px line)
5. Avoid rounded corners > 4px
6. No gradients
7. Muted colors only
8. Generous whitespace

### When Modifying Existing Components
1. Maintain typography hierarchy
2. Keep spacing consistent
3. Don't add shadows unnecessarily
4. Don't add gradients
5. Don't increase border radius
6. Test against this system

---

## Design Tokens Summary

```javascript
// Colors
paper: '#F7F5F0'
ink: '#202421'
pine: '#294A3A'
clay: '#C96B4B'
line: '#DEDCD5'

// Typography
serif: 'Instrument Serif'
sans: 'DM Sans'
h1: '38px'
h2: '32px'
body: '14px'
label: '11.5px uppercase tracking-[0.12em]'

// Spacing
tight: '8px'
comfortable: '16px'
generous: '24px'

// Borders
width: '1px'
color: '#DEDCD5'
radius: '0-4px'

// Shadows
subtle: '0 1px 2px rgba(27,30,27,0.05)'
card: '0 1px 3px rgba(27,30,27,0.06), 0 4px 16px rgba(27,30,27,0.05)'
```

---

## Brand Voice

The visual design communicates:
- **Editorial**: Typography-led, refined
- **Calm**: Muted colors, generous space
- **Professional**: Subtle details, consistent
- **Trustworthy**: Clear hierarchy, no gimmicks

This is not a template. This is a thoughtfully designed product.
