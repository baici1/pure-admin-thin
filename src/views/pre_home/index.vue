<script setup lang="ts">
import { ReHeader, ReFooter } from "/@/components/ReComon";
import mainVue from "./components/main.vue";
import { setOptions } from "./utils/homeBody";

setOptions();
</script>

<template>
  <div>
    <el-container>
      <el-header class="p-0 border-solid border">
        <ReHeader :index="1"
      /></el-header>
      <el-main class="p-0 bg-[rgba(211,220,230,0.2)]">
        <mainVue></mainVue>
      </el-main>
      <el-footer style="padding: 0; margin: 0">
        <ReFooter></ReFooter>
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped></style>
