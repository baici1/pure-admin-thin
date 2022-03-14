<script setup lang="ts">
import { ref } from "vue";
import {
  get_com_selectList,
  cascaderOptions,
  cascaderChange,
  entry,
  entryRules,
  isProject
} from "./utils/editor";
import { ElForm, ElMessage } from "element-plus";
import { createEntryFormDetail } from "/@/api/game";
const elFormTeam = ref<FormInstance>();
type FormInstance = InstanceType<typeof ElForm>;
get_com_selectList();
const commit = async (formEl: FormInstance | undefined) => {
  formEl.validate(async valid => {
    if (valid) {
      await createEntryFormDetail(entry.value);
      ElMessage.success("修改成功");
    }
  });
};
</script>

<template>
  <div>
    <el-card>
      <el-form
        ref="elFormTeam"
        :model="entry"
        :rules="entryRules"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="比赛" prop="cmp_id">
          <el-cascader-panel
            :options="cascaderOptions"
            v-model="entry.cmp_id"
            @change="cascaderChange"
            style="margin-bottom: 10px"
          />
        </el-form-item>
        <el-form-item label="是否需要创建项目">
          <el-switch v-model="isProject" />
        </el-form-item>
        <el-form-item label="是否需要创建项目" v-if="isProject">
          <el-input v-model="entry.project_name" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="是否需要创建项目" v-if="isProject">
          <el-input v-model="entry.introduction" placeholder="Please input" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="commit(elFormTeam)"
            >Create</el-button
          >
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
