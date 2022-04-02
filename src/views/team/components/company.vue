<script setup lang="ts">
import { ref } from "vue";
import { rulesCompany, dialogVisibleCompany } from "../utils/editor";
import { company, form } from "../utils/index";
import { ElForm, ElMessage } from "element-plus";
import { createCompany, updateCompany, updateTeam } from "/@/api/team";
type FormInstance = InstanceType<typeof ElForm>;
const elFormCompany = ref<FormInstance>();
const props = defineProps({
  isEditor: {
    type: Boolean,
    default: false
  },
  team_id: {
    type: Number,
    default: 0
  }
});
const commit = async (formEl: FormInstance | undefined) => {
  console.log(
    "%c 🥟 company.value: ",
    "font-size:20px;background-color: #2EAFB0;color:#fff;",
    company.value
  );
  dialogVisibleCompany.value = true;
  formEl.validate(async valid => {
    if (valid) {
      if (props.isEditor) {
        await updateCompany(company.value);
        ElMessage.success("修改成功");
      } else {
        const res = await createCompany({
          name: company.value.name,
          address: company.value.address,
          introduction: company.value.introduction,
          check: 0
        });
        if (res.code == 0) {
          form.value.companyId = res.data;
          const data = await updateTeam(form.value);
          console.log(
            "%c 🥪 data: ",
            "font-size:20px;background-color: #93C0A4;color:#fff;",
            data
          );
          ElMessage.success("创建成功");
        }
      }
      dialogVisibleCompany.value = false;
    }
  });
};
</script>

<template>
  <div>
    <el-card shadow="never" style="border: none">
      <el-form
        ref="elFormCompany"
        :model="company"
        :rules="rulesCompany"
        size="default"
        label-width="100px"
      >
        <el-form-item label="公司名称" prop="name">
          <el-input
            v-model="company.name"
            placeholder="请输入公司名称"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="公司地址" prop="address">
          <el-input
            v-model="company.address"
            placeholder="请输入公司地址"
            clearable
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="团队介绍" prop="introduction">
          <el-input
            v-model="company.introduction"
            type="textarea"
            placeholder="请输入团队介绍"
            :maxlength="100"
            show-word-limit
            :autosize="{ minRows: 4, maxRows: 4 }"
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="commit(elFormCompany)">
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped></style>
