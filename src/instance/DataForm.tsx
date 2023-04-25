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
  const {getValues, setValue, handleSubmit, formState: {isSubmitting, errors, isDirty}, control, reset} = useForm<IInstanceData>({
    mode: 'onChange', defaultValues: defaultInstanceData
  })

  const instanceID = useInstanceDataManager().instanceID
  const {setInstanceStatus, getInstance, setInstanceTitle} = useInstanceHeaderManager()
  const instancePrimaryData = getInstance(instanceID)
  const currentValues = getValues()
  // console.log(getValues())

  console.log(currentValues)

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
          maxLength={50}
          value={instancePrimaryData.title}
          onChange={(e) => {
            setInstanceTitle(instanceID, e.target.value)
          }}
        />

        <Controller
          name="malha"
          control={control}
          rules={{
            required: true,
            min: 1
          }}
          render={({field}) => (
            <Select
              placeholder="Selecione o tipo da malha"
              height="45px"
              mt="15px"
              value={field.value}
              onChange={(e) => {
                field.onChange(e.target.value)
              }}
            >
              <option value="OPEN">Malha fechada</option>
              <option value="CLOSED">Malha aberta</option>
            </Select>
          )}
        />

        <DividerStyled mt="35px">
          Dados de controle
        </DividerStyled>
        <Stack spacing={5} direction="row" mt="15px">
          <Controller
            name="controlTypes.proportional"
            control={control}
            render={({field}) => (
              <Checkbox
                colorScheme="red"
                size="lg"
                isChecked={field.value}
                onChange={(e) => {
                  setValue('controlTypes.onOff', false, {shouldValidate: true})
                  field.onChange(e.target.checked)
                }}
              >
                Proporcional
              </Checkbox>
            )}
          />
          <Controller
            name="controlTypes.integral"
            control={control}
            render={({field}) => (
              <Checkbox
                colorScheme="green"
                size="lg"
                isChecked={field.value}
                onChange={(e) => {
                  setValue('controlTypes.proportional', true, {shouldValidate: true})
                  setValue('controlTypes.onOff', false, {shouldValidate: true})
                  field.onChange(e.target.checked)
                }}
              >
                Integral
              </Checkbox>
            )}
          />
          <Controller
            name="controlTypes.derative"
            control={control}
            render={({field}) => (
              <Checkbox
                colorScheme="blue"
                size="lg"
                isChecked={field.value}
                onChange={(e) => {
                  setValue('controlTypes.proportional', true, {shouldValidate: true})
                  setValue('controlTypes.onOff', false, {shouldValidate: true})
                  field.onChange(e.target.checked)
                }}
              >
                Derivativa
              </Checkbox>
            )}
          />
          <Controller
            name="controlTypes.onOff"
            control={control}
            render={({field}) => (
              <Checkbox
                colorScheme="yellow"
                size="lg"
                isChecked={field.value}
                onChange={(e) => {
                  setValue('controlTypes.proportional', false, {shouldValidate: true})
                  setValue('controlTypes.integral', false, {shouldValidate: true})
                  setValue('controlTypes.derative', false, {shouldValidate: true})
                  field.onChange(e.target.checked)
                }}
              >
                ON/OFF
              </Checkbox>
            )}
          />
        </Stack>

        <Controller
          name="bp"
          control={control}
          rules={{
            required: currentValues.controlTypes.onOff === false
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
              isAllowed={(values) => {
                const {formattedValue, floatValue} = values
                return formattedValue === '' || floatValue <= 500 && floatValue > 0
              }}
              disabled={currentValues.controlTypes.proportional === false}
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
              isAllowed={(values) => {
                const {formattedValue, floatValue} = values
                return formattedValue === '' || floatValue <= 100 && floatValue > 0
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
              isAllowed={(values) => {
                const {formattedValue, floatValue} = values
                return formattedValue === '' || floatValue <= 500 && floatValue > 0
              }}
              disabled={currentValues.controlTypes.integral === false}
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
              isAllowed={(values) => {
                const {formattedValue, floatValue} = values
                return formattedValue === '' || floatValue <= 500 && floatValue > 0
              }}
              disabled={currentValues.controlTypes.derative === false}
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

        <Controller
          name="hysteresis"
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
              isAllowed={(values) => {
                const {formattedValue, floatValue} = values
                return formattedValue === '' || floatValue <= 100 && floatValue > 0
              }}
              disabled={currentValues.controlTypes.onOff === false}
              autoComplete="off"
              allowNegative={false}
              placeholder="Histerese"
              height="45px"
              wrapper={{
                mt: '27px'
              }}
              customInput={FloatingInput}
            />
          )}
        />

        <Controller
          name="initialPV"
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
              placeholder="Valor inicial da variável de processo"
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


        <Button
          width="100%"
          mt="40px"
          mb="40px"
          colorScheme="blue"
          onClick={() => {
            setInstanceStatus(instanceID, 'RUNNING')
          }}
        >
          Iniciar simulador
        </Button>
      </Box>
    </Flex>
  )
}

export {DataForm}