<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const getGreetings = computed(() => {
  if (+route.query?.id > 0) {
    return "修改参赛表";
  } else {
    return "创建参赛表";
  }
});
</script>

<template>
  <div>
    <el-card class="top">
      <div class="top-content">
        <p>{{ getGreetings }}</p>
      </div>
    </el-card>
    <el-card
      :span="24"
      class="editor-card"
      v-motion
      :initial="{
        opacity: 0,
        y: 100
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 200
        }
      }"
    >
      <template #header>
        <p>参赛表信息</p>
      </template>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.main-content {
  margin: 0 !important;
}

.top {
  height: 60px;
  background: #fff;
  width: 100%;

  .top-content {
    display: flex;
    align-items: center;

    p {
      margin-right: 12px;
      margin-bottom: 0;
      color: #000000d9;
      font-weight: 600;
      font-size: 20px;
      line-height: 32px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
