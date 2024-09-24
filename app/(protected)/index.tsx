import { View } from 'react-native'
import { useCallback, useEffect, useState } from 'react'

import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import SafeAreaView from '@/components/common/SafeAreaView'
import NoteStateSelector from '@/components/NoteStateSelector'
import NotesLayoutSelector from '@/components/NotesLayoutSelector'

export interface GetNotesActionReutrn {
  id: string
  files: {
    link: string
    name: string
    size: number
    type: string
  }[]
  title: string
  description: string
  deletedAt: null | string
  createdAt: { _seconds: number; _nanoseconds: number }
}

let dbData: GetNotesActionReutrn[] = []
type noteStates = 'stared' | 'notDeleted' | 'deleted'

interface Tokens {
  value: string
  isSelected: boolean
}

const Page = () => {
  const [search, setSearch] = useState('')
  const [counter, setCounter] = useState<number>(0)
  const [layout, setLayout] = useState<'card' | 'list'>('list')
  const [notes, setNotes] = useState<GetNotesActionReutrn[]>([])
  const [selectedState, setSelectedState] = useState<noteStates>('notDeleted')
  const [tokens, setTokens] = useState<Tokens[]>()
  const [modalNote, setModalNote] = useState<GetNotesActionReutrn | null>(null)

  // fetch request
  const fetchNotes = async () => {
    // try {
    //   const res = await getNotesAction() // fetch request
    //   //  on success
    //   if (res.status === 'success') {
    //     dbData = res.data // update inreactive data
    //     setCounter((c) => c + 1) // to update ui
    //   } else throw new Error('Unable to fetch notes')
    // } catch (error) {
    //   // on reject
    //   console.log(error)
    //   toast.error('Unable to fetch note')
    // }
  }

  // delete request
  const deleteNote = async (id: string) => {
    // try {
    //   const { status } = await softDeleteNoteAction(id) // delete request
    //   // on success
    //   if (status === 'success') {
    //     // change the deleted state of onetime fetched data
    //     dbData = dbData.map((note) =>
    //       id === note.id
    //         ? { ...note, deletedAt: new Date().toString() }
    //         : { ...note }
    //     )
    //     // update the counter to update the notes list
    //     setCounter((c) => c + 1)
    //   } else throw new Error('Unable to delete note')
    // } catch (error) {
    //   // on reject
    //   console.log({ error })
    //   toast.error('Unable to delete')
    // }
  }

  const restoreNote = async (id: string) => {
    // try {
    //   const { status } = await restoreNoteAction(id)
    //   // on success
    //   if (status === 'success') {
    //     dbData = dbData.map((note) =>
    //       id === note.id ? { ...note, deletedAt: null } : { ...note }
    //     )
    //     // update the counter to update the notes list
    //     setCounter((c) => c + 1)
    //   } else throw new Error('Unable to restore note')
    // } catch (error) {
    //   // on reject
    //   console.log({ error })
    //   toast.error('Unable to restore')
    // }
  }

  const inSearch = useCallback(
    (note: GetNotesActionReutrn) => {
      const string = search.toLocaleLowerCase()

      return (
        note.title.toLocaleLowerCase().includes(string) ||
        note.description.toLocaleLowerCase().includes(string)
      )
    },
    [search]
  )

  useEffect(() => {
    fetchNotes()
  }, [])

  useEffect(() => {
    let newNoteList: GetNotesActionReutrn[] = []

    const inTokenFilter = (note: GetNotesActionReutrn) => {
      const selectedTokens = tokens?.filter((t) => t.isSelected)
      if (!selectedTokens?.length) return true // if no token selected then return true(behave as all are selected)

      return selectedTokens.filter(
        (token) =>
          token.isSelected &&
          (note.description.toLowerCase().includes(token.value) ||
            note.title.toLowerCase().includes(token.value))
      ).length
    }

    newNoteList = dbData.filter(
      (note) =>
        (selectedState === 'deleted' ? note.deletedAt : !note.deletedAt) &&
        inSearch(note) &&
        inTokenFilter(note)
    )

    setNotes(newNoteList)
  }, [counter, selectedState, tokens, inSearch])

  useEffect(() => {
    const filterSet = new Set(
      dbData
        .filter(
          (note) =>
            (selectedState === 'deleted' ? note.deletedAt : !note.deletedAt) &&
            inSearch(note)
        )
        .map((note) => note.description.toLowerCase())
        .join(' ')
        .replace(/[^a-zA-Z !?]+/g, ' ')
        .split(' ')
    )

    const fitlerArray = Array.from(filterSet).filter((c) => c.length > 2)
    setTokens(fitlerArray.sort().map((c) => ({ value: c, isSelected: false })))
  }, [counter, selectedState, inSearch])

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          gap: 4,
          marginTop: 16,
        }}
      >
        <Input
          autoFocus
          value={search}
          placeholder="Search"
          inputStyle={{
            flex: 1,
            marginTop: 0,
          }}
          onChangeText={setSearch}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: 4,
          }}
        >
          <NoteStateSelector
            selectedState={selectedState}
            setSelectedState={setSelectedState}
          />

          <NotesLayoutSelector layout={layout} setLayout={setLayout} />

          <Button
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 3,
              paddingLeft: 3,
              paddingRight: 3,
              paddingBottom: 3,
              minWidth: 36,
              maxWidth: '100%',
            }}
          >
            {notes.length}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Page
