export interface IInstancePrimaryData {
  id: string,
  name: string,
  status: 'RUNNING' | 'STOPPED' | 'CREATING',
  malha: 'OPEN' | 'CLOSED',
  gain: number,
  bias: number
}