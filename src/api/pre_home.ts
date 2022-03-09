import { http } from "../utils/http";

export const getComSelectList = () => {
  return http.request("get", "http://127.0.0.1:20201/page/comselectlist");
};

export function GetShowSwiper() {
  return http.request("get", "http://127.0.0.1:20201/home/swiper/getlist");
}

export function GetSpecificArticles(data?: object) {
  return http.request("post", "http://127.0.0.1:20201/home/article/search", {
    data
  });
}
export function GetCompetitionTimeList() {
  return http.request("get", "http://127.0.0.1:20201/home/game/time");
}

export function GetAArticle(data: object) {
  return http.request("post", "http://127.0.0.1:20201/page/article", { data });
}

export function GetCompetitions(data?: object) {
  return http.request("post", "http://127.0.0.1:20201/page/competitions", {
    data
  });
}
