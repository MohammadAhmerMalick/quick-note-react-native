import { usePathname } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { loginRequest, logOutRequest, verifyTokenRequest } from '@/network'

const useAuth = () => {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isloading, setIsLoading] = useState(true)

  const verifyToken = useCallback(async () => {
    setIsLoading(true)
    const token = await AsyncStorage.getItem('token')

    if (token) {
      const { isVerified } = await verifyTokenRequest(token)
      setIsLoggedIn(isVerified)
    }

    setIsLoading(false)
  }, [])

  const logOut = async () => {
    setIsLoading(true)
    await AsyncStorage.clear()
    await logOutRequest()
    setIsLoggedIn(false)
    setIsLoading(false)
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    if (!email || !password) {
      alert('Fields are required')
      return
    }

    const body = new FormData()
    body.append('email', email)
    body.append('password', password)

    const { status, messages, token } = await loginRequest(body)
    await AsyncStorage.setItem('token', token)

    if (status === 'error') {
      messages.forEach((message: string) => alert(message))
      alert('Unable to login')
    }

    setIsLoading(false)
  }

  useEffect(() => {
    verifyToken()
  }, [verifyToken, pathname])

  return { isLoggedIn, isloading, logOut, login }
}

export default useAuth
