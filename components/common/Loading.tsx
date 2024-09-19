import { StyleSheet, Text, View } from 'react-native'

import useTheme from '@/hook/useTheme'
import { TAILWIND } from '@/constants'
import { LogoIcon } from '@/utils/icons'
import SafeAreaView from '@/components/common/SafeAreaView'

const Loading = () => {
  const { neutral, white } = TAILWIND
  const { isLightTheme } = useTheme()

  const styleStates = {
    text: {
      ...styles.text,
      color: isLightTheme ? neutral[900] : white,
    },
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <LogoIcon width={40} height={40} />
        <Text style={styleStates.text}>Loading</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Montserrat_500Medium',
  },
})

export default Loading
