export interface IMessage<T> {
    status: number,
    message: string
    data?: T
  }

  export class Message<T>{
    message(info: IMessage<T>): IMessage<T> {
      return { ...info }
    }
  }