import React from 'react'
import {Box, Button, ButtonProps, Text, Tooltip} from '@chakra-ui/react'
import {useInstanceHeaderManager} from '../contexts/InstanceHeaderManager'
import {usePopupManager, IYesOrNoPopupParams} from '../contexts/PopupManager'
import {useHotkey} from '../contexts/HotkeyContext'
import {IoClose} from 'react-icons/io5'

interface ITabHeader extends ButtonProps {
  tabID: string
}

const TabHeader: React.FunctionComponent<ITabHeader> = (props) => {
  const {getInstance, getAllInstances, getInstancePosition, deleteInstance} = useInstanceHeaderManager()
  const {openPopup} = usePopupManager()
  const {selectedInstance, setSelectedInstance, setTabIndex} = useHotkey()
  const instance = getInstance(props.tabID)
  const position = getInstancePosition(props.tabID)
  const numberOfInstances = getAllInstances().length

  const onDelete = () => {
    openPopup<IYesOrNoPopupParams>('yesOrNo', {
      title: 'Tem certeza?',
      msg: (
        <>
          <Text>
            Deseja deletar a instância:
          </Text>
          <Text fontWeight="bold" mt="10px">
            {instance.name}?
          </Text>
        </>
      )
    }, (confirmation: boolean) => {
      if (confirmation) {
        deleteInstance(props.tabID)
      }
    })
  }

  return (
    <Button
      id={`instance-header-${props.id}`}
      minW="min-content"
      height="100%"
      bg="#2d2f3a"
      alignItems="center"
      justifyContent="space-between"
      transition="all 0.1s"
      borderRadius="0px"
      ml="1.5px"
      mr="1.5px"
      padding="0px 10px"
      boxShadow="none !important"
      _hover={{
        bg: '#31333F',
        cursor: 'pointer'
      }}
      _focus={{
        boxShadow: 'inset 0 0 5px rgba(66, 153, 225, 0.6) !important'
      }}
      {...(selectedInstance === props.tabID && {
        bg: '#323A6B',
        _hover: {
          bg: '#394175'
        }
      })}
      {...(position.isTheFirst && {ml: '0px'})}
      {...(position.isTheLast && {mr: '0px'})}
      onClick={() => {
        setSelectedInstance(props.tabID)
        setTabIndex(-1)
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          const el = document.getElementById(`instance-header-${parseInt(props.id) - 1}`)
          if (el) {
            el.focus()
          } else {
            document.getElementById(`instance-header-${numberOfInstances - 1}`)?.focus()
          }
        }
        if (e.key === 'ArrowRight') {
          const el = document.getElementById(`instance-header-${parseInt(props.id) + 1}`)
          if (el) {
            el.focus()
          } else {
            document.getElementById('instance-header-0')?.focus()
          }
        }
        if (e.key === 'Delete') {
          onDelete()
        }
      }}
    >
      <Text pr="8px">{instance.name}</Text>
      |
      <Text
        pl="8px"
        pr="8px"
        color={
          instance.status === 'CREATING' ? '#637BE4' : instance.status === 'RUNNING' ? '#51E76A' : '#ECBA16'
        }
      >
        {instance.status === 'CREATING' && 'Em preparação'}
        {instance.status === 'RUNNING' && 'Em execução'}
        {instance.status === 'STOPPED' && 'Parado'}
      </Text>
      <Tooltip label="Fecha instância" aria-label="Fecha instância">
        <Box
          onClick={onDelete}
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