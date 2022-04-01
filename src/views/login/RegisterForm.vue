<script setup lang="ts">
import { ElMessage } from "element-plus";
import { computed, unref, ref } from "vue";
import {
  FormStateEnum,
  useFormState,
  useInputUtil,
  RegisterForm
} from "./useLogin";
import { getRegister, captcha } from "/@/api/user";
const { getFormState, handleBackLogin } = useFormState();
const getShow = computed(() => unref(getFormState) === FormStateEnum.REGISTER);
const { onInputFocus, onInputBlur, onInputErr } = useInputUtil();
const onRegister = async () => {
  //参数校验
  //去除空格
  RegisterForm.value.phone = RegisterForm.value.phone.trim();
  if (RegisterForm.value.phone.length == 0) {
    onInputErr("phone");
    return;
  }
  RegisterForm.value.password = RegisterForm.value.password.trim();
  if (RegisterForm.value.password.length < 6) {
    onInputErr("pwd");
    ElMessage.error("密码至少6位");
    return;
  }
  RegisterForm.value.againPassword = RegisterForm.value.againPassword.trim();
  if (
    RegisterForm.value.againPassword != RegisterForm.value.password ||
    RegisterForm.value.password.length < 6
  ) {
    onInputErr("pwd");
    onInputErr("again");
    ElMessage.error("两次密码不一致");
    return;
  }

  const data = await getRegister(RegisterForm.value);
  console.log(
    "%c 🍼️ data: ",
    "font-size:20px;background-color: #465975;color:#fff;",
    data
  );
  if (data.code == 0) {
    ElMessage.success("恭喜你！注册成功，请进行登录");
    handleBackLogin();
  } else {
    ElMessage.error("用户已注册!");
  }
};
//验证码显示
const captchaImg = ref("");
const registVerify = async () => {
  const data = await captcha({});
  RegisterForm.value.captchaId = data.data.captchaId;
  captchaImg.value = data.data.picPath;
};
registVerify();
</script>

<template>
  <template v-if="getShow">
    <form>
      <!-- 用户名 -->
      <div
        class="input-group phone"
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
        <div class="icon">
          <IconifyIconOffline icon="fa-phone" width="14" height="14" />
        </div>
        <div>
          <h5>手机号</h5>
          <input
            type="text"
            class="input"
            v-model="RegisterForm.phone"
            @focus="onInputFocus('phone')"
            @blur="onInputBlur(RegisterForm.phone, 'phone')"
            required="true"
          />
        </div>
      </div>
      <div
        class="input-group pwd"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 300
          }
        }"
      >
        <div class="icon">
          <IconifyIconOffline icon="fa-lock" width="14" height="14" />
        </div>
        <div>
          <h5>密码(至少6位)</h5>
          <input
            type="password"
            class="input"
            v-model="RegisterForm.password"
            @focus="onInputFocus('pwd')"
            @blur="onInputBlur(RegisterForm.password, 'pwd')"
            required="true"
          />
        </div>
      </div>
      <div
        class="input-group again"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 300
          }
        }"
      >
        <div class="icon">
          <IconifyIconOffline icon="fa-lock" width="14" height="14" />
        </div>
        <div>
          <h5>确认密码</h5>
          <input
            type="password"
            class="input"
            v-model="RegisterForm.againPassword"
            @focus="onInputFocus('again')"
            @blur="onInputBlur(RegisterForm.againPassword, 'again')"
            required="true"
          />
        </div>
      </div>
      <div
        class="input-group captcha input-grid"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 300
          }
        }"
      >
        <div class="icon">
          <IconifyIconOffline icon="fa-lock" width="14" height="14" />
        </div>
        <div>
          <h5>验证码</h5>
          <input
            type="captcha"
            class="input"
            v-model="RegisterForm.captcha"
            @focus="onInputFocus('captcha')"
            @blur="onInputBlur(RegisterForm.captcha, 'captcha')"
          />
        </div>
        <el-image :src="captchaImg" @click="registVerify" />
      </div>
      <el-row
        justify="space-between"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 300
          }
        }"
      >
        <el-col :span="4">
          <el-radio v-model="RegisterForm.identity" :label="2019" size="large">
            学生
          </el-radio>
        </el-col>
        <el-col :span="5">
          <el-radio v-model="RegisterForm.identity" :label="2023" size="large">
            教师
          </el-radio>
        </el-col>
      </el-row>
      <button
        class="btn"
        v-motion
        :initial="{
          opacity: 0,
          y: 10
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 300
          }
        }"
        @click="onRegister"
      >
        注册
      </button>
      <button
        class="btn"
        v-motion
        :initial="{
          opacity: 0,
          y: 10
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 300
          }
        }"
        @click="handleBackLogin"
      >
        返回
      </button>
    </form>
  </template>
</template>

<style scoped>
@import url("/@/style/login.css");

.input-grid {
  grid-template-columns: 7% 50% 43%;
}
</style>
