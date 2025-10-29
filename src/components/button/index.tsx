import { getSize, getSpace } from '@tamagui/get-token'
import { cloneElement, isValidElement, useContext } from 'react'
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

  hoverStyle: {
    bg: '$backgroundHover',
  },

  pressStyle: {
    bg: '$backgroundPress',
  },

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
        bg: '$blue10',
        hoverStyle: {
          bg: '$blue9',
        },
        pressStyle: {
          bg: '$blue11',
        },
      },
      secondary: {
        bg: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
        hoverStyle: {
          bg: '$backgroundHover',
        },
        pressStyle: {
          bg: '$backgroundPress',
        },
      },
      outline: {
        bg: 'transparent',
        borderWidth: 1,
        borderColor: '$blue10',
        hoverStyle: {
          bg: '$blue2',
        },
        pressStyle: {
          bg: '$blue3',
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
        color: '$color',
      },
      outline: {
        color: '$blue10',
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

export const Button = withStaticProperties(ButtonFrame, {
  Props: ButtonContext.Provider,
  Text: ButtonText,
  Icon: ButtonIcon,
})
