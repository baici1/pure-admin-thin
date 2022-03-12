<script setup lang="ts">
import { ref } from "vue";
import { greetings, rulesTeam, formDataTeam } from "./utils/editor";
import { createTeam } from "/@/api/team";
import { useRouter } from "vue-router";
import { UserInfo } from "/@/views/base";
import { storageLocal } from "/@/utils/storage/index";
//获取用户id
const userinfo: UserInfo = storageLocal.getItem("Info");
const uid = ref(userinfo.id);
//创建团队
const create_team = async () => {
  await createTeam({
    u_id: uid.value,
    teaminfo: formDataTeam.value
  });
  useRouter().push("/team/sucess");
};
</script>

<template>
  <div>
    <el-card class="top-content">
      <p>{{ greetings }}</p>
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
        <p>团队信息</p>
      </template>
      <el-form
        ref="elFormTeam"
        :model="formDataTeam"
        :rules="rulesTeam"
        size="default"
        label-width="100px"
      >
        <el-form-item label="团队名称" prop="name">
          <el-input
            v-model="formDataTeam.name"
            placeholder="请输入团队名称"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="团队介绍" prop="introduction">
          <el-input
            v-model="formDataTeam.introduction"
            type="textarea"
            placeholder="请输入团队介绍"
            :maxlength="100"
            show-word-limit
            :autosize="{ minRows: 4, maxRows: 4 }"
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="知识产权" prop="intellectual_property">
          <el-input
            v-model="formDataTeam.intellectual_property"
            type="textarea"
            placeholder="请输入知识产权"
            :maxlength="100"
            show-word-limit
            :autosize="{ minRows: 4, maxRows: 6 }"
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
        <!-- <el-form-item size="large">
        <el-button type="primary" @click="commit">提交</el-button>
        <el-button>重置</el-button>
      </el-form-item> -->
      </el-form>
      <el-button type="primary" @click="create_team">创建</el-button>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.main-content {
  margin: 0 !important;
}

.top-content {
  display: flex;
  align-items: center;
  height: 60px;
  background: #fff;

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

.editor-card {
  margin: 10px 10px;

  p {
    color: #000000d9;
    font-weight: 600;
    font-size: 14px;
    line-height: 32px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
