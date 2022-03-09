import { http } from "../utils/http";
//获取团队信息
export const getAllGameInfo = (params?: object) => {
  return http.request("get", "http://127.0.0.1:20201/menage/entry/read", {
    params
  });
};

export const getAGameInfo = (params?: object) => {
  return http.request("get", "http://127.0.0.1:20201/menage/entry/Aread", {
    params
  });
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
