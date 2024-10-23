import {
  NotesFilterTokens,
  type noteStates,
  type GetNotesActionReutrn,
} from '@/hook/useNotes'
import { createContext, type SetStateAction, type Dispatch } from 'react'

type NotesContextInterface = {
  search: string
  selectedState: noteStates
  tokens: NotesFilterTokens[]
  notes: GetNotesActionReutrn[]
  selected: GetNotesActionReutrn['id']

  setSearch: Dispatch<SetStateAction<string>>
  setSelectedState: Dispatch<SetStateAction<noteStates>>
  setTokens: Dispatch<SetStateAction<NotesFilterTokens[]>>
  setSelected: Dispatch<SetStateAction<GetNotesActionReutrn['id']>>

  fetchNotes(): void
  deleteNote(id: string): void
  restoreNote(id: string): void
}

export const NotesContext = createContext<NotesContextInterface>({
  tokens: [],
  notes: [],
  search: '',
  selected: '',
  selectedState: 'notDeleted',

  setTokens: () => {},
  setSearch: () => {},
  setSelected: () => {},
  setSelectedState: () => {},

  fetchNotes: () => {},
  deleteNote: () => {},
  restoreNote: () => {},
})
