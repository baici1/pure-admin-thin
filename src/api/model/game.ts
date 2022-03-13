export interface EntryDetail {
  form: Form;
  project: Project;
  members: Members;
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
  project_code: string;
  project_name: string;
  introduction: string;
  remark: string;
}

export interface Members {
  form_id: number;
  u_id: number;
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
  c_type: string;
  organizer: string;
  introduction: string;
  url: string;
}
