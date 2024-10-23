import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, useWindowDimensions, View } from 'react-native'

import useTheme from '@/hook/useTheme'
import { LogoIcon } from '@/utils/icons'
import { PRIAMRY_COLOR, TAILWIND } from '@/constants'

const { neutral } = TAILWIND
const Loading = () => {
  const { isLightTheme } = useTheme()
  const { height } = useWindowDimensions()

  const StyleStates = {
    container: {
      ...styles.container,
      minHeight: height,

      backgroundColor: isLightTheme ? neutral[50] : neutral[850],
    },
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark"></StatusBar>
      <View style={StyleStates.container}>
        <LogoIcon width={40} height={40} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: PRIAMRY_COLOR,
  },

  container: {
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Loading
