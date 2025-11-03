# Writing Usage Guidance for Component Consumers

> **For:** Focused guide on writing effective JSDoc that helps consumers
> 
> **Audience:** Library developers (human & AI) writing component documentation
> 
> **See also:**
> - `.cursorrules` - Complete component patterns with JSDoc templates
> - `component-checklist.md` - Quick JSDoc requirements checklist

## Goal
Help developers (including AI assistants) understand **WHEN** to use components, not just **HOW**.

## Critical: JSDoc Ships with the Package

**Storybook is dev-only.** Consumers never see Storybook docs.

**JSDoc is the PRIMARY documentation layer** - it ships with the TypeScript source and appears in:
- IDE IntelliSense/autocomplete
- AI assistant context windows
- Generated type declarations (.d.ts)

## Documentation Layers

### 1. JSDoc (In Component Code) - PRIMARY
**Who sees it:** 
- ✅ Consumers in their IDE
- ✅ AI assistants implementing your library
- ✅ Documentation generation tools

**What to include:**
```typescript
/**
 * Brief one-line description
 * 
 * @remarks
 * Explain the component's purpose and ideal use cases.
 * 
 * **When to use:**
 * - List specific scenarios where this component shines
 * - Be concrete: "Use for navigation between major app sections"
 * 
 * **When NOT to use:**
 * - List scenarios to avoid
 * - Suggest alternatives: "For in-page navigation, use TabBar instead"
 * 
 * @example
 * Label examples by scenario:
 * ```tsx
 * // Primary CTA in a form
 * <Button variant="primary">Submit</Button>
 * ```
 * 
 * @example
 * ```tsx
 * // Secondary action
 * <Button variant="secondary">Cancel</Button>
 * ```
 */
```

### 2. Storybook Docs (In Story Files) - INTERNAL ONLY
**Who sees it:** Only internal developers during development (does NOT ship with package)

**What to include:**
```typescript
const meta: Meta<typeof Component> = {
  parameters: {
    docs: {
      description: {
        component: `
## When to Use

[Explain the problem this component solves]

**Good for:**
- Specific use case 1 with context
- Specific use case 2 with context
- When you need [specific behavior]

**Avoid when:**
- Scenario 1 - Use [Alternative] instead because [reason]
- Scenario 2 - Use [Alternative] instead because [reason]

## Best Practices

- Best practice 1
- Best practice 2

## Accessibility

- Keyboard navigation details
- Screen reader behavior
- ARIA attributes included
        `,
      },
    },
  },
};
```

**Story-level descriptions:**
```typescript
export const PrimaryCTA: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use the primary variant for the main call-to-action in a screen. Limit to one primary button per view to maintain visual hierarchy.',
      },
    },
  },
};
```

## Writing Effective "When to Use" Guidance in JSDoc

Since JSDoc is what consumers see, make it COMPREHENSIVE.

### ✅ Good Examples:

**Specific and contextual:**
```typescript
/**
 * @remarks
 * Use GradientText for hero headlines and brand moments where visual 
 * impact is critical. Avoid for body copy or UI labels as it reduces 
 * readability and accessibility.
 * 
 * **When to use:**
 * - Hero headlines on landing pages
 * - Feature section titles
 * - Brand moments requiring visual impact
 * 
 * **When NOT to use:**
 * - Body text or paragraphs - use `Text` instead for readability
 * - UI labels or buttons - use `Label` or `Button` instead
 * - Small text (< 16px) - gradient becomes hard to read
 */
```

**Mentions alternatives:**
```typescript
/**
 * @remarks
 * Use Button for standard user actions that trigger app behavior.
 * 
 * **When to use:**
 * - Form submissions
 * - Dialog confirmations
 * - Primary/secondary actions
 * 
 * **When NOT to use:**
 * - Navigation between screens - use `Link` instead
 * - Icon-only actions - use `IconButton` for better accessibility
 * - Toggling state - use `Switch` or `Checkbox` instead
 */
```

**Explains tradeoffs:**
```typescript
/**
 * @remarks
 * GradientBorderView creates visual interest but increases rendering 
 * complexity. Use sparingly for maximum impact.
 * 
 * **When to use:**
 * - Featured cards or promoted content
 * - Primary CTAs requiring emphasis
 * - Hero sections (1-2 per screen max)
 * 
 * **When NOT to use:**
 * - List items that repeat - use solid borders for performance
 * - Subtle UI elements - use standard borders instead
 * - Complex nested layouts - can cause rendering issues
 * 
 * **Performance note:** Limit to 2-3 instances per screen for optimal 
 * performance on lower-end devices.
 */
```

### ❌ Bad Examples:

**Too vague:**
```typescript
/**
 * Use this component for text.
 */
```
❌ Doesn't explain WHEN or offer alternatives

**Only describes HOW:**
```typescript
/**
 * Pass the variant prop to change the style.
 */
```
❌ Tells how to use props, not when to use the component

**No alternatives:**
```typescript
/**
 * Don't use this for long text.
 */
```
❌ Tells what NOT to do but doesn't suggest what TO do instead

## Checklist for Each Component

### Must-Have (Ships with Package):
- [ ] **JSDoc @remarks** explains the component's purpose and use cases
- [ ] **"When to use"** lists 3-5 specific scenarios with context
- [ ] **"When NOT to use"** mentions 2-3 anti-patterns with alternatives
- [ ] **Multiple @examples** show different realistic scenarios (not just props)
- [ ] **Performance/accessibility notes** if relevant
- [ ] **Alternative components** mentioned for wrong use cases

### Nice-to-Have (Dev-Only):
- [ ] **Storybook docs** expand on usage guidance (internal reference)
- [ ] **Story descriptions** explain WHEN to use each variant
- [ ] **Visual examples** of good/bad usage patterns

## Real-World Example Pattern

Instead of just showing props, show realistic scenarios:

```typescript
// ❌ Less helpful - only shows props
export const WithIcon: Story = {
  args: { icon: 'check' }
};

// ✅ More helpful - shows use case
export const SuccessNotification: Story = {
  args: { icon: 'check', variant: 'success' },
  parameters: {
    docs: {
      description: {
        story: 'Use this pattern to confirm successful user actions like form submissions or saved changes.',
      },
    },
  },
};
```

## Testing Your JSDoc Guidance

Imagine an AI assistant (like me) reading ONLY the JSDoc in a consumer's codebase. Ask:

1. **Can they understand WHEN to use this component vs alternatives?**
   - If no: Add more "when to use" scenarios
   
2. **Are the examples scenario-based, not just prop demos?**
   - ❌ `<Button variant="primary" />` (just shows props)
   - ✅ `<Button variant="primary">Submit Form</Button>` (shows use case)
   
3. **Does it explain common mistakes to avoid?**
   - If no: Add "When NOT to use" section
   
4. **Does it mention alternative components?**
   - If no: Add "use X instead" suggestions
   
5. **Would this help make a decision, not just copy code?**
   - If no: Add context explaining WHY to use it

6. **Could an AI assistant read this and implement the component correctly?**
   - If no: Add more detail about intended use cases

If "no" to any question, the JSDoc needs more detail.

