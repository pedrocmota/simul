import {IInstanceData} from '../contexts/instanceInterfaces'

export const defaultInstanceData: IInstanceData = {
  malha: 'OPEN',
  control: 'MANUAL',
  bias: 50,
  bp: 100,
  derivatimeTime: 0,
  integralTime: 0,
  initial: {
    pv: 50,
    mv: 50
  },
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