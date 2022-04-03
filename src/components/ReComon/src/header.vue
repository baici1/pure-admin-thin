<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
// const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  if (key == "1") {
    router.push("/pre_home");
  }
  if (key == "2") {
    router.push("/preGame/home");
  }
  if (key == "3") {
    router.push("/list");
  }
  if (key == "4") {
    router.push("/welcome");
  }
  console.log(key, keyPath);
};
const props = defineProps({
  index: {
    type: Number,
    default: 1
  }
});
</script>

<template>
  <el-row justify="center">
    <el-col :span="18">
      <el-menu
        :default-active="props.index.toString()"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        text-color="000000"
        active-text-color="#409EFF"
      >
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">竞赛</el-menu-item>
        <el-menu-item index="3">通知</el-menu-item>
        <el-menu-item index="4">管理中心</el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<style scoped></style>
