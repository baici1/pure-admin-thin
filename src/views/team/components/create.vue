<script setup lang="ts">
// import { ref } from "vue";
import {
  rulesTeam,
  formDataTeam,
  dialogVisibleCreateTeam
} from "../utils/editor";
import { createTeam, AddTeamMember } from "/@/api/team";
import { useRouter } from "vue-router";
import { UserBaseInfo } from "/@/views/base";
import { storageLocal } from "/@/utils/storage/index";

const router = useRouter();
//获取用户id
const userinfo: UserBaseInfo = storageLocal.getItem("Info");
// const uid = ref(userinfo.ID);
//创建团队
const create_team = async () => {
  dialogVisibleCreateTeam.value = true;
  const data = await createTeam(formDataTeam.value);
  console.log(
    "%c 🥖 data: ",
    "font-size:20px;background-color: #2EAFB0;color:#fff;",
    data
  );
  if (data.code == 0) {
    const res = await AddTeamMember({
      phone: userinfo.phone,
      identify: 1,
      teamId: data.data
    });
    console.log(
      "%c 🌰 res: ",
      "font-size:20px;background-color: #ED9EC7;color:#fff;",
      res
    );
    router.push("/team/success");
    dialogVisibleCreateTeam.value = false;
  }
};
</script>

<template>
  <div>
    <el-card :span="24" style="border: none" shadow="never">
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
        <el-form-item label="知识产权" prop="intellectualProperty">
          <el-input
            v-model="formDataTeam.intellectualProperty"
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
</style>
