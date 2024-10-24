import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { loginRequest, logOutRequest } from '@/network'

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAuthLoading, setIsAuthLoading] = useState(false)

  const logOut = async () => {
    setIsAuthLoading(true)
    await AsyncStorage.clear()
    await logOutRequest()
    setIsLoggedIn(false)
    setIsAuthLoading(false)
  }

  const login = async (email: string, password: string) => {
    setIsAuthLoading(true)

    if (!email || !password) {
      alert('Fields are required')
      return
    }

    const body = new FormData()
    body.append('email', email)
    body.append('password', password)

    const { status, messages, token } = await loginRequest(body)
    await AsyncStorage.setItem('token', token)

    if (status === 'success') setIsLoggedIn(true)
    if (status === 'error') {
      messages.forEach((message: string) => alert(message))
      alert('Unable to login')
    }

    setIsAuthLoading(false)
  }

  return {
    login,
    logOut,
    isLoggedIn,
    isAuthLoading,
  }
}

export default useAuth
