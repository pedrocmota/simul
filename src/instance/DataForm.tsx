import React from 'react'
import {Box, Button, Flex, Text} from '@chakra-ui/react'
import {useForm, Controller, SubmitHandler} from 'react-hook-form'
import {DividerStyled} from '../components/DividerStyled'
import {FloatingInput} from '../components/FloatingInput'
import {defaultInstanceData} from './DefaultData'
import {IInstanceData} from '../contexts/instanceInterfaces'
import {useInstanceHeaderManager} from '../contexts/InstanceHeaderManager'
import {useInstanceDataManager} from '../contexts/InstanceDataManager'

const DataForm: React.FunctionComponent = () => {

  const {handleSubmit, formState: {isSubmitting, errors, isDirty}, control, reset} = useForm<IInstanceData>({
    mode: 'onChange', defaultValues: defaultInstanceData
  })

  const instanceID = useInstanceDataManager().instanceID
  const {setInstanceStatus} = useInstanceHeaderManager()

  return (
    <Flex
      w="100%"
      h="100%"
      flexDir="column"
      alignItems="center"
      pt="50px"
    >
      <Box
        w="700px"
        flexDir="column"
        alignItems="center"
      >
        <DividerStyled>
          Dados básicos
        </DividerStyled>
        <FloatingInput
          id="instanceTitle"
          placeholder="Título da instância"
          height="45px"
          wrapper={{
            mt: '15px'
          }}
          labelProps={{
            // bg: '#282a36 !important'
          }}
        />
        <Button
          mt="20px"
          colorScheme="blue"
          onClick={() => {
            setInstanceStatus(instanceID, 'RUNNING')
          }}
        >
          Iniciar
        </Button>
      </Box>
    </Flex>
  )
}

export {DataForm}