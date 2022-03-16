<script setup lang="ts">
import { get_show_swipers, swipers } from "../utils/main";
const init = async () => {
  await get_show_swipers();
};
init();
</script>

<template>
  <div>
    <el-row justify="center">
      <el-col :span="12" :xs="22">
        <el-carousel class="m-0">
          <el-carousel-item
            v-for="(item, index) in swipers"
            :key="index"
            class="h-300px"
          >
            <el-image :src="item.swiper_picture" class="h-300px"> </el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss"></style>
