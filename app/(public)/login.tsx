import { useState } from 'react'
import { View } from 'react-native'

import { TAILWIND } from '@/constants'
import useTheme from '@/hook/useTheme'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import SafeAreaView from '@/components/common/SafeAreaView'
import PublicLayout from '@/components/layouts/PublicLayout'

const LoginPage = () => {
  const { isLightTheme } = useTheme()
  const { neutral, white } = TAILWIND

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)

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

          <Button
          // disabled={isSubmitting}
          >
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

export default LoginPage
