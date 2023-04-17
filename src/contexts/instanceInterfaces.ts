export type InstanceStatus = 'RUNNING' | 'STOPPED' | 'CREATING'

export interface IInstanceHeaderData {
  id: string,
  name: string,
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
  control: 'MANUAL' | 'AUTOMATIC',
  bias: number,
  bp: number,
  derivatimeTime: number,
  integralTime: number,
  integralVC: number,
  initial: {
    sp: number,
    pv: number,
    mv: number
  },
  telemetry: {
    sp: ITelemetry,
    pv: ITelemetry,
    mv: ITelemetry
  }
}