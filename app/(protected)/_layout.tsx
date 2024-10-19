import { useContext } from 'react'
import { Redirect, Stack } from 'expo-router'

import useNotes from '@/hook/useNotes'
import { AuthContext } from '@/contexts/authContext'
import { NotesContext } from '@/contexts/notesContext'

export default function RootLayout() {
  const { isLoggedIn, isAuthLoading } = useContext(AuthContext)
  const {
    notes,
    // tokens,
    search,
    // counter,
    selectedState,
    // setNotes,
    selected,
    setSelected,
    // setTokens,
    setSearch,
    // setCounter,
    setSelectedState,

    fetchNotes,
    deleteNote,
    restoreNote,
  } = useNotes()

  if (!isAuthLoading && !isLoggedIn)
    return <Redirect href={'/(public)/login'} />

  return (
    <NotesContext.Provider
      value={{
        notes,
        search,
        selected,
        selectedState,
        // tokens,
        // counter,
        // setNotes,
        // setTokens,
        setSearch,
        setSelected,
        // setCounter,
        setSelectedState,

        fetchNotes,
        deleteNote,
        restoreNote,
      }}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </NotesContext.Provider>
  )
}
