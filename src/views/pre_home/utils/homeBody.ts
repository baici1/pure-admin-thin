import { ref } from "vue";
import { GetShowSwiper } from "/@/api/pre_home";
import { swiper } from "/@/api/model/pre";
import { getDictFunc } from "/@/utils/format";
export const swipers = ref<Array<swiper>>([]);
export const swipersTeacher = ref<Array<swiper>>([]);
export const swipersStudent = ref<Array<swiper>>([]);
//获取轮播图
export const get_show_swipers = async () => {
  const data = await GetShowSwiper({
    page: 1,
    pageSize: 10,
    group: 1
  });
  swipers.value = data.data.list;
};

export const get_show_swipers_teacher = async () => {
  const data = await GetShowSwiper({
    page: 1,
    pageSize: 10,
    group: 2
  });
  swipersTeacher.value = data.data.list;
};
export const get_show_swipers_student = async () => {
  const data = await GetShowSwiper({
    page: 1,
    pageSize: 10,
    group: 3
  });
  swipersStudent.value = data.data.list;
};
//获取字典信息
export const articleTypeOptions = ref([]);
export const competitionLevelOptions = ref([]);
export const competitionStatusOptions = ref([]);
// 获取需要的字典 可能为空 按需保留
export const setOptions = async () => {
  articleTypeOptions.value = await getDictFunc("articleType");
  competitionLevelOptions.value = await getDictFunc("competitionLevel");
  competitionStatusOptions.value = await getDictFunc("competitionStatus");
};
