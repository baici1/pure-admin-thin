import { ref } from "vue";
import { GetShowSwiper } from "/@/api/pre_home";
import { Swiper } from "./type";
export const swipers = ref<Array<Swiper>>([]);
//获取轮播图
export const get_show_swipers = async () => {
  const data = await GetShowSwiper();
  swipers.value = data.data;
};
