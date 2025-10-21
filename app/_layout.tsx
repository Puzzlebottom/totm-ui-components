import { Stack } from "expo-router"

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={__DEV__}>
        <Stack.Screen name="index" />
      </Stack.Protected>
    </Stack>
  )
}
