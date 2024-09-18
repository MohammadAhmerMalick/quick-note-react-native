import { API_BASE_URL } from '@/constants'

const apiBaseUrl = API_BASE_URL

type methods = 'GET' | 'POST'

const call = async (
  url: string,
  method: methods = 'GET',
  body?: any
): Promise<{ status: 'error'; message: string } | any> => {
  try {
    // console.log({
    //   url,
    //   body,
    //   method,
    //   apiBaseUrl,
    // })
    const res = await fetch(apiBaseUrl + url, { method, body })
    const data = await res.json()
    // console.log({ callData: data })
    return data
  } catch (error) {
    console.log({ network: error })
    return { status: 'error', message: 'Unable to login' }
  }
}

const loginRequest = async (formData: FormData) =>
  call('login', 'POST', formData)

const logOutRequest = async () => call('logout', 'POST')

const verifyTokenRequest = async (token: string) =>
  call('verify-token', 'POST', JSON.stringify({ token }))

export { apiBaseUrl, loginRequest, logOutRequest, verifyTokenRequest }
