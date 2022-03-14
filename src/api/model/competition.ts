export interface GameTreeList {
  id: number;
  label: string;
  children: Children[];
}

export interface Children {
  label: string;
  children: Children1[];
}

export interface Children1 {
  value: number;
  label: string;
}
