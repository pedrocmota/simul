import React from 'react'
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Button, useColorMode, Flex, Box, Select, Text
} from '@chakra-ui/react'
import {useDisclosureManager} from '../../contexts/DisclosureManager'

const ConfigPopup: React.FunctionComponent = () => {
  const {callback, disclosure} = useDisclosureManager().getPopupData('configs')
  const {colorMode, setColorMode} = useColorMode()

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
              <Text pb="5px">Tema de cores</Text>
              <Select defaultValue={colorMode} w="100%" onChange={(value) => {
                setColorMode(value.target.value)
              }}>
                <option value="light">Claro</option>
                <option value="dark">Escuro</option>
              </Select>
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