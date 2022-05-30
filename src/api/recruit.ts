import { http } from "../utils/http";
import { RecruitList, RecruitInfo } from "./model/recruit";
import { ListModel, BaseModel, BaseRes } from "./model/base";

export const getStudentRecruitList = (params?: object) => {
  return http.request<BaseModel<ListModel<RecruitList>>>(
    "get",
    "/api/studentRecruit/getStudentRecruitList",
    {
      params
    }
  );
};

export const findStudentRecruitInfo = (params?: object) => {
  return http.request<BaseModel<RecruitInfo>>(
    "get",
    "/api/studentRecruit/findStudentRecruit",
    {
      params
    }
  );
};

export const SendStudentRecruitByUser = (data?: object) => {
  return http.request<BaseRes>("post", "/api/studentRecruit/send", { data });
};

export const createStudentRecruit = (data?: object) => {
  return http.request<BaseRes>("post", "/studentRecruit/createStudentRecruit", {
    data
  });
};

export const deleteStudentRecruit = (data?: object) => {
  return http.request<BaseRes>(
    "delete",
    "/studentRecruit/deleteStudentRecruit",
    { data }
  );
};
export const deleteStudentRecruitByIds = data => {
  return http.request<BaseRes>(
    "delete",
    "/studentRecruit/deleteStudentRecruitByIds",
    { data }
  );
};
export const updateStudentRecruit = data => {
  return http.request<BaseRes>("put", "/studentRecruit/updateStudentRecruit", {
    data
  });
};
