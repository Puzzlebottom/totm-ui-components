import { getSize, getSpace } from '@tamagui/get-token'
import { cloneElement, isValidElement, useContext, useState } from 'react'
import {
  GetProps,
  SizeTokens,
  Text,
  View,
  createStyledContext,
  styled,
  useTheme,
  withStaticProperties,
} from 'tamagui'
import { Gradient, GradientBorderView } from '../gradient'

export const ButtonContext = createStyledContext({
  size: '$4' as SizeTokens,
  variant: 'primary' as 'primary' | 'secondary' | 'outline',
})

export const ButtonFrame = styled(View, {
  name: 'Button',
  context: ButtonContext,
  bg: '$background',
  justify: 'center',
  items: 'center',
  flexDirection: 'row',

  variants: {
    size: {
      '...size': (name: any, { tokens }: any) => {
        return {
          height: tokens.size[name],
          borderRadius: tokens.radius[name],
          gap: tokens.space[name].val * 0.2,
          px: getSpace(name, {
            shift: -1,
          }),
        }
      },
    },

    variant: {
      primary: {
        bg: 'transparent', // Gradient background will be layered underneath
      },
      secondary: {
        bg: '#000',
        hoverStyle: {
          bg: '#2a2a2a',
        },
        pressStyle: {
          bg: '#3a3a3a',
        },
      },
      outline: {
        bg: 'transparent',
        hoverStyle: {
          bg: 'rgba(0, 0, 0, 0.05)',
        },
        pressStyle: {
          bg: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  } as const,

  defaultVariants: {
    size: '$4',
    variant: 'primary',
  },
} as const)

export type ButtonProps = GetProps<typeof ButtonFrame>

export const ButtonText = styled(Text, {
  name: 'ButtonText',
  context: ButtonContext,
  color: '$color',
  fontFamily: '$body',
  fontWeight: '700',

  variants: {
    size: {
      '...fontSize': (name, { font }) => ({
        fontSize: font?.size[name],
      }),
    },

    variant: {
      primary: {
        color: 'white',
      },
      secondary: {
        color: 'white',
      },
      outline: {
        color: '$purple12',
      },
    },
  } as const,
})

const ButtonIcon = (props: { children: React.ReactNode }) => {
  const { size } = useContext(ButtonContext.context)
  const smaller = getSize(size, {
    shift: -2,
  })
  const theme = useTheme()

  return isValidElement(props.children)
    ? cloneElement(props.children, {
      size: smaller.val * 0.5,
      color: theme.color.get(),
    } as any)
    : null
}

// Wrapper component that handles gradient styling for different variants
const ButtonComponent = (props: ButtonProps) => {
  const variant = props.variant || 'primary'
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  // Extract size-related props to calculate border radius
  const size = props.size || '$4'

  // Get border radius from size token using getSize
  const sizeToken = getSize(size as SizeTokens)
  const borderRadius = sizeToken?.val ? sizeToken.val * 0.25 : 12

  // Primary: Solid gradient background with state-based colors
  if (variant === 'primary') {
    // Define gradient colors based on state
    let gradientColors: string[] = ['$purple11', '$pink7', '$red7'] // Default colors

    if (isPressed) {
      // Darker/more saturated colors for pressed state
      gradientColors = ['$purple12', '$pink8', '$red8']
    } else if (isHovered) {
      // Slightly lighter colors for hover state
      gradientColors = ['$purple10', '$pink6', '$red6']
    }

    return (
      <Gradient
        colors={gradientColors}
        start={[0, 1]}
        end={[1, 0]}
        locations={[0, 0.5, 1]}
        style={{ borderRadius }}
      >
        <ButtonFrame
          {...props}
          onHoverIn={() => setIsHovered(true)}
          onHoverOut={() => {
            setIsHovered(false)
            setIsPressed(false) // Reset pressed state when leaving the button
          }}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
        />
      </Gradient>
    )
  }

  // Secondary and Outline: Gradient border
  if (variant === 'secondary' || variant === 'outline') {
    const borderWidth = 2
    // Inner radius should be outer radius minus border width for perfect fit
    const innerBorderRadius = Math.max(0, borderRadius - borderWidth)
    // Reduce height to compensate for GradientBorderView padding (borderWidth * 2)
    const adjustedHeight = sizeToken?.val ? sizeToken.val - (borderWidth * 2) : undefined

    return (
      <GradientBorderView
        style={{
          borderRadius,
          borderWidth,
          overflow: 'hidden',
        }}
      >
        <ButtonFrame
          {...props}
          style={{
            borderRadius: innerBorderRadius,
            height: adjustedHeight,
          }}
        />
      </GradientBorderView>
    )
  }

  return <ButtonFrame {...props} />
}

export const Button = withStaticProperties(ButtonComponent, {
  Props: ButtonContext.Provider,
  Text: ButtonText,
  Icon: ButtonIcon,
})
