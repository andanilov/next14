export interface IFromState<T> {
  errors?: {
    [key in keyof T]: string // [field name]: error message
  },
  id?: number,
  data?: T,
  error?: string,
  success?: string,
}

export type TServerAction = (state: IFromState<any>, data: FormData) => Promise<IFromState<any>>
export type TServerActionCommon = (state: IFromState<any>, data: Record<string, any>) => Promise<IFromState<any>>

export interface ISearchInputFromState extends IFromState<any> {
  result?: {
    title?: string,
    value?: string,
  }[],
}
export type TServerInputAction = (state: IFromState<any>, data: string) => Promise<ISearchInputFromState>