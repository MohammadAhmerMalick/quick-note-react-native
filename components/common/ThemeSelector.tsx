import {
  Appearance,
  StyleSheet,
  useColorScheme,
  type ColorSchemeName,
} from 'react-native'
import type { FC } from 'react'
import { Pressable, View } from 'react-native'
import type { SvgProps } from 'react-native-svg'

import { TAILWIND } from '@/constants'
import { FiFiMoonIcon, FiFiSunIcon } from '@/utils/icons'

interface Option {
  Icon: FC<SvgProps>
  id: ColorSchemeName
}
const ThemeSelector = () => {
  const options: Option[] = [
    { id: 'light', Icon: FiFiSunIcon },
    { id: 'dark', Icon: FiFiMoonIcon },
  ]

  const pressableStyle = {
    borderColor:
      useColorScheme() === 'light'
        ? TAILWIND.neutral[200]
        : TAILWIND.neutral[600],
  }

  const iconStroke =
    useColorScheme() === 'light' ? TAILWIND.neutral[600] : TAILWIND.neutral[200]

  return (
    <View style={styles.view}>
      {options.map(
        ({ id, Icon }) =>
          useColorScheme() !== id && (
            <Pressable
              key={id}
              onPress={() => Appearance.setColorScheme(id)}
              style={{ ...styles.pressable, ...pressableStyle }}
            >
              <Icon width={20} height={20} stroke={iconStroke} />
            </Pressable>
          )
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
  },
  pressable: {
    padding: 8,
    borderRadius: 9999,
    borderWidth: 1,
  },
})

export default ThemeSelector
