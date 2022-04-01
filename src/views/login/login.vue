<script setup lang="ts">
import bg from "/@/assets/login/bg.png";
import avatar from "/@/assets/login/avatar.svg?component";
import illustration from "/@/assets/login/illustration.svg?component";
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";
import { computed, unref } from "vue";
import { FormStateEnum, useFormState } from "./useLogin";
const { getFormState } = useFormState();
const getShowLogin = computed(
  () => unref(getFormState) === FormStateEnum.LOGIN
);
</script>

<template>
  <img :src="bg" class="wave" />
  <div class="login-container">
    <div class="img">
      <illustration />
    </div>
    <div class="login-box">
      <div class="login-form">
        <avatar class="avatar" />
        <h2
          v-motion
          :initial="{
            opacity: 0,
            y: 100
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 100
            }
          }"
        >
          创新创业个人管理
        </h2>
        <div>
          <LoginForm v-if="getShowLogin"></LoginForm>
          <RegisterForm v-else></RegisterForm>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("/@/style/login.css");
</style>
