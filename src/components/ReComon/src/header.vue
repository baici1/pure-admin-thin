<script setup lang="ts">
import { useRouter } from "vue-router";
import { ReSearch } from "/@/components/ReSearch/index";
import useBoolean from "./useBoolean";
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
  if (key == "5") {
    router.push("/recruit/all");
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

const { bool: show, toggle } = useBoolean();
function handleSearch() {
  toggle();
}
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
        <el-menu-item index="5">招聘</el-menu-item>
        <el-menu-item index="4">管理中心</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="4">
      <div class="search-container" @click="handleSearch">
        <IconifyIconOffline icon="search" />
      </div>
      <ReSearch v-model:value="show" />
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.layout-theme-default
  body[layout="vertical"]
  .el-menu--horizontal
  .el-menu-item.is-active {
  color: #000000 !important;
}

.layout-theme-default
  body[layout="vertical"]
  .el-menu--horizontal
  .el-menu-item:hover {
  color: #000000 !important;
}

.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 59px;
  width: 40px;
  cursor: pointer;

  &:hover {
    background: #8dc1f5;
  }
}
</style>
