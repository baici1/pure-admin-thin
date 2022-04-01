<script setup lang="ts">
import { form, get_student_info } from "./utils/welcome";
import { updateStudentInfo } from "/@/api/user";
import { storageSession } from "/@/utils/storage/index";
import {
  formRules,
  inputValue,
  inputVisible,
  InputRef,
  handleClose,
  showInput,
  handleInputConfirm
} from "./utils/editor";
import { ref } from "vue";
import { ElForm, ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { ReAvatar } from "/@/components/ReComon/index";
const router = useRouter();
get_student_info();
type FormInstance = InstanceType<typeof ElForm>;

const ruleFormRef = ref<FormInstance>();
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(valid => {
    if (valid) {
      update_student_info();
    } else {
      ElMessage.warning("请认真填写相关信息！");
      return false;
    }
  });
};
const GoBack = () => {
  router.push("/");
};
//更新学生信息
const update_student_info = async () => {
  form.value.specialty = form.value.lists.join(",");
  if (storageSession.getItem("avatar") != "") {
    form.value.avatar = storageSession.getItem("avatar");
  }
  await updateStudentInfo(form.value);
  ElMessage.success("信息更新成功");
  router.push("/");
};
</script>
<template>
  <div>
    <el-row :gutter="24" style="margin: 20px">
      <el-col
        :span="24"
        style="margin-bottom: 20px"
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
        <el-card>
          <template #header>
            <div class="card-header">
              <span>修改信息 </span>
            </div>
          </template>
          <el-row justify="center">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form
                ref="ruleFormRef"
                :model="form"
                :rules="formRules"
                label-width="auto"
                class="demo-ruleForm"
                label-position="right"
              >
                <el-form-item label="avatar">
                  <ReAvatar></ReAvatar>
                </el-form-item>
                <el-form-item label="real_name" prop="real_name">
                  <el-input v-model="form.realName"></el-input>
                </el-form-item>
                <el-form-item label="student_id" prop="student_id">
                  <el-input v-model="form.studentId"></el-input>
                </el-form-item>
                <el-form-item label="email" prop="email">
                  <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="degree" prop="degree">
                  <el-input v-model="form.degree"></el-input>
                </el-form-item>
                <el-form-item label="grade" prop="grade">
                  <el-input v-model="form.grade"></el-input>
                </el-form-item>
                <el-form-item label="department" prop="department">
                  <el-input v-model="form.department"></el-input>
                </el-form-item>
                <el-form-item label="major" prop="major">
                  <el-input v-model="form.major"></el-input>
                </el-form-item>
                <el-form-item label="class_num" prop="class_num">
                  <el-input v-model="form.classNum"></el-input>
                </el-form-item>
                <el-form-item label="specialty" prop="specialty">
                  <el-tag
                    v-for="(tag, index) in form.lists"
                    :key="index"
                    class="mx-1 m-1"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                  >
                    {{ tag }}
                  </el-tag>
                  <el-input
                    v-if="inputVisible"
                    ref="InputRef"
                    v-model="inputValue"
                    class="ml-1 w-80px"
                    size="small"
                    style="width: 80px"
                    @keyup.enter="handleInputConfirm"
                    @blur="handleInputConfirm"
                  >
                  </el-input>
                  <el-button
                    v-else
                    class="button-new-tag ml-1"
                    size="small"
                    @click="showInput"
                  >
                    + New Tag
                  </el-button>
                </el-form-item>
                <el-form-item label="QQ" prop="QQ">
                  <el-input v-model="form.QQ"></el-input>
                </el-form-item>
                <el-form-item label="wechat" prop="wechat">
                  <el-input v-model="form.wechat"></el-input>
                </el-form-item>
                <el-form-item label="bank_name" prop="bank_name">
                  <el-input v-model="form.bankName"></el-input>
                </el-form-item>
                <el-form-item label="bank_card_number" prop="bank_card_number">
                  <el-input v-model="form.bankCardNumber"></el-input>
                </el-form-item>
                <el-form-item label="introduction" prop="introduction">
                  <el-input
                    v-model="form.introduction"
                    type="textarea"
                    maxlength="100"
                    show-word-limit
                    autosize
                  ></el-input>
                </el-form-item>
                <el-form-item label="gender" prop="gender">
                  <el-select v-model="form.gender" placeholder="Activity zone">
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="0"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm(ruleFormRef)">
                    提交
                  </el-button>
                  <el-button @click="GoBack()">返回</el-button>
                </el-form-item>
              </el-form></el-col
            >
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
