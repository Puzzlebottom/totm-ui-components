import { LinearGradient } from "@tamagui/linear-gradient"
import { GetProps } from "tamagui"

export type GradientProps = GetProps<typeof LinearGradient>

export const Gradient = ({ colors = ["$purple11", "$pink7", "$red7"], start = [0, 1], end = [1, 0], locations = [0, 0.5, 1], ...props }: GradientProps) => {
  return (
    <LinearGradient colors={colors} start={start} end={end} locations={locations} {...props} />
  )
}
