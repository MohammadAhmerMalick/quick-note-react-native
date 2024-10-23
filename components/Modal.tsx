import {
  Text,
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  type GestureResponderEvent,
} from 'react-native'
import { Dispatch, SetStateAction, useContext, useState } from 'react'

import {
  AiOutlineCopyIcon,
  AiOutlineSaveIcon,
  AiOutlineCloseIcon,
  AiOutlineDeleteIcon,
} from '@/utils/icons'
import useTheme from '@/hook/useTheme'
import { TAILWIND } from '@/constants'
import { copyToClipboard } from '@/utils/functions'
import { NotesContext } from '@/contexts/notesContext'
import IconButton from '@/components/common/IconButton'

interface ModalProp {
  setShowModal: Dispatch<SetStateAction<boolean>>
}

const { neutral, white, red, yellow, green, gray } = TAILWIND

const Modal = ({ setShowModal }: ModalProp) => {
  const { height, width } = useWindowDimensions()

  const { notes, deleteNote, restoreNote, selected } = useContext(NotesContext)
  const [note] = useState(notes.find((n) => n.id === selected))

  const onClose = () => {
    setShowModal(false)
  }

  const { isLightTheme } = useTheme()
  const onContainerClick = (e: GestureResponderEvent) =>
    e.currentTarget === e.target && onClose()

  const onDelete = () => {
    onClose()
    if (note) deleteNote(note.id)
  }

  const onRestore = () => {
    onClose()
    if (note) restoreNote(note.id)
  }

  const styleStates = {
    container: {
      ...styles.container,

      width: width,
      height: height,

      backgroundColor: isLightTheme
        ? 'rgba(0,0,0 , 0.6)'
        : 'rgba(0, 0 ,0 , 0.6)',
    },
    wrapper: {
      ...styles.wrapper,
      backgroundColor: isLightTheme ? white : neutral[850],
    },

    heading: {
      ...styles.heading,

      borderColor: isLightTheme ? gray[200] : neutral[600],

      color: isLightTheme ? neutral[900] : neutral[200],
    },

    para: {
      ...styles.para,

      borderColor: isLightTheme ? gray[200] : neutral[600],

      color: isLightTheme ? neutral[800] : neutral[300],
    },
  }

  return (
    <Pressable onPress={onContainerClick} style={styleStates.container}>
      {note && (
        <ScrollView>
          <View style={styleStates.wrapper}>
            <Text style={styleStates.heading}>{note.title}</Text>
            <Text style={styleStates.para}>{note.description}</Text>
            <View style={styles.buttonContainer}>
              {!note.deletedAt ? (
                <IconButton onPress={onDelete} style={styles.redButton}>
                  <AiOutlineDeleteIcon height={16} width={16} fill={white} />
                  <Text style={styles.darkButtonText}>Delete</Text>
                </IconButton>
              ) : (
                <IconButton onPress={onRestore} style={styles.greenButton}>
                  <AiOutlineSaveIcon
                    height={16}
                    width={16}
                    fill={neutral[900]}
                  />
                  <Text style={styles.lightButtonText}>Restore</Text>
                </IconButton>
              )}

              <IconButton
                style={styles.yellowButton}
                onPress={() => copyToClipboard(note.description)}
              >
                <AiOutlineCopyIcon height={16} width={16} fill={neutral[900]} />
                <Text style={styles.lightButtonText}>Copy</Text>
              </IconButton>

              <IconButton onPress={onClose} style={styles.darkButton}>
                <AiOutlineCloseIcon
                  width={16}
                  height={16}
                  fill={neutral[900]}
                />
                <Text style={styles.lightButtonText}>Close</Text>
              </IconButton>
            </View>
          </View>
        </ScrollView>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    padding: 12,

    zIndex: 1,
  },
  wrapper: {
    padding: 12,

    borderRadius: 8,

    overflow: 'hidden',
  },
  buttonContainer: {
    gap: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',

    paddingTop: 16,
    paddingBottom: 1,

    overflow: 'hidden',
  },
  heading: {
    marginBottom: 8,
    paddingBottom: 16,

    borderBottomWidth: 1,

    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
  },
  para: {
    paddingBottom: 16,

    borderBottomWidth: 1,

    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Montserrat_400Regular',
  },
  redButton: {
    gap: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    padding: 4,

    borderColor: red[900],

    backgroundColor: red[600],
  },
  greenButton: {
    gap: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    padding: 4,

    borderColor: green[700],

    backgroundColor: green[500],
  },
  yellowButton: {
    gap: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    padding: 4,

    borderColor: yellow[700],

    backgroundColor: yellow[500],
  },
  darkButton: {
    gap: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    padding: 4,

    borderColor: gray[700],

    backgroundColor: gray[400],
  },
  darkButtonText: {
    fontFamily: 'Montserrat_400Regular',
    color: white,
  },
  lightButtonText: {
    fontFamily: 'Montserrat_400Regular',
    color: neutral[900],
  },
})

export default Modal
