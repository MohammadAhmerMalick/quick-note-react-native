import { useState } from 'react'
import { View } from 'react-native'

import useAuth from '@/hook/useAuth'
import useTheme from '@/hook/useTheme'
import { TAILWIND } from '@/constants'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import SafeAreaView from '@/components/common/SafeAreaView'
import PublicLayout from '@/components/layouts/PublicLayout'

const LoginPage = () => {
  const { neutral, white } = TAILWIND

  const { isLightTheme } = useTheme()
  const { isloading, login } = useAuth()
  const [email, setEmail] = useState('mohammadahmermalick@gmail.com')
  const [password, setPassword] = useState('adminadmin')

  const onSubmit = () => {
    login(email, password)
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
              value={email}
              labelText="Email"
              placeholder="Email"
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Input
              secureTextEntry
              value={password}
              labelText="Password"
              placeholder="Password"
              onChangeText={setPassword}
            />
          </View>

          <Button disabled={isloading} onPress={onSubmit}>
            login
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

export default LoginPage