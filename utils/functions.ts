import { setStringAsync } from 'expo-clipboard'

export const copyToClipboard = async (text = '') => {
  await setStringAsync(text)
}
