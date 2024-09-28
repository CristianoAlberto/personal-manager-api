import { IMessage } from "./message"

export interface IPagination<T> {
  size: number,
  perpage: number
  pages?: number
  data: IMessage<T[]>
}

export class Pagination<T>{
  pagination({ size, perpage, data }: IPagination<T>): IPagination<T> {
    const pages = Number((Number(data.data?.length) / size).toFixed()) || 0
    data.data = data.data?.slice((perpage - 1) * (size || 10), perpage * (size || 10))
    return {
      size,
      perpage,
      pages,
      data
    }
  }
}