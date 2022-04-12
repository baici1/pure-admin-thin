export interface UserBaseInfo {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  phone: string;
  authority: Authority;
}

export interface Authority {
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null;
  authorityId: string;
  authorityName: string;
  parentId: string;
  dataAuthorityId: null;
  children: null;
  menus: null;
  defaultRouter: string;
}

export interface MembersRequest {
  id?: number;
  name?: string;
  phone: string;
  identify: number;
  uId: number;
  formId: number;
}
