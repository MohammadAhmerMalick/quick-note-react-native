import { View } from 'react-native'
import { type ReactNode } from 'react'

import PoweredBy from '@/components/common/PoweredBy'
import MainHeading from '@/components/common/MainHeading'

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <View>
      <MainHeading />
      {children}
      <PoweredBy />
    </View>
  )
}

export default PublicLayout
