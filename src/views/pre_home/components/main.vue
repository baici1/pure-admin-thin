<script setup lang="ts">
import { ReSvgIcon } from "/@/components/ReIcon/index";
import { get_show_swipers, swipers } from "../utils/homeBody";
import newsVue from "./news.vue";
import timelineVue from "./timeline.vue";
const init = async () => {
  await get_show_swipers(1);
};
init();
</script>

<template>
  <div class="mt-10">
    <el-row justify="center">
      <el-col :span="14" :xs="22">
        <el-carousel class="mb-5">
          <el-carousel-item
            v-for="(item, index) in swipers"
            :key="index"
            class="h-300px"
          >
            <el-image class="carousel__item" :src="item.swiperPicture">
              <template #error>
                <ReSvgIcon
                  name="undraw_page_not_found_re_e9o6"
                  class="img-error"
                ></ReSvgIcon>
              </template>
            </el-image>
          </el-carousel-item>
        </el-carousel>
        <el-row :justify="'space-between'" :gutter="20">
          <el-col :span="12" class="mb-20px">
            <newsVue icon="histogram" :article-type="1"></newsVue>
          </el-col>
          <el-col :span="12" class="mb-20px">
            <newsVue icon="tickets" :article-type="2"></newsVue>
          </el-col>
          <el-col :span="12" class="mb-20px">
            <newsVue icon="message-icon" :article-type="3"></newsVue>
          </el-col>
          <el-col :span="12" class="mb-20px">
            <newsVue icon="files" :article-type="4"></newsVue>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4" class="ml-10"> <timelineVue></timelineVue> </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="16">
        <div class="text-center mb-20px text-2xl">优秀教师</div>
      </el-col>
      <el-col :xl="16" :lg="16" :md="16" :xs="24">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="16">
        <div class="text-center mb-20px text-2xl">优秀团队</div>
      </el-col>
      <el-col :xl="16" :lg="16" :md="16" :xs="24">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.carousel__item {
  height: 300px;
  // min-height: 300px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  .img-error {
    height: 300px;
    width: 100%;
  }
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
