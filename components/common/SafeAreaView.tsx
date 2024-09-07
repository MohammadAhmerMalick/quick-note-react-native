import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import { Dimensions, View } from 'react-native'
import { SafeAreaView as SafeArea } from 'react-native-safe-area-context'

import { PRIAMRY_COLOR, TAILWIND } from '@/constants'

const themedStyle = {
  light: {
    backgroundColor: TAILWIND.bgNeutral50,
    color: TAILWIND.textBlack,
  },
  dark: {
    backgroundColor: TAILWIND.bgNeutral950,
    color: TAILWIND.textWhite,
  },
}

const SafeAreaView = ({ children }: { children: React.ReactNode }) => {
  const style = {
    ...themedStyle[useColorScheme() ?? 'dark'],
    minHeight: Dimensions.get('window').height,
  }

  return (
    <SafeArea style={{ backgroundColor: PRIAMRY_COLOR }}>
      <StatusBar style="dark"></StatusBar>
      <View style={style}>{children}</View>
    </SafeArea>
  )
}

export default SafeAreaView
