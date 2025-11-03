import { Text, type TextProps } from "react-native";
import { useTheme } from "tamagui";
import { type GradientProps } from "./gradient";
import { LinearGradient } from "@tamagui/linear-gradient";
import { GetProps } from "tamagui";

type BaseLinearGradientProps = GetProps<typeof LinearGradient>

// Helper type: if colors is provided, locations must be provided (and vice versa)
type GradientTextColorProps =
  | { colors?: never; locations?: never } // Neither provided - use defaults
  | { colors: BaseLinearGradientProps['colors']; locations: BaseLinearGradientProps['locations'] } // Both provided

/**
 * GradientText applies a gradient color effect to text using CSS background-clip (web).
 * 
 * @remarks
 * Use GradientText for hero headlines, feature titles, and brand moments where visual
 * impact is critical. This component reduces text readability compared to solid colors,
 * so use it sparingly and only for short, high-emphasis text.
 * 
 * **When to use:**
 * - Hero headlines on landing pages or splash screens
 * - Feature section titles that need visual emphasis
 * - Brand moments requiring distinctive styling
 * - Call-to-action text that needs extra attention (1-3 words max)
 * - Decorative headings where readability trade-off is acceptable
 * 
 * **When NOT to use:**
 * - Body text or paragraphs - use `Text` instead for readability
 * - UI labels or form fields - use `Text` or `Label` for clarity
 * - Small text (< 20px) - gradient becomes difficult to read at small sizes
 * - Long headings (> 5 words) - gradient reduces scannability
 * - Buttons or interactive text - use `Button` with variant="outline" instead
 * - Content that must be accessible - solid colors provide better contrast
 * 
 * **Accessibility:**
 * - Gradient text has lower contrast than solid colors
 * - Ensure sufficient luminance difference across gradient stops
 * - Test with color blindness simulators
 * - Consider providing a solid color fallback for accessibility modes
 * - Avoid on critical UI elements
 * 
 * **Performance note:**
 * - Web uses CSS background-clip (well-supported, performant)
 * - Native uses MaskedView (additional render layer)
 * - Limit to 2-3 instances per screen for best performance
 * 
 * @example
 * Hero headline with default gradient:
 * ```tsx
 * <GradientText style={{ fontSize: 48, fontWeight: 'bold' }}>
 *   Welcome to Our App
 * </GradientText>
 * ```
 * 
 * @example
 * Feature title with custom colors:
 * ```tsx
 * <GradientText
 *   colors={['$blue10', '$purple10', '$pink10']}
 *   locations={[0, 0.5, 1]}
 *   style={{ fontSize: 32, fontWeight: '600' }}
 * >
 *   Premium Features
 * </GradientText>
 * ```
 * 
 * @example
 * Vertical gradient (top to bottom):
 * ```tsx
 * <GradientText
 *   start={[0, 0]}
 *   end={[0, 1]}
 *   style={{ fontSize: 36 }}
 * >
 *   New Release
 * </GradientText>
 * ```
 * 
 * @example
 * Brand moment with default colors (no custom colors needed):
 * ```tsx
 * // Use for special announcements or celebrations
 * // Omit colors/locations to use attractive defaults
 * <GradientText
 *   style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center' }}
 * >
 *   🎉 Achievement Unlocked!
 * </GradientText>
 * ```
 */
export type GradientTextProps = TextProps & {
  start?: GradientProps['start'];
  end?: GradientProps['end'];
} & GradientTextColorProps;

export const GradientText = ({ children, colors, start, end, locations, style, ...props }: GradientTextProps) => {
  const theme = useTheme();

  // Resolve color tokens to actual values
  const resolveColor = (color: string) => {
    if (color.startsWith('$')) {
      const tokenName = color.slice(1);
      return theme[tokenName]?.get() || color;
    }
    return color;
  };

  // Use Gradient defaults if not provided
  const resolvedColors = colors || ['$purple11', '$pink7', '$red7'];
  const resolvedStart = start || [0, 1];
  const resolvedEnd = end || [1, 0];
  const resolvedLocations = locations || [0, 0.5, 1];

  const gradientColors = resolvedColors.map(resolveColor);

  // Calculate gradient angle from start and end coordinates
  // React Native uses coordinates where [0,0] is top-left, [1,1] is bottom-right
  // CSS linear-gradient uses angles clockwise from north (0deg = up, 90deg = right)
  const startArray = Array.isArray(resolvedStart) ? resolvedStart : [resolvedStart.x || 0, resolvedStart.y || 0];
  const endArray = Array.isArray(resolvedEnd) ? resolvedEnd : [resolvedEnd.x || 0, resolvedEnd.y || 0];
  const dx = (endArray[0] - startArray[0]);
  const dy = (endArray[1] - startArray[1]);
  // Convert from atan2 (counter-clockwise from east) to CSS (clockwise from north)
  const angle = 90 - (Math.atan2(-dy, dx) * (180 / Math.PI));

  // Build gradient with color stops
  const colorStops = gradientColors.map((color, i) => {
    const location = resolvedLocations[i] !== undefined ? resolvedLocations[i] * 100 : (i / (gradientColors.length - 1)) * 100;
    return `${color} ${location}%`;
  }).join(', ');

  return (
    <Text
      {...props}
      style={[
        style,
        {
          display: 'inline-block', // Make element size to content, not container
          background: `linear-gradient(${angle}deg, ${colorStops})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        } as any, // Cast to any for web-only CSS properties
      ]}
    >
      {children}
    </Text>
  );
};
