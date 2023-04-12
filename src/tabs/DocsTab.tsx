import {Box, Flex, Link, Text, useColorMode} from '@chakra-ui/react'
import React from 'react'

const DocsTab: React.FunctionComponent = () => {
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
      docs
    </Flex>
  )
}

export {DocsTab}