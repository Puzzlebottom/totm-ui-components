import { defaultConfig, tokens as defaultTokens } from '@tamagui/config/v4'
import { createTamagui } from 'tamagui'
import { createTokens } from '@tamagui/core'

// Create custom color tokens
const customTokens = createTokens({
  ...defaultTokens,
  color: {
    // Purple shades
    purple1: '#faf5ff',
    purple2: '#f3e8ff',
    purple3: '#e9d5ff',
    purple4: '#d8b4fe',
    purple5: '#c084fc',
    purple6: '#a855f7',
    purple7: '#9333ea',
    purple8: '#7e22ce',
    purple9: '#6b21a8',
    purple10: '#581c87',
    purple11: '#4c1d95',
    purple12: '#2e1065',

    // Pink shades
    pink1: '#fdf2f8',
    pink2: '#fce7f3',
    pink3: '#fbcfe8',
    pink4: '#f9a8d4',
    pink5: '#f472b6',
    pink6: '#ec4899',
    pink7: '#db2777',
    pink8: '#be185d',
    pink9: '#9f1239',
    pink10: '#831843',
    pink11: '#701a43',
    pink12: '#500724',

    // Fuschia shades
    fuschia1: '#fdf4ff',
    fuschia2: '#fae8ff',
    fuschia3: '#f5d0fe',
    fuschia4: '#f0abfc',
    fuschia5: '#e879f9',
    fuschia6: '#d946ef',
    fuschia7: '#c026d3',
    fuschia8: '#a21caf',
    fuschia9: '#86198f',
    fuschia10: '#701a75',
    fuschia11: '#581c5f',
    fuschia12: '#3b0764',

    // Semantic colors
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
  },
})

const config = createTamagui({
  ...defaultConfig,
  tokens: customTokens,
})

export type Conf = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf { }
}

export default config

