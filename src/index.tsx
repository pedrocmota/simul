import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  ChakraProvider,
  CSSReset,
  useColorMode,
  extendTheme, type ThemeConfig
} from '@chakra-ui/react'
import {Main} from './Main'
import {InstanceProvider} from './contexts/InstanceManager'
import {HotkeyProvider} from './contexts/HotkeyContext'
import {DisclosureProvider} from './contexts/DisclosureManager'
import './global.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = extendTheme({config})

root.render(
  <ChakraProvider theme={theme}>
    <DisclosureProvider>
      <HotkeyProvider>
        <InstanceProvider>
          <CSSReset />
          <Main />
        </InstanceProvider>
      </HotkeyProvider>
    </DisclosureProvider>
  </ChakraProvider>
)