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
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'

import useAuth from '@/hook/useAuth'
import Loading from '@/components/common/Loading'
import { AuthContext } from '@/contexts/authContext'

export default function RootLayout() {
  const [fontLoaded] = useFonts({
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

  const { login, logOut, isLoggedIn, verifyToken, isAuthLoading } = useAuth()

  if (!fontLoaded || isAuthLoading) return <Loading />

  return (
    <AuthContext.Provider
      value={{
        login,
        logOut,
        isLoggedIn,
        verifyToken,
        isAuthLoading,
      }}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(public)/index" />
        <Stack.Screen name="(public)/login" />
      </Stack>
    </AuthContext.Provider>
  )
}
