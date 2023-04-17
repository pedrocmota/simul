import {BoxProps, Flex} from '@chakra-ui/react'
import React from 'react'

interface IInstanceContainer extends BoxProps {
  instanceID: string,
  selected: boolean
}

const InstanceContainer: React.FunctionComponent<IInstanceContainer> = (props) => {
  return (
    <Flex
      display={props.selected ? 'flex' : 'none'}
      w="100%"
      h="100%"
    >
      {props.instanceID}
    </Flex>
  )
}

export {InstanceContainer}