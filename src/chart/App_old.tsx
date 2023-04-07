import React from 'react'
import {Flex, Text, Button, Divider, Box} from '@chakra-ui/react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'

const App = () => {
  return (
    <ResponsiveContainer width="99%" height="99%" aspect={3}>
      <LineChart
        width={1000}
        height={300}
        data={generateDataArray()}
        margin={{
          top: 20,
          right: 0,
          left: -20,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis
          ticks={[0, 25, 50, 75, 100, 125, 150, 175, 200]}
          domain={[0, 200]}
        />
        <YAxis
          ticks={[0, 20, 40, 60, 80, 100]}
          domain={[0, 100]}
        />
        <Tooltip
          content={<CustomTooltip />}
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
            }
          ]}
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
          dataKey="cv"
          stroke="#2CD46D"
          strokeWidth={2}
          isAnimationActive={false}
          dot={false}
          limitingConeAngle={90}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

const generateDataArray = () => {
  const data = []
  for (let i = 1; i <= 201; i++) {
    if (i < 50) {
      data.push({
        sp: 50,
        mv: 20,
        cv: 10
      })
    }
    if (i >= 50) {
      data.push({
        sp: 70,
        mv: 40,
        cv: 20
      })
    }
  }
  return data
}

export const CustomTooltip: React.FC<any> = ({active, payload, label}) => {
  if (active && payload && payload.length) {
    return (
      <Flex
        className="custom-tooltip"
        bg="#FAFAFA"
        borderRadius="md"
        border="1px solid #C4C4C4 !important"
        outline="none"
        flexDirection="column"
      >
        <Text
          color="#666"
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
        </Box>
      </Flex>
    )
  }

  return null
}

export default App