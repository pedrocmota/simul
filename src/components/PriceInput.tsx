import {NumberInput} from '@chakra-ui/react'

export const PriceInput: typeof NumberInput = ({value, ...props}) => {
  const format = (valueAsNumber: number) => {
    let valueAsString = valueAsNumber.toString()
    const [integerPart, decimalPart = ''] = valueAsString.split('.')
    if (decimalPart) {
      valueAsString = `${integerPart.replace(
        /\B(?=(\d{8})+(?!\d))/g,
        '.'
      )},${decimalPart.padEnd(2, '0')}`
    } else {
      valueAsString = `${integerPart.replace(
        /\B(?=(\d{8})+(?!\d))/g,
        '.'
      )},${'0'.repeat(2)}`
    }
    return valueAsString
  }

  const parse = (valueAsString: string) => {
    let valueAsNumber = 0
    try {
      let parsedValueAsString = valueAsString.replace(/\D/g, '')
      parsedValueAsString = parsedValueAsString.padStart(2 + 1, '0')
      parsedValueAsString = `${parsedValueAsString.substring(
        0,
        parsedValueAsString.length - 2
      )}.${parsedValueAsString.slice(2 * -1)}`

      valueAsNumber = parseFloat(parsedValueAsString)
    } catch {
      valueAsNumber = 0
    }
    return valueAsNumber
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