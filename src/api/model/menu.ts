export interface MenuInfo {
  menus: Root[];
}

// export interface Menus {
//   ID: number;
//   CreatedAt: string;
//   parentId: string;
//   path: string;
//   name: string;
//   hidden: boolean;
//   component: string;
//   sort: number;
//   meta: Meta;
//   authoritys: null;
//   menuBtn: null;
//   menuId: string;
//   children: Children[];
//   parameters: any[];
//   btns: null;
//   redirect?: string;
// }

// export interface Children {
//   ID: number;
//   CreatedAt: string;
//   parentId: string;
//   path: string;
//   name: string;
//   hidden: boolean;
//   component: string;
//   sort: number;
//   meta: Meta;
//   authoritys: null;
//   menuBtn: null;
//   menuId: string;
//   children: null;
//   parameters: any[];
//   btns: null;
// }

// export interface Meta {
//   keepAlive: boolean;
//   defaultMenu: boolean;
//   title: string;
//   icon: string;
//   closeTab: boolean;
// }

export interface Root {
  path: string;
  redirect?: string;
  meta: Meta;
  children: Children[];
}

export interface Meta {
  title: string;
  icon: string;
  i18n: boolean;
  rank?: number;
  authority?: any[];
}

export interface Children {
  path: string;
  name: string;
  meta: Meta;
}
