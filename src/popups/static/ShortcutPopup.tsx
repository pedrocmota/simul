import React from 'react'
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Button
} from '@chakra-ui/react'
import {useDisclosureManager} from '../../contexts/DisclosureManager'

const ShortcutPopup: React.FunctionComponent = () => {
  const {callback} = useDisclosureManager().disclosuresData.current['shortcuts']
  const disclosure = useDisclosureManager().disclosures.shortcuts

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
        <ModalHeader>Atalhos</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          ola
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

export {ShortcutPopup}