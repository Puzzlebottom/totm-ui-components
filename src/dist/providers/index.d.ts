import type { ReactNode } from 'react';
export interface UIProviderProps {
    children: ReactNode;
    defaultTheme?: string;
}
/**
 * UI Provider for totm-ui-components
 * Wraps the base UI library provider
 */
export declare const UIProvider: ({ children, defaultTheme }: UIProviderProps) => import("react/jsx-runtime").JSX.Element;
export default UIProvider;
