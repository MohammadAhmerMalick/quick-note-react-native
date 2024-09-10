import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { useColorScheme, useWindowDimensions } from 'react-native'
import { SafeAreaView as SafeArea } from 'react-native-safe-area-context'

import NavLInks from '@/components/NavLInks'
import { PRIAMRY_COLOR, TAILWIND } from '@/constants'
import ThemeSelector from '@/components/common/ThemeSelector'

const SafeAreaView = ({ children }: { children: React.ReactNode }) => {
  const { height } = useWindowDimensions()

  const bodyStyle = {
    minHeight: height,
    padding: 12,
    backgroundColor:
      useColorScheme() === 'light'
        ? TAILWIND.neutral[50]
        : TAILWIND.neutral[950],

    color: useColorScheme() === 'light' ? TAILWIND.black : TAILWIND.white,
  }

  return (
    <SafeArea style={styles.safeArea}>
      <StatusBar style="dark"></StatusBar>
      <View style={bodyStyle}>
        <View style={styles.header}>
          <NavLInks />
          <ThemeSelector />
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
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default SafeAreaView
