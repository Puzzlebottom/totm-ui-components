import type {
  GradientBorderSubstitutionViewProps,
  GradientBorderViewProps,
} from "./_gradient-border";

// Helper function to omit keys from an object
const omit = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
};

/**
 * @description This function modifies the user-provided padding values for an
 * element by adding the borderWidth value to any values for padding, paddingLeft,
 * paddingRight, paddingTop, or paddingBottom.  It is intended for use with an element
 * that includes a _GradientBorder so that the padding is increased by the width of the
 * border and the content appears as intended
 */

export const getGradientBorderComponentStyles = (
  styles: GradientBorderViewProps & GradientBorderSubstitutionViewProps,
) => {
  const userAllPadding = styles.padding ?? 0;
  const compensationAllPadding = styles.borderWidth ?? 0;

  const calculatePaddingForSide = (
    paddingName:
      | "paddingLeft"
      | "paddingRight"
      | "paddingTop"
      | "paddingBottom",
    borderWidthName:
      | "borderLeftWidth"
      | "borderRightWidth"
      | "borderTopWidth"
      | "borderBottomWidth",
  ) => {
    const userPadding = styles[paddingName] ?? userAllPadding;
    const compensationPadding =
      styles[borderWidthName] ?? compensationAllPadding;

    return userPadding + compensationPadding;
  };

  return [
    {
      ...styles,
      paddingLeft: calculatePaddingForSide("paddingLeft", "borderLeftWidth"),
      paddingRight: calculatePaddingForSide("paddingRight", "borderRightWidth"),
      paddingTop: calculatePaddingForSide("paddingTop", "borderTopWidth"),
      paddingBottom: calculatePaddingForSide(
        "paddingBottom",
        "borderBottomWidth",
      ),
    },
    omit(styles, [
      "borderWidth",
      "borderLeftWidth",
      "borderRightWidth",
      "borderTopWidth",
      "borderBottomWidth",
    ]),
  ];
};
