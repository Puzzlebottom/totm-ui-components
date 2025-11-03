import { StyleSheet, View, type ViewProps } from "react-native";
import { _GradientBorder, GradientBorderViewStyle } from "./_gradient-border";
import { getGradientBorderComponentStyles } from "./get-gradient-border-component-styles";


/**
 * GradientBorderView wraps content with a gradient-colored border effect.
 * 
 * @remarks
 * Use GradientBorderView to create visual emphasis and hierarchy for featured content,
 * cards, or call-to-action containers. The gradient border adds visual interest but
 * increases rendering complexity, so use strategically for maximum impact.
 * 
 * **When to use:**
 * - Featured cards or promoted content that needs to stand out
 * - Premium/pro feature containers to indicate special status
 * - Primary CTAs in card-based layouts
 * - Hero sections or spotlight areas (1-2 per screen max)
 * - Content that needs visual hierarchy without heavy backgrounds
 * 
 * **When NOT to use:**
 * - List items that repeat frequently - use solid borders for performance
 * - Subtle UI elements or secondary content - defeats the emphasis purpose
 * - Complex nested layouts - adds rendering overhead
 * - Small components (< 100px) - gradient effect lost at small scale
 * - Backgrounds where content needs high readability - use solid backgrounds
 * 
 * **Accessibility:**
 * - Ensure content inside has sufficient contrast with background
 * - Gradient border is decorative - don't rely on it for critical information
 * - Border width should be visible (minimum 2px recommended)
 * 
 * **Performance note:**
 * - Web: Uses absolute positioning + CSS masking (moderate cost)
 * - Native: Uses MaskedView + LinearGradient (additional render layers)
 * - Limit to 2-3 instances per screen for optimal performance
 * - Consider solid borders for repeated elements in lists/grids
 * 
 * @example
 * Featured card with gradient border:
 * ```tsx
 * <GradientBorderView
 *   style={{
 *     borderRadius: 16,
 *     borderWidth: 2,
 *     padding: 20,
 *   }}
 * >
 *   <Text>Premium Feature Content</Text>
 * </GradientBorderView>
 * ```
 * 
 * @example
 * Hero section container:
 * ```tsx
 * <GradientBorderView
 *   style={{
 *     borderRadius: 24,
 *     borderWidth: 3,
 *     padding: 32,
 *   }}
 * >
 *   <View>
 *     <Text style={{ fontSize: 32, fontWeight: 'bold' }}>
 *       Special Announcement
 *     </Text>
 *     <Text>Important content here</Text>
 *   </View>
 * </GradientBorderView>
 * ```
 * 
 * @example
 * Subtle card emphasis:
 * ```tsx
 * // Use thinner border for less prominent emphasis
 * <GradientBorderView
 *   style={{
 *     borderRadius: 12,
 *     borderWidth: 1,
 *     padding: 16,
 *   }}
 * >
 *   <Text>Pro Tip: Use this feature to boost productivity</Text>
 * </GradientBorderView>
 * ```
 */
export type GradientBorderViewProps = Omit<ViewProps, "style"> & {
  style?: GradientBorderViewStyle;
} & React.RefAttributes<View>

export const GradientBorderView = (
  props: GradientBorderViewProps
) => {
  const defaultBorderWidth = 1;

  const styles = props.style ? StyleSheet.flatten(props.style) : {};

  // Use the helper function to properly calculate padding with border compensation
  const [adjustedStyles] = getGradientBorderComponentStyles({
    ...styles,
    borderWidth: styles.borderWidth ?? defaultBorderWidth,
  });

  return (
    <View
      {...props}
      style={{
        ...adjustedStyles,
        borderWidth: 0,
        boxSizing: 'content-box',
      }}
      ref={props.ref}
    >
      <_GradientBorder
        borderRadius={styles.borderRadius ?? 0}
        borderWidth={styles.borderWidth ?? defaultBorderWidth}
      />
      {props.children}
    </View>
  );
};
