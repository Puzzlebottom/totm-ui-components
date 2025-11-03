# Development Roadmap

> **Last Updated:** November 3, 2025 (Initial setup + future goals added)  
> **Purpose:** Track component goals, bugs, improvements, and DevEx enhancements  
> **Note:** This is a living document - update as we work

## Upcoming Components

Priority ordered by user need frequency:

### High Priority (Essential for Most Apps)
- [ ] Avatar - User profile pictures
- [ ] Badge - Notification counts, status indicators
- [ ] Modal/Dialog - Confirmations, forms, alerts

### Medium-High Priority (Very Common)
- [ ] Toast/Snackbar - Feedback messages
- [ ] Tabs - Content organization
- [ ] Chip/Tag - Filters, categories
- [ ] Switch/Toggle - Settings toggles
- [ ] Dropdown/Select - Menus, options

### Medium Priority (Frequently Needed)
- [ ] Checkbox - Multi-select
- [ ] Radio Group - Single-choice
- [ ] Skeleton - Loading states
- [ ] Divider - Visual separation
- [ ] IconButton - Actions without labels

### Lower Priority (Still Useful)
- [ ] Accordion - Collapsible content
- [ ] Progress Bar - Upload progress
- [ ] Tooltip - Contextual help
- [ ] Menu/Dropdown Menu - Context menus
- [ ] List/ListItem - Structured content

## Known Bugs

_None currently_

## Component Improvements

### Button
- [ ] Add loading state with rotating loader
  - Replace text with loader when no icon present
  - Replace icon with loader when icon present
  - Smooth rotation animation
- [ ] Add disabled state styling
- [ ] Animate gradient angle on hover
  - Gradient angle changes smoothly when button is hovered
  - May require manipulating location/start/end props on gradient
  - Smooth transition effect

## DevEx Improvements

### Tooling
- [ ] Set up GitHub Actions CI/CD
  - Automated testing on pull requests
  - Automated releases to npm
  - Version bumping and changelog generation
  - Run all component tests before publish

### Development Environment
- [ ] Set up multiple environments (dev/staging/prod)
  - Environment-specific configurations
  - Safe testing before production releases
  - Separate npm tags for pre-release versions

### Testing
- [ ] Set up automated component tests in Storybook
  - Visual regression testing
  - Interaction testing
  - Accessibility testing
  - Run automatically in CI/CD pipeline
- [ ] Add test coverage reporting

## Completed

### Components
- [x] Input/TextField - Text input for forms (Nov 3, 2025)
  - Text, email, password input types
  - Native secureTextEntry for passwords
  - Consistent styling across platforms
  - Form integration support
- [x] Box/View - Universal layout component (Nov 3, 2025)
  - Cross-platform compatibility (web ↔ mobile)
  - Enables copy/paste of entire screens between platforms
  - All style props work identically on web and native
  - Replaces `<div>` on web
- [x] Card - Container for grouped content (Nov 3, 2025)
  - Default and elevated variants
  - Consistent card styling
  - Perfect for encounters, characters, lists
- [x] Heading - Semantic h1-h6 component (Nov 3, 2025)
- [x] Text - Typography with size variants (Nov 3, 2025)
- [x] Button - Multiple variants with gradient support (Existing)
- [x] Gradient - Gradient background component (Existing)
- [x] GradientText - Text with gradient styling (Existing)
- [x] GradientBorderView - Container with gradient border (Existing)

### Documentation
- [x] Design tokens reference guide (Nov 3, 2025)
- [x] Storybook patterns guide (Nov 3, 2025)
- [x] Architecture documentation enhanced (Nov 3, 2025)
- [x] Development environment clarified (Nov 3, 2025)

### DevEx
- [x] Added gray scale tokens to design system (Nov 3, 2025)
- [x] Documented Tamagui lineHeight pattern (Nov 3, 2025)

---

## How to Use This Document

**When starting a new chat:**
1. Review "Upcoming Components" for next priorities
2. Check "Known Bugs" for issues to address
3. Review improvement sections for enhancement opportunities

**When completing a task:**
1. Move items from todo sections to "Completed"
2. Add completion date
3. Check if new bugs or improvements were discovered
4. Update priority of remaining items if needed

**When discovering issues:**
1. Add to appropriate bug section with severity
2. Include reproduction steps
3. Link to related components

**When identifying improvements:**
1. Add to appropriate improvement section
2. Note why it's needed
3. Estimate impact (low/medium/high)

