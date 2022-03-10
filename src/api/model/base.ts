//一些基础类型
export class BaseModel<T> {
  code: Number;
  msg: String;
  data?: T | any;
}

export interface BaseRes {
  code: Number;
  msg: String;
}
