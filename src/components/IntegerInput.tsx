import {NumberInput} from '@chakra-ui/react'

export const IntegerInput: typeof NumberInput = ({value, ...props}) => {
  const format = (valueAsNumber: number) => {
    return valueAsNumber
  }

  const parse = (valueAsString: string) => {
    let parsedValue = parseInt(valueAsString)
    if (isNaN(parsedValue)) {
      parsedValue = 0
    }
    return parsedValue
  }

  const inputValue = value

  return (
    <NumberInput
      width="100%"
      value={format(value as any)}
      {...props}
      onChange={(value) => {
        const parsedValue = parse(value)
        if (inputValue != parsedValue) {
          if (props.onChange) {
            //@ts-ignore
            props.onChange(parsedValue.toString(), parsedValue)
          }
        }
      }}
    >
      {props.children}
    </NumberInput>
  )
}