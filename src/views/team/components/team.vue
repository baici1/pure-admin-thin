<script setup lang="ts">
import { ref } from "vue";
import { form } from "../utils/index";
import { rulesTeam } from "../utils/editor";
import { ElForm, ElMessage } from "element-plus";
import { updateTeam } from "/@/api/team";
type FormInstance = InstanceType<typeof ElForm>;
const elFormTeam = ref<FormInstance>();
const commit = async (formEl: FormInstance | undefined) => {
  formEl.validate(async valid => {
    if (valid) {
      await updateTeam({
        teaminfo: form.value
      });
      ElMessage.success("修改成功");
    }
  });
};
</script>

<template>
  <div>
    <el-card shadow="never" class="editor-card">
      <template #header>
        <p>团队信息</p>
      </template>
      <el-form
        ref="elFormTeam"
        :model="form"
        :rules="rulesTeam"
        size="default"
        label-width="100px"
      >
        <el-form-item label="团队名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入团队名称"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="团队介绍" prop="introduction">
          <el-input
            v-model="form.introduction"
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
            v-model="form.intellectual_property"
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
      <el-button type="primary" @click="commit(elFormTeam)">提交</el-button>
    </el-card>
  </div>
</template>
