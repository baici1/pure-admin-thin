export interface Dictionary {
  resysDictionary: ResysDictionary;
}

export interface ResysDictionary {
  ID: number;
  CreatedAt: string;
  name: string;
  type: string;
  status: boolean;
  desc: string;
  sysDictionaryDetails: SysDictionaryDetails[];
}

export interface SysDictionaryDetails {
  ID: number;
  CreatedAt: string;
  label: string;
  value: number;
  status: boolean;
  sort: number;
  sysDictionaryID: number;
}
