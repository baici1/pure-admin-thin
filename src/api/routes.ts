import { http } from "../utils/http";
import { MenuInfo } from "./model/menu";
import { BaseModel } from "./model/base";
export const getAsyncRoutes = (params?: object) => {
  return http.request<BaseModel<MenuInfo>>(
    "post",
    "http://127.0.0.1:8888/menu/getMenu",
    {
      params
    }
  );
};
