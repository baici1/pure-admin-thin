<script setup lang="ts">
import { useRouter } from "vue-router";
import { checkOptions } from "../utils/index";
const router = useRouter();
const reBack = () => {
  router.push("/welcome");
};
const props = defineProps({
  check: {
    type: Number,
    default: 0
  }
});
</script>

<template>
  <div>
    <el-card>
      <el-result
        icon="success"
        title="团队信息提交成功！"
        sub-title="请等待管理处进行审核您的团队信息。"
        style="margin-top: 50px"
      >
        <template #extra>
          <el-button type="primary" @click="reBack">返回</el-button>
        </template>
      </el-result>
      <el-card
        class="sucess-step"
        shadow="never"
        style="background-color: rgb(250, 250, 250); padding: 20px"
      >
        <el-steps :active="props.check" align-center>
          <el-step
            v-for="(item, index) of checkOptions"
            :key="index"
            :title="item.label"
          ></el-step>
        </el-steps>
      </el-card>
    </el-card>
  </div>
</template>

<style scoped></style>
