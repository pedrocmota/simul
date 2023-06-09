import {ChakraProvider, FormControl, FormLabel, Input, extendTheme, forwardRef, InputProps, BoxProps, TagLabelProps} from '@chakra-ui/react'

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)',
  fontWeight: 'medium',
  color: 'gray.400'
}

export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles
              }
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label': {
              ...activeLabelStyles
            },
            'input:disabled + label': {
              color: 'gray.600'
            },
            label: {
              display: 'flex',
              alignItems: 'center',
              height: '60%',
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              backgroundColor: '#282a36',
              color: '#F8F8F8',
              fontWeight: 'normal',
              pointerEvents: 'none',
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: 'left top'
            }
          }
        }
      }
    }
  }
})

interface IFloatingInputProps extends InputProps {
  wrapper?: BoxProps,
  labelProps?: TagLabelProps
}

export const FloatingInput = forwardRef<IFloatingInputProps, 'input'>(({placeholder, wrapper, labelProps, ...props}, ref) => (
  <ChakraProvider theme={theme}>
    <FormControl variant="floating" {...wrapper}>
      <Input placeholder=" " {...props} ref={ref} />
      <FormLabel {...labelProps}>{placeholder}</FormLabel>
    </FormControl>
  </ChakraProvider>
))