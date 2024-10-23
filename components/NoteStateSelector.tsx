import { StyleSheet, View } from 'react-native'
import type { Dispatch, SetStateAction } from 'react'

import useTheme from '@/hook/useTheme'
import { TAILWIND } from '@/constants'
import IconButton from '@/components/common/IconButton'
import { AiOutlineDatabaseIcon, AiOutlineDeleteIcon } from '@/utils/icons'

const NoteStateSelector = ({
  selectedState = 'notDeleted',
  setSelectedState,
}: {
  selectedState: 'stared' | 'notDeleted' | 'deleted'
  setSelectedState: Dispatch<
    SetStateAction<'stared' | 'notDeleted' | 'deleted'>
  >
}) => {
  const { neutral } = TAILWIND
  const { isLightTheme } = useTheme()

  const iconFIll = isLightTheme ? neutral[600] : neutral[50]
  return (
    <View style={styles.container}>
      <IconButton
        ariaLabel={selectedState}
        isActive={selectedState === 'notDeleted'}
        onPress={() => setSelectedState('notDeleted')}
      >
        <AiOutlineDatabaseIcon width={16} height={16} fill={iconFIll} />
      </IconButton>

      <IconButton
        ariaLabel={selectedState}
        isActive={selectedState === 'deleted'}
        onPress={() => setSelectedState('deleted')}
      >
        <AiOutlineDeleteIcon width={16} height={16} fill={iconFIll} />
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

export default NoteStateSelector
