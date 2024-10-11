import AsyncStorage from '@react-native-async-storage/async-storage'

import { API_BASE_URL } from '@/constants'

const apiBaseUrl = API_BASE_URL

type methods = 'GET' | 'POST' | 'DELETE' | 'PUT'

const call = async (
  url: string,
  method: methods = 'GET',
  body?: BodyInit,
  headers?: HeadersInit
): Promise<{ status: 'error'; message: string } | any> => {
  try {
    const requestOptions: RequestInit = { method }
    if (body) requestOptions.body = body
    if (headers) requestOptions.headers = headers

    // console.log({ url, requestOptions })
    const res = await fetch(apiBaseUrl + url, requestOptions)
    const data = await res.json()

    if (data.message === 'Not authorized') AsyncStorage.clear()

    return data
  } catch (error) {
    console.log({ network: error })
    return { status: 'error', message: 'Something went wrong' }
  }
}

const loginRequest = async (formData: FormData) =>
  call('login', 'POST', formData)

const logOutRequest = async () => call('logout', 'POST')

const verifyTokenRequest = async (token: string = '') => {
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token || ''}`,
  }

  return call('verify-token', 'POST', JSON.stringify({ token }), headers)
}

const getNotesRequest = async () => {
  const token = await AsyncStorage.getItem('token')

  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token || ''}`,
  }

  return call('notes', 'GET', '', headers)
}

const softDeleteNotesRequest = async (id: string) => {
  const token = await AsyncStorage.getItem('token')

  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token || ''}`,
  }

  const body = JSON.stringify({ id })

  return call(`notes`, 'DELETE', body, headers)
}

const restoreNoteRequest = async (id: string) => {
  const token = await AsyncStorage.getItem('token')

  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token || ''}`,
  }

  const body = JSON.stringify({ id })

  return call(`notes`, 'PUT', body, headers)
}

export {
  apiBaseUrl,
  loginRequest,
  logOutRequest,
  getNotesRequest,
  restoreNoteRequest,
  verifyTokenRequest,
  softDeleteNotesRequest,
}
