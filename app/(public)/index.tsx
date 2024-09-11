import { Text } from 'react-native'

import SafeAreaView from '@/components/common/SafeAreaView'
import PublicLayout from '@/components/layouts/PublicLayout'

const index = () => {
  return (
    <SafeAreaView>
      <PublicLayout>
        <Text>Quick Note</Text>
      </PublicLayout>
    </SafeAreaView>
  )
}

export default index
