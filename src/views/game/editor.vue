<script setup lang="ts">
import { ref } from "vue";
import {
  get_com_selectList,
  cascaderOptions,
  cascaderChange,
  entry,
  entryRules,
  isProject,
  dialogVisible,
  setOptions,
  EntryInit
} from "./utils/editor";
import { ElForm, ElMessage } from "element-plus";
import { createEntryFormDetail } from "/@/api/game";
const elFormTeam = ref<FormInstance>();
type FormInstance = InstanceType<typeof ElForm>;
const init = async () => {
  await setOptions();
  await get_com_selectList();
};
init();
const commit = async (formEl: FormInstance | undefined) => {
  formEl.validate(async valid => {
    if (valid) {
      if (!isProject.value) {
        entry.value.project = undefined;
      }
      await createEntryFormDetail(entry.value);
      ElMessage.success("修改成功");
      dialogVisible.value = false;
    }
    EntryInit();
    isProject.value = false;
  });
};
</script>

<template>
  <div>
    <el-card style="border: none" shadow="never">
      <el-form
        ref="elFormTeam"
        :model="entry"
        :rules="entryRules"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="队名">
          <el-input v-model="entry.name" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="比赛" prop="cmpId">
          <el-cascader-panel
            :options="cascaderOptions"
            v-model="entry.cmpId"
            @change="cascaderChange"
            style="margin-bottom: 10px"
          />
        </el-form-item>
        <el-form-item label="是否需要创建项目">
          <el-switch v-model="isProject" />
        </el-form-item>
        <el-form-item label="项目名" v-if="isProject">
          <el-input
            v-model="entry.project.projectName"
            placeholder="Please input"
          />
        </el-form-item>
        <el-form-item label="项目介绍" v-if="isProject">
          <el-input
            v-model="entry.project.introduction"
            placeholder="Please input"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="commit(elFormTeam)">
            Create
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
