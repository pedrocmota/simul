export interface IInstanceHeaderData {
  id: string,
  name: string,
  status: 'RUNNING' | 'STOPPED' | 'CREATING'
}