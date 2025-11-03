import { Input as TamaguiInput, styled, GetProps } from 'tamagui'

/**
 * Input component for text entry in forms and interactive elements.
 * 
 * @remarks
 * Use Input for single-line text entry in forms, search fields, and any scenario requiring
 * user text input. Supports text, email, and password input types with consistent styling
 * across web and native platforms.
 * 
 * **When to use:**
 * - Form fields for user data (name, email, etc.)
 * - Search bars and filters
 * - Password entry with secure masking
 * - Any single-line text input requirement
 * - Settings and configuration fields
 * 
 * **When NOT to use:**
 * - Multi-line text entry - use `TextArea` instead for longer content
 * - Numeric-only input with steppers - consider `NumberInput` with +/- controls
 * - Date/time selection - use date/time pickers for better UX
 * - Selection from predefined options - use `Select` or `Dropdown` instead
 * - Boolean toggles - use `Switch` or `Checkbox` for on/off states
 * 
 * **Accessibility:**
 * - Includes focus states for keyboard navigation
 * - Supports standard HTML input attributes (placeholder, autoComplete, etc.)
 * - Password fields automatically mask text for privacy
 * - Use with Label component for proper form accessibility
 * 
 * **Platform differences:**
 * - Web: Uses standard HTML input element
 * - Native: Uses React Native TextInput with platform-specific keyboard types
 * - Password masking handled automatically per platform
 * 
 * @example
 * Basic text input:
 * ```tsx
 * <Input 
 *   placeholder="Enter your name"
 *   value={name}
 *   onChangeText={setName}
 * />
 * ```
 * 
 * @example
 * Email input with autocomplete:
 * ```tsx
 * <Input
 *   placeholder="Email"
 *   keyboardType="email-address"
 *   autoCapitalize="none"
 *   autoComplete="email"
 *   value={email}
 *   onChangeText={setEmail}
 * />
 * ```
 * 
 * @example
 * Password input with secure entry:
 * ```tsx
 * <Input
 *   placeholder="Password"
 *   secureTextEntry
 *   autoComplete="password"
 *   value={password}
 *   onChangeText={setPassword}
 * />
 * ```
 * 
 * @example
 * With Label for accessibility:
 * ```tsx
 * <Label htmlFor="username">Username</Label>
 * <Input
 *   id="username"
 *   placeholder="Enter username"
 *   value={username}
 *   onChangeText={setUsername}
 * />
 * ```
 * 
 * @example
 * Different sizes:
 * ```tsx
 * <Input size="$3" placeholder="Small input" />
 * <Input size="$4" placeholder="Default input" />
 * <Input size="$5" placeholder="Large input" />
 * ```
 */
export const Input = styled(TamaguiInput, {
  name: 'Input',
  
  // Default styling
  borderWidth: 2,
  borderColor: '$gray6',
  rounded: '$4',
  bg: '$background',
  color: '$color',
  fontFamily: '$body',
  px: '$3',
  
  // Focus state
  focusStyle: {
    borderColor: '$purple9',
    outlineWidth: 0,
  },
  
  // Hover state
  hoverStyle: {
    borderColor: '$gray7',
  },
} as const)

export type InputProps = GetProps<typeof Input>

