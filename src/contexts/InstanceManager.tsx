import React, {useState, useContext, createContext} from 'react'
import {v4 as uuid} from 'uuid'
import {IInstancePrimaryData} from './instanceInterfaces'

export interface IInstanceContext {
  getInstance: (id: string) => IInstancePrimaryData | undefined,
  getAllInstances: () => IInstancePrimaryData[],
  getInstancePosition: (id: string) => {index: number, isTheFirst: boolean, isTheLast: boolean},
  setInstancePrimaryData: React.Dispatch<React.SetStateAction<IInstancePrimaryData[]>>,
  createInstance: () => void,
  deleteInstance: (id: string) => void
}

export interface IInstanceProviderProps {
  children: React.ReactNode
}

export const InstanceContext = createContext<IInstanceContext>({} as IInstanceContext)

export const useInstanceManager = () => useContext(InstanceContext)

export const InstanceProvider: React.FunctionComponent<IInstanceProviderProps> = (props) => {
  const [instancePrimaryData, setInstancePrimaryData] = useState<IInstancePrimaryData[]>([])

  const getInstance = (id: string) => {
    return instancePrimaryData.find((instance) => instance.id === id)
  }

  const getAllInstances = () => {
    return instancePrimaryData
  }

  const getInstancePosition = (id: string) => {
    return {
      index: instancePrimaryData.findIndex((instance) => instance.id === id),
      isTheFirst: instancePrimaryData.findIndex((instance) => instance.id === id) === 0,
      isTheLast: instancePrimaryData.findIndex((instance) => instance.id === id) === instancePrimaryData.length - 1
    }
  }

  const deleteInstance = (id: string) => {
    setInstancePrimaryData((old) => old.filter((instance) => instance.id !== id))
  }

  const createInstance = () => {
    if (instancePrimaryData.length >= 9) return
    setInstancePrimaryData((old) => [...old, {
      id: uuid(),
      name: `Instância sem nome (${instancePrimaryData.length + 1})`,
      malha: 'CLOSED',
      gain: 1,
      bias: 50,
      status: 'CREATING'
    }])
  }

  return (
    <InstanceContext.Provider value={{
      getInstance,
      getAllInstances,
      getInstancePosition,
      setInstancePrimaryData,
      createInstance,
      deleteInstance
    }}>
      {props.children}
    </InstanceContext.Provider>
  )
}