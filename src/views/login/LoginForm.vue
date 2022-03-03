<script setup lang="ts">
import { computed, unref } from "vue";
import { useRouter } from "vue-router";
import { initRouter } from "/@/router/utils";
import { storageSession } from "/@/utils/storage";
import {
  useInputUtil,
  FormStateEnum,
  useFormState,
  LoginForm,
  rulesLoginForm
} from "./useLogin";
const router = useRouter();
const { setFormState, getFormState } = useFormState();

const onLogin = (): void => {
  storageSession.setItem("info", {
    username: "admin",
    accessToken: "eyJhbGciOiJIUzUxMiJ9.test"
  });
  initRouter("admin").then(() => {});
  router.push("/");
};
const { onInputFocus, onInputBlur } = useInputUtil();
const getShow = computed(() => unref(getFormState) === FormStateEnum.LOGIN);
</script>

<template>
  <div class="on-login" v-if="getShow">
    <el-form ref="formRef" :model="LoginForm" :rules="rulesLoginForm">
      <!-- 用户名 -->
      <el-form-item prop="phone">
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
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
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
      </el-form-item>
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
      <el-form-item>
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
          :leave="{
            y: -10,
            opacity: 0,
            transition: {
              delay: 500
            }
          }"
          @click="onLogin"
        >
          登录
        </button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
@import url("/@/style/login.css");
</style>
