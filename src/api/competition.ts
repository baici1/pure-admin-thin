import { http } from "../utils/http";
import { GameTreeList } from "./model/competition";
import { BaseModel } from "./model/base";
//获取团队信息
export const getComSelectList = () => {
  return http.request<BaseModel<GameTreeList>>("get", "/api/info/tree_list");
};
