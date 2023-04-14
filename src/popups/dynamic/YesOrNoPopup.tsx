import React from 'react'
import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalBody, ModalFooter, Button, Flex
} from '@chakra-ui/react'
import {useDisclosureManager} from '../../contexts/DisclosureManager'

// interface IYesOrNoPopup {
//   title: string,
//   msg: string,
//   yesText?: string,
//   noText?: string
// }

const YesOrNoPopup: React.FunctionComponent = () => {
  const {callback, disclosure, params} = useDisclosureManager().getPopupData('yesOrNo')

  const onClose = (response: boolean) => {
    disclosure.onClose()
    if (callback) {
      callback(response)
    }
  }

  return (
    <Modal isOpen={disclosure.isOpen} onClose={() => onClose(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{params.title}</ModalHeader>
        <ModalBody>
          <Flex
            w="100%"
            flexDir="column"
            alignItems="center"
            mb="10px"
          >
            {params.msg}
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
            {params.yesText || 'Sim'}
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
            {params.noText || 'Não'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export {YesOrNoPopup}