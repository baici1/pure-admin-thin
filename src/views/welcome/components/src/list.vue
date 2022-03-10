<template>
  <!-- <a-list
    item-layout="horizontal"
    :data-source="data"
    style="overflow: auto"
    class="infinite-list"
  >
    <template #renderItem="{ item }">
      <el-scrollbar>
        <a-list-item>
          <a-list-item-meta
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          >
            <template #title>
              <a href="https://www.antdv.com/">{{ item.title }}</a>
            </template>
            <template #avatar>
              <a-avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </el-scrollbar>
    </template>
  </a-list> -->
  <div class="list">
    <el-scrollbar height="400px">
      <div class="list-box" v-for="(item, index) in data" :key="index">
        <el-row>
          <el-col :xs="6" :sm="5" :md="4" :lg="2" :xl="2">
            <el-avatar
              :size="50"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            ></el-avatar>
          </el-col>
          <el-col :xs="14" :sm="15" :md="10" :lg="16" :xl="16">
            <h4 class="title">
              {{ item.title }}
            </h4>
            <div class="txt">
              {{ item.title }}+{{
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
              }}
            </div>
          </el-col>
        </el-row>
      </div>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const data = ref([
  {
    title: "Ant Design Title 1"
  },
  {
    title: "Ant Design Title 2"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 4"
  },
  {
    title: "Ant Design Title 1"
  },
  {
    title: "Ant Design Title 2"
  },
  {
    title: "Ant Design Title 2"
  }
]);
</script>
<style lang="scss" scoped>
.list-box {
  border-bottom: 1px rgb(190, 192, 197) solid;
  margin-bottom: 10px;

  h4 {
    margin-bottom: 5px;
  }

  .txt {
    font-size: small;
    color: rgb(190, 192, 197);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...
  }
}
</style>
