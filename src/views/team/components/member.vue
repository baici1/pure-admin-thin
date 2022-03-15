<script setup lang="ts">
import { ref } from "vue";
import {
  formDataMember,
  rulesMenber,
  dialogVisibleMember
} from "../utils/editor";
import { ElForm, ElMessage } from "element-plus";
import { AddTeamMember } from "/@/api/team";
type FormInstance = InstanceType<typeof ElForm>;
const elFormMember = ref<FormInstance>();
const props = defineProps({
  team_id: {
    type: Number,
    default: 0
  }
});
const commit = async (formEl: FormInstance | undefined) => {
  dialogVisibleMember.value = true;
  formDataMember.value.team_id = props.team_id;
  formEl.validate(async valid => {
    if (valid) {
      await AddTeamMember(formDataMember.value);
      ElMessage.success("创建成功");
      dialogVisibleMember.value = false;
    }
  });
};
</script>

<template>
  <div>
    <el-card shadow="never" style="border: none">
      <el-form
        ref="elFormMember"
        :model="formDataMember"
        :rules="rulesMenber"
        size="default"
        label-width="100px"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="formDataMember.phone"
            placeholder="请输入公司名称"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="identify">
          <el-select v-model="formDataMember.identify">
            <el-option label="队员" :value="0" />
            <el-option label="队长" :value="1" />
            <el-option label="副队长" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="commit(elFormMember)">
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped></style>
