import {
  Appearance,
  StyleSheet,
  useColorScheme,
  type ColorSchemeName,
} from 'react-native'
import type { FC } from 'react'
import { Pressable, View } from 'react-native'
import type { SvgProps } from 'react-native-svg'

import useTheme from '@/hook/useTheme'
import { TAILWIND } from '@/constants'
import { FiFiMoonIcon, FiFiSunIcon } from '@/utils/icons'

interface Option {
  Icon: FC<SvgProps>
  id: ColorSchemeName
}
const ThemeSelector = () => {
  const { isLightTheme } = useTheme()
  const { neutral } = TAILWIND

  const activeTheme = useColorScheme()

  const options: Option[] = [
    { id: 'light', Icon: FiFiSunIcon },
    { id: 'dark', Icon: FiFiMoonIcon },
  ]

  const pressableStyle = {
    ...styles.pressable,
    borderColor: isLightTheme ? neutral[200] : neutral[600],
  }

  const iconStroke = isLightTheme ? neutral[600] : neutral[200]

  return (
    <View style={styles.view}>
      {options.map(
        ({ id, Icon }) =>
          activeTheme !== id && (
            <Pressable
              key={id}
              style={pressableStyle}
              onPress={() => Appearance.setColorScheme(id)}
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
