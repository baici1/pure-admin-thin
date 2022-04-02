import { ref } from "vue";
import { GetShowSwiper } from "/@/api/pre_home";
import { swiper } from "/@/api/model/pre";
export const swipers = ref<Array<swiper>>([]);
//获取轮播图
export const get_show_swipers = async group => {
  const data = await GetShowSwiper({
    page: 1,
    pageSize: 10,
    group: group
  });
  swipers.value = data.data.list;
};
