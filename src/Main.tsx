import React from 'react'
import {Flex, Text, Button, Divider, Box, Tab, TabList, TabPanel, TabPanels, Tabs, Link, useColorMode, Tooltip} from '@chakra-ui/react'
import {AiFillHome} from 'react-icons/ai'
import {BsFillGearFill} from 'react-icons/bs'
import {SlDocs} from 'react-icons/sl'
import {ImNewTab} from 'react-icons/im'
import {FaFileUpload} from 'react-icons/fa'
import Icon from './icon/icon.svg'
import {useInstance} from './contexts/InstanceContext'
import {useHotkey} from './contexts/HotkeyContext'
import {useDisclosureManager} from './contexts/DisclosureManager'

export const Main = () => {
  const {colorMode} = useColorMode()
  return (
    <Flex
      className="main"
      w="100%"
      h="100%"
      flexDir="column"
      bg={colorMode === 'light' ? '#FAFAFA' : '#282a36'}
    >
      <Header />
      <TabManager />
    </Flex>
  )
}

const Header: React.FunctionComponent = () => {
  const {colorMode} = useColorMode()
  return (
    <Flex
      className="header"
      w="100%"
      h="60px"
      alignItems="center"
      bg={colorMode === 'light' ? 'gray.100' : '#2B2D38'}
    >
      <Box pl="15px" __css={{
        svg: {
          width: '40px',
          height: '40px',
          color: colorMode === 'light' ? '#333030' : '#D1CCCC'
        }
      }}>
        <Icon />
      </Box>
      <Text
        as="h1"
        fontFamily="monospace"
        fontSize="36px"
        pl="15px"
        color={colorMode === 'light' ? '#333030' : '#D1CCCC'}
      >
        Simul
      </Text>
    </Flex>
  )
}

const TabManager: React.FunctionComponent = () => {
  const {colorMode} = useColorMode()
  const {instancePrimaryData, createInstance} = useInstance()
  const {tabIndex, setTabIndex} = useHotkey()
  const {openPopup} = useDisclosureManager()

  return (
    <>
      <Flex
        flexDir="column"
        w="100%"
        className="tab-header"
      >
        <Flex
          className="tab-manager"
          w="100%"
          h="44px"
          bg={colorMode === 'light' ? '#ffffff' : '#282a36'}
          borderBottom={`1px solid ${colorMode === 'light' ? '#E1E1E1' : '#2B2D38'}`}
        >
          <Tooltip label="Página principal" aria-label="Página principal">
            <Button
              id="homeToolip"
              w="58px"
              h="100%"
              borderRadius="0px"
              onClick={() => setTabIndex(0)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') {
                  document.getElementById('docsToolip').focus()
                }
                if (e.key === 'ArrowLeft') {
                  document.getElementById('loadInstanceToolip').focus()
                }
              }}
              {...(tabIndex === 0 && {
                bg: '#48bb78',
                color: '#ffffff',
                _hover: {
                  background: '#47E98A'
                }
              })}
            >
              <AiFillHome size="25px" />
            </Button>
          </Tooltip>
          <Tooltip label="Documentação" aria-label="Documentação">
            <Button
              id="docsToolip"
              w="58px"
              h="100%"
              borderRadius="0px"
              onClick={() => setTabIndex(1)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') {
                  document.getElementById('configsToolip').focus()
                }
                if (e.key === 'ArrowLeft') {
                  document.getElementById('homeToolip').focus()
                }
              }}
              {...(tabIndex === 1 && {
                bg: '#48bb78',
                color: '#ffffff',
                _hover: {
                  background: '#47E98A'
                }
              })}
            >
              <SlDocs size="26px" />
            </Button>
          </Tooltip>
          <Tooltip label="Configurações" aria-label="Configurações">
            <Button
              id="configsToolip"
              w="58px"
              h="100%"
              borderRadius="0px"
              onClick={() => openPopup('configs')}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') {
                  document.getElementById('newInstanceToolip').focus()
                }
                if (e.key === 'ArrowLeft') {
                  document.getElementById('docsToolip').focus()
                }
              }}
            >
              <BsFillGearFill size="24px" />
            </Button>
          </Tooltip>
          <Tooltip label="Nova instância" aria-label="Nova instância">
            <Button
              id="newInstanceToolip"
              w="58px"
              h="100%"
              borderRadius="0px"
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') {
                  document.getElementById('loadInstanceToolip').focus()
                }
                if (e.key === 'ArrowLeft') {
                  document.getElementById('configsToolip').focus()
                }
              }}
            >
              <ImNewTab size="25px" />
            </Button>
          </Tooltip>
          <Tooltip label="Carregar instância" aria-label="Carregar instância">
            <Button
              id="loadInstanceToolip"
              w="58px"
              h="100%"
              borderRadius="0px"
              onClick={() => {

              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') {
                  document.getElementById('homeToolip').focus()
                }
                if (e.key === 'ArrowLeft') {
                  document.getElementById('newInstanceToolip').focus()
                }
              }}
            >
              <FaFileUpload size="25px" />
            </Button>
          </Tooltip>
        </Flex>
      </Flex>
      <Flex
        className="tab-content"
        h="calc(100vh - (60px + 44px))"
        overflowY="auto"
        flexDir="column"
        alignItems="center"
      >
        {(tabIndex === 0) && (
          <HomeTab />
        )}
      </Flex>
    </>
  )
}

const HomeTab: React.FunctionComponent = () => {
  const {colorMode} = useColorMode()
  return (
    <Flex
      w="100%"
      h="100%"
      flexDir="column"
      bg={colorMode === 'light' ? '#FAFAFA' : '#282a36'}
      flex="1"
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      <Box
        pl="15px"
        position="fixed"
        __css={{
          svg: {
            width: '500px',
            height: '500px',
            color: colorMode === 'light' ? '#EBE6E6B9' : '#2D2F3A',
            rotate: '45deg',
            transform: 'rotate(3deg)',
            userSelect: 'none',
            pointerEvents: 'none'
          }
        }}>
        <Icon />
      </Box>
      <Text color={colorMode === 'light' ? '#868686' : '#A3A3A379'}>
        Versão: {process.env.REACT_APP_VERSION}
      </Text>
      <Text color={colorMode === 'light' ? '#868686' : '#A3A3A379'}>
        Feito por Pedro Mota
      </Text>
      <Flex
        position="fixed"
        bottom="80px"
      >
        <Link href="https://github.com/pedrocmota/simul" color={colorMode === 'light' ? '#868686' : '#A3A3A379'}>
          Veja no Github
        </Link>
      </Flex>
    </Flex>
  )
}