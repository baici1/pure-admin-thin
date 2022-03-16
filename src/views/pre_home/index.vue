<script setup lang="ts">
import { ReHeader, ReFooter } from "/@/components/ReComon";
import mainVue from "./components/main.vue";
</script>

<template>
  <div>
    <el-container>
      <el-header class="p-0 bg-[#545c64]"><ReHeader /></el-header>
      <el-main class="p-0">
        <mainVue></mainVue>
      </el-main>
      <el-footer class="p-0">
        <ReFooter></ReFooter>
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped></style>
