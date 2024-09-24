import { StyleSheet, View } from 'react-native'
import type { Dispatch, SetStateAction } from 'react'

import {
  AiOutlineCreditCardIcon,
  AiOutlineOrderedListIcon,
} from '@/utils/icons'
import useTheme from '@/hook/useTheme'
import { TAILWIND } from '@/constants'
import IconButton from '@/components/common/IconButton'

const NotesLayoutSelector = ({
  layout = 'list',
  setLayout,
}: {
  layout: 'card' | 'list'
  setLayout: Dispatch<SetStateAction<'card' | 'list'>>
}) => {
  const { neutral } = TAILWIND
  const { isLightTheme } = useTheme()

  const iconFIll = isLightTheme ? neutral[600] : neutral[50]

  return (
    <View style={styles.container}>
      <IconButton
        ariaLabel={layout}
        onPress={() => setLayout('list')}
        isActive={layout === 'list'}
      >
        <AiOutlineOrderedListIcon width={16} height={16} fill={iconFIll} />
      </IconButton>

      <IconButton
        ariaLabel={layout}
        onPress={() => setLayout('card')}
        isActive={layout === 'card'}
      >
        <AiOutlineCreditCardIcon width={16} height={16} fill={iconFIll} />
      </IconButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 4,
  },
})

export default NotesLayoutSelector
