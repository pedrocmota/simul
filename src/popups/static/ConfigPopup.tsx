import React from 'react'
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Button, Flex, Box
} from '@chakra-ui/react'
import {usePopupManager} from '../../contexts/PopupManager'

const ConfigPopup: React.FunctionComponent = () => {
  const {callback, disclosure} = usePopupManager().getPopupData('configs')

  const onClose = () => {
    disclosure.onClose()
    if (callback) {
      callback()
    }
  }

  return (
    <Modal isOpen={disclosure.isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Configurações</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            w="100%"
            flexDir="column"
            alignItems="center"
            mb="10px"
          >
            <Box w="300px">

            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export {ConfigPopup}