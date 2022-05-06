<script setup lang="ts">
import { ref } from "vue";
import {
  get_com_selectList,
  options,
  entry,
  entryRules,
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
      await createEntryFormDetail(entry.value);
      ElMessage.success("增加成功");
      dialogVisible.value = false;
    }
    EntryInit();
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
        <el-form-item label="队名" prop="name">
          <el-input v-model="entry.name" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="比赛" prop="cmpId">
          <el-select
            v-model="entry.cmpId"
            class="m-2"
            placeholder="Select"
            size="large"
          >
            <el-option
              v-for="item in options"
              :key="item.ID"
              :label="item.base_info.cName"
              :value="item.ID"
            />
          </el-select>
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
