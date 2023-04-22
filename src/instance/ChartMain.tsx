import React, {useState, useEffect} from 'react'
import {ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line} from 'recharts'
import {Flex, Box, Divider, Text} from '@chakra-ui/react'

const ChartMain: React.FunctionComponent = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    let timer = 0
    let counter: NodeJS.Timeout
    const loop = () => {
      counter = setTimeout(() => {
        if (timer < 200) {
          setData(old => ([
            ...old,
            {
              time: timer,
              sp: 30,
              mv: 20,
              cv: 10,
              error: 5
            }
          ]))
          timer = timer + 1
          loop()
        } else {
          timer = 0
          setData([])
          loop()
        }
      }, 1000)
    }

    loop()

    return () => {
      clearTimeout(counter)
    }
  }, [])

  return (
    <Flex
      w="100%"
      h="100%"
      overflow="hidden"
      flexDir="column"
    >
      <Flex
        className="chart-top"
        w="100%"
        h="calc(100% - 130px)"
      >
        <Flex
          className="chart-container"
          w="calc(100% - 200px)"
          h="100%"
        >
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{
                top: 30,
                right: 30,
                left: 0,
                bottom: 20
              }}
            >
              <CartesianGrid strokeDasharray="1 1" />
              <XAxis
                type="number"
                dataKey="time"
                ticks={[0, 25, 50, 75, 100, 125, 150, 175, 200]}
                domain={[0, 200]}
                tickFormatter={(tick) => tick.toString() + 's'}
                interval="preserveStartEnd"
              />
              <YAxis
                ticks={[0, 20, 40, 60, 80, 100]}
                domain={[0, 100]}
                tickFormatter={(tick) => tick.toString() + '%'}
                allowDataOverflow={true}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={data.length > 0}
              />
              <Legend
                payload={[
                  {
                    id: 'sp',
                    type: 'square',
                    value: 'Setpoint',
                    color: '#832286'
                  },
                  {
                    id: 'mv',
                    type: 'square',
                    value: 'Variável manipulada',
                    color: '#00aaaa'
                  },
                  {
                    id: 'cv',
                    type: 'square',
                    value: 'Variável controlada',
                    color: '#2CD46D'
                  },
                  {
                    id: 'error',
                    type: 'square',
                    value: 'Desvio',
                    color: '#E2382C'
                  }
                ]}
              />
              <Line
                type="linear"
                dataKey="error"
                stroke="#E2382C"
                strokeWidth={2}
                isAnimationActive={false}
                dot={false}
                limitingConeAngle={90}
              />
              <Line
                type="linear"
                dataKey="cv"
                stroke="#2CD46D"
                strokeWidth={2}
                isAnimationActive={false}
                dot={false}
                limitingConeAngle={90}
              />
              <Line
                type="linear"
                dataKey="mv"
                stroke="#00aaaa"
                strokeWidth={2}
                isAnimationActive={false}
                dot={false}
                limitingConeAngle={90}
              />
              <Line
                type="linear"
                dataKey="sp"
                stroke="#832286"
                strokeWidth={2}
                isAnimationActive={false}
                dot={false}
                alignmentBaseline="middle"

              />
            </LineChart>
          </ResponsiveContainer>
        </Flex>
        <Flex
          className="chart-legend"
          w="200px"
          h="100%"
          bg="#262833"
        >

        </Flex>
      </Flex>
      <Flex
        className="chart-bottom"
        w="100%"
        h="130px"
        bg="#262833"
      >

      </Flex>
    </Flex>
  )
}

const CustomTooltip: React.FC<any> = ({active, payload, label}) => {
  if (active && payload && payload.length) {
    return (
      <Flex
        className="custom-tooltip"
        bg="#4b4c56"
        borderRadius="md"
        border="1px solid #C4C4C4 !important"
        outline="none"
        flexDirection="column"
      >
        <Text
          color="#E9E9E9"
          fontWeight="700"
          fontSize="16px"
          padding="8px 12px 8px 12px"
        >
          {label} segundos
        </Text>
        <Divider />
        <Box padding="8px 12px 8px 12px">
          <Text>
            Setpoint: {payload[0].value}
          </Text>
          <Text>
            Variável manipulada: {payload[1].value}
          </Text>
          <Text>
            Variável controlada: {payload[2].value}
          </Text>
          <Text>
            Desvio: {payload[3].value}
          </Text>
        </Box>
      </Flex>
    )
  }

  return null
}

export {ChartMain}