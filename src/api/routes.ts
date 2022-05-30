import { http } from "../utils/http";
import { MenuInfo } from "./model/menu";
import { BaseModel } from "./model/base";
export const getAsyncRoutes = (params?: object) => {
  return http.request<BaseModel<MenuInfo>>("post", "/menu/getMenu", {
    params
  });
};
