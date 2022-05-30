import { http } from "../utils/http";
import { BaseModel } from "./model/base";
import { Dictionary } from "./model/dictionary";

//获取字典信息
export const findSysDictionary = (params?: object) => {
  return http.request<BaseModel<Dictionary>>(
    "get",
    "/api/sysDictionary/findSysDictionary",
    {
      params
    }
  );
};
