import { StyleSheet, Text } from 'react-native'

import { TAILWIND } from '@/constants'
import useTheme from '@/hook/useTheme'

const MainHeading = () => {
  const { neutral } = TAILWIND
  const { isLightTheme } = useTheme()

  const styleStates = {
    h1: {
      ...styles.h1,
      color: isLightTheme ? neutral[950] : neutral[50],
    },
  }

  return <Text style={styleStates.h1}>Quick Note</Text>
}

const styles = StyleSheet.create({
  h1: {
    marginTop: 16,
    marginBottom: 8,

    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    fontFamily: 'Montserrat_600SemiBold',
  },
})

export default MainHeading
