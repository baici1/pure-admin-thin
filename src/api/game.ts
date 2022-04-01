import { http } from "../utils/http";
import { BaseModel, BaseRes } from "./model/base";
import { Entry } from "./model/game";
//获取团队信息
export const getAllGameInfo = (params?: object) => {
  return http.request<BaseModel<Array<Entry>>>(
    "get",
    "http://127.0.0.1:8888/api/entry/all",
    {
      params
    }
  );
};
//获得一个详情的参赛表信息
export const getAGameInfo = (params?: object) => {
  return http.request<BaseModel<Entry>>(
    "get",
    "http://127.0.0.1:8888/api/entry/first",
    {
      params
    }
  );
};

export const createEntryFormDetail = (data?: object) => {
  return http.request("post", "http://127.0.0.1:8888/api/entry/create", {
    data
  });
};

export const updateEntryFormDetail = (data?: object) => {
  return http.request<BaseRes>(
    "post",
    "http://127.0.0.1:8888/api/entry/update",
    {
      data
    }
  );
};
