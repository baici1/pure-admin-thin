//定义一些response的types
export interface UserInfo {
  id: number;
  phone: string;
  salt: number;
}

export interface LoginRes {
  accessToken: string;
  expires: number;
  user: UserInfo;
}

export interface StudentsBaseInfo {
  phone: string;
  real_name: string;
}

export interface StudentInfo {
  id: number;
  student_id: string;
  u_id: number;
  nickname: string;
  email: string;
  avatar: string;
  real_name: string;
  gender: number;
  degree: string;
  grade: string;
  department: string;
  major: string;
  class_num: string;
  specialty: string;
  QQ: string;
  wechat: string;
  bank_name: string;
  bank_card_number: string;
  introduction: string;
}
