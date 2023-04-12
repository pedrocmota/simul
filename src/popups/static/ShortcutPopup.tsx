import React from 'react'
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Button, useColorMode, Flex, Divider, Box
} from '@chakra-ui/react'
import {useDisclosureManager} from '../../contexts/DisclosureManager'
import {DividerStyled} from '../../components/DividerStyled'

interface IShortcut {
  shortcutKey: string,
  description: string
}

const ShortcutPopup: React.FunctionComponent = () => {
  const {callback, disclosure} = useDisclosureManager().getPopupData('shortcuts')
  const {colorMode} = useColorMode()

  const onClose = () => {
    disclosure.onClose()
    if (callback) {
      callback()
    }
  }

  return (
    <Modal isOpen={disclosure.isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Atalhos</ModalHeader>
        <ModalCloseButton tabIndex={-1} />
        <ModalBody mb="10px" autoFocus tabIndex={0} outline="none">
          <Flex
            w="100%"
            mt="10px"
            flexDir="column"
          >
            <DividerStyled>Atalhos globais</DividerStyled>
            <Shotcut shortcutKey="H" description="Abrir os atalhos" />
            <Shotcut shortcutKey="Ctrl + O" description="Abrir as opções" />

            <DividerStyled mt="20px">Atalhos de foco</DividerStyled>
            <Shotcut shortcutKey="Home" description="Foca na barra de ferramentas" />

            <Shotcut shortcutKey="Home" description="Foca na barra de ferramentas" />
            <Shotcut shortcutKey="Home" description="Foca na barra de ferramentas" />
            <Shotcut shortcutKey="Home" description="Foca na barra de ferramentas" />
            <Shotcut shortcutKey="Home" description="Foca na barra de ferramentas" />
            <Shotcut shortcutKey="Home" description="Foca na barra de ferramentas" />
            <Shotcut shortcutKey="Home" description="Foca na barra de ferramentas" />
            <Shotcut shortcutKey="Home" description="Foca na barra de ferramentas" />
            <Shotcut shortcutKey="Home" description="Foca na barra de ferramentas" />
            <Shotcut shortcutKey="Home" description="Foca na barra de ferramentas" />
            <Shotcut shortcutKey="Home" description="Foca na barra de ferramentas" />
            <Shotcut shortcutKey="Home" description="Foca na barra de ferramentas" />

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

const Shotcut: React.FunctionComponent<IShortcut> = (shorcut) => {
  const {colorMode} = useColorMode()
  return (
    <Flex key={shorcut.shortcutKey} w="100%" mt="10px">
      <Flex
        bg={colorMode === 'dark' ? '#39455A' : '#FCFAFA'}
        color={colorMode === 'dark' ? '#fff' : '#5C5959'}
        w="135px"
        h="45px"
        borderRadius="5px"
        border={`1px solid ${colorMode === 'dark' ? '#2d3748' : '#E2E8F0'}`}
        justifyContent="center"
        alignItems="center"
        fontSize="20px"
      >
        {shorcut.shortcutKey}
      </Flex>
      <Flex
        h="45px"
        color={colorMode === 'dark' ? '#fff' : '#111010'}
        alignItems="center"
        fontSize="20px"
        ml="10px"
      >
        {shorcut.description}
      </Flex>
    </Flex>
  )
}

export {ShortcutPopup}