import { createContext } from 'react'

type authContextInterface = {
  login: (email: string, password: string) => void
  logOut: () => void
  isLoggedIn: boolean
  isAuthLoading: boolean
  verifyToken: () => void
}

export const AuthContext = createContext<authContextInterface>(
  {
    login: () => {},
    logOut: () => {},
    isLoggedIn: false,
    isAuthLoading: false,
    verifyToken: () => {},
  }
  // null
)
