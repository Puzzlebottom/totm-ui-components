# Common Mistakes & How to Avoid Them

> **Purpose:** Learn from past mistakes to write better code faster  
> **Last Updated:** November 3, 2025

## 1. Unnecessary Platform Splitting

### ❌ MISTAKE: Splitting when using the same Tamagui primitive

**What happened:** Created separate `input.tsx` and `input.native.tsx` files even though both used `styled(TamaguiInput, ...)` with identical styling.

**Why it's wrong:** 
- Tamagui components already handle cross-platform differences internally
- Props like `secureTextEntry`, `keyboardType` work on both platforms through Tamagui's abstraction
- Unnecessary duplication makes maintenance harder

**Example of unnecessary split:**
```typescript
// ❌ DON'T DO THIS - both files identical!
// input.tsx
export const Input = styled(TamaguiInput, {
  borderWidth: 2,
  borderColor: '$gray6',
  // ...
})

// input.native.tsx (IDENTICAL FILE - WASTE OF CODE!)
export const Input = styled(TamaguiInput, {
  borderWidth: 2,
  borderColor: '$gray6',
  // ...
})
```

**Correct approach:**
```typescript
// ✅ DO THIS - single unified file
// input.tsx (NO .native.tsx needed!)
export const Input = styled(TamaguiInput, {
  borderWidth: 2,
  borderColor: '$gray6',
  rounded: '$4',
  // Tamagui handles platform differences!
})
```

### Rule: Only Split When Using DIFFERENT Primitives

**Split when:**
- Web uses CSS, Native uses different API (e.g., GradientText)
- Native-only APIs like MaskedView, Animated, Linking
- Fundamentally different rendering approaches

**Don't split when:**
- Same Tamagui component on both platforms
- Only prop differences (Tamagui handles this!)
- Only styling differences (use platform props instead)

**Real example - When to split (GradientText):**
```typescript
// ✅ CORRECT - Different primitives
// gradient-text.tsx (web - CSS)
export const GradientText = ({ children }) => (
  <Text style={{ 
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    // CSS-specific gradient
  }}>
    {children}
  </Text>
)

// gradient-text.native.tsx (native - MaskedView)
import MaskedView from '@react-native-masked-view/masked-view'

export const GradientText = ({ children }) => (
  <MaskedView maskElement={<Text>{children}</Text>}>
    <LinearGradient /> {/* Native gradient API */}
  </MaskedView>
)
```
**Different APIs = Split required ✅**

### Before Creating .native.tsx - Ask Yourself:

1. Am I using the same Tamagui component in both files? → **Don't split!**
2. Are my implementations identical? → **Don't split!**
3. Am I using native-only APIs (MaskedView, Linking, etc.)? → **Split!**
4. Am I using CSS on web and React Native APIs on native? → **Split!**

## 2. Using Wrong Tamagui Shorthands

### ❌ MISTAKE: Guessing style prop names instead of checking docs

**What happened:** Used `br` and `backgroundColor` instead of correct Tamagui shorthands `rounded` and `bg`.

**Why it's wrong:**
- Tamagui has specific shorthands documented in their API
- Guessing leads to TypeScript errors
- Wastes time debugging when docs have the answer

**Example of wrong shorthands:**
```typescript
// ❌ DON'T GUESS!
export const Card = styled(Stack, {
  br: '$4',                    // Wrong! TypeScript error
  backgroundColor: '$gray2',    // Works but not idiomatic
  paddingHorizontal: '$4',     // Works but verbose
})
```

**Correct shorthands:**
```typescript
// ✅ USE OFFICIAL SHORTHANDS
export const Card = styled(Stack, {
  rounded: '$4',    // borderRadius shorthand
  bg: '$gray2',     // background shorthand
  px: '$4',         // paddingHorizontal shorthand
})
```

### Common Tamagui Shorthands (MEMORIZE THESE)

**Spacing:**
- `p` = padding
- `px` = paddingHorizontal, `py` = paddingVertical
- `pt`, `pr`, `pb`, `pl` = padding individual sides
- `m` = margin
- `mx` = marginHorizontal, `my` = marginVertical
- `mt`, `mr`, `mb`, `ml` = margin individual sides

**Sizing:**
- `w` = width
- `h` = height
- `minW` = minWidth, `maxW` = maxWidth
- `minH` = minHeight, `maxH` = maxHeight

**Colors & Backgrounds:**
- `bg` = background (NOT `backgroundColor`)
- `bc` = borderColor

**Border:**
- `rounded` = borderRadius (NOT `br`, NOT `borderRadius` in styled())
- `bw` = borderWidth

**Layout:**
- `f` = flex
- `fd` = flexDirection
- `ai` = alignItems
- `jc` = justifyContent

### Rule: Check Context7 Before Using Style Props

**Always query Context7 for:**
```bash
"Tamagui style shorthands"
"Tamagui borderRadius"
"Tamagui padding props"
```

**Before writing `styled()`, look at existing components:**
- Check Button component for size/variant patterns
- Check Card for spacing and border patterns
- Check Text/Heading for typography patterns

## 3. Not Consulting Existing Components

### ❌ MISTAKE: Reinventing patterns that already exist

**Before creating a new component:**
1. Check similar components in `src/components/`
2. Look at their `styled()` patterns
3. Copy successful patterns (variants, tokens, etc.)

**Example - Learn from Button:**
```typescript
// Button uses getSpace for dynamic sizing
variants: {
  size: {
    '...size': (name, { tokens }) => ({
      height: tokens.size[name],
      px: getSpace(name, { shift: -1 }),
    }),
  },
}
```

## Checklist Before Implementing

**Before creating ANY component:**
- [ ] Do I need platform split? Check if using same Tamagui primitive
- [ ] What are the correct Tamagui shorthands? Query Context7
- [ ] What patterns exist in similar components? Check src/components/
- [ ] Is there a Tamagui primitive I can extend? Don't reinvent
- [ ] Have I read the component's Context7 docs? Check API first

## Quick Reference: When to Use Context7

**Query Context7 BEFORE:**
- Creating any styled() component (check shorthands!)
- Using a Tamagui component for the first time (check API)
- Adding variants (check pattern examples)
- Implementing platform-specific code (check if needed)
- Getting TypeScript errors (check correct prop names)

**Example queries:**
```
"Tamagui Input component API"
"Tamagui styled variants syntax"
"Tamagui Stack component props"
"Tamagui style shorthands list"
```

## 4. Unnecessary index.ts Files

### ❌ MISTAKE: Creating index.ts for single-file components

**What happened:** Created `input/index.ts` even though Input was a single `input.tsx` file.

**Why it's wrong:**
- index.ts is only needed when you have platform splits
- Single-file components can export directly
- Adds unnecessary file system clutter

**Example of unnecessary index:**
```typescript
// ❌ DON'T DO THIS for single files
// input/index.ts
export { Input } from './input'
export type { InputProps } from './input'
```

**Correct approach:**
```typescript
// ✅ DO THIS - export directly from the component
// components/index.ts
export { Input } from './input/input'
export type { InputProps } from './input/input'
```

### Rule: Only Use index.ts When You Have Platform Splits

**Use index.ts when:**
```
component/
├── component.tsx        (web)
├── component.native.tsx (native)
└── index.ts            (exports common interface)
```

**Don't use index.ts when:**
```
component/
└── component.tsx        (unified - export directly!)
```

## Summary

**The Most Common Mistakes:**
1. **Unnecessary platform splitting** → Use same Tamagui primitive = no split!
2. **Wrong style prop names** → Check Context7 for shorthands first!
3. **Unnecessary index.ts files** → Single file = export directly!

**The Solution:**
1. Think: "Am I using different primitives?" → If no, don't split
2. Think: "What's the Tamagui shorthand?" → Query Context7, don't guess
3. Think: "What pattern exists already?" → Check existing components

**Remember:**
- Tamagui does the heavy lifting - trust it!
- The docs know better than guessing - query them!
- Existing code is your best reference - learn from it!

