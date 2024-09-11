import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(public)/index" options={{ headerShown: false }} />
    </Stack>
  )
}
