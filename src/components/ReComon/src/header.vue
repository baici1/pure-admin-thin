<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useRecordStoreHook } from "/@/store/modules/record";
const router = useRouter();
// const activeIndex = ref("1");
const useRecord = useRecordStoreHook();
const handleSelect = (key: string, keyPath: string[]) => {
  if (key == "1") {
    router.push("/pre_home");
    useRecord.SET_MENUINDEX(+key);
  }
  if (key == "3") {
    router.push("/list");
    useRecord.SET_MENUINDEX(+key);
  }
  console.log(key, keyPath);
};
const toOWN = () => {
  router.push("/welcome");
};
const MenuIndex = computed(() => {
  return useRecord.menuIndex.toString();
});
</script>

<template>
  <el-row justify="center">
    <el-col :span="18">
      <el-menu
        :default-active="MenuIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">竞赛</el-menu-item>
        <el-menu-item index="3">通知</el-menu-item>
        <el-menu-item @click="toOWN" index="4">管理中心</el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<style scoped></style>
