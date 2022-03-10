import { http } from "../utils/http";
import { LoginRes } from "./model/user";
import { BaseModel, BaseRes } from "./model/base";
interface userType extends Promise<any> {
  svg?: string;
  code?: number;
  info?: object;
}

// 获取验证码
export const getVerify = (): userType => {
  return http.request("get", "/captcha");
};

// 登录
export const getLogin = (data: object) => {
  return http.request<BaseModel<LoginRes>>(
    "post",
    "http://127.0.0.1:20201/users/login",
    {
      data
    }
  );
};
//注册
export const getRegister = (data: object) => {
  return http.request<BaseRes>(
    "post",
    "http://127.0.0.1:20201/users/register",
    {
      data
    }
  );
};
// 刷新token
export const refreshToken = (data: object) => {
  return http.request("post", "/refreshToken", { data });
};

// export const searchVague = (data: object) => {
//   return http.request("post", "/searchVague", { data });
// };
//获取学生详情信息
export const getStudentInfo = (params?: object) => {
  return http.request("get", "http://127.0.0.1:20201/menage/student/read", {
    params
  });
};
//修改学生详情信息
export const updateStudentInfo = (data: Object) => {
  return http.request("post", "http://127.0.0.1:20201/menage/student/update", {
    data
  });
};
