import { TAILWIND } from '@/constants'
import useTheme from '@/hook/useTheme'

import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

const PoweredBy = () => {
  const { neutral } = TAILWIND
  const { isLightTheme } = useTheme()

  const styleStates = {
    text: {
      ...styles.text,
      color: isLightTheme ? neutral[600] : neutral[500],
    },
    link: {
      ...styles.link,

      color: isLightTheme ? neutral[950] : neutral[400],
      borderColor: isLightTheme ? neutral[950] : neutral[400],
    },
  }

  return (
    <View style={styles.view}>
      <Text style={styleStates.text}>Powered by: </Text>
      <Link style={styleStates.link} href="https://www.mohammadahmermalick.com">
        Mohammad Ahmer Malick
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    padding: 8,
    marginTop: 4,
  },

  text: {
    fontSize: 12,
    lineHeight: 16,
  },

  link: {
    borderBottomWidth: 1,
    fontSize: 12,
    lineHeight: 16,
  },
})
export default PoweredBy
