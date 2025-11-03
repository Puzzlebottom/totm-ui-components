# Contributing Guide

Quick guide for humans developing this library. For detailed patterns and examples, see `.ai/` folder.

## Workflow for New Components

### 1. Review Documentation
- Check `/.ai/component-checklist.md` for complete steps
- See `/.ai/architecture.md` for patterns and technical details
- Read `/.ai/writing-usage-guidance.md` for JSDoc best practices

### 2. Create Component
```bash
# File structure (kebab-case)
src/components/{component-name}/
  ├── component-name.tsx              # Web (default)
  ├── component-name.native.tsx       # Native (if needed)
  └── index.ts                        # Exports
```

**Key Points:**
- Extend Tamagui primitives (Stack, Text, etc.)
- Export types with components
- Write comprehensive JSDoc (it ships with the package!)
- Only split platforms when using native APIs

### 3. Add Stories
```bash
dev/stories/{component-name}.stories.tsx
```

**Focus on use cases**, not just prop combinations. Stories are dev-only reference.

### 4. Export
```typescript
// Add to src/components/index.ts
export { MyComponent, type MyComponentProps } from './my-component'
```

### 5. Validate
```bash
cd src && yarn build              # Generate types
cd dev/web && yarn storybook      # Test web
cd dev/native && yarn start       # Test native (if applicable)
```

### 6. Review Documentation
After adding/modifying components, verify:
- `/.ai/architecture.md` - Still accurate?
- `/README.md` - Examples still work?
- Component JSDoc - Complete and helpful?

## Naming Conventions

- **Folders/Files**: kebab-case (`gradient-text/`, `gradient-text.tsx`)
- **Exports**: PascalCase (`GradientText`, `GradientTextProps`)

## Platform Splitting

**Only create `.native.tsx` when:**
- Using native-only APIs (MaskedView, Animated, Linking)
- Different rendering required (CSS vs native primitives)

**Never create `.web.tsx`** - use `.tsx` as web default.

See `/.ai/architecture.md` for detailed platform resolution explanation.

## Build Commands

```bash
cd src
yarn build  # Generate types once
yarn dev    # Watch mode
yarn clean  # Remove generated types
```

## For Detailed Guidance

- **Patterns**: See `.ai/architecture.md`
- **Checklist**: See `.ai/component-checklist.md`
- **JSDoc Guide**: See `.ai/writing-usage-guidance.md`
- **AI Rules**: See `.cursorrules` (for AI assistants)
