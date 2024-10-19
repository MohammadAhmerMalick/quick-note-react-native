import { type GetNotesActionReutrn, type noteStates } from '@/hook/useNotes'
import { createContext, type SetStateAction, type Dispatch } from 'react'

type NotesContextInterface = {
  search: string
  selectedState: noteStates
  notes: GetNotesActionReutrn[]
  selected: GetNotesActionReutrn['id']

  setSearch: Dispatch<SetStateAction<string>>
  setSelectedState: Dispatch<SetStateAction<noteStates>>
  setSelected: Dispatch<SetStateAction<GetNotesActionReutrn['id']>>

  fetchNotes(): void
  deleteNote(id: string): void
  restoreNote(id: string): void
}

export const NotesContext = createContext<NotesContextInterface>({
  notes: [],
  search: '',
  selected: '',
  selectedState: 'notDeleted',

  setSearch: () => {},
  setSelected: () => {},
  setSelectedState: () => {},

  fetchNotes: () => {},
  deleteNote: () => {},
  restoreNote: () => {},
})
