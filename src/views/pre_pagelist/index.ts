import { GetSpecificArticles } from "/@/api/pre_home";
import { ArticlesItem } from "/@/api/model/pre";
import { ref } from "vue";
import { getDictFunc } from "/@/utils/format";
interface param {
  page: number;
  pageSize: number;
  type: number;
}
export const total = ref(0);
export const articles = ref([] as ArticlesItem[]);
export const show = ref(true);
export const artparam = ref({
  page: 1,
  pageSize: 10,
  type: 0
} as param);
export const get_specific_articles = async () => {
  // 发起请求
  const data = await GetSpecificArticles(artparam.value);
  console.log(
    "%c 🍨 res: ",
    "font-size:20px;background-color: #6EC1C2;color:#fff;",
    data
  );
  articles.value = data.data.list;
  total.value = data.data.total;
  show.value = false;
};

//获取字典信息
export const articleTypeOptions = ref([]);
// 获取需要的字典 可能为空 按需保留
export const setOptions = async () => {
  articleTypeOptions.value = await getDictFunc("articleType");
};
