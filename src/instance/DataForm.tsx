import React from 'react'
import {Box, Button, Checkbox, Flex, Select, Stack, Text} from '@chakra-ui/react'
import {useForm, Controller, SubmitHandler} from 'react-hook-form'
import {DividerStyled} from '../components/DividerStyled'
import {FloatingInput} from '../components/FloatingInput'
import {defaultInstanceData} from './DefaultData'
import {IInstanceData} from '../contexts/instanceInterfaces'
import {useInstanceHeaderManager} from '../contexts/InstanceHeaderManager'
import {useInstanceDataManager} from '../contexts/InstanceDataManager'
import {NumericFormat} from 'react-number-format'

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
        />
        <Select
          placeholder="Selecione o tipo da malha"
          height="45px"
          mt="15px"
        >
          <option value="option1">Malha fechada</option>
          <option value="option2">Malha aberta</option>
        </Select>
        <DividerStyled mt="35px">
          Dados de controle
        </DividerStyled>

        <Stack spacing={5} direction="row" mt="15px">
          <Checkbox colorScheme="red" size="lg" defaultChecked>
            Proporcional
          </Checkbox>
          <Checkbox colorScheme="green" size="lg" defaultChecked>
            Integral
          </Checkbox>
          <Checkbox colorScheme="blue" size="lg" defaultChecked>
            Derivativa
          </Checkbox>
          <Checkbox colorScheme="orange" size="lg" defaultChecked>
            On/Off
          </Checkbox>
        </Stack>
        <Controller
          name="bp"
          control={control}
          rules={{
            required: true
          }}
          render={({field}) => (
            <NumericFormat
              type="tel"
              value={field.value}
              onValueChange={(vc) => {
                if (vc.floatValue !== undefined) {
                  field.onChange(vc.floatValue)
                }
              }}
              autoComplete="off"
              allowNegative={false}
              placeholder="Banda proporcional"
              height="45px"
              wrapper={{
                mt: '27px'
              }}
              customInput={FloatingInput}
            />
          )}
        />

        <Controller
          name="bias"
          control={control}
          rules={{
            required: true
          }}
          render={({field}) => (
            <NumericFormat
              type="tel"
              value={field.value}
              suffix="%"
              onValueChange={(vc) => {
                if (vc.floatValue !== undefined) {
                  field.onChange(vc.floatValue)
                }
              }}
              autoComplete="off"
              allowNegative={false}
              placeholder="Bias"
              height="45px"
              wrapper={{
                mt: '27px'
              }}
              customInput={FloatingInput}
            />
          )}
        />

        <Controller
          name="integralTime"
          control={control}
          rules={{
            required: true
          }}
          render={({field}) => (
            <NumericFormat
              type="tel"
              value={field.value}
              suffix="s"
              onValueChange={(vc) => {
                if (vc.floatValue !== undefined) {
                  field.onChange(vc.floatValue)
                }
              }}
              autoComplete="off"
              allowNegative={false}
              placeholder="Tempo integral"
              height="45px"
              wrapper={{
                mt: '27px'
              }}
              customInput={FloatingInput}
            />
          )}
        />

        <Controller
          name="derivatimeTime"
          control={control}
          rules={{
            required: true
          }}
          render={({field}) => (
            <NumericFormat
              type="tel"
              value={field.value}
              suffix="s"
              onValueChange={(vc) => {
                if (vc.floatValue !== undefined) {
                  field.onChange(vc.floatValue)
                }
              }}
              autoComplete="off"
              allowNegative={false}
              placeholder="Tempo derivativo"
              height="45px"
              wrapper={{
                mt: '27px'
              }}
              customInput={FloatingInput}
            />
          )}
        />

        <DividerStyled mt="35px">
          Valores iniciais
        </DividerStyled>

        <Controller
          name="initial.mv"
          control={control}
          rules={{
            required: true
          }}
          render={({field}) => (
            <NumericFormat
              type="tel"
              value={field.value}
              suffix="%"
              onValueChange={(vc) => {
                if (vc.floatValue !== undefined) {
                  field.onChange(vc.floatValue)
                }
              }}
              autoComplete="off"
              allowNegative={false}
              placeholder="Valor inicial do MV"
              height="45px"
              wrapper={{
                mt: '27px'
              }}
              customInput={FloatingInput}
            />
          )}
        />

        <Controller
          name="initial.pv"
          control={control}
          rules={{
            required: true
          }}
          render={({field}) => (
            <NumericFormat
              type="tel"
              value={field.value}
              suffix="%"
              onValueChange={(vc) => {
                if (vc.floatValue !== undefined) {
                  field.onChange(vc.floatValue)
                }
              }}
              autoComplete="off"
              allowNegative={false}
              placeholder="Valor inicial do PV"
              height="45px"
              wrapper={{
                mt: '27px'
              }}
              customInput={FloatingInput}
            />
          )}
        />

        <DividerStyled mt="35px">
          Valores de telemetria
        </DividerStyled>

        <Select
          placeholder="Predefinições"
          height="45px"
          mt="15px"
        >
          <option value="temperature">Controle temperatura</option>
          <option value="pression">Controle de pressão</option>
          <option value="flow">Controle de vazão</option>
          <option value="level">Controle de nível</option>
        </Select>

        <Controller
          name="initial.pv"
          control={control}
          rules={{
            required: true
          }}
          render={({field}) => (
            <NumericFormat
              type="tel"
              value={field.value}
              suffix="%"
              onValueChange={(vc) => {
                if (vc.floatValue !== undefined) {
                  field.onChange(vc.floatValue)
                }
              }}
              autoComplete="off"
              allowNegative={false}
              placeholder="Valor inicial do PV"
              height="45px"
              wrapper={{
                mt: '27px'
              }}
              customInput={FloatingInput}
            />
          )}
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