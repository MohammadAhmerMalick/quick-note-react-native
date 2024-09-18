import { useEffect } from 'react'
import { Text } from 'react-native'
import { Stack, useRouter } from 'expo-router'

import useAuth from '@/hook/useAuth'
import SafeAreaView from '@/components/common/SafeAreaView'

export default function LoginLayout() {
  const router = useRouter()
  const { isLoggedIn, isloading } = useAuth()

  useEffect(() => {
    if (isLoggedIn) router.replace('/(public)')
  }, [isLoggedIn])

  if (isloading)
    return (
      <SafeAreaView>
        <Text>Loading</Text>
      </SafeAreaView>
    )
  return <Stack screenOptions={{ headerShown: false }}></Stack>
}
