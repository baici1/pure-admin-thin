<script setup lang="ts">
import { ref } from "vue";
import { captcha } from "/@/api/user";
import { useUserStore } from "/@/store/modules/user";
import {
  useInputUtil,
  FormStateEnum,
  useFormState,
  LoginForm
} from "./useLogin";
const userStore = useUserStore();
const { setFormState } = useFormState();
const { onInputFocus, onInputBlur, onInputErr } = useInputUtil();
//用户登录函数
const onLogin = async () => {
  //参数校验 基础：保证已填写
  LoginForm.value.phone = LoginForm.value.phone.trim();
  if (LoginForm.value.phone.length == 0) {
    onInputErr("phone");
    return;
  }
  LoginForm.value.password = LoginForm.value.password.trim();
  if (LoginForm.value.password.length == 0) {
    onInputErr("pwd");
    return;
  }
  userStore.LoginIn(LoginForm.value);
};

//验证码显示
const captchaImg = ref("");
const loginVerify = async () => {
  const data = await captcha({});
  LoginForm.value.captchaId = data.data.captchaId;
  captchaImg.value = data.data.picPath;
};
loginVerify();
</script>

<template>
  <div class="on-login">
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
        <IconifyIconOffline icon="fa-user" width="14" height="14" />
      </div>
      <div>
        <h5>用户名</h5>
        <input
          type="text"
          class="input"
          v-model="LoginForm.phone"
          @focus="onInputFocus('phone')"
          @blur="onInputBlur(LoginForm.phone, 'phone')"
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
        <h5>密码</h5>
        <input
          type="password"
          class="input"
          v-model="LoginForm.password"
          @focus="onInputFocus('pwd')"
          @blur="onInputBlur(LoginForm.password, 'pwd')"
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
          v-model="LoginForm.captcha"
          @focus="onInputFocus('captcha')"
          @blur="onInputBlur(LoginForm.captcha, 'captcha')"
        />
      </div>
      <el-image :src="captchaImg" @click="loginVerify" />
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
        <el-checkbox label="记住我" size="large"></el-checkbox>
      </el-col>
      <el-col :span="5">
        <el-button type="text" @click="setFormState(FormStateEnum.REGISTER)"
          >注册</el-button
        >
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
        y: 0
      }"
      @click="onLogin"
    >
      登录
    </button>
  </div>
</template>

<style scoped lang="scss">
@import url("/@/style/login.css");

.input-grid {
  grid-template-columns: 7% 50% 43%;
}
</style>
