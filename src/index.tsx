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
import {PopupProvider} from './contexts/PopupManager'
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
    <PopupProvider>
      <HotkeyProvider>
        <InstanceProvider>
          <CSSReset />
          <Main />
        </InstanceProvider>
      </HotkeyProvider>
    </PopupProvider>
  </ChakraProvider>
)