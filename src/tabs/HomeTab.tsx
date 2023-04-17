import {Box, Flex, Link, Text} from '@chakra-ui/react'
import React from 'react'
import Icon from '../icon/icon.svg'

const HomeTab: React.FunctionComponent = () => {
  return (
    <Flex
      w="100%"
      h="100%"
      flexDir="column"
      bg="#282a36"
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
            color: '#2D2F3A',
            rotate: '45deg',
            transform: 'rotate(3deg)',
            userSelect: 'none',
            pointerEvents: 'none'
          }
        }}
        sx={{
          '@media (max-height: 730px)': {
            svg: {
              width: '400px',
              height: '400px'
            }
          },
          '@media (max-height: 630px)': {
            svg: {
              mb: '50px'
            }
          }
        }}>
        <Icon />
      </Box>
      <Text color="#A3A3A379">
        Versão: {process.env.REACT_APP_VERSION}
      </Text>
      <Text color="#A3A3A379">
        Feito por Pedro Mota
      </Text>
      <Flex
        position="fixed"
        bottom="80px"
      >
        <Link
          href="https://github.com/pedrocmota/simul"
          target="_blank"
          color="#A3A3A379"
        >
          Veja no Github
        </Link>
      </Flex>
    </Flex>
  )
}

export {HomeTab}