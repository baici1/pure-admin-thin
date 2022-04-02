export interface TeamInfo {
  reteamInfo: ReteamInfo;
}

export interface ReteamInfo {
  ID: number;
  CreatedAt: string;
  name: string;
  companyId: number;
  introduction: string;
  intellectualProperty: string;
  remark: string;
  check: number;
}

export interface CompanyInfo {
  recompanyInfo: RecompanyInfo;
}

export interface RecompanyInfo {
  ID: number;
  CreatedAt: string;
  name: string;
  address: string;
  introduction: string;
  check: number;
}

export interface Members {
  list: List[];
  total: number;
  page: number;
  pageSize: number;
}

export interface List {
  ID: number;
  CreatedAt?: string;
  teamId: number;
  uId: number;
  identify: number;
  phone?: string;
  name?: string;
}
