import {Box, Flex, Link, Text, useColorMode} from '@chakra-ui/react'
import React from 'react'
import Icon from '../icon/icon.svg'

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
        <Link
          href="https://github.com/pedrocmota/simul"
          target="_blank"
          color={colorMode === 'light' ? '#868686' : '#A3A3A379'}
        >
          Veja no Github
        </Link>
      </Flex>
    </Flex>
  )
}

export {HomeTab}