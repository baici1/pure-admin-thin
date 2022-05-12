import { Competition } from "./game";
import { StudentInfo } from "./user";

export interface RecruitInfo {
  restudentRecruit: RecruitList;
}

export interface RecruitList {
  ID: number;
  CreatedAt?: string;
  title: string;
  comId: number;
  entryId: number;
  uId: number;
  introduce: string;
  num: number;
  need: string;
  competition: Competition;
  member: StudentInfo;
}
