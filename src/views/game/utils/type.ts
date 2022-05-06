export interface EntryAll {
  form: Form;
  project: Project;
  members: Members;
  competition: Competition;
}
export interface EntryOne {
  form: Form;
  project: Project;
  members?: Array<Members>;
  competition: Competition;
}

export interface Form {
  id: number;
  name: string;
  cmpId: number;
  pId: number;
  rank: string;
  achName: string;
  project?: Project;
  members: MembersRequest[];
}

export interface Project {
  id: number;
  project_code?: string;
  project_name: string;
  introduction?: string;
  remark?: string;
}

export interface Members {
  id?: number;
  name?: string;
  phone: string;
  identify: number;
  uId: number;
  formId: number;
}

export interface Competition {
  com_sche: Com_sche;
  com_info: Com_info;
}

export interface Com_sche {
  id: number;
  c_id: number;
  level: string;
  version: string;
  start_time: string;
  end_time: string;
  r_start_time: string;
  r_end_time: string;
}

export interface Com_info {
  id: number;
  c_name: string;
  c_type?: string;
  organizer?: string;
  introduction?: string;
  url?: string;
}

export interface MembersRequest {
  id?: number;
  name?: string;
  phone: string;
  identify: number;
  uId: number;
  formId: number;
}

export interface EntryInfo {
  name: string;
  status: {
    uId: number;
    identify: number;
  };
  cmpId: number;
}

export interface GameTreeList {
  id: number;
  label: string;
  children: Children[];
}

export interface Children {
  label: string;
  children: Children1[];
}

export interface Children1 {
  value: number;
  label: string;
}

export interface entryReq {
  id: number;
  members: Array<MembersRequest>;
  p_id?: number;
  project_name?: string;
  introduction?: string;
}
