import { http } from "../utils/http";
import { RecruitList, RecruitInfo } from "./model/recruit";
import { ListModel, BaseModel, BaseRes } from "./model/base";

export const getStudentRecruitList = (params?: object) => {
  return http.request<BaseModel<ListModel<RecruitList>>>(
    "get",
    "http://127.0.0.1:8888/api/studentRecruit/getStudentRecruitList",
    {
      params
    }
  );
};

export const findStudentRecruitInfo = (params?: object) => {
  return http.request<BaseModel<RecruitInfo>>(
    "get",
    "http://127.0.0.1:8888/api/studentRecruit/findStudentRecruit",
    {
      params
    }
  );
};

export const SendStudentRecruitByUser = (data?: object) => {
  return http.request<BaseRes>(
    "post",
    "http://127.0.0.1:8888/api/studentRecruit/send",
    { data }
  );
};
