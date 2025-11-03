# Storybook Patterns for totm-ui-components

> **Created:** Nov 3, 2025  
> **Context:** Learnings from creating Heading and Text components

## Story File Patterns

### ✅ DO: Use React Native View with Inline Styles

Stories should use React Native's `View` component with inline `style` prop to avoid TypeScript complexity with Tamagui's type system.

**Good:**
```tsx
import { View } from 'react-native';

const meta: Meta<typeof Component> = {
  decorators: [
    (Story) => (
      <View style={{ padding: 20 }}>
        <Story />
      </View>
    ),
  ],
};

export const Example: Story = {
  render: () => (
    <View style={{ gap: 16, maxWidth: 600 }}>
      <Component>Content</Component>
    </View>
  ),
};
```

**Why:** 
- Avoids TypeScript strict typing issues with Tamagui props in Storybook
- Stories are dev-only and don't ship with package
- Simpler, more predictable types
- Consistent with existing gradient component stories

### ❌ AVOID: Tamagui Components in Stories

**Don't use:**
```tsx
import { YStack, XStack, View } from 'tamagui';

// TypeScript errors with Tamagui props
<YStack gap="$4" ai="center" jc="center">  // ❌
  <Component />
</YStack>

<View bg="$background" p="$4">  // ❌
  <Component />
</View>
```

### Component Props in Stories

When using your own components in stories, you can use Tamagui props normally:

**Good:**
```tsx
import { Heading } from '@puzzlebottom/totm-ui-components';

// ✅ Works fine - Heading supports these props
<Heading level="h1" fontSize="$12" color="$purple7">
  Title
</Heading>
```

**For styles not supported by component:**
```tsx
// ✅ Use inline style prop
<Heading level="h1" style={{ textAlign: 'center' }}>
  Centered Title
</Heading>
```

## Color Values in Stories

Tamagui color tokens (like `$gray10`, `$purple7`) may show TypeScript errors in stories. Two approaches:

### Option 1: Inline Hex Colors
```tsx
<Text style={{ color: '#737373' }}>Muted text</Text>
```

### Option 2: Use Token (with TypeScript warning)
```tsx
<Text color="$gray10">Muted text</Text>
```

Both work at runtime. Inline hex is cleaner for stories since stories don't ship.

## Documentation Structure

### JSDoc (PRIMARY - Ships with Package)
- Comprehensive component documentation
- "When to use" / "When NOT to use" sections
- Multiple realistic examples
- Accessibility and best practice notes
- This is what consumers see in their IDE!

### Storybook Docs (INTERNAL - Dev Only)
- Quick reference for internal development
- Visual examples of variants
- Use case demonstrations
- Can be less verbose than JSDoc

## File Naming

Stories should use kebab-case and match component folder names:
- Component: `src/components/heading/index.tsx`
- Story: `dev/stories/Heading.stories.tsx` (note: capital H for proper Storybook title)

## Import Pattern

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '@puzzlebottom/totm-ui-components';
import { View } from 'react-native';  // For layout
```

## Story Metadata Pattern

```tsx
const meta: Meta<typeof ComponentName> = {
  title: 'Category/ComponentName',
  component: ComponentName,
  decorators: [
    (Story) => (
      <View style={{ padding: 20 }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Brief usage guide for internal reference`,
      },
    },
  },
};
```

## Common TypeScript Issues and Solutions

### Issue: `Property 'padding' does not exist`
**Solution:** Use React Native View with style prop
```tsx
// ❌ Don't
<View padding="$4">

// ✅ Do
<View style={{ padding: 16 }}>
```

### Issue: `Property 'ai' does not exist`
**Solution:** Use React Native View with full prop names
```tsx
// ❌ Don't
<YStack ai="center" jc="center">

// ✅ Do
<View style={{ alignItems: 'center', justifyContent: 'center' }}>
```

### Issue: `Property 'gap' does not exist on View`
**Solution:** Use gap in style prop (supported in React Native 0.71+)
```tsx
// ✅ Works in modern React Native
<View style={{ gap: 16 }}>
```

### Issue: Color token type errors
**Solution:** Use inline hex or accept the TypeScript warning
```tsx
// Option 1: Hex color
<Text style={{ color: '#737373' }}>

// Option 2: Token (shows TS error but works)
<Text color="$gray10">
```

## Typography Line Height Best Practices

**Discovery:** Tamagui's lineHeight tokens automatically include proper spacing! You can use matching tokens for both.

**Solution for Tamagui:** Use the **same token** for lineHeight as fontSize:
```tsx
// ❌ Don't - numeric values are treated as PIXELS in Tamagui, not multipliers
fontSize: '$10',
lineHeight: 1.2,  // This is 1.2px, not 120%!

// ❌ Don't - omit lineHeight when overriding fontSize
<Heading level="h3" fontSize="$10">  // Uses h3's default lineHeight, causes overlap

// ✅ Do - use matching token for both
fontSize: '$10',
lineHeight: '$10',  // Tamagui handles proper spacing automatically!
```

**Pattern for headings (matching tokens):**
```tsx
// H1: Large display text
fontSize: '$10',
lineHeight: '$10',  // Same token = simple!

// H2: Major sections
fontSize: '$9',
lineHeight: '$9',  // Same token = simple!

// H3-H6: Continue pattern
fontSize: '$8',
lineHeight: '$8',  // Same token = simple!
```

**CRITICAL: Always override lineHeight when overriding fontSize:**
```tsx
// ❌ Don't - this WILL cause overlap when text wraps
<Heading level="h3" fontSize="$10">
  Long text that wraps
</Heading>

// ✅ Do - override both fontSize and lineHeight to matching tokens
<Heading level="h3" fontSize="$10" lineHeight="$10">
  Long text that wraps
</Heading>
```

**Why matching tokens work:**
- ✅ Tamagui's lineHeight tokens include built-in spacing multipliers
- ✅ Simple to remember: just match fontSize and lineHeight
- ✅ Prevents descenders ('y', 'g', 'p', 'q') from overlapping ascenders
- ✅ Consistent across all font sizes
- ⚠️ Note: In Tamagui, unitless numbers = pixels, not multipliers like in CSS

**For body text:** Same pattern - match fontSize and lineHeight tokens (e.g., `fontSize: '$5'`, `lineHeight: '$5'`).

## Key Takeaway

**Stories are for development only and don't ship.** Prioritize:
1. ✅ Clarity and simplicity
2. ✅ Avoiding TypeScript complexity
3. ✅ Visual examples of use cases

**Components ship to consumers.** Prioritize:
1. ✅ Comprehensive JSDoc (consumers see this!)
2. ✅ Type safety and proper Tamagui patterns
3. ✅ Platform compatibility
4. ✅ Proper line-height for multi-line wrapping

