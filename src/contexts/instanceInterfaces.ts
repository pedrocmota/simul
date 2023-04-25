export type InstanceStatus = 'RUNNING' | 'STOPPED' | 'CREATING'

export interface IInstanceHeaderData {
  position: number,
  id: string,
  title: string,
  status: InstanceStatus
}

export interface ITelemetry {
  unit: string,
  symbol: string,
  min: number,
  max: number
}

export interface IInstanceData {
  malha: 'OPEN' | 'CLOSED',
  controlTypes: {
    proportional: boolean,
    integral: boolean,
    derative: boolean,
    onOff: boolean
  },
  control: 'MANUAL' | 'AUTOMATIC',
  bias: number,
  bp: number,
  derivatimeTime: number,
  integralTime: number,
  hysteresis: number,
  initialPV: number,
  telemetry: {
    sp: ITelemetry,
    pv: ITelemetry,
    mv: ITelemetry
  }
}