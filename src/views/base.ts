export interface UserInfo {
  id: number;
  phone: string;
  salt: number;
}

export interface MembersRequest {
  name?: string;
  phone: string;
  identify: number;
  u_id: number;
}
