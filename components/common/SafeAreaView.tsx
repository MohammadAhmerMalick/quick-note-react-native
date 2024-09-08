import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { useColorScheme, useWindowDimensions } from 'react-native'
import { SafeAreaView as SafeArea } from 'react-native-safe-area-context'

import { PRIAMRY_COLOR, TAILWIND } from '@/constants'
import ThemeSelector from '@/components/common/ThemeSelector'

const themedStyle = {
  light: {
    backgroundColor: TAILWIND.neutral[50],
    color: TAILWIND.black,
  },
  dark: {
    backgroundColor: TAILWIND.neutral[950],
    color: TAILWIND.white,
  },
}

const SafeAreaView = ({ children }: { children: React.ReactNode }) => {
  const { height } = useWindowDimensions()

  const bodyStyle = {
    ...themedStyle[useColorScheme() ?? 'dark'],
    minHeight: height,
    padding: 12,
  }

  return (
    <SafeArea style={styles.safeArea}>
      <StatusBar style="dark"></StatusBar>
      <View style={bodyStyle}>
        <View style={styles.header}>
          <ThemeSelector></ThemeSelector>
        </View>
        {children}
      </View>
    </SafeArea>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: PRIAMRY_COLOR,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
})

export default SafeAreaView
