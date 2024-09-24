import { useEffect } from 'react'
import { router, Stack } from 'expo-router'

import useAuth from '@/hook/useAuth'
import Loading from '@/components/common/Loading'

export default function ProtectedLayout() {
  const { isLoggedIn, isAuthLoading, isTokenChecked, verifyToken } = useAuth()

  useEffect(() => {
    verifyToken()
  }, [])

  if (isAuthLoading) return <Loading />

  if (isTokenChecked && !isLoggedIn) return router.replace('/(public)/login')

  return <Stack screenOptions={{ headerShown: false }}></Stack>
}
