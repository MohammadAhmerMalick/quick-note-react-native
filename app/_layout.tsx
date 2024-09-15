import {
  Montserrat_100Thin,
  Montserrat_700Bold,
  Montserrat_900Black,
  Montserrat_300Light,
  Montserrat_500Medium,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_800ExtraBold,
  Montserrat_200ExtraLight,
} from '@expo-google-fonts/montserrat'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'

export default function RootLayout() {
  const [loaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_700Bold,
    Montserrat_900Black,
    Montserrat_300Light,
    Montserrat_500Medium,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_800ExtraBold,
    Montserrat_200ExtraLight,
  })

  if (!loaded) {
    return null
  }

  return (
    <Stack>
      <Stack.Screen name="(public)/index" options={{ headerShown: false }} />
      <Stack.Screen name="(public)/login" options={{ headerShown: false }} />
    </Stack>
  )
}
