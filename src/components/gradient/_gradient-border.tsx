import MaskedView from "@react-native-masked-view/masked-view";
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "tamagui";
import { Gradient } from "./gradient";


type GradientBorderProps = { borderWidth: number; borderRadius: number };

export type GradientBorderViewProps = Omit<
  ViewStyle,
  | "paddingLeft"
  | "paddingRight"
  | "paddingTop"
  | "paddingBottom"
  | "padding"
  | "borderColor"
  | "borderLeftColor"
  | "borderRightColor"
  | "borderTopColor"
  | "borderBottomColor"
  | "borderRadius"
  | "borderWidth"
>;

export type GradientBorderSubstitutionViewProps = {
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  padding?: number;
  borderRadius?: number;
  borderWidth?: number;
};

export type GradientBorderViewStyle = StyleProp<
  GradientBorderViewProps & GradientBorderSubstitutionViewProps
>;

const _GradientBorderMobile = ({
  borderWidth,
  borderRadius,
}: GradientBorderProps) => (
  <MaskedView
    maskElement={
      <View
        pointerEvents="auto"
        style={[StyleSheet.absoluteFill, { borderWidth, borderRadius }]}
      />
    }
    style={[StyleSheet.absoluteFill]}
  >
    <Gradient colors={['$purple11', '$pink7', '$red7']} style={{ flex: 1 }} />
  </MaskedView>
);

const _GradientBorderWeb = ({
  borderWidth,
  borderRadius,
}: GradientBorderProps) => {
  const { purple11, pink7, red7 } = useTheme();

  return (
    <div
      style={{
        position: "absolute",
        pointerEvents: "auto",
        inset: "0",
        borderRadius: `${borderRadius}px`,
        border: `${borderWidth}px solid transparent`,
        background:
          `linear-gradient(45deg, ${purple11.variable} 10%, ${pink7.variable} 50%, ${red7.variable} 90%) border-box`,
        mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
      }}
    />
  )
};

export const _GradientBorder = (props: GradientBorderProps) => {
  return Platform.select({
    native: <_GradientBorderMobile {...props} />,
    web: <_GradientBorderWeb {...props} />,
  });
};
