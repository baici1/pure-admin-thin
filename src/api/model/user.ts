//定义一些response的types
export interface UserInfo {
  id: number;
  phone: string;
  salt: number;
}

export interface LoginRes {
  user: StudentInfo | TeacherInfo;
  token: string;
  expiresAt: number;
}

export interface StudentInfo {
  ID: number;
  CreatedAt: string;
  studentId: string;
  phone: string;
  password: string;
  authorityId: string;
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
  authority?: Authority;
  lists?: Array<string>;
}
export interface ReteacherInfo {
  reteacherInfo: TeacherInfo;
}

export interface TeacherInfo {
  ID: number;
  CreatedAt: string;
  personnelId: string;
  officeId: string;
  financialId: string;
  phone: string;
  password: string;
  authorityId: string;
  nickname: string;
  email: string;
  avatar: string;
  realName: string;
  gender: null;
  department: string;
  major: string;
  position: string;
  specialty: string;
  degree: string;
  bankName: string;
  bankCardNumber: string;
  introduction: string;
  authority?: Authority;
  lists?: Array<string>;
}

export interface Authority {
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt?: string;
  authorityId: string;
  authorityName: string;
  parentId: string;
  dataAuthorityId?: string;
  children?: Array<Authority>;
  menus?: Array<string>;
  defaultRouter: string;
}

export interface RestudentInfo {
  restudentInfo: StudentInfo;
}

export interface Captcha {
  captchaId: string;
  picPath: string;
  captchaLength: number;
}
