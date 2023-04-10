import React, {useState, useContext, createContext} from 'react'
import {v4 as uuid} from 'uuid'
import {IInstancePrimaryData} from './instanceInterfaces'
import {useStateCallback} from '../hooks/useStateWithCallback'

export interface IInstanceContext {
  instancePrimaryData: IInstancePrimaryData[],
  setInstancePrimaryData: React.Dispatch<React.SetStateAction<IInstancePrimaryData[]>>,
  createInstance: (callback: () => void) => void
}

export interface IInstanceProviderProps {
  children: React.ReactNode
}
// id: uuid(),
// name: '',
// loopControl: 'CLOSED',
// gain: 1,
// bias: 50,
// status: 'CREATING'


export const InstanceContext = createContext<IInstanceContext>({} as IInstanceContext)

export const useInstance = () => useContext(InstanceContext)

export const InstanceProvider: React.FunctionComponent<IInstanceProviderProps> = (props) => {
  const [instancePrimaryData, setInstancePrimaryData] = useState<IInstancePrimaryData[]>([])

  const createInstance = () => {
    setInstancePrimaryData((old) => [...old, {
      id: uuid(),
      name: '',
      loopControl: 'CLOSED',
      gain: 1,
      bias: 50,
      status: 'CREATING'
    }])
  }

  return (
    <InstanceContext.Provider value={{
      instancePrimaryData,
      setInstancePrimaryData,
      createInstance
    }}>
      {props.children}
    </InstanceContext.Provider>
  )
}