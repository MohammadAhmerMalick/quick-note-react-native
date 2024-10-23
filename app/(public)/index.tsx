import { useState } from 'react'
import { View } from 'react-native'

import { TAILWIND } from '@/constants'
import { createNote } from '@/network'
import useTheme from '@/hook/useTheme'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import SafeAreaView from '@/components/common/SafeAreaView'
import PublicLayout from '@/components/layouts/PublicLayout'
import FileDropAera from '@/components/common/FileDropAera'

const CreateNotePage = () => {
  const { isLightTheme } = useTheme()
  const { neutral, white } = TAILWIND

  const [title, setTitle] = useState('')
  const [fileValue, setFileValue] = useState('')
  // const [file, setFile] = useState<File | ''>('')
  const [description, setDescription] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const resetForm = () => {
    setTitle('')
    setFileValue('')
    setDescription('')
  }
  const onSubmit = async () => {
    if (!title) {
      alert('asd')
      return
    }

    setIsSubmitting(true)

    try {
      const body = new FormData()
      body.append('title', title)
      body.append('description', description)
      // if (file) formdata.append('file', file)

      const response = await createNote(body)

      // on success
      if (response.status === 'success') {
        console.log(response.message)
        resetForm()
        // TITLE_INPUT.current?.focus()
      }

      // on reject
      // else if (response.status === 'error')
      //   response.messages.forEach((message) => toast.error(message))
    } catch (error) {
      console.log(error)
      console.log('Unable to create note')
    } finally {
      setIsSubmitting(false)
    }
  }

  const onFileChange = (fileTarget: EventTarget & HTMLInputElement) => {
    setFileValue(fileTarget.value)
    // setFile(fileTarget.files?.[0] || '')
  }

  const styleStates = {
    form: {
      ...styles.form,
      backgroundColor: isLightTheme ? white : neutral[850],
      borderColor: isLightTheme ? neutral[100] : neutral[800],
    },
  }

  return (
    <SafeAreaView>
      <PublicLayout>
        <View style={styleStates.form}>
          <View style={styles.fieldContainer}>
            <Input
              value={title}
              labelText="Title"
              placeholder="Title"
              onChangeText={setTitle}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Input
              value={description}
              labelText="Description"
              placeholder="Description"
              onChangeText={setDescription}
            />
          </View>

          <View style={styles.fieldContainer}>
            <FileDropAera value={fileValue} onChange={onFileChange} />
          </View>

          <Button disabled={isSubmitting} onPress={onSubmit}>
            {isSubmitting ? 'Submitting' : 'Submit'}
          </Button>
        </View>
      </PublicLayout>
    </SafeAreaView>
  )
}

const styles = {
  form: {
    padding: 24,

    borderWidth: 1,
    borderRadius: 8,
  },

  fieldContainer: {
    marginBottom: 24,
  },
}

export default CreateNotePage
