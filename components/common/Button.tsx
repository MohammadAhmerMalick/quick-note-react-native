import {
  Text,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type GestureResponderEvent,
} from 'react-native'
import { type ReactNode } from 'react'

import useTheme from '@/hook/useTheme'
import { TAILWIND } from '@/constants'

interface ButtonProps {
  style?: ViewStyle
  disabled?: boolean
  children: ReactNode
  onPress?: (e: GestureResponderEvent) => void
}

const Button = ({ disabled, children, style, onPress }: ButtonProps) => {
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

      ...style,
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

    paddingVertical: 10,
    paddingHorizontal: 20,

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
