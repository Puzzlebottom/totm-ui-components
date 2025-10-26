import { TamaguiProvider as BaseProvider } from 'tamagui';
import config from '../tamagui/config';
import type { ReactNode } from 'react';

export interface UIProviderProps {
  children: ReactNode;
  defaultTheme?: string;
}

/**
 * UI Provider for totm-ui-components
 * Wraps the base UI library provider
 */
export const UIProvider = ({ children, defaultTheme = 'light' }: UIProviderProps) => {
  return <BaseProvider config={config} defaultTheme={defaultTheme}>{children}</BaseProvider>;
};

export default UIProvider;

