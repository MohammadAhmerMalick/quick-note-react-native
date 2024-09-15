import {
  Text,
  Pressable,
  StyleSheet,
  type GestureResponderEvent,
} from 'react-native'
import { type ReactNode } from 'react'

import useTheme from '@/hook/useTheme'
import { TAILWIND } from '@/constants'

interface Button {
  disabled?: boolean
  children: ReactNode
  onPress?: (e: GestureResponderEvent) => void
}

const Button = ({ disabled, children, onPress }: Button) => {
  const { yellow, neutral } = TAILWIND
  const { isLightTheme } = useTheme()

  const styleStates = {
    pressable: {
      ...styles.pressable,

      borderColor: disabled
        ? isLightTheme
          ? neutral[200]
          : neutral[700]
        : yellow[500],

      backgroundColor: disabled
        ? isLightTheme
          ? neutral[200]
          : neutral[700]
        : yellow[500],

      color: 'red',
    },

    text: {
      ...styles.text,

      color: disabled ? neutral[400] : neutral[900],
    },
  }
  return (
    <Pressable
      disabled={disabled}
      aria-disabled={disabled}
      style={styleStates.pressable}
      onPress={onPress}
    >
      <Text style={styleStates.text}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressable: {
    alignItems: 'center',

    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,

    borderWidth: 1,
    borderRadius: 6,
  },

  text: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Montserrat_600SemiBold',
  },
})

export default Button
