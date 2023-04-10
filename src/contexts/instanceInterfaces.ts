export interface IInstancePrimaryData {
  id: string,
  name: string,
  status: 'RUNNING' | 'STOPPED' | 'CREATING',
  loopControl: 'OPEN' | 'CLOSED',
  gain: number,
  bias: number
}