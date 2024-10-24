import { createContext } from 'react'

type authContextInterface = {
  logOut: () => void
  isLoggedIn: boolean
  isAuthLoading: boolean
  login: (email: string, password: string) => void
}

export const AuthContext = createContext<authContextInterface>({
  login: () => {},
  logOut: () => {},
  isLoggedIn: false,
  isAuthLoading: false,
})
