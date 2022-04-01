//定义一些response的types
export interface UserInfo {
  id: number;
  phone: string;
  salt: number;
}

export interface LoginRes {
  user: UserBaseInfo;
  token: string;
  expiresAt: number;
}

export interface UserBaseInfo {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  password: string;
  phone: string;
  slat: string;
  identity: number;
  check: number;
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
export interface StudentsBaseInfo {
  phone: string;
  real_name: string;
}

export interface RestudentInfo {
  restudentInfo: StudentInfo;
}
export interface StudentInfo {
  ID: number;
  CreatedAt: string;
  studentId: string;
  uId: number;
  nickname: string;
  email: string;
  avatar: string;
  realName: string;
  gender: number;
  degree: string;
  grade: string;
  department: string;
  major: string;
  classNum: string;
  specialty: string;
  QQ: string;
  wechat: string;
  bankName: string;
  bankCardNumber: string;
  introduction: string;
  lists?: Array<string>;
}

export interface Captcha {
  captchaId: string;
  picPath: string;
  captchaLength: number;
}
