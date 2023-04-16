import React from 'react'
import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalBody, ModalFooter, Button, Flex
} from '@chakra-ui/react'
import {usePopupManager} from '../contexts/PopupManager'

export interface IYesOrNoPopupParams {
  title: string,
  msg: string,
  yesText?: string,
  noText?: string
}

const YesOrNoPopup: React.FunctionComponent = () => {
  const Manager = usePopupManager().getPopupData('yesOrNo')

  const onClose = (responde: boolean) => {
    Manager.onClose()
    if (Manager.callback) {
      Manager.callback(responde)
    }
  }

  return (
    <Modal isOpen={Manager.isOpen} onClose={() => onClose(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{Manager.params.title}</ModalHeader>
        <ModalBody>
          <Flex
            w="100%"
            flexDir="column"
            alignItems="center"
            mb="10px"
          >
            {Manager.params.msg}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            id="yes-button"
            colorScheme="blue"
            mr={3}
            onClick={() => onClose(true)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                document.getElementById('no-button').focus()
              }
            }}
          >
            {Manager.params.yesText || 'Sim'}
          </Button>
          <Button
            id="no-button"
            colorScheme="red"
            mr={3}
            autoFocus
            tabIndex={0}
            onClick={() => onClose(false)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                document.getElementById('yes-button').focus()
              }
            }}
          >
            {Manager.params.noText || 'Não'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export {YesOrNoPopup}