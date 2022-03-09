import { http } from "../utils/http";
//获取团队信息
export const getComSelectList = () => {
  return http.request("get", "http://127.0.0.1:20201/page/comselectlist");
};
