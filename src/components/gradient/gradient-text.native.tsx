import MaskedView from "@react-native-masked-view/masked-view";
import { Text, type TextProps } from "react-native";
import { Gradient, type GradientProps } from "./gradient";
import { LinearGradient } from "@tamagui/linear-gradient";
import { GetProps } from "tamagui";

type BaseLinearGradientProps = GetProps<typeof LinearGradient>

// Helper type: if colors is provided, locations must be provided (and vice versa)
type GradientTextColorProps =
  | { colors?: never; locations?: never } // Neither provided - use defaults
  | { colors: BaseLinearGradientProps['colors']; locations: BaseLinearGradientProps['locations'] } // Both provided

export type GradientTextProps = TextProps & {
  gradientStart?: GradientProps['start'];
  gradientEnd?: GradientProps['end'];
} & GradientTextColorProps;

export const GradientText = ({ children, colors, gradientStart, gradientEnd, locations, ...props }: GradientTextProps) => {
  // Build gradient props object, type assertion is safe because GradientTextProps enforces the constraint
  const gradientProps = {
    ...(colors !== undefined && locations !== undefined ? { colors, locations } : {}),
    ...(gradientStart !== undefined ? { start: gradientStart } : {}),
    ...(gradientEnd !== undefined ? { end: gradientEnd } : {}),
  } as GradientProps;

  return (
    <MaskedView
      maskElement={
        <Text {...props} style={[props.style, { backgroundColor: 'transparent' }]}>
          {children}
        </Text>
      }
    >
      <Gradient {...gradientProps}>
        {/* Invisible text to maintain proper sizing */}
        <Text {...props} style={[props.style, { opacity: 0 }]}>
          {children}
        </Text>
      </Gradient>
    </MaskedView>
  );
};

