import React, {useState, useContext, createContext} from 'react'
import {IInstanceData} from './instanceInterfaces'
import {Flex} from '@chakra-ui/react'
import {useInstanceHeaderManager} from './InstanceHeaderManager'
import {DataForm} from '../instance/DataForm'
import {ChartMain} from '../instance/ChartMain'
import {defaultInstanceData} from '../instance/DefaultData'

export interface IInstanceDataManagerProvider {
  instanceID: string,
  isSelected: boolean
}

export interface IInstanceDataManagerContext {
  instanceID: string,
  instanceData: IInstanceData,
  setInstanceData: React.Dispatch<React.SetStateAction<IInstanceData>>
}

export const InstanceDataManagerContext = createContext<IInstanceDataManagerContext>({} as IInstanceDataManagerContext)

export const useInstanceDataManager = () => useContext(InstanceDataManagerContext)

export const InstanceDataManagerProvider: React.FunctionComponent<IInstanceDataManagerProvider> = (props) => {
  const [instanceData, setInstanceData] = useState<IInstanceData>(defaultInstanceData)

  const {status} = useInstanceHeaderManager().getInstance(props.instanceID)

  return (
    <InstanceDataManagerContext.Provider value={{
      instanceData,
      setInstanceData,
      instanceID: props.instanceID
    }}>
      <Flex
        display={props.isSelected ? 'flex' : 'none'}
        w="100%"
        h="100%"
      >
        {(status === 'CREATING') && (
          <DataForm />
        )}
        {(status === 'RUNNING' || status === 'STOPPED') && (
          <ChartMain />
        )}
      </Flex>
    </InstanceDataManagerContext.Provider>
  )
}