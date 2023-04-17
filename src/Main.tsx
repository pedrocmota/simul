import React from 'react'
import {Flex, Text, Button, Box, Tooltip} from '@chakra-ui/react'
import {HomeTab} from './tabs/HomeTab'
import {DocsTab} from './tabs/DocsTab'
import {AiFillHome} from 'react-icons/ai'
import {BsFillGearFill} from 'react-icons/bs'
import {SlDocs} from 'react-icons/sl'
import {ImNewTab} from 'react-icons/im'
import {FaFileUpload} from 'react-icons/fa'
import Icon from './icon/icon.svg'
import {useInstanceHeaderManager} from './contexts/InstanceHeaderManager'
import {useHotkey} from './contexts/HotkeyContext'
import {usePopupManager} from './contexts/PopupManager'
import {TabHeader} from './tabs/TabHeader'
import {InstanceDataManagerProvider} from './contexts/InstanceDataManager'

export const Main = () => {
  return (
    <Flex
      className="main"
      w="100%"
      h="100%"
      flexDir="column"
      bg="#282a36"
    >
      <Header />
      <TabManager />
    </Flex>
  )
}

const Header: React.FunctionComponent = () => {
  return (
    <Flex
      className="header"
      w="100%"
      h="60px"
      alignItems="center"
      bg="#2B2D38"
    >
      <Box pl="15px" __css={{
        svg: {
          width: '40px',
          height: '40px',
          color: '#D1CCCC'
        }
      }}>
        <Icon />
      </Box>
      <Text
        as="h1"
        fontFamily="monospace"
        fontSize="36px"
        pl="15px"
        color="#D1CCCC"
      >
        Simul
      </Text>
    </Flex>
  )
}

const TabManager: React.FunctionComponent = () => {
  const InstanceManager = useInstanceHeaderManager()
  const {tabIndex, setTabIndex, selectedInstance, setSelectedInstance} = useHotkey()
  const {openPopup} = usePopupManager()

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
          bg="#282a36"
          borderBottom="#2B2D38"
        >
          <Flex className="tabs-buttons">
            <Tooltip label="Página principal" aria-label="Página principal">
              <Button
                id="homeToolip"
                w="58px"
                h="100%"
                color="#FFFFFF"
                borderRadius="0px"
                onClick={() => {
                  setTabIndex(0)
                  setSelectedInstance('')
                }}
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
                color="#FFFFFF"
                borderRadius="0px"
                onClick={() => {
                  setTabIndex(1)
                  setSelectedInstance('')
                }}
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
                isDisabled={InstanceManager.getInstancesLength() >= 9}
                onClick={() => {
                  InstanceManager.createInstance()
                }}
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
                isDisabled={InstanceManager.getInstancesLength() >= 9}
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
          <Flex
            className="instance-buttons"
            display="inline-flex"
            width="0"
            flexGrow="1"
            paddingLeft="3px"
            justifyContent="space-between"
          >
            {(InstanceManager.getInstancesLength() > 0) && (
              <Tooltip label="Mover para esquerda" aria-label="Mover para esquerda">
                <Button
                  w="50px"
                  h="100%"
                  borderRadius="0px"
                  marginRight="3px"
                  onClick={() => {
                    const container = document.querySelector('.instance-container')
                    container.scrollLeft -= 100
                  }}
                >
                  {'<<<'}
                </Button>
              </Tooltip>
            )}
            <Flex
              className="instance-container"
              display="inline-flex"
              width="0"
              flexGrow="1"
              overflowX="auto"
              __css={{
                scrollbarColor: 'transparent transparent',
                scrollbarHeight: '0px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                '::-webkit-scrollbar': {
                  padding: '0px',
                  height: '0px'
                }
              }}
            >
              {InstanceManager.getAllInstances().map((instance, index) => (
                <TabHeader
                  key={instance.id}
                  tabID={instance.id}
                  id={index.toString()}
                />
              ))}
            </Flex>
            {(InstanceManager.getInstancesLength() > 0) && (
              <Tooltip label="Mover para direita" aria-label="Mover para direita">
                <Button
                  w="50px"
                  h="100%"
                  borderRadius="0px"
                  marginLeft="3px"
                  onClick={() => {
                    const container = document.querySelector('.instance-container')
                    container.scrollLeft += 100
                  }}
                >
                  {'>>>'}
                </Button>
              </Tooltip>
            )}
          </Flex>
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
        {(tabIndex === 1) && (
          <DocsTab />
        )}
        {((tabIndex === -1 && selectedInstance !== '') && (
          <>
            {InstanceManager.getAllInstances().map((instance) => (
              <InstanceDataManagerProvider
                key={instance.id}
                isSelected={instance.id === selectedInstance}
                instanceID={instance.id}
              />
            ))}
          </>
        ))}
      </Flex>
    </>
  )
}