import React, {useState, useEffect, useContext, createContext} from 'react'
import {useDisclosureManager} from '../contexts/DisclosureManager'

export interface IHotkeyContext {
  tabIndex: number,
  setTabIndex: React.Dispatch<React.SetStateAction<number>>
}

export interface IHotkeyProviderProps {
  children: React.ReactNode
}

export const HotkeyContext = createContext<IHotkeyContext>({} as IHotkeyContext)

export const useHotkey = () => useContext(HotkeyContext)

export const HotkeyProvider: React.FunctionComponent<IHotkeyProviderProps> = (props) => {
  const {openPopup} = useDisclosureManager()

  const [tabIndex, setTabIndex] = useState<number>(0)
  useEffect(() => {
    addEventListener('keydown', (e) => {
      if (e.key === 'Home') {
        document.getElementById('homeToolip')?.focus()
      }
      if (e.key === 'h') {
        openPopup('shortcuts')
      }
    })
  }, [])
  return (
    <HotkeyContext.Provider value={{
      tabIndex, setTabIndex
    }}>
      {props.children}
    </HotkeyContext.Provider>
  )
}