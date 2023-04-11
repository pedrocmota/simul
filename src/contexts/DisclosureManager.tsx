import React, {useRef, useContext, createContext} from 'react'
import {useDisclosure, UseDisclosureProps} from '@chakra-ui/react'
import {ConfigPopup} from '../popups/static/ConfigPopup'
import {ShortcutPopup} from '../popups/static/ShortcutPopup'

export interface IDisclosureContext {
  disclosuresData: React.MutableRefObject<IPopupsDataElement>,
  getPopupData: (id: string) => any,
  openPopup: (id: string, params?: any, callback?: () => void) => void,
  disclosures: {
    config: UseDisclosureProps,
    shortcuts: UseDisclosureProps
  }
}

export interface IDisclosureProviderProps {
  children: React.ReactNode
}

export interface IPopupsData {
  id: string,
  params?: any,
  callback?: () => void
}

interface IPopupsDataElement {
  [key: string]: {
    id: string,
    params: any | undefined,
    callback: () => void | undefined
  }
}

export const DisclosureContext = createContext<IDisclosureContext>({} as IDisclosureContext)

export const useDisclosureManager = () => useContext(DisclosureContext)

export const DisclosureProvider: React.FunctionComponent<IDisclosureProviderProps> = (props) => {
  const disclosuresData = useRef<IPopupsDataElement>({})

  const ConfigPopupDisclosure = useDisclosure()
  const ShortcutPopupDisclosure = useDisclosure()

  const getPopupData = (id: string) => {
    return {
      ...disclosuresData.current[id],
      disclosure: (() => {
        if (id === 'configs') {
          return ConfigPopupDisclosure
        }
        if (id === 'shortcuts') {
          return ShortcutPopupDisclosure
        }
      })()
    }
  }

  const openPopup = (id: string, params?: any, callback?: () => void) => {
    disclosuresData.current[id] = {
      id: id,
      params: params,
      callback: callback
    }
    if (id === 'configs') {
      ConfigPopupDisclosure.onOpen()
    }
    if (id === 'shortcuts') {
      ShortcutPopupDisclosure.onOpen()
    }
  }

  return (
    <DisclosureContext.Provider value={{
      disclosuresData,
      getPopupData,
      openPopup,
      disclosures: {
        config: ConfigPopupDisclosure,
        shortcuts: ShortcutPopupDisclosure
      }
    }}>
      {(disclosuresData.current['configs'] && (
        <ConfigPopup />
      ))}
      {(disclosuresData.current['shortcuts'] && (
        <ShortcutPopup />
      ))}
      {props.children}
    </DisclosureContext.Provider>
  )
}