import React from 'react'
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Button, Flex
} from '@chakra-ui/react'
import {usePopupManager} from '../../contexts/PopupManager'
import {DividerStyled} from '../../components/DividerStyled'

interface IShortcut {
  shortcutKey: string,
  description: string
}

const ShortcutPopup: React.FunctionComponent = () => {
  const {callback, disclosure} = usePopupManager().getPopupData('shortcuts')

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
  return (
    <Flex key={shorcut.shortcutKey} w="100%" mt="10px">
      <Flex
        bg="#39455A"
        color="#fff"
        w="135px"
        h="45px"
        borderRadius="5px"
        border="#2d3748"
        justifyContent="center"
        alignItems="center"
        fontSize="20px"
      >
        {shorcut.shortcutKey}
      </Flex>
      <Flex
        h="45px"
        color="#fff"
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