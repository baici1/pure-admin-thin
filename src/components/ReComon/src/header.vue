<script setup lang="ts">
import { ref } from "vue";

const activeIndex2 = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<template>
  <el-row justify="center">
    <el-col :span="18">
      <el-menu
        class="border-none"
        :default-active="activeIndex2"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
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
