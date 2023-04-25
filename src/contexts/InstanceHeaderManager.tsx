import React, {useState, useContext, createContext} from 'react'
import {v4 as uuid} from 'uuid'
import {IInstanceHeaderData, InstanceStatus} from './instanceInterfaces'
import {useHotkey} from './HotkeyContext'

export interface IInstanceContext {
  getInstance: (id: string) => IInstanceHeaderData | undefined,
  getAllInstances: () => IInstanceHeaderData[],
  getInstancesLength: () => number,
  getInstancePosition: (id: string) => {index: number, isTheFirst: boolean, isTheLast: boolean},
  setInstanceHeaderData: React.Dispatch<React.SetStateAction<IInstanceHeaderData[]>>,
  createInstance: () => void,
  deleteInstance: (id: string) => void,
  setInstanceStatus: (id: string, ststus: InstanceStatus) => void,
  setInstanceTitle: (id: string, title: string) => void
}

export const InstanceContext = createContext<IInstanceContext>({} as IInstanceContext)

export const useInstanceHeaderManager = () => useContext(InstanceContext)

export const InstanceHeaderProvider: React.FunctionComponent<{children: React.ReactNode}> = (props) => {
  const [instanceHeaderData, setInstanceHeaderData] = useState<IInstanceHeaderData[]>([])
  const {setTabIndex, setSelectedInstance} = useHotkey()

  const getInstance = (id: string) => {
    return instanceHeaderData.find((instance) => instance.id === id)
  }

  const getAllInstances = () => {
    return instanceHeaderData
  }

  const getInstancesLength = () => {
    return instanceHeaderData.length
  }

  const getInstancePosition = (id: string) => {
    return {
      index: instanceHeaderData.findIndex((instance) => instance.id === id),
      isTheFirst: instanceHeaderData.findIndex((instance) => instance.id === id) === 0,
      isTheLast: instanceHeaderData.findIndex((instance) => instance.id === id) === instanceHeaderData.length - 1
    }
  }

  const deleteInstance = (id: string) => {
    setInstanceHeaderData((old) => old.filter((instance) => instance.id !== id))
    setSelectedInstance('')
    setTabIndex(0)
  }

  const createInstance = () => {
    if (instanceHeaderData.length >= 9) return
    const newID = uuid()
    setInstanceHeaderData((old) => [...old, {
      position: old.length + 1,
      id: newID,
      title: '',
      status: 'CREATING'
    }])
    setTabIndex(-1)
    setSelectedInstance(newID)
    setTimeout(() => {
      document.getElementById(`instance-header-${instanceHeaderData.length}`)?.focus()
    }, 100)
  }

  const setInstanceStatus = (id: string, status: InstanceStatus) => {
    setInstanceHeaderData([...instanceHeaderData.map((instance) =>
      instance.id === id ? {...instance, status: status} : instance
    )])
  }

  const setInstanceTitle = (id: string, title: string) => {
    setInstanceHeaderData([...instanceHeaderData.map((instance) =>
      instance.id === id ? {...instance, title: title} : instance
    )])
  }

  return (
    <InstanceContext.Provider value={{
      getInstance,
      getAllInstances,
      getInstancesLength,
      getInstancePosition,
      setInstanceHeaderData,
      createInstance,
      deleteInstance,
      setInstanceStatus,
      setInstanceTitle
    }}>
      {props.children}
    </InstanceContext.Provider>
  )
}