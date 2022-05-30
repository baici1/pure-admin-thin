import { http } from "../utils/http";
import {
  swiper,
  ArticlesItem,
  TimeList,
  Page,
  CompetitionItem
} from "./model/pre";
import { BaseModel, ListModel } from "./model/base";

export function GetShowSwiper(params?: object) {
  return http.request<BaseModel<ListModel<swiper>>>(
    "get",
    "/swiper/getSwiperList",
    {
      params
    }
  );
}

export function GetSpecificArticles(params?: object) {
  return http.request<BaseModel<ListModel<ArticlesItem>>>(
    "get",
    "/api/article/getArticleList",
    {
      params
    }
  );
}
export function GetCompetitionTimeList(params?: object) {
  return http.request<BaseModel<ListModel<TimeList>>>(
    "get",
    "/api/sche/getList",
    {
      params
    }
  );
}

export function GetAArticle(params?: object) {
  return http.request<BaseModel<Page>>("get", "/api/article/findArticle", {
    params
  });
}

export function GetCompetitions(params?: object) {
  return http.request<BaseModel<ListModel<CompetitionItem>>>(
    "get",
    "/api/sche/getList",
    {
      params
    }
  );
}

export function GetSearchArticlesByEs(params?: object) {
  return http.request<BaseModel<ListModel<ArticlesItem>>>(
    "get",
    "/api/article/matchArticle",
    {
      params
    }
  );
}
