import React from 'react'
import ReactDOM from 'react-dom/client'
import {ChakraProvider, CSSReset, extendTheme, type ThemeConfig} from '@chakra-ui/react'
import {Main} from './Main'
import {InstanceHeaderProvider} from './contexts/InstanceHeaderManager'
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
        <InstanceHeaderProvider>
          <CSSReset />
          <Main />
        </InstanceHeaderProvider>
      </HotkeyProvider>
    </PopupProvider>
  </ChakraProvider>
)