export interface swiper {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  swiperName: string;
  swiperPicture: string;
  isShow: boolean;
  group: number;
  goToUrl: string;
}

export interface ArticlesItem {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  commentabled: boolean;
  published: boolean;
  publishedTime: string;
  title: string;
  description: string;
  content: string;
  views: number;
  author: string;
  type: number;
  orderNum: boolean;
}

export interface TimeList {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  cId: number;
  level: number;
  version: number;
  startTime: string;
  endTime: string;
  rStartTime: string;
  rEndTime: string;
  base_info: Base_info;
}

export interface Base_info {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  cName: string;
  cType: number;
  organizer: string;
  introduction: string;
  url: string;
}

export interface Page {
  rearticle: ArticlesItem;
}

export interface CompetitionItem {
  ID: number;
  CreatedAt: string;
  cId: number;
  level: number;
  version: number;
  startTime: string;
  endTime: string;
  rStartTime: string;
  rEndTime: string;
  base_info: Base_info;
}

export interface Base_info {
  ID: number;
  CreatedAt: string;
  cName: string;
  cType: number;
  organizer: string;
  introduction: string;
  url: string;
}
