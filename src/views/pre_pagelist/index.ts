import { GetSpecificArticles } from "/@/api/pre_home";
import { ArticlesItem } from "/@/api/model/pre";
import { ref } from "vue";
interface param {
  page: number;
  limit: number;
  type: string;
}
export const total = ref(0);
export const articles = ref([] as ArticlesItem[]);
export const show = ref(true);
export const artparam = ref({
  page: 1,
  limit: 10,
  type: ""
} as param);
export const get_specific_articles = async () => {
  // 发起请求
  const data = await GetSpecificArticles(artparam.value);
  console.log(
    "%c 🍨 res: ",
    "font-size:20px;background-color: #6EC1C2;color:#fff;",
    data
  );
  articles.value = data.data.records;
  total.value = data.data.total;
  show.value = false;
};
