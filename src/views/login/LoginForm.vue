<script setup lang="ts">
import { computed, unref } from "vue";
import { useRouter } from "vue-router";
import { initRouter } from "/@/router/utils";
import { getLogin } from "/@/api/user";
import { useUserStoreHook } from "/@/store/modules/user";
import {
  useInputUtil,
  FormStateEnum,
  useFormState,
  LoginForm
} from "./useLogin";
import { storageLocal } from "/@/utils/storage";
import { setToken } from "/@/utils/auth";
const userStore = useUserStoreHook();
const router = useRouter();
const { setFormState, getFormState } = useFormState();
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
  //发起请求
  const data = await getLogin(LoginForm.value);
  console.log(
    "%c 🍺 data: ",
    "font-size:20px;background-color: #7F2B82;color:#fff;",
    data
  );
  //localstorage和cookie存储权限
  userStore.SET_INFO(
    data.data.accessToken,
    data.data.user.phone,
    data.data.user.id
  );
  storageLocal.setItem("Info", data.data.user);
  setToken(data.data);
  //通过权限获取列表
  initRouter("admin").then(() => {});
  router.push({ name: "welcome" });
};
const getShow = computed(() => unref(getFormState) === FormStateEnum.LOGIN);
</script>

<template>
  <div class="on-login" v-if="getShow">
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
        y: 0,
        transition: {
          delay: 500
        }
      }"
      @click="onLogin"
    >
      登录
    </button>
  </div>
</template>

<style scoped lang="scss">
@import url("/@/style/login.css");
</style>
