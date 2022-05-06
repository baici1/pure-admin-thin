import { File } from "./file";
export interface Entry {
  ID: number;
  CreatedAt: string;
  name: string;
  cmpId: number;
  pId: number;
  competition: Competition;
  project?: Project;
  Members?: Member;
}

export interface ProjectInfo {
  reprojectInfo: Project;
}

export interface Project {
  ID: number;
  CreatedAt?: string;
  projectCode: string;
  projectName: string;
  introduction: string;
  remark: string;
  url?: "";
}

export interface Competition {
  ID: number;
  CreatedAt: string;
  cId: number;
  version: number;
  startTime: string;
  endTime: string;
  year: number;
  publish?: boolean;
  base_info: Base_info;
}

export interface MemberInfo {
  reentryMember: Member;
}
export interface Member {
  ID: number;
  CreatedAt?: string;
  formId: number;
  uId: number;
  identify: number;
  order?: number;
  phone?: string;
  name?: string;
}

export interface Base_info {
  ID: number;
  CreatedAt: string;
  cName: string;
  cType: number;
  organizer: string;
  introduction: string;
  url: string;
}

export interface EntryTeacherInfo {
  reentryTeacher: entryTeacher;
}

export interface entryTeacher {
  ID: number;
  CreatedAt?: string;
  formId: number;
  tId: number;
  order: number;
  phone?: string;
  email?: string;
  gender?: null;
  major?: string;
  realName?: string;
}

export interface Achievement {
  ID?: number;
  CreatedAt?: string;
  formId: number;
  match: number;
  rank: number;
  remark: string;
  urlId: number;
  url?: string;
  check: boolean;
  file?: File;
}
