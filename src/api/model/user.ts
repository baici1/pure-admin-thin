//定义一些response的types
export interface UserInfo {
  id: Number;
  phone: String;
  salt: Number;
}

export interface LoginRes {
  accessToken: String;
  expires: Number;
  user: UserInfo;
}
