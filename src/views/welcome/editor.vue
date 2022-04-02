<script setup lang="ts">
import { form, get_student_info } from "./utils/welcome";
import {
  formRules,
  inputValue,
  inputVisible,
  InputRef,
  handleClose,
  showInput,
  handleInputConfirm,
  update_student_info
} from "./utils/editor";
import { ref } from "vue";
import { ElForm, ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();
//获取学生信息
get_student_info();
type FormInstance = InstanceType<typeof ElForm>;
//关于表单
const ruleFormRef = ref<FormInstance>();
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(valid => {
    if (valid) {
      update_student_info();
    } else {
      ElMessage.warning("请认真填写相关信息！");
    }
  });
};
//返回
const GoBack = () => {
  router.push("/welcome");
};
//处理头像
const handleAvatarSuccess = (res: any) => {
  form.value.avatar = res.data.file.url;
};
const beforeAvatarUpload = (file: any) => {
  const isJPG = file.type === "image/jpeg";
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    ElMessage.error("Avatar picture must be JPG format!");
  }
  if (!isLt2M) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
  }
  return isJPG && isLt2M;
};
const header = ref({
  "x-token": localStorage.getItem("token")
} as any);
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
                  <el-upload
                    class="avatar-uploader"
                    action="http://127.0.0.1:8888/fileUploadAndDownload/upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :headers="header"
                  >
                    <img v-if="form.avatar" :src="form.avatar" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                      <IconifyIconOffline icon="plus"></IconifyIconOffline
                    ></el-icon>
                  </el-upload>
                </el-form-item>
                <el-form-item label="real_name" prop="realName">
                  <el-input v-model="form.realName"></el-input>
                </el-form-item>
                <el-form-item label="student_id" prop="studentId">
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
                <el-form-item label="class_num" prop="classNum">
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
                <el-form-item label="bank_name" prop="bankName">
                  <el-input v-model="form.bankName"></el-input>
                </el-form-item>
                <el-form-item label="bank_card_number" prop="bankCardNumber">
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
<style lang="scss" scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
