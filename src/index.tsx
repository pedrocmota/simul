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
import './global.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <ChakraProvider>
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <Main />
      </ColorModeProvider>
    </ThemeProvider>
  </ChakraProvider>
)