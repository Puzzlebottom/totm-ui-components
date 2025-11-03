import MaskedView from "@react-native-masked-view/masked-view";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
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

export const _GradientBorder = ({
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
    <Gradient colors={['$purple11', '$pink7', '$red7']} locations={[0, 0.5, 1]} style={{ flex: 1 }} />
  </MaskedView>
);

