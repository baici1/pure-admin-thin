import { http } from "../utils/http";
import {
  LoginRes,
  RestudentInfo,
  StudentsBaseInfo,
  Captcha
} from "./model/user";
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

// @Summary 获取验证码
// @Produce  application/json
// @Param data body {username:"string",password:"string"}
// @Router /base/captcha [post]
export const captcha = data => {
  return http.request<BaseModel<Captcha>>(
    "post",
    "http://127.0.0.1:8888/base/captcha",
    {
      data
    }
  );
};

// 登录
export const getLogin = (data: object) => {
  return http.request<BaseModel<LoginRes>>(
    "post",
    "http://127.0.0.1:8888/user/login",
    {
      data
    }
  );
};
//注册
export const getRegister = (data: object) => {
  return http.request<BaseRes>("post", "http://127.0.0.1:8888/user/register", {
    data
  });
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
  return http.request<BaseModel<RestudentInfo>>(
    "get",
    "http://127.0.0.1:8888/api/student/findStudentInfo",
    {
      params
    }
  );
};
//修改学生详情信息
export const updateStudentInfo = (data: Object) => {
  return http.request(
    "put",
    "http://127.0.0.1:8888/api/student/updateStudentInfo",
    {
      data
    }
  );
};

export const ReadStudentsBaseInfo = (params: Object) => {
  return http.request<BaseModel<StudentsBaseInfo>>(
    "get",
    "http://127.0.0.1:20201/menage/student/base",
    {
      params
    }
  );
};

// @Tags jwt
// @Summary jwt加入黑名单
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Success 200 {string} string "{"success":true,"data":{},"msg":"拉黑成功"}"
// @Router /jwt/jsonInBlacklist [post]
export const jsonInBlacklist = () => {
  return http.request<BaseRes>(
    "post",
    "http://127.0.0.1:8888/jwt/jsonInBlacklist"
  );
};
