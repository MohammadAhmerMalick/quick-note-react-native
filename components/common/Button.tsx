import {
  Text,
  Pressable,
  StyleSheet,
  type GestureResponderEvent,
} from 'react-native'
import { type ReactNode } from 'react'

import { TAILWIND } from '@/constants'

interface Button {
  disabled?: boolean
  children: ReactNode
  onPress?: (e: GestureResponderEvent) => void
}

const Button = ({ disabled, children, onPress }: Button) => {
  return (
    <Pressable
      disabled={disabled}
      aria-disabled={disabled}
      style={styles.pressable}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
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
    borderColor: TAILWIND.yellow[500],

    backgroundColor: TAILWIND.yellow[500],
  },

  text: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Montserrat_600SemiBold',
  },
})

export default Button
