import React, {useState, useContext, createContext} from 'react'
import {v4 as uuid} from 'uuid'
import {IInstancePrimaryData} from './instanceInterfaces'

export interface IInstanceContext {
  getInstance: (id: string) => IInstancePrimaryData | undefined,
  getAllInstances: () => IInstancePrimaryData[],
  setInstancePrimaryData: React.Dispatch<React.SetStateAction<IInstancePrimaryData[]>>,
  createInstance: () => void
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

  const createInstance = () => {
    if (instancePrimaryData.length >= 9) return
    setInstancePrimaryData((old) => [...old, {
      id: uuid(),
      name: '',
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
      setInstancePrimaryData,
      createInstance
    }}>
      {props.children}
    </InstanceContext.Provider>
  )
}