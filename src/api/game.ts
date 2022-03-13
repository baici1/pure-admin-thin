import { http } from "../utils/http";
import { BaseModel } from "./model/base";
import { EntryDetail } from "./model/game";
//获取团队信息
export const getAllGameInfo = (params?: object) => {
  return http.request<BaseModel<Array<EntryDetail>>>(
    "get",
    "http://127.0.0.1:20201/menage/entry/read",
    {
      params
    }
  );
};
//获得一个详情的参赛表信息
export const getAGameInfo = (params?: object) => {
  return http.request<BaseModel<EntryDetail>>(
    "get",
    "http://127.0.0.1:20201/menage/entry/Aread",
    {
      params
    }
  );
};

export const getEntryFormDetail = (params?: object) => {
  return http.request("get", "http://127.0.0.1:20201/menage/entry/form/read", {
    params
  });
};

export const createEntryFormDetail = (data?: object) => {
  return http.request(
    "post",
    "http://127.0.0.1:20201/menage/entry/form/create",
    {
      data
    }
  );
};

export const updateEntryFormDetail = (data?: object) => {
  return http.request(
    "post",
    "http://127.0.0.1:20201/menage/entry/form/update",
    {
      data
    }
  );
};
