import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  ChakraProvider,
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset,
  useColorMode
} from '@chakra-ui/react'
import {Main} from './Main'
import {InstanceProvider} from './contexts/InstanceManager'
import {HotkeyProvider} from './contexts/HotkeyContext'
import {DisclosureProvider} from './contexts/DisclosureManager'
import './global.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const ThemeManager: React.FunctionComponent<{children: React.ReactNode}> = (props) => {
  const {colorMode} = useColorMode()
  if (!localStorage.getItem('chakra-ui-color-mode')) {
    localStorage.setItem('chakra-ui-color-mode', 'dark')
  }
  return (
    <>
      {(colorMode === localStorage.getItem('chakra-ui-color-mode')) && (
        <>{props.children}</>
      )}
    </>
  )
}

root.render(
  <ChakraProvider>
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <ThemeManager>
          <DisclosureProvider>
            <HotkeyProvider>
              <InstanceProvider>
                <CSSReset />
                <Main />
              </InstanceProvider>
            </HotkeyProvider>
          </DisclosureProvider>
        </ThemeManager>
      </ColorModeProvider>
    </ThemeProvider>
  </ChakraProvider>
)