import { http } from "../utils/http";
import { BaseModel, BaseRes, ListModel } from "./model/base";
import {
  Entry,
  ProjectInfo,
  Member,
  MemberInfo,
  EntryTeacherInfo,
  entryTeacher,
  Achievement
} from "./model/game";

//获取团队信息
export const getAllGameInfo = (params?: object) => {
  return http.request<BaseModel<Array<Entry>>>("get", "/api/entry/all", {
    params
  });
};
//获得一个详情的参赛表信息
export const getAGameInfo = (params?: object) => {
  return http.request<BaseModel<Entry>>("get", "/api/entry/first", {
    params
  });
};

export const createEntryFormDetail = (data?: object) => {
  return http.request("post", "/api/entry/create", {
    data
  });
};

export const updateEntryFormDetail = (data?: object) => {
  return http.request<BaseRes>("post", "/api/entry/update", {
    data
  });
};
//==============参赛表的项目信息===============
//获取一个项目的详情信息
export const findProjectInfo = (params?: object) => {
  return http.request<BaseModel<ProjectInfo>>(
    "get",
    "/projectInfo/findProjectInfo",
    { params }
  );
};
//创建项目
export const createProjectInfo = (data?: object) => {
  return http.request<BaseRes>("post", "/projectInfo/createProjectInfo", {
    data
  });
};
//更新项目
export const updateProjectInfo = (data?: object) => {
  return http.request<BaseRes>("put", "/projectInfo/updateProjectInfo", {
    data
  });
};
//==============参赛表的项目信息===============
//==============参赛表===============
//更新参赛表信息
export const updateEntryForm = (data?: object) => {
  return http.request<BaseRes>("put", "/entryForm/updateEntryForm", {
    data
  });
};
//查找参赛表信息
export const findEntryForm = params => {
  return http.request<BaseModel<Entry>>("get", "/entryForm/findEntryForm", {
    params
  });
};
//==============参赛表===============
//==============参赛表成员===============
export const createEntryMember = (data?: object) => {
  return http.request<BaseRes>("post", "/entryMember/createEntryMember", {
    data
  });
};

export const deleteEntryMember = (data?: object) => {
  return http.request<BaseRes>("delete", "/entryMember/deleteEntryMember", {
    data
  });
};
export const updateEntryMember = data => {
  return http.request<BaseRes>("put", "/entryMember/updateEntryMember", {
    data
  });
};

export const findEntryMember = params => {
  return http.request<BaseModel<MemberInfo>>(
    "get",
    "/entryMember/findEntryMember",
    { params }
  );
};

export const getEntryMemberList = params => {
  return http.request<BaseModel<ListModel<Member>>>(
    "get",
    "/entryMember/getEntryMemberList",
    { params }
  );
};
//==============参赛表成员===============

//==============参赛表老师===============
export const createEntryTeacher = data => {
  return http.request<BaseRes>("post", "/entryTeacher/createEntryTeacher", {
    data
  });
};
export const deleteEntryTeacher = data => {
  return http.request<BaseRes>("delete", "/entryTeacher/deleteEntryTeacher", {
    data
  });
};
export const updateEntryTeacher = data => {
  return http.request<BaseRes>("put", "/entryTeacher/updateEntryTeacher", {
    data
  });
};
export const findEntryTeacher = params => {
  return http.request<BaseModel<EntryTeacherInfo>>(
    "get",
    "/entryTeacher/findEntryTeacher",
    { params }
  );
};
export const getEntryTeacherList = params => {
  return http.request<BaseModel<ListModel<entryTeacher>>>(
    "get",
    "/entryTeacher/getEntryTeacherList",
    { params }
  );
};

//==============参赛表老师===============

//==============成果管理===============

export const getAchievementList = params => {
  return http.request<BaseModel<ListModel<Achievement>>>(
    "get",
    "/achievement/getAchievementList",
    { params }
  );
};

export const createAchievement = data => {
  return http.request<BaseRes>("post", "/achievement/createAchievement", {
    data
  });
};
export const deleteAchievement = data => {
  return http.request<BaseRes>("delete", "/achievement/deleteAchievement", {
    data
  });
};
export const updateAchievement = data => {
  return http.request<BaseRes>("put", "/achievement/updateAchievement", {
    data
  });
};

//==============成果管理===============
