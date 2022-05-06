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
  return http.request<BaseModel<Array<Entry>>>(
    "get",
    "http://127.0.0.1:8888/api/entry/all",
    {
      params
    }
  );
};
//获得一个详情的参赛表信息
export const getAGameInfo = (params?: object) => {
  return http.request<BaseModel<Entry>>(
    "get",
    "http://127.0.0.1:8888/api/entry/first",
    {
      params
    }
  );
};

export const createEntryFormDetail = (data?: object) => {
  return http.request("post", "http://127.0.0.1:8888/api/entry/create", {
    data
  });
};

export const updateEntryFormDetail = (data?: object) => {
  return http.request<BaseRes>(
    "post",
    "http://127.0.0.1:8888/api/entry/update",
    {
      data
    }
  );
};
//==============参赛表的项目信息===============
//获取一个项目的详情信息
export const findProjectInfo = (params?: object) => {
  return http.request<BaseModel<ProjectInfo>>(
    "get",
    "http://127.0.0.1:8888/projectInfo/findProjectInfo",
    { params }
  );
};
//创建项目
export const createProjectInfo = (data?: object) => {
  return http.request<BaseRes>(
    "post",
    "http://127.0.0.1:8888/projectInfo/createProjectInfo",
    { data }
  );
};
//更新项目
export const updateProjectInfo = (data?: object) => {
  return http.request<BaseRes>(
    "put",
    "http://127.0.0.1:8888/projectInfo/updateProjectInfo",
    {
      data
    }
  );
};
//==============参赛表的项目信息===============
//==============参赛表===============
//更新参赛表信息
export const updateEntryForm = (data?: object) => {
  return http.request<BaseRes>(
    "put",
    "http://127.0.0.1:8888/entryForm/updateEntryForm",
    {
      data
    }
  );
};
//查找参赛表信息
export const findEntryForm = params => {
  return http.request<BaseModel<Entry>>(
    "get",
    "http://127.0.0.1:8888/entryForm/findEntryForm",
    { params }
  );
};
//==============参赛表===============
//==============参赛表成员===============
export const createEntryMember = (data?: object) => {
  return http.request<BaseRes>(
    "post",
    "http://127.0.0.1:8888/entryMember/createEntryMember",
    { data }
  );
};

export const deleteEntryMember = (data?: object) => {
  return http.request<BaseRes>(
    "delete",
    "http://127.0.0.1:8888/entryMember/deleteEntryMember",
    { data }
  );
};
export const updateEntryMember = data => {
  return http.request<BaseRes>(
    "put",
    "http://127.0.0.1:8888/entryMember/updateEntryMember",
    {
      data
    }
  );
};

export const findEntryMember = params => {
  return http.request<BaseModel<MemberInfo>>(
    "get",
    "http://127.0.0.1:8888/entryMember/findEntryMember",
    { params }
  );
};

export const getEntryMemberList = params => {
  return http.request<BaseModel<ListModel<Member>>>(
    "get",
    "http://127.0.0.1:8888/entryMember/getEntryMemberList",
    { params }
  );
};
//==============参赛表成员===============

//==============参赛表老师===============
export const createEntryTeacher = data => {
  return http.request<BaseRes>(
    "post",
    "http://127.0.0.1:8888/entryTeacher/createEntryTeacher",
    { data }
  );
};
export const deleteEntryTeacher = data => {
  return http.request<BaseRes>(
    "delete",
    "http://127.0.0.1:8888/entryTeacher/deleteEntryTeacher",
    { data }
  );
};
export const updateEntryTeacher = data => {
  return http.request<BaseRes>(
    "put",
    "http://127.0.0.1:8888/entryTeacher/updateEntryTeacher",
    {
      data
    }
  );
};
export const findEntryTeacher = params => {
  return http.request<BaseModel<EntryTeacherInfo>>(
    "get",
    "http://127.0.0.1:8888/entryTeacher/findEntryTeacher",
    { params }
  );
};
export const getEntryTeacherList = params => {
  return http.request<BaseModel<ListModel<entryTeacher>>>(
    "get",
    "http://127.0.0.1:8888/entryTeacher/getEntryTeacherList",
    { params }
  );
};

//==============参赛表老师===============

//==============成果管理===============

export const getAchievementList = params => {
  return http.request<BaseModel<ListModel<Achievement>>>(
    "get",
    "http://127.0.0.1:8888/achievement/getAchievementList",
    { params }
  );
};

export const createAchievement = data => {
  return http.request<BaseRes>(
    "post",
    "http://127.0.0.1:8888/achievement/createAchievement",
    { data }
  );
};
export const deleteAchievement = data => {
  return http.request<BaseRes>(
    "delete",
    "http://127.0.0.1:8888/achievement/deleteAchievement",
    { data }
  );
};
export const updateAchievement = data => {
  return http.request<BaseRes>(
    "put",
    "http://127.0.0.1:8888/achievement/updateAchievement",
    {
      data
    }
  );
};

//==============成果管理===============
