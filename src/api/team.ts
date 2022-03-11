import { http } from "../utils/http";
import { TeamInfo, CompanyInfo, Member } from "./model/team";
import { BaseModel } from "./model/base";
//获取团队信息
export const getTeamInfo = (params?: object) => {
  return http.request<BaseModel<TeamInfo>>(
    "get",
    "http://127.0.0.1:20201/menage/teamInfo/read",
    {
      params
    }
  );
};
//获得团队id
export const getTeamId = (params?: object) => {
  return http.request<BaseModel<number>>(
    "get",
    "http://127.0.0.1:20201/menage/teamMember/teamid",
    {
      params
    }
  );
};
//获取公司信息
export const getCompanyInfo = (params?: object) => {
  return http.request<BaseModel<CompanyInfo>>(
    "get",
    "http://127.0.0.1:20201/menage/company/read",
    {
      params
    }
  );
};

//提交信息 true是创建 false是修改
export const commitTeam = (data?: object, flagTeam?: boolean) => {
  if (flagTeam) {
    return http.request(
      "post",
      "http://127.0.0.1:20201/menage/teamInfo/create",
      {
        data
      }
    );
  } else {
    return http.request(
      "post",
      "http://127.0.0.1:20201/menage/teamInfo/update",
      {
        data
      }
    );
  }
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
  return http.request<BaseModel<Member>>(
    "get",
    "http://127.0.0.1:20201/menage/teamMember/all",
    {
      params
    }
  );
};
