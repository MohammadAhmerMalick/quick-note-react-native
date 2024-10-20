import { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import Modal from '@/components/Modal'
import NoteList from '@/components/NoteList'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import { NotesContext } from '@/contexts/notesContext'
import SafeAreaView from '@/components/common/SafeAreaView'
import NoteStateSelector from '@/components/NoteStateSelector'

const Page = () => {
  const [showModal, setShowModal] = useState(false)
  const { notes, search, selectedState, setSearch, setSelectedState } =
    useContext(NotesContext)

  return (
    <>
      {showModal && <Modal setShowModal={setShowModal} />}
      <SafeAreaView scrollEnabled={!showModal}>
        {/* tool kit */}
        <View style={styles.toolkitContainer}>
          <Input
            autoFocus
            value={search}
            placeholder="Search"
            inputStyle={styles.inputStyle}
            onChangeText={setSearch}
          />

          <View style={styles.toolkitButtonContainer}>
            <NoteStateSelector
              selectedState={selectedState}
              setSelectedState={setSelectedState}
            />

            <Button style={styles.notesCounter}>{notes.length}</Button>
          </View>
        </View>

        <View style={styles.notesContainer}>
          {notes.map((note) => (
            <NoteList note={note} key={note.id} setShowModal={setShowModal} />
          ))}
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  toolkitContainer: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 16,
  },
  notesCounter: {
    alignItems: 'center',
    justifyContent: 'center',

    minWidth: 36,
    maxWidth: '100%',

    paddingTop: 3,
    paddingLeft: 3,
    paddingRight: 3,
    paddingBottom: 3,
  },
  toolkitButtonContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  inputStyle: {
    flex: 1,
    marginTop: 0,
  },
  notesContainer: {
    gap: 12,

    marginTop: 16,
  },
})

export default Page
