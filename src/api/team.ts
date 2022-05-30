import { http } from "../utils/http";
import { TeamInfo, CompanyInfo, Members } from "./model/team";
import { BaseModel, BaseRes } from "./model/base";
//获取团队信息
export const getTeamInfo = (params?: object) => {
  return http.request<BaseModel<TeamInfo>>("get", "/api/team/find", {
    params
  });
};
//获得团队id
export const getTeamId = (params?: object) => {
  return http.request<BaseModel<number>>("get", "/api/member/teamid", {
    params
  });
};
//获取公司信息
export const getCompanyInfo = (params?: object) => {
  return http.request<BaseModel<CompanyInfo>>("get", "/api/company/find", {
    params
  });
};

//提交信息
export const createTeam = (data?: object) => {
  return http.request<BaseModel<number>>("post", "/api/team/create", {
    data
  });
};

export const updateTeam = (data?: object) => {
  return http.request("put", "/api/team/update", {
    data
  });
};

//创建人作为团队的队长
export const createTeamLeader = (data?: object) => {
  return http.request(
    "post",
    "http://127.0.0.1:20201/menage/teamMember/leader",
    {
      data
    }
  );
};

//删除团队
export const deleteTeam = (data?: object) => {
  return http.request("post", "http://127.0.0.1:20201/menage/teamInfo/delete", {
    data
  });
};
//删除公司
export const deleteCompany = (data?: object) => {
  return http.request("post", "http://127.0.0.1:20201/menage/company/delete", {
    data
  });
};
//获取团队用户
export const getTeamMemberAll = (params?: object) => {
  return http.request<BaseModel<Members>>("get", "/api/member/list", {
    params
  });
};

//创建公司
export const createCompany = (data?: object) => {
  return http.request<BaseModel<number>>("post", "/api/company/create", {
    data
  });
};
//修改公司
export const updateCompany = (data?: object) => {
  return http.request("put", "/api/company/update", {
    data
  });
};

//添加团队队员
export const AddTeamMember = (data?: object) => {
  return http.request<BaseRes>("post", "/api/member/create", {
    data
  });
};

//更新团队队员
export const UpdateTeamMember = (data?: object) => {
  return http.request("put", "/api/member/update", {
    data
  });
};

//删除团队队员
export const DeleteTeamMember = (data?: object) => {
  return http.request("delete", "/api/member/delete", {
    data
  });
};
