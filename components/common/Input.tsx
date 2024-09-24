import {
  Text,
  TextInput,
  StyleSheet,
  type TextStyle,
  type KeyboardTypeOptions,
  type NativeSyntheticEvent,
  type TextInputFocusEventData,
} from 'react-native'
import useTheme from '@/hook/useTheme'
import { TAILWIND } from '@/constants'
import { useEffect, useRef, useState } from 'react'

interface InputProps {
  value: string
  labelText?: string
  autoFocus?: boolean
  placeholder: string
  inputStyle?: TextStyle
  secureTextEntry?: boolean
  keyboardType?: KeyboardTypeOptions | undefined
  onChangeText: (text: string) => void
}

const Input = ({
  value,
  labelText,
  autoFocus,
  inputStyle,
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  onChangeText,
}: InputProps) => {
  const TITLE_INPUT = useRef<any>(undefined)
  const { neutral, white, yellow } = TAILWIND

  const { isLightTheme } = useTheme()
  const [isFocused, setIsFocused] = useState(false)

  const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true)
  }
  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false)
  }

  useEffect(() => {
    if (autoFocus) TITLE_INPUT.current?.focus()
  }, [autoFocus])

  const styleStates = {
    text: {
      ...styles.text,
      color: isLightTheme ? neutral[900] : white,
    },
    input: {
      ...styles.input,
      borderColor: isFocused
        ? yellow[500]
        : isLightTheme
          ? neutral[300]
          : neutral[600],

      backgroundColor: isLightTheme ? neutral[50] : neutral[800],

      color: isLightTheme ? neutral[900] : white,

      ...inputStyle,
    },
  }

  return (
    <>
      {labelText && <Text style={styleStates.text}>{labelText}</Text>}
      <TextInput
        ref={TITLE_INPUT}
        value={value}
        style={styleStates.input}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={neutral[400]}
        onBlur={onBlur}
        onFocus={onFocus}
        onChangeText={onChangeText}
      />
    </>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Montserrat_500Medium',
  },
  input: {
    marginTop: 12,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 10,
    paddingLeft: 10,

    borderWidth: 1,
    borderRadius: 6,

    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Montserrat_400Regular',
  },
})

export default Input
