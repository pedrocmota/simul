import React from 'react'
import {BoxProps, Flex} from '@chakra-ui/react'

interface IDividerStyled {
  children: React.ReactNode
}

export const DividerStyled: React.FunctionComponent<IDividerStyled & BoxProps> = ({children, ...props}) => {
  return (
    <Flex
      width="100%"
      alignItems="center"
      _before={{
        content: '""',
        height: '1px',
        backgroundColor: 'silver',
        flexGrow: 1,
        mr: '10px'
      }}
      _after={{
        content: '""',
        height: '1px',
        backgroundColor: 'silver',
        flexGrow: 1,
        ml: '10px'
      }}
      {...props}
    >
      {children}
    </Flex>
  )
}