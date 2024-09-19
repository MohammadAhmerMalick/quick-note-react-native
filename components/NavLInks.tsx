import { useContext, type FC } from 'react'
import type { SvgProps } from 'react-native-svg'
import { type Href, router, usePathname } from 'expo-router'
import { View, Text, Pressable, StyleSheet } from 'react-native'

import { TAILWIND } from '@/constants'
import useTheme from '@/hook/useTheme'
import { AuthContext } from '@/contexts/authContext'
import { FiFolderIcon, FiHomeIcon, FiLogInIcon } from '@/utils/icons'

interface Links {
  text: string
  link: string
  Icon: FC<SvgProps>
  onClick: () => void
}

const NavLInks = () => {
  const { neutral, white } = TAILWIND
  const pathname = usePathname()
  const { isLightTheme } = useTheme()

  const { logOut, isLoggedIn } = useContext(AuthContext)

  const getAuthNavAction = () =>
    isLoggedIn
      ? {
          text: 'Logout',
          link: '/logout',
          Icon: FiLogInIcon,
          onClick: logOut,
        }
      : {
          text: 'Login',
          link: '/login',
          Icon: FiLogInIcon,
          onClick: () => router.replace('/(public)/login'),
        }

  const links: Links[] = [
    {
      text: 'Home',
      link: '/',
      Icon: FiHomeIcon,
      onClick: () => router.replace('/(public)'),
    },
    // {
    //   text: 'Notes',
    //   link: '/notes',
    //   Icon: FiFolderIcon,
    //   onClick: () => console.log('/notes'),
    // },
    getAuthNavAction(),
  ]

  const styleStates = {
    link: (link: string) => ({
      ...styles.link,
      backgroundColor:
        link === pathname
          ? isLightTheme
            ? white
            : neutral[800]
          : 'tranparent',
      borderColor:
        link === pathname
          ? isLightTheme
            ? neutral[200]
            : neutral[600]
          : 'rgba(0,0,0,0)',
    }),
    text: {
      ...styles.text,
      color: isLightTheme ? neutral[600] : neutral[50],
    },
  }

  const iconStroke = isLightTheme ? neutral[600] : neutral[50]

  return (
    <View style={styles.view}>
      {links.map(({ Icon, text, link, onClick }) => (
        <Pressable style={styleStates.link(link)} key={text} onPress={onClick}>
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
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Montserrat_400Regular',
  },
})

export default NavLInks
