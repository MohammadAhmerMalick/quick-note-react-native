import type { ReactNode } from 'react'
import { type GestureResponderEvent, Pressable, StyleSheet } from 'react-native'

import useTheme from '@/hook/useTheme'
import { TAILWIND } from '@/constants'

interface IconButtonProps {
  isActive?: boolean
  disabled?: boolean
  ariaLabel?: string
  children: ReactNode
  type?: 'submit' | 'button'
  onPress?: (e: GestureResponderEvent) => void
}

const IconButton = ({
  children,
  ariaLabel,
  isActive = false,
  disabled = false,
  onPress,
}: IconButtonProps) => {
  const { isLightTheme } = useTheme()
  const { yellow, white, neutral } = TAILWIND

  const styleStates = {
    pressable: {
      ...styles.pressable,

      borderColor: isActive ? yellow[500] : neutral[600],
      backgroundColor: isActive
        ? isLightTheme
          ? white
          : neutral[850]
        : 'transparent',
    },
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      aria-label={ariaLabel}
      style={styleStates.pressable}
    >
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',

    padding: 8,
    borderWidth: 1,
    borderRadius: 6,
  },
})

export default IconButton
