import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@puzzlebottom/totm-ui-components';
import { View } from 'react-native';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, width: 300, padding: 20, gap: 10 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    onChangeText: { action: 'text changed' },
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## When to Use

Use Input for single-line text entry in forms, search fields, and any scenario requiring user text input.

**Good for:**
- Form fields (name, email, username, etc.)
- Search bars and filters
- Password entry with secure masking
- Settings and configuration fields

**Avoid when:**
- Multi-line text is needed - use TextArea instead
- Selecting from predefined options - use Select or Dropdown
- Date/time selection - use specialized pickers
- Boolean toggles - use Switch or Checkbox

## Accessibility

- Includes focus states for keyboard navigation
- Supports standard input attributes (placeholder, autoComplete)
- Password fields mask text automatically
- Use with Label component for proper form accessibility
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Basic text input
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Input
        placeholder="Enter text..."
        value={value}
        onChangeText={setValue}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic text input with placeholder. Use for general text entry.',
      },
    },
  },
};

// Email input
export const Email: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    return (
      <Input
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={email}
        onChangeText={setEmail}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Email input with email keyboard and autocomplete. Use in login/signup forms.',
      },
    },
  },
};

// Password input
export const Password: Story = {
  render: () => {
    const [password, setPassword] = useState('');
    return (
      <Input
        placeholder="Password"
        secureTextEntry
        autoComplete="password"
        value={password}
        onChangeText={setPassword}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Password input with secure text masking. Text is hidden for privacy.',
      },
    },
  },
};

// With default value
export const WithDefaultValue: Story = {
  render: () => {
    const [value, setValue] = useState('Default text');
    return (
      <Input
        placeholder="Enter text..."
        value={value}
        onChangeText={setValue}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with pre-filled default value. Useful for edit forms.',
      },
    },
  },
};

// Disabled state
export const Disabled: Story = {
  render: () => {
    return (
      <Input
        placeholder="Disabled input"
        value="Cannot edit this"
        disabled
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled input that cannot be edited. Use to show read-only data.',
      },
    },
  },
};

// Different sizes
export const Small: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Input
        size="$3"
        placeholder="Small input"
        value={value}
        onChangeText={setValue}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Smaller input size ($3). Use in compact layouts or tables.',
      },
    },
  },
};

export const Large: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Input
        size="$5"
        placeholder="Large input"
        value={value}
        onChangeText={setValue}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Larger input size ($5). Use for prominent forms or better touch targets.',
      },
    },
  },
};

// All sizes comparison
export const AllSizes: Story = {
  render: () => {
    return (
      <View style={{ flex: 1, flexDirection: 'column', gap: 15 }}>
        <Input size="$2" placeholder="Size $2" />
        <Input size="$3" placeholder="Size $3" />
        <Input size="$4" placeholder="Size $4 (default)" />
        <Input size="$5" placeholder="Size $5" />
        <Input size="$6" placeholder="Size $6" />
      </View>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all available input sizes.',
      },
    },
  },
};

// Login form example
export const LoginFormExample: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
      <View style={{ flex: 1, flexDirection: 'column', gap: 15 }}>
        <Input
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          autoComplete="password"
          value={password}
          onChangeText={setPassword}
        />
      </View>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of a typical login form with email and password inputs.',
      },
    },
  },
};

// Sign up form example
export const SignUpFormExample: Story = {
  render: () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
      <View style={{ flex: 1, flexDirection: 'column', gap: 15 }}>
        <Input
          placeholder="Name"
          autoComplete="name"
          value={name}
          onChangeText={setName}
        />
        <Input
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          autoComplete="password"
          value={password}
          onChangeText={setPassword}
        />
      </View>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of a typical sign up form with name, email, and password fields.',
      },
    },
  },
};


