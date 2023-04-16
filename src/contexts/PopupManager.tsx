import React, {useState, useContext, createContext} from 'react'
import {ConfigPopup} from '../popups/ConfigPopup'
import {ShortcutPopup} from '../popups/ShortcutPopup'
import {YesOrNoPopup, IYesOrNoPopupParams} from '../popups/YesOrNoPopup'
export type {IYesOrNoPopupParams}

interface IPopupData {
  id: string,
  component: React.FunctionComponent,
  isOpen: boolean,
  isRendered: boolean,
  params: any,
  callback: (...args: any[]) => void
}

const PopupDatas = [
  {
    id: 'configs',
    component: ConfigPopup,
    isOpen: false,
    isRendered: false,
    params: {},
    callback: () => { }
  },
  {
    id: 'shortcuts',
    component: ShortcutPopup,
    isOpen: false,
    isRendered: false,
    params: {},
    callback: () => { }
  },
  {
    id: 'yesOrNo',
    component: YesOrNoPopup,
    isOpen: false,
    isRendered: false,
    params: {},
    callback: () => { }
  }
] as const

type IGetPopupData<T> = IPopupData & {
  params: T,
  onClose: () => void
}

type PopupsIDs = typeof PopupDatas[number]['id']

export interface IPopupContext {
  getPopupData: <T>(id: PopupsIDs) => IGetPopupData<T>,
  openPopup: <T>(id: PopupsIDs, params?: T, callback?: (...args: any[]) => void) => void,
  closePopup: (id: PopupsIDs) => void
}

export const PopupContext = createContext<IPopupContext>({} as IPopupContext)

export const usePopupManager = () => useContext(PopupContext)

export const PopupProvider: React.FunctionComponent<{children: React.ReactNode}> = (props) => {
  const [popups, setPopups] = useState(PopupDatas as any as IPopupData[])

  const getPopupData = (id: string) => {
    const data = popups.find((element) => element.id === id) as IGetPopupData<any>
    const close = () => {
      closePopup(id)
    }
    data.onClose = close
    return data
  }

  const openPopup = (id: string, params?: any, callback?: (...args: any[]) => void) => {
    setPopups([...popups.map((order) =>
      order.id === id ? {
        ...order, isRendered: true, isOpen: true, params: params, callback: callback
      } : order
    )])
  }

  const closePopup = (id: string) => {
    setPopups([...popups.map((order) =>
      order.id === id ? {...order, isOpen: false, params: {}, callback: () => { }} : order
    )])
    setTimeout(() => {
      setPopups([...popups.map((order) =>
        order.id === id ? {...order, isRendered: false} : order
      )])
    }, 250)
  }

  return (
    <PopupContext.Provider value={{
      getPopupData,
      openPopup,
      closePopup
    }}>
      {(popups.map((Popup) => (
        Popup.isRendered &&
        <Popup.component key={Popup.id} />
      )))}
      {props.children}
    </PopupContext.Provider>
  )
}