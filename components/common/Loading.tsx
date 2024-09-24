import { StyleSheet, View } from 'react-native'

import { LogoIcon } from '@/utils/icons'

const Loading = () => {
  return (
    <View style={styles.container}>
      <LogoIcon width={40} height={40} />
    </View>
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
