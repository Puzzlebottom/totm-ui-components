import { StyleSheet, View, type ViewProps } from "react-native";
import { _GradientBorder, GradientBorderViewStyle } from "./_gradient-border";
import { getGradientBorderComponentStyles } from "./get-gradient-border-component-styles";

export const GradientBorderView = (
  props: Omit<ViewProps, "style"> & {
    style?: GradientBorderViewStyle;
  } & React.RefAttributes<View>,
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
