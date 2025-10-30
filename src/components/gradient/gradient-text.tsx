import MaskedView from "@react-native-masked-view/masked-view";
import { Platform, Text, type TextProps } from "react-native";
import { useTheme } from "tamagui";
import { Gradient, type GradientProps } from "./gradient";

export type GradientTextProps = TextProps & {
  colors?: GradientProps['colors'];
  start?: GradientProps['start'];
  end?: GradientProps['end'];
  locations?: GradientProps['locations'];
};

const _GradientTextMobile = ({ children, colors, start, end, locations, ...props }: GradientTextProps) => (
  <MaskedView
    maskElement={
      <Text {...props} style={[props.style, { backgroundColor: 'transparent' }]}>
        {children}
      </Text>
    }
  >
    <Gradient
      colors={colors}
      start={start}
      end={end}
      locations={locations}
    >
      {/* Invisible text to maintain proper sizing */}
      <Text {...props} style={[props.style, { opacity: 0 }]}>
        {children}
      </Text>
    </Gradient>
  </MaskedView>
);

const _GradientTextWeb = ({ children, colors, start, end, locations, style, ...props }: GradientTextProps) => {
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

export const GradientText = (props: GradientTextProps) => {
  return Platform.select({
    native: <_GradientTextMobile {...props} />,
    web: <_GradientTextWeb {...props} />,
  }) as React.ReactElement;
};

