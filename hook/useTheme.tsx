import { useColorScheme } from 'react-native'

const useTheme = () => {
  const isLightTheme = useColorScheme() === 'light'

  return {
    isLightTheme,
  }
}

export default useTheme
