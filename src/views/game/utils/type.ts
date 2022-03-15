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
  cmp_id: number;
  p_id: number;
  rank: string;
  ach_name: string;
  status: number;
}

export interface Project {
  id: number;
  project_code?: string;
  project_name: string;
  introduction?: string;
  remark?: string;
}

export interface Members {
  form_id?: number;
  u_id?: number;
  identify: number;
  order: number;
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
  name?: string;
  phone: string;
  identify: number;
  u_id: number;
}

export interface EntryInfo {
  members: {
    phone: string;
    identify: number;
  };
  cmp_id: number;
  project_name: string;
  introduction: string;
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
