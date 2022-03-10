//一些基础类型
export class BaseModel<T> {
  code: number;
  msg: string;
  data?: T;
}

export interface BaseRes {
  code: number;
  msg: string;
}
