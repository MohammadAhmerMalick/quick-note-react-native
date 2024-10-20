import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { useState, type Dispatch, type SetStateAction } from 'react'

import { TAILWIND } from '@/constants'
import useTheme from '@/hook/useTheme'
import { BsTogglesIcon } from '@/utils/icons'
import Button from '@/components/common/Button'
import { NotesFilterTokens } from '@/hook/useNotes'
import IconButton from '@/components/common/IconButton'

interface TokenFilterProps {
  tokens: NotesFilterTokens[]
  setTokens: Dispatch<SetStateAction<NotesFilterTokens[]>>
}

const { neutral } = TAILWIND

const TokenFilter = ({ tokens, setTokens }: TokenFilterProps) => {
  const { isLightTheme } = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const handleTokenSelect = (value: string, isSelected: boolean) => {
    setTokens((oldState) =>
      oldState?.map((token) => {
        if (value === token.value) return { ...token, isSelected: !isSelected }
        return token
      })
    )
  }

  const styleState = {
    text: {
      color: isLightTheme ? neutral[900] : neutral[200],
    },
  }

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        <Button
          style={styles.button}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          <BsTogglesIcon height={16} width={16} fill={neutral[900]} />
        </Button>
        {tokens?.map(({ value, isSelected }) => (
          <IconButton
            key={value}
            ariaLabel={value}
            isActive={isSelected}
            style={styles.IconButton}
            onPress={() => handleTokenSelect(value, isSelected)}
          >
            <Text style={styleState.text}>{value}</Text>
          </IconButton>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    flexDirection: 'row',

    marginTop: 16,
    paddingHorizontal: 4,
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  IconButton: {
    paddingVertical: 0,
  },
})

export default TokenFilter
