import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  ChakraProvider,
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset
} from '@chakra-ui/react'
import {Main} from './Main'
import {InstanceProvider} from './contexts/InstanceContext'
import {HotkeyProvider} from './contexts/HotkeyContext'
import {DisclosureProvider} from './contexts/DisclosureManager'
import './global.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <ChakraProvider>
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <DisclosureProvider>
          <HotkeyProvider>
            <InstanceProvider>
              <CSSReset />
              <Main />
            </InstanceProvider>
          </HotkeyProvider>
        </DisclosureProvider>
      </ColorModeProvider>
    </ThemeProvider>
  </ChakraProvider>
)