import { LinearGradient } from "@tamagui/linear-gradient"
import { GetProps } from "tamagui"

type BaseLinearGradientProps = GetProps<typeof LinearGradient>

// Helper type: if colors is provided, locations must be provided (and vice versa)
type GradientColorProps =
  | { colors?: never; locations?: never } // Neither provided - use defaults
  | { colors: BaseLinearGradientProps['colors']; locations: BaseLinearGradientProps['locations'] } // Both provided

export type GradientProps = Omit<BaseLinearGradientProps, 'colors' | 'locations'> & GradientColorProps

export const Gradient = ({ colors = ["$purple11", "$pink7", "$red7"], start = [0, 1], end = [1, 0], locations = [0, 0.5, 1], ...props }: GradientProps) => {
  return (
    <LinearGradient colors={colors} start={start} end={end} locations={locations} {...props} />
  )
}
