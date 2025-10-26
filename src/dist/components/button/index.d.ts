import { GetProps, SizeTokens } from 'tamagui';
export declare const ButtonContext: import("@tamagui/web").StyledContext<{
    size: SizeTokens;
    variant: "primary" | "secondary" | "outline";
}>;
export declare const ButtonFrame: import("tamagui").TamaguiComponent<import("@tamagui/web").TamaDefer, import("tamagui").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/web").StackStyleBase, {
    size?: SizeTokens | undefined;
    variant?: "primary" | "secondary" | "outline" | undefined;
}, import("@tamagui/web").StaticConfigPublic>;
export type ButtonProps = GetProps<typeof ButtonFrame>;
export declare const ButtonText: import("tamagui").TamaguiComponent<import("@tamagui/web").TamaDefer, import("tamagui").TamaguiTextElement, import("@tamagui/core").RNTamaguiTextNonStyleProps, import("@tamagui/web").TextStylePropsBase, {
    size?: import("tamagui").FontSizeTokens | undefined;
    variant?: "primary" | "secondary" | "outline" | undefined;
    unstyled?: boolean | undefined;
}, import("@tamagui/web").StaticConfigPublic>;
export declare const Button: import("react").ForwardRefExoticComponent<Omit<import("@tamagui/core").RNTamaguiViewNonStyleProps, "size" | keyof import("@tamagui/web").StackStyleBase | "variant"> & import("@tamagui/web").WithThemeValues<import("@tamagui/web").StackStyleBase> & {
    size?: SizeTokens | undefined;
    variant?: "primary" | "secondary" | "outline" | undefined;
} & import("@tamagui/web").WithShorthands<import("@tamagui/web").WithThemeValues<import("@tamagui/web").StackStyleBase>> & import("@tamagui/web").WithPseudoProps<import("@tamagui/web").WithThemeValues<import("@tamagui/web").StackStyleBase> & {
    size?: SizeTokens | undefined;
    variant?: "primary" | "secondary" | "outline" | undefined;
} & import("@tamagui/web").WithShorthands<import("@tamagui/web").WithThemeValues<import("@tamagui/web").StackStyleBase>>> & import("@tamagui/web").WithMediaProps<import("@tamagui/web").WithThemeShorthandsAndPseudos<import("@tamagui/web").StackStyleBase, {
    size?: SizeTokens | undefined;
    variant?: "primary" | "secondary" | "outline" | undefined;
}>> & import("react").RefAttributes<import("tamagui").TamaguiElement>> & import("@tamagui/web").StaticComponentObject<import("@tamagui/web").TamaDefer, import("tamagui").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/web").StackStyleBase, {
    size?: SizeTokens | undefined;
    variant?: "primary" | "secondary" | "outline" | undefined;
}, import("@tamagui/web").StaticConfigPublic> & Omit<import("@tamagui/web").StaticConfigPublic, "staticConfig" | "extractable" | "styleable"> & {
    __tama: [import("@tamagui/web").TamaDefer, import("tamagui").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/web").StackStyleBase, {
        size?: SizeTokens | undefined;
        variant?: "primary" | "secondary" | "outline" | undefined;
    }, import("@tamagui/web").StaticConfigPublic];
} & {
    Props: import("react").Provider<{
        size: SizeTokens;
        variant: "primary" | "secondary" | "outline";
    }> & import("react").ProviderExoticComponent<Partial<{
        size: SizeTokens;
        variant: "primary" | "secondary" | "outline";
    }> & {
        children?: import("react").ReactNode;
        scope?: string;
    }>;
    Text: import("tamagui").TamaguiComponent<import("@tamagui/web").TamaDefer, import("tamagui").TamaguiTextElement, import("@tamagui/core").RNTamaguiTextNonStyleProps, import("@tamagui/web").TextStylePropsBase, {
        size?: import("tamagui").FontSizeTokens | undefined;
        variant?: "primary" | "secondary" | "outline" | undefined;
        unstyled?: boolean | undefined;
    }, import("@tamagui/web").StaticConfigPublic>;
    Icon: (props: {
        children: React.ReactNode;
    }) => import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | null;
};
