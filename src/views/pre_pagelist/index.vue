<script setup lang="ts">
import { total, articles, artparam, get_specific_articles } from "./index";
import { ReHeader, ReFooter } from "/@/components/ReComon";
import { useRoute } from "vue-router";

import { timeFormatMD } from "/@/utils/tools";
const route = useRoute();
console.log(
  "%c 🥃 route: ",
  "font-size:20px;background-color: #F5CE50;color:#fff;",
  route
);
const init = async () => {
  artparam.value.type = "双创活动";
  get_specific_articles();
};
init();
const handleSelect = key => {
  artparam.value.type = key;
  get_specific_articles();
};
let onChange = pageNumber => {
  artparam.value.page = pageNumber;
  get_specific_articles();
};
</script>
<template>
  <div>
    <el-container>
      <el-header class="p-0 border-solid border"><ReHeader /></el-header>
      <el-main class="p-0 bg-[rgba(211,220,230,0.2)] main-box pb-10">
        <el-row justify="center" class="mt-10">
          <el-col :xs="0" :sm="6" :md="4" :lg="3" :xl="1" class="mr-5">
            <el-menu
              default-active="双创活动"
              class="menu"
              active-text-color="#fff"
              @select="handleSelect"
            >
              <el-menu-item index="双创活动" class="menu-item">
                <span>双创活动</span>
              </el-menu-item>
              <el-menu-item index="新闻动态" class="menu-item">
                <span>新闻动态</span>
              </el-menu-item>
              <el-menu-item index="通知公告" class="menu-item">
                <span>通知公告</span>
              </el-menu-item>
              <el-menu-item index="政策文件" class="menu-item">
                <span>政策文件</span>
              </el-menu-item>
            </el-menu>
          </el-col>
          <el-col :sm="18" :md="20" :lg="16" :xl="17" :xs="24">
            <div class="list-box">
              <div class="list-title">
                <el-breadcrumb>
                  <el-breadcrumb-item :to="{ path: '/' }">
                    首页
                  </el-breadcrumb-item>
                  <el-breadcrumb-item>{{ artparam.type }}</el-breadcrumb-item>
                </el-breadcrumb>
              </div>
              <a-list item-layout="horizontal" :data-source="articles">
                <template #renderItem="{ item }">
                  <a-list-item class="list-item">
                    <a-list-item-meta>
                      <template #title>
                        <el-row justify="space-between">
                          <el-col :span="18" class="truncate">
                            <router-link
                              :to="{ name: 'Details', params: { id: item.id } }"
                            >
                              {{ item.title }}
                            </router-link>
                          </el-col>
                          <el-col :span="4">
                            {{ timeFormatMD(item.create_time) }}
                          </el-col>
                        </el-row>
                        <div class="truncate w-4/5 m-0"></div>
                        <div class="ml-10"></div>
                      </template>
                      <template #avatar>
                        <a-avatar :size="10"> </a-avatar>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                </template>
              </a-list>
            </div>
            <!-- <el-pagination
              background
              :current-page="artparam.page"
              :page-size="artparam.limit"
              layout="prev, pager, next"
              onUpdate:currentPage
              onUpdate:pageSize
              :total="total"
              style="margin-top: 10px"
            >
            </el-pagination> -->
            <a-pagination
              :current="artparam.page"
              :pageSize="artparam.limit"
              :total="total"
              show-less-items
              @change="onChange"
              class="mt-5"
            />
          </el-col>
        </el-row>
      </el-main>
      <el-footer style="padding: 0; margin: 0">
        <ReFooter></ReFooter>
      </el-footer>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
// 支持CSS变量注入v-bind(color)

.main-box {
  // background-color: rgb(242, 242, 242);
  .menu {
    border: #f2f2f2 1px solid;

    .is-active {
      background-color: #265db4;
    }

    .menu-item {
      border-bottom: #f2f2f2 1px solid;
    }
  }
}

.list-box {
  border: #f2f2f2 1px solid;
  border-top: 3px solid #265db4;

  .list-title {
    padding: 5px;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: #f2f2f2 1px solid;
  }
}
</style>
