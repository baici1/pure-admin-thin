export interface Entry {
  ID: number;
  CreatedAt: string;
  name: string;
  cmpId: number;
  pId: number;
  rank: number | null;
  achName: string;
  status: Status[];
  project: Project;
  competition: Competition;
}

export interface Project {
  ID: number;
  CreatedAt: string;
  projectCode: string;
  projectName: string;
  introduction: string;
  remark: string;
}

export interface Competition {
  ID: number;
  CreatedAt: string;
  cId: number;
  level: number;
  version: number;
  startTime: string;
  endTime: string;
  rStartTime: string;
  rEndTime: string;
  base_info: Base_info;
}

export interface Status {
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
