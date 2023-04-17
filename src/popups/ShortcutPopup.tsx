import React from 'react'
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Flex} from '@chakra-ui/react'
import {usePopupManager} from '../contexts/PopupManager'
import {DividerStyled} from '../components/DividerStyled'

interface IShortcut {
  shortcutKey: string,
  description: string
}

const ShortcutPopup: React.FunctionComponent = () => {
  const Manager = usePopupManager().getPopupData('shortcuts')

  const onClose = () => {
    Manager.onClose()
  }

  return (
    <Modal isOpen={Manager.isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Atalhos</ModalHeader>
        <ModalCloseButton tabIndex={-1} />
        <ModalBody mb="20px" autoFocus tabIndex={0} outline="none">
          <Flex
            w="100%"
            mt="10px"
            flexDir="column"
          >
            <DividerStyled>Atalhos globais</DividerStyled>
            <Shotcut shortcutKey="H" description="Abrir os atalhos" />
            <Shotcut shortcutKey="Alt + O" description="Abrir as opções" />

            <DividerStyled mt="20px">Atalhos de foco</DividerStyled>
            <Shotcut shortcutKey="Ctrl + Home" description="Foca na barra de ferramentas" />
            <Shotcut shortcutKey="Home" description="Foca na barra de instâncias" />
            <Shotcut shortcutKey="←" description="Move o foco para esquerda" />
            <Shotcut shortcutKey="→" description="Move o foco para direita" />
            <Shotcut shortcutKey="↑" description="Move o foco para cima" />
            <Shotcut shortcutKey="↓" description="Move o foco para baixo" />
            <Shotcut shortcutKey="Delete" description="Deleta o objeto focado" />
            <Shotcut shortcutKey="Enter" description="Clica no botão focado" />
            <Shotcut shortcutKey="Enter" description="Foca o próximo campo, caso já esteja editando outro" />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const Shotcut: React.FunctionComponent<IShortcut> = (shorcut) => {
  return (
    <Flex key={shorcut.shortcutKey} w="100%" minH="45px" mt="10px" alignItems="center">
      <Flex
        bg="#39455A"
        color="#fff"
        minW="135px"
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
        minH="45px"
        color="#fff"
        alignItems="center"
        fontSize="19px"
        ml="10px"
      >
        {shorcut.description}
      </Flex>
    </Flex>
  )
}

export {ShortcutPopup}