<script setup lang="ts">
import { ReHeader, ReFooter } from "/@/components/ReComon";
import mainVue from "./components/main.vue";
</script>

<template>
  <div>
    <el-container>
      <el-header class="p-0 border-solid border"><ReHeader /></el-header>
      <el-main class="p-0 bg-[rgba(211,220,230,0.2)]">
        <mainVue></mainVue>
      </el-main>
      <el-footer class="p-0 m-0">
        <ReFooter></ReFooter>
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped></style>
