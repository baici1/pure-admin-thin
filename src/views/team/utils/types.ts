export interface TeamInfo {
  id: number;
  create_time: string;
  update_time: string;
  name: string;
  company_id: number;
  introduction: string;
  intellectual_property: string;
  remark: string;
}

export interface CompanyInfo {
  id: number;
  create_time: string;
  update_time: string;
  name: string;
  address: string;
  introduction: string;
}

export interface Member {
  result: MemberBase[];
  total: number;
}

export interface MemberBase {
  id?: number;
  create_time: string;
  update_time: string;
  team_id: number;
  u_id: number;
  identify: number;
}
