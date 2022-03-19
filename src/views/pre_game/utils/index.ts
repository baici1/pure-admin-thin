import { ref } from "vue";
import { GetCompetitions } from "/@/api/pre_home";
import { ElMessage } from "element-plus";
import { CompetitionItem } from "/@/api/model/pre";
interface param {
  page: number;
  limit: number;
  status: number;
  search: string;
}
// 获取文章列表
export const comParams = ref({
  page: 1,
  limit: 1,
  status: 0,
  search: ""
} as param);
//搜索
export const getSearchStr = search => {
  comParams.value.search = search;
  get_competition(true);
};

export const competition = ref([] as CompetitionItem[]);
export const loading = ref(false);
export const isMore = ref(true);
//获取比赛信息
export const get_competition = async (flag?: Boolean) => {
  try {
    isMore.value = true;
    loading.value = true;
    const data = await GetCompetitions(comParams.value);
    competition.value.push(...data.data.records);
    // 判断当前菜单是否发生变化
    if (flag) {
      competition.value = data.data.records;
    }
    // 判断是否需要继续加载
    if (competition.value.length >= data.data.total) {
      isMore.value = false;
    }
  } catch (error) {
    ElMessage.error(error.response.data.msg);
    competition.value = [];
    isMore.value = false;
  } finally {
    loading.value = false;
  }
};
// 交换标签获取比赛信息
export const handleSelect = key => {
  comParams.value.page = 1;
  if (Number(key) > 0) {
    comParams.value.status = Number(key);
  } else {
    comParams.value.status = 0;
  }
  get_competition(true);
};
// 获取更多
export const loadingMore = ref(false);
export const loadMore = () => {
  loadingMore.value = true;
  comParams.value.page += 1;
  get_competition();
  loadingMore.value = false;
};
