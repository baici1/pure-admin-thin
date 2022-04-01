import { http } from "../utils/http";
import { BaseModel } from "./model/base";
import { Dictionary } from "./model/dictionary";

//获取字典信息
export const findSysDictionary = (params?: object) => {
  return http.request<BaseModel<Dictionary>>(
    "get",
    "http://127.0.0.1:8888/sysDictionary/findSysDictionary",
    {
      params
    }
  );
};
