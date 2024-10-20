import { useCallback, useEffect, useState } from 'react'

import {
  getNotesRequest,
  restoreNoteRequest,
  softDeleteNotesRequest,
} from '@/network'

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
export type noteStates = 'stared' | 'notDeleted' | 'deleted'

export interface NotesFilterTokens {
  value: string
  isSelected: boolean
}

const useNotes = () => {
  const [search, setSearch] = useState('')
  const [counter, setCounter] = useState<number>(0)
  const [tokens, setTokens] = useState<NotesFilterTokens[]>([])
  const [notes, setNotes] = useState<GetNotesActionReutrn[]>([])
  const [selected, setSelected] = useState<GetNotesActionReutrn['id']>('')
  const [selectedState, setSelectedState] = useState<noteStates>('notDeleted')

  // fetch request
  const fetchNotes = async () => {
    const res = await getNotesRequest() // fetch request
    //  on success
    if (res.status === 'success') {
      dbData = res.data // update inreactive data
      setCounter((c) => c + 1) // to update ui
    } else {
      console.log('error')
    }
  }

  // delete request
  const deleteNote = async (id: string) => {
    const { status } = await softDeleteNotesRequest(id)

    // on success
    if (status === 'success') {
      // change the deleted state of onetime fetched data
      dbData = dbData.map((note) =>
        id === note.id
          ? { ...note, deletedAt: new Date().toString() }
          : { ...note }
      )

      // update the counter to update the notes list
      setCounter((c) => c + 1)
    } else alert('Unable to delete note')
  }

  const restoreNote = async (id: string) => {
    const { status } = await restoreNoteRequest(id)
    // on success
    if (status === 'success') {
      dbData = dbData.map((note) =>
        id === note.id ? { ...note, deletedAt: null } : { ...note }
      )
      // update the counter to update the notes list
      setCounter((c) => c + 1)
    } else alert('Unable to restore note')
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

  return {
    notes,
    search,
    tokens,
    selected,
    selectedState,

    setTokens,
    setSearch,
    setSelected,
    setSelectedState,

    fetchNotes,
    deleteNote,
    restoreNote,
  }
}

export default useNotes
