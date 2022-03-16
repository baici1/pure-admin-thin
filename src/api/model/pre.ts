export interface Swiper {
  id: number;
  create_time: string;
  update_time: string;
  swiper_name: string;
  swiper_picture: string;
  is_show: boolean;
}

export interface ArticlesList {
  records: ArticlesItem[];
  total: number;
}

export interface ArticlesItem {
  id: number;
  title: string;
  description: string;
  content: string;
  views: number;
  author: string;
  type: string;
  create_time: string;
}
