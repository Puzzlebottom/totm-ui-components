# New Component Checklist

> **For:** Quick reference when creating components
> 
> **See also:**
> - `.cursorrules` - Complete patterns and examples
> - `architecture.md` - Why we do things this way
> - `writing-usage-guidance.md` - How to write great JSDoc

## Implementation
- [ ] Component file created in `/src/components/{name}/`
- [ ] Use kebab-case for file names
- [ ] Props interface exported with JSDoc
- [ ] Component JSDoc includes (THIS SHIPS WITH THE PACKAGE):
  - [ ] Brief description
  - [ ] @remarks with comprehensive "When to use" (3-5 scenarios)
  - [ ] @remarks with "When NOT to use" mentioning alternatives
  - [ ] Multiple @example tags showing realistic use cases (not just props)
  - [ ] Performance/accessibility notes if relevant
  - [ ] Remember: Consumers and AI assistants see this in their IDE!
- [ ] Platform split if needed (`.native.tsx` for native-specific code)
- [ ] Component exported from `{name}/index.ts`
- [ ] Added to main `components/index.ts`

## Stories (Dev-Only - Does Not Ship)
- [ ] Story created in `/dev/stories/{name}.stories.tsx`
- [ ] Story metadata includes `parameters.docs.description.component` (internal reference)
- [ ] Story includes Default variant with description
- [ ] Stories show use-case scenarios (not just prop combinations)
- [ ] Each story has `parameters.docs.description.story` (internal reference)
- [ ] Story includes edge cases

## Validation
- [ ] Types generated (`cd src && yarn build`)
- [ ] Tested in web Storybook (`cd dev/web && yarn storybook`)
- [ ] Tested in native Storybook if applicable (`cd dev/native && yarn start`)
- [ ] No linter errors

## Documentation Review
- [ ] Check `/CONTRIBUTING.md` - patterns/examples still accurate?
- [ ] Check `/.ai/architecture.md` - architectural notes still correct?
- [ ] Check `/README.md` - usage examples still work?
- [ ] Update docs if component introduces new patterns
- [ ] Verify JSDoc comments are accurate and helpful

## Platform-Specific Components
If component needs native APIs:
- [ ] Web version in `component-name.tsx`
- [ ] Native version in `component-name.native.tsx`
- [ ] Both export same interface/types

## Roadmap Maintenance
- [ ] Mark component as completed in `.ai/roadmap.md` with date
- [ ] Add any discovered bugs to roadmap
- [ ] Add any identified improvements to roadmap
- [ ] Update priority of remaining items if needed

