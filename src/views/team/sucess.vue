<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const reBack = () => {
  router.push("/");
};
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
        <el-steps :active="2" align-center>
          <el-step title="提交成功" description="Some description"></el-step>
          <el-step title="审核中" description="Some description"></el-step>
          <el-step title="审查中" description="Some description"></el-step>
          <el-step title="完成" description="Some description"></el-step>
        </el-steps>
      </el-card>
    </el-card>
  </div>
</template>

<style scoped></style>
