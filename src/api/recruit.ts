import { http } from "../utils/http";
import { RecruitList } from "./model/recruit";
import { ListModel, BaseModel } from "./model/base";

export const getStudentRecruitList = (params?: object) => {
  return http.request<BaseModel<ListModel<RecruitList>>>(
    "get",
    "http://127.0.0.1:8888/api/studentRecruit/getStudentRecruitList",
    {
      params
    }
  );
};
