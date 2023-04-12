import React from 'react'
import {Flex, Text} from '@chakra-ui/react'
import {useInstanceManager} from '../contexts/InstanceManager'

interface ITabHeader {
  key: string
}

const TabHeader: React.FunctionComponent<ITabHeader> = (props) => {
  const {getInstance} = useInstanceManager()
  const instance = getInstance(props.key)
  return (
    <Flex
      minW="200px"
      height="100%"
      bg="#2d2f3a"
      alignItems="center"
    >
      <Text>{instance?.name || 'Instância sem nome'}</Text>
    </Flex>
  )
}

export {TabHeader}