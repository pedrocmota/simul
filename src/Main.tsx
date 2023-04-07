import React from 'react'
import {Flex, Text, Button, Divider, Box, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react'
import {AiFillHome} from 'react-icons/ai'
import {GrConfigure} from 'react-icons/gr'
import Icon from './icon/icon.svg'

export const Main = () => {
  return (
    <Flex
      className="main"
      w="100%"
      h="100%"
      overflow="hidden"
      flexDir="column"
    >
      <Header />
      <TabManager />
    </Flex>
  )
}

const Header: React.FunctionComponent = () => {
  return (
    <Flex
      w="100%"
      h="60px"
      bg="gray.100"
      alignItems="center"
    >
      <Box pl="10px" __css={{
        svg: {
          width: '40px',
          height: '40px'
        }
      }}>
        <Icon />
      </Box>
      <Text
        as="h1"
        fontFamily="monospace"
        fontSize="38px"
        pl="15px"
      >
        Simul
      </Text>
    </Flex>
  )
}

const TabManager: React.FunctionComponent = () => {
  return (
    <Tabs variant="unstyled">
      <TabList>
        <Tab
          h="40px"
          _selected={{color: 'white', bg: 'blue.500'}}
        >
          <AiFillHome size="25px" />
        </Tab>
        <Tab
          h="40px"
          _selected={{color: 'yellow', bg: 'green.400'}}>
          <GrConfigure size="25px" />
        </Tab>
        <Tab
          h="40px"
          _selected={{color: 'white', bg: 'green.400'}}
        >

        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}