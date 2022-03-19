import { http } from "../utils/http";
import {
  Swiper,
  ArticlesItem,
  TimeList,
  PageDetail,
  CompetitionItem
} from "./model/pre";
import { BaseModel, List } from "./model/base";

export const getComSelectList = () => {
  return http.request("get", "http://127.0.0.1:20201/page/comselectlist");
};

export function GetShowSwiper() {
  return http.request<BaseModel<Array<Swiper>>>(
    "get",
    "http://127.0.0.1:20201/home/swiper/getlist"
  );
}

export function GetSpecificArticles(data?: object) {
  return http.request<BaseModel<List<ArticlesItem>>>(
    "post",
    "http://127.0.0.1:20201/home/article/search",
    {
      data
    }
  );
}
export function GetCompetitionTimeList() {
  return http.request<BaseModel<Array<TimeList>>>(
    "get",
    "http://127.0.0.1:20201/home/game/time"
  );
}

export function GetAArticle(data: object) {
  return http.request<BaseModel<PageDetail>>(
    "post",
    "http://127.0.0.1:20201/page/article",
    { data }
  );
}

export function GetCompetitions(data?: object) {
  return http.request<BaseModel<List<CompetitionItem>>>(
    "post",
    "http://127.0.0.1:20201/page/competitions",
    {
      data
    }
  );
}
