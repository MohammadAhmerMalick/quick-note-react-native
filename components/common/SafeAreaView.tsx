import { StatusBar } from 'expo-status-bar'
import { useWindowDimensions } from 'react-native'
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native'
import { SafeAreaView as SafeArea } from 'react-native-safe-area-context'

import useTheme from '@/hook/useTheme'
import NavLInks from '@/components/NavLInks'
import { PRIAMRY_COLOR, TAILWIND } from '@/constants'
import ThemeSelector from '@/components/common/ThemeSelector'

interface SafeAreaViewProps {
  children: React.ReactNode
  scrollEnabled?: boolean
}

const { neutral } = TAILWIND

const SafeAreaView = ({
  children,
  scrollEnabled = true,
}: SafeAreaViewProps) => {
  const { isLightTheme } = useTheme()
  const { height } = useWindowDimensions()

  const bodyStyle: ViewStyle = {
    minHeight: height,
    padding: 12,
    backgroundColor: isLightTheme ? neutral[50] : neutral[950],
  }

  return (
    <SafeArea style={styles.safeArea}>
      <ScrollView scrollEnabled={scrollEnabled}>
        <StatusBar style="dark"></StatusBar>
        <View style={bodyStyle}>
          <View style={styles.header}>
            <NavLInks />
            <ThemeSelector />
          </View>
          {children}
        </View>
      </ScrollView>
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
