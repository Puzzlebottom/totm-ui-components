# Design Tokens Reference

> **For:** Consumers of totm-ui-components  
> **Purpose:** Quick reference for available design tokens

## Color Tokens

### Grayscale (Custom)

Neutral gray scale for text, backgrounds, and UI elements:

```tsx
// Text colors (high to low contrast)
$gray12  // Darkest - Primary text, high contrast
$gray11  // Dark - Secondary text, medium-high contrast  
$gray10  // Medium - Tertiary text, muted/subtle
$gray9   // Medium-light - Disabled text
$gray8   // Light - Borders, dividers
$gray7   // Lighter - Hover backgrounds
// ... $gray6 to $gray1 (progressively lighter)
```

**Common Usage:**
- Primary text: `color="$gray12"`
- Secondary text: `color="$gray11"`
- Muted/helper text: `color="$gray10"`
- Disabled text: `color="$gray9"`

### Brand Colors (Custom)

#### Purple
```tsx
$purple7   // Primary brand color (most common)
$purple8   // Darker purple
$purple6   // Lighter purple
// $purple1 (lightest) to $purple12 (darkest)
```

#### Pink
```tsx
$pink7     // Primary pink
$pink8     // Darker pink
$pink6     // Lighter pink
// $pink1 (lightest) to $pink12 (darkest)
```

#### Fuschia
```tsx
$fuschia7  // Primary fuschia
$fuschia8  // Darker fuschia
$fuschia6  // Lighter fuschia
// $fuschia1 (lightest) to $fuschia12 (darkest)
```

**Common Usage:**
- Brand accent: `color="$purple7"`
- Links/CTAs: `color="$purple7"`
- Highlights: `color="$pink7"`

### Semantic Colors (Custom)

```tsx
$success   // Green - Success states
$warning   // Orange - Warning states  
$danger    // Red - Error states
$info      // Blue - Info states
```

**Common Usage:**
- Success message: `color="$success"`
- Error text: `color="$danger"`
- Info badge: `bg="$info"`

### Special Tokens

```tsx
$color         // Adapts to theme (light/dark mode)
$background    // Theme background color
$borderColor   // Theme border color
```

**When to use:**
- In component defaults: `color: '$color'`
- Theme-aware backgrounds: `bg="$background"`
- Borders: `borderColor="$borderColor"`

## Size Tokens

### Font Sizes

```tsx
$1   // 11px
$2   // 12px
$3   // 13px
$4   // 14px
$5   // 16px (body text default)
$6   // 18px
$7   // 20px
$8   // 23px
$9   // 27px
$10  // 32px (and larger...)
```

**Common Usage:**
- Body text: `fontSize="$5"`
- Small text: `fontSize="$4"`
- Headings: `fontSize="$8"` to `fontSize="$12"`

### Spacing

```tsx
$0.5  // 2px
$1    // 4px
$2    // 8px
$3    // 12px
$4    // 16px
$5    // 20px
// ... continues
```

**Common Usage:**
- Tight spacing: `gap="$2"`
- Standard spacing: `gap="$4"`
- Generous spacing: `gap="$6"`

## Usage Examples

### Text with Color Tokens

```tsx
import { Text, Heading } from '@puzzlebottom/totm-ui-components';

// Primary text
<Text size="body" color="$gray12">
  Main content text
</Text>

// Secondary text
<Text size="small" color="$gray11">
  Supporting information
</Text>

// Muted text
<Text size="caption" color="$gray10">
  Timestamp or metadata
</Text>

// Brand accent
<Text color="$purple7">
  Call to action or link
</Text>
```

### Headings with Color

```tsx
// Default (uses $color, theme-aware)
<Heading level="h1">
  Page Title
</Heading>

// Custom brand color
<Heading level="h2" color="$purple7">
  Featured Section
</Heading>

// Muted heading
<Heading level="h3" color="$gray11">
  Secondary Section
</Heading>
```

### Combining Tokens

```tsx
<View bg="$gray2" p="$4" borderWidth={1} borderColor="$gray7">
  <Heading level="h3" color="$gray12">
    Card Title
  </Heading>
  <Text size="body" color="$gray11">
    Card content with proper hierarchy
  </Text>
  <Text size="small" color="$purple7">
    Learn more →
  </Text>
</View>
```

## Best Practices

### Contrast Ratios

Maintain WCAG AA standards:
- Normal text (< 18px): 4.5:1 contrast minimum
- Large text (≥ 18px): 3:1 contrast minimum

**Good combinations:**
- `$gray12` on light backgrounds (high contrast)
- `$gray11` on light backgrounds (medium-high)
- `$gray10` on light backgrounds (medium, use sparingly)

### Token Selection

1. **Start with semantic tokens** when available:
   ```tsx
   color="$color"        // Theme-aware default
   color="$success"      // Success state
   color="$danger"       // Error state
   ```

2. **Use grayscale for hierarchy**:
   ```tsx
   color="$gray12"       // Primary content
   color="$gray11"       // Secondary content
   color="$gray10"       // Tertiary/muted
   ```

3. **Use brand colors sparingly**:
   ```tsx
   color="$purple7"      // Accents, CTAs, links
   ```

### Don't Hardcode Colors

```tsx
// ❌ Don't
<Text style={{ color: '#171717' }}>
  Hardcoded color
</Text>

// ✅ Do
<Text color="$gray12">
  Uses design token
</Text>
```

## Adding New Tokens

To add custom tokens, edit `src/provider/config.ts`:

```tsx
const customTokens = createTokens({
  ...defaultTokens,
  color: {
    // Add your custom colors here
    brand: '#your-color',
    brandLight: '#lighter-shade',
    // Use 1-12 scale for consistency
    brand1: '#lightest',
    brand7: '#primary',
    brand12: '#darkest',
  },
});
```

## Resources

- See `src/provider/config.ts` for full token definitions
- Tamagui docs: https://tamagui.dev/docs/core/theme
- Component examples: See story files in `dev/stories/`

