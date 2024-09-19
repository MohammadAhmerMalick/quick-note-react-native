import { Image } from 'expo-image'
import { StyleSheet, Text, View } from 'react-native'
import {
  //  type ChangeEvent,
  useState,
  // useEffect,
} from 'react'

import useTheme from '@/hook/useTheme'
import { TAILWIND } from '@/constants'
import { AiOutlineCloudUploadIcon } from '@/utils/icons'

interface FileDropAeraProps {
  value: string
  onChange: (currentTarget: EventTarget & HTMLInputElement) => void
}

const FileDropAera = ({ value, onChange }: FileDropAeraProps) => {
  const { isLightTheme } = useTheme()
  const { neutral, white } = TAILWIND

  const [
    image,
    //  setImage
  ] = useState('')

  // const handleFileChange = ({
  //   currentTarget,
  // }: ChangeEvent<HTMLInputElement>) => {
  //   const file = currentTarget?.files?.[0]
  //     ? URL.createObjectURL(currentTarget.files[0])
  //     : ''

  //   setImage(file)
  //   onChange(currentTarget)
  // }

  // useEffect(() => {
  //   // if value is null rest the display image
  //   if (!value) setImage('')
  // }, [value])

  const styleStates = {
    container: {
      ...styles.container,

      borderColor: isLightTheme ? neutral[300] : neutral[600],

      backgroundColor: isLightTheme ? neutral[50] : neutral[800],
    },
    label: {
      ...styles.label,
      color: isLightTheme ? neutral[900] : white,
    },
    text: {
      ...styles.text,
      color: isLightTheme ? neutral[500] : neutral[400],
    },
  }

  return (
    <>
      <Text style={styleStates.label}>Upload File</Text>
      <View style={styleStates.container}>
        {image && (
          <Image source={image} alt="Selected File" style={styles.image} />
        )}
        <View
          style={{
            gap: 20,
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <AiOutlineCloudUploadIcon
            width={30}
            height={30}
            fill={isLightTheme ? neutral[500] : neutral[400]}
          />
          <View style={styles.textWrapper}>
            <Text style={styleStates.text}>
              <Text style={styles.boldText}>Click to upload</Text> or drag and
              drop
            </Text>
            <Text style={styleStates.text}>
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </Text>
          </View>
        </View>
        {/* <input
          type="file"
          value={value}
          className="hidden"
          onChange={handleFileChange}
        /> */}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    paddingTop: 24,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 24,

    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'dashed',
  },

  label: {
    fontFamily: 'Montserrat_500Medium',
  },

  image: {
    width: 510,
    height: 140,
  },

  text: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Montserrat_400Regular',
  },

  boldText: {
    fontFamily: 'Montserrat_600SemiBold',
  },

  textWrapper: {
    flexShrink: 1,
    gap: 8,
  },
})

export default FileDropAera
