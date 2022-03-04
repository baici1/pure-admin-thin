<script setup lang="ts">
import { computed, unref } from "vue";
import {
  FormStateEnum,
  useFormState,
  useInputUtil,
  RegisterForm
} from "./useLogin";
const { getFormState, handleBackLogin } = useFormState();
const getShow = computed(() => unref(getFormState) === FormStateEnum.REGISTER);
const { onInputFocus, onInputBlur } = useInputUtil();
</script>

<template>
  <template v-if="getShow">
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
          v-model="RegisterForm.password"
          @focus="onInputFocus('pwd')"
          @blur="onInputBlur(RegisterForm.password, 'pwd')"
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
          v-model="RegisterForm.again"
          @focus="onInputFocus('again')"
          @blur="onInputBlur(RegisterForm.again, 'again')"
        />
      </div>
    </div>
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
          delay: 250
        }
      }"
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
          delay: 250
        }
      }"
      @click="handleBackLogin"
    >
      返回
    </button>
  </template>
</template>

<style scoped>
@import url("/@/style/login.css");
</style>
