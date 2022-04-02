export interface TeamInfoRe {
  name: string;
  introduction: string;
  intellectualProperty: string;
  check?: number;
  companyId?: number;
}

export interface CompanyInfoRe {
  name: string;
  introduction: string;
  address: string;
}

export interface MemberRe {
  phone?: string;
  identify: number;
  teamId?: number;
}
