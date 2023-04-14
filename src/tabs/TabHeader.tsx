import React from 'react'
import {Box, Button, Flex, Text, Tooltip} from '@chakra-ui/react'
import {useInstanceManager} from '../contexts/InstanceManager'
import {useDisclosureManager} from '../contexts/DisclosureManager'
import {IoClose} from 'react-icons/io5'

interface ITabHeader {
  id: string
}

const TabHeader: React.FunctionComponent<ITabHeader> = (props) => {
  const {getInstance, getInstancePosition, deleteInstance} = useInstanceManager()
  const {openPopup} = useDisclosureManager()
  const instance = getInstance(props.id)
  const position = getInstancePosition(props.id)

  return (
    <Button
      minW="min-content"
      height="100%"
      bg="#2d2f3a"
      alignItems="center"
      justifyContent="space-between"
      transition="all 0.1s"
      borderRadius="0px"
      ml="1.5px"
      mr="1.5px"
      {...(position.isTheFirst && {ml: '0px'})}
      {...(position.isTheLast && {mr: '0px'})}
      _hover={{
        bg: '#31333F',
        cursor: 'pointer'
      }}
    >
      <Text pr="8px">{instance?.name || 'Instância sem nome'}</Text>
      <Tooltip label="Fecha instância" aria-label="Fecha instância">
        <Box
          onClick={() => {
            openPopup('yesOrNo', {
              title: 'Tem certeza?',
              msg: 'Deseja fechar a instância?'
            }, (confirmation: boolean) => {
              if (confirmation) {
                deleteInstance(props.id)
              }
            })
          }}
          _hover={{
            color: 'red.500'
          }}
        >
          <IoClose size="20px" />
        </Box>
      </Tooltip>
    </Button>
  )
}

export {TabHeader}