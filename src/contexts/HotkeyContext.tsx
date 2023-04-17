import React, {useState, useEffect, useContext, createContext} from 'react'
import {usePopupManager} from './PopupManager'

export interface IHotkeyContext {
  tabIndex: number,
  setTabIndex: React.Dispatch<React.SetStateAction<number>>,
  selectedInstance: string,
  setSelectedInstance: React.Dispatch<React.SetStateAction<string>>
}

export interface IHotkeyProviderProps {
  children: React.ReactNode
}

export const HotkeyContext = createContext<IHotkeyContext>({} as IHotkeyContext)

export const useHotkey = () => useContext(HotkeyContext)

export const HotkeyProvider: React.FunctionComponent<IHotkeyProviderProps> = (props) => {
  const [tabIndex, setTabIndex] = useState(0)
  const [selectedInstance, setSelectedInstance] = useState('')
  const {openPopup} = usePopupManager()

  useEffect(() => {
    addEventListener('keydown', (e) => {
      /* Globais */
      if (e.key === 'Escape') {
        (document.activeElement as HTMLElement).blur()
      }
      if (e.key === 'h') {
        openPopup('shortcuts')
      }
      if (e.key === 'o' && e.altKey) {
        openPopup('configs')
      }

      /* Foco */
      if (e.key === 'Home' && e.ctrlKey) {
        document.getElementById('homeToolip')?.focus()
      }
      if (e.key === 'Home' && !e.ctrlKey) {
        document.getElementById('instance-header-0')?.focus()
      }

    })
  }, [])
  return (
    <HotkeyContext.Provider value={{
      tabIndex, setTabIndex,
      selectedInstance, setSelectedInstance
    }}>
      {props.children}
    </HotkeyContext.Provider>
  )
}