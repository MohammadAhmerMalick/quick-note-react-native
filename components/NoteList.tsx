import { Image } from 'expo-image'
import { Dispatch, SetStateAction, useContext } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

import {
  AiOutlineCopyIcon,
  AiOutlineSaveIcon,
  AiOutlineDeleteIcon,
} from '@/utils/icons'
import useTheme from '@/hook/useTheme'
import { TAILWIND } from '@/constants'
import { copyToClipboard } from '@/utils/functions'
import { NotesContext } from '@/contexts/notesContext'
import IconButton from '@/components/common/IconButton'
import { type GetNotesActionReutrn } from '@/hook/useNotes'

interface NoteListProp {
  note: GetNotesActionReutrn
  setShowModal: Dispatch<SetStateAction<boolean>>
}
const { neutral, white, red, yellow, green } = TAILWIND

const NoteList = ({ note, setShowModal }: NoteListProp) => {
  const { isLightTheme } = useTheme()

  const { deleteNote, restoreNote, setSelected } = useContext(NotesContext)

  const onPress = () => {
    setSelected(note.id)
    setShowModal(true)
  }

  const onDelete = () => {
    deleteNote(note.id)
  }

  const onRestore = () => {
    restoreNote(note.id)
  }

  const styleStates = {
    container: {
      ...styles.container,

      borderColor: isLightTheme ? neutral[200] : neutral[900],

      backgroundColor: isLightTheme ? white : neutral[850],
    },

    heading: {
      ...styles.heading,
      color: isLightTheme ? neutral[900] : neutral[200],
    },

    para: {
      ...styles.para,
      color: isLightTheme ? neutral[800] : neutral[300],
    },
  }

  return (
    <Pressable
      tabIndex={0}
      key={note.id}
      style={styleStates.container}
      onPress={onPress}
    >
      <View style={styles.textContainer}>
        <Text style={styleStates.heading} numberOfLines={2}>
          {note.title}
        </Text>
        <Text style={styleStates.para} numberOfLines={3}>
          {note.description}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        {!!note.files?.length && (
          <Image source={note.files[0].link} style={styles.image} />
        )}
        <View style={styles.buttonContainer}>
          {!note.deletedAt ? (
            <IconButton onPress={onDelete} style={styles.redButton}>
              <AiOutlineDeleteIcon height={16} width={16} fill={white} />
            </IconButton>
          ) : (
            <IconButton onPress={onRestore} style={styles.greenButton}>
              <AiOutlineSaveIcon height={16} width={16} fill={neutral[900]} />
            </IconButton>
          )}
          <IconButton
            isActive
            style={styles.yellowButton}
            onPress={() => copyToClipboard(note.description)}
          >
            <AiOutlineCopyIcon height={16} width={16} fill={neutral[900]} />
          </IconButton>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',

    padding: 12,

    borderRadius: 8,
    borderWidth: 1,
  },

  textContainer: {
    flexShrink: 1,
  },

  heading: {
    marginBottom: 8,

    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
  },

  para: {
    fontSize: 14,
    lineHeight: 20,

    fontFamily: 'Montserrat_400Regular',
  },

  imageContainer: {
    flexDirection: 'row',
    gap: 4,
  },

  image: {
    width: 100,
    height: 100,
    flexBasis: 100,

    borderRadius: 6,
  },

  buttonContainer: {
    gap: 8,
    justifyContent: 'flex-end',
  },

  redButton: {
    padding: 4,
    backgroundColor: red[600],
    borderColor: red[900],
  },

  greenButton: {
    padding: 4,
    borderColor: green[700],
    backgroundColor: green[500],
  },

  yellowButton: {
    padding: 4,
    borderColor: yellow[700],
    backgroundColor: yellow[500],
  },
})

export default NoteList
