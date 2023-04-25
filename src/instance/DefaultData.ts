import {IInstanceData} from '../contexts/instanceInterfaces'

export const defaultInstanceData: IInstanceData = {
  malha: 'OPEN',
  controlTypes: {
    proportional: true,
    integral: false,
    derative: false,
    onOff: false
  },
  control: 'MANUAL',
  bias: 50,
  bp: 100,
  derivatimeTime: 0,
  integralTime: 0,
  hysteresis: 0,
  initialPV: 30,
  telemetry: {
    sp: {
      unit: 'porcentage',
      symbol: '%',
      min: 0,
      max: 100
    },
    mv: {
      unit: 'porcentage',
      symbol: '%',
      min: 0,
      max: 100
    },
    pv: {
      unit: 'porcentage',
      symbol: '%',
      min: 0,
      max: 100
    }
  }
}