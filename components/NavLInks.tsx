import { router } from 'expo-router'
import { type FC, useState } from 'react'
import type { SvgProps } from 'react-native-svg'

import useTheme from '@/hook/useTheme'
import { TAILWIND } from '@/constants'
import { FiFolderIcon, FiHomeIcon, FiLogInIcon } from '@/utils/icons'

import { View, Text, Pressable, StyleSheet } from 'react-native'

interface Links {
  text: string
  link: string
  Icon: FC<SvgProps>
  onClick: () => void
}

const NavLInks = () => {
  const { neutral, white } = TAILWIND
  const { isLightTheme } = useTheme()

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const getAuthNavAction = () =>
    isLoggedIn
      ? {
          text: 'Logout',
          link: '/logout',
          Icon: FiLogInIcon,
          onClick: () => console.log('login'),
        }
      : {
          text: 'Login',
          link: '/login',
          Icon: FiLogInIcon,
          onClick: () => console.log('/login'),
        }

  const links: Links[] = [
    {
      link: '/(public)',
      text: 'Home',
      Icon: FiHomeIcon,
      onClick: () => router.push('/(public)'),
    },
    // {
    //   text: 'Notes',
    //   link: '/notes',
    //   Icon: FiFolderIcon,
    //   onClick: () => console.log('/notes'),
    // },
    // getAuthNavAction(),
  ]

  const styleStates = {
    link: {
      backgroundColor: isLightTheme ? white : neutral[800],
      borderColor: isLightTheme ? neutral[200] : neutral[600],
      ...styles.link,
    },
    text: {
      color: isLightTheme ? neutral[600] : neutral[50],
    },
  }

  const iconStroke = isLightTheme ? neutral[600] : neutral[50]

  return (
    <View style={styles.view}>
      {links.map(({ Icon, text, onClick }) => (
        <Pressable style={styleStates.link} key={text} onPress={onClick}>
          <Icon width={16} height={16} stroke={iconStroke} />
          <Text style={styleStates.text}>{text}</Text>
        </Pressable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    gap: 2,
  },

  link: {
    gap: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',

    height: 32,

    paddingLeft: 12,
    paddingRight: 12,

    borderWidth: 1,
    borderRadius: 9999,

    fontSize: 14,
    lineHeight: 20,
  },
})

export default NavLInks
