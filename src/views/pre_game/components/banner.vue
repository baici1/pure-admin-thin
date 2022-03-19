<template>
  <div class="banner">
    <el-row justify="center">
      <el-col :span="16" :xs="22">
        <div class="banner_title">
          <h1>创新创业官网</h1>
          <h3>找出一片属于自己的天地</h3>
        </div>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="12" :xs="22">
        <!-- <n-input size="large" round placeholder="查询比赛">
          <template #prefix>
            <el-icon>
              <Search />
            </el-icon>
          </template>
        </n-input> -->
        <el-input v-model="competition" placeholder="输入比赛名">
          <template #append>
            <el-button @click="DoSearch">
              <IconifyIconOffline icon="search"></IconifyIconOffline>
            </el-button>
          </template>
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from "vue";
// import { NInput } from 'naive-ui';
const competition = ref("");
// 声明事件
const emit = defineEmits(["get-search-str"]);
const DoSearch = () => {
  // 执行
  emit("get-search-str", competition.value);
};
</script>

<style lang="scss" scope>
.banner {
  width: 100%;
  height: 350px;
  background: url("https://xanadu.aerowang.cn/img/newsbanner.173f8538.jpg")
    no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.banner_title {
  padding-bottom: 30px;
  text-align: center;

  h1 {
    margin: 0;
    font-size: 28px;
    font-weight: 800;
  }

  h3 {
    margin: 0;
    padding-top: 5px;
    font-size: 14px;
    color: #828282;
  }
}

.el-icon {
  cursor: pointer;
}
</style>
