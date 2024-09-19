import { StyleSheet, View } from 'react-native'

import { LogoIcon } from '@/utils/icons'
import SafeAreaView from '@/components/common/SafeAreaView'

const Loading = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <LogoIcon width={40} height={40} />
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
})

export default Loading
