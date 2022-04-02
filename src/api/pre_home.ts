import { http } from "../utils/http";
import {
  swiper,
  ArticlesItem,
  TimeList,
  PageDetail,
  CompetitionItem
} from "./model/pre";
import { BaseModel, ListModel } from "./model/base";

export function GetShowSwiper(params?: object) {
  return http.request<BaseModel<ListModel<swiper>>>(
    "get",
    "http://127.0.0.1:8888/swiper/getSwiperList",
    {
      params
    }
  );
}

export function GetSpecificArticles(params?: object) {
  return http.request<BaseModel<ListModel<ArticlesItem>>>(
    "get",
    "http://127.0.0.1:8888/api/article/getArticleList",
    {
      params
    }
  );
}
export function GetCompetitionTimeList(params?: object) {
  return http.request<BaseModel<ListModel<TimeList>>>(
    "get",
    "http://127.0.0.1:8888/api/sche/getList",
    {
      params
    }
  );
}

export function GetAArticle(data: object) {
  return http.request<BaseModel<PageDetail>>(
    "post",
    "http://127.0.0.1:20201/page/article",
    { data }
  );
}

export function GetCompetitions(params?: object) {
  return http.request<BaseModel<ListModel<CompetitionItem>>>(
    "get",
    "http://127.0.0.1:8888/api/sche/getList",
    {
      params
    }
  );
}
