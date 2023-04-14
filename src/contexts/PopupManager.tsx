import React, {useRef, useContext, createContext} from 'react'
import {useDisclosure, UseDisclosureProps} from '@chakra-ui/react'
import {ConfigPopup} from '../popups/static/ConfigPopup'
import {ShortcutPopup} from '../popups/static/ShortcutPopup'
import {YesOrNoPopup} from '../popups/dynamic/YesOrNoPopup'

export interface IPopupContext {
  disclosuresData: React.MutableRefObject<IPopupsDataElement>,
  getPopupData: (id: string) => any,
  openPopup: (id: string, params?: any, callback?: (...args: any[]) => void) => void,
  disclosures: {
    config: UseDisclosureProps,
    shortcuts: UseDisclosureProps,
    yesOrNo: UseDisclosureProps
  }
}

export interface IPopupProviderProps {
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
    callback: (...args: any[]) => void | undefined
  }
}

export const PopupContext = createContext<IPopupContext>({} as IPopupContext)

export const usePopupManager = () => useContext(PopupContext)

export const PopupProvider: React.FunctionComponent<IPopupProviderProps> = (props) => {
  const disclosuresData = useRef<IPopupsDataElement>({})

  const ConfigPopupDisclosure = useDisclosure()
  const ShortcutPopupDisclosure = useDisclosure()
  const YesOrNoPopupDisclosure = useDisclosure()

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
        if (id === 'yesOrNo') {
          return YesOrNoPopupDisclosure
        }
      })()
    }
  }

  const openPopup = (id: string, params?: any, callback?: (...args: any[]) => void) => {
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
    if (id === 'yesOrNo') {
      YesOrNoPopupDisclosure.onOpen()
    }
  }

  return (
    <PopupContext.Provider value={{
      disclosuresData,
      getPopupData,
      openPopup,
      disclosures: {
        config: ConfigPopupDisclosure,
        shortcuts: ShortcutPopupDisclosure,
        yesOrNo: YesOrNoPopupDisclosure
      }
    }}>
      {(disclosuresData.current['configs'] && (
        <ConfigPopup />
      ))}
      {(disclosuresData.current['shortcuts'] && (
        <ShortcutPopup />
      ))}
      {(disclosuresData.current['yesOrNo'] && (
        <YesOrNoPopup />
      ))}
      {props.children}
    </PopupContext.Provider>
  )
}