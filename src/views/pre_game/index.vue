<script setup lang="ts">
import { ReHeader, ReFooter } from "/@/components/ReComon";
import bannerVue from "./components/banner.vue";
import { checkComStatus, timeFormatYMD, filterDict } from "/@/utils/format";
import {
  getSearchStr,
  get_competition,
  competition,
  loading,
  isMore,
  handleSelect,
  loadingMore,
  loadMore,
  setOptions,
  levelOptions,
  competitionTypeOptions,
  competitionStatusOptions
} from "./utils/index";
get_competition();
setOptions();
</script>

<template>
  <div>
    <el-container>
      <el-header class="p-0 border-solid border"><ReHeader /></el-header>
      <el-main class="p-0 bg-[rgba(211,220,230,0.2)]">
        <el-row justify="center">
          <el-col :span="24">
            <bannerVue @get-search-str="getSearchStr"></bannerVue>
          </el-col>
        </el-row>
        <el-row justify="center" class="bg-white">
          <el-col :span="16" :xs="22">
            <el-menu
              default-active="0"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              :ellipsis="false"
            >
              <el-menu-item index="0">全部</el-menu-item>
              <el-menu-item
                v-for="(item, index) of competitionStatusOptions"
                :key="item.value"
                :index="(index + 1).toString()"
                >{{ item.label }}
              </el-menu-item>
            </el-menu>
            <!-- <n-tabs default-value="signin" size="large">
              <n-tab-pane name="signin" tab="登录">DENGLU </n-tab-pane>
              <n-tab-pane name="signup" tab="注册"> ZHUVC</n-tab-pane>
            </n-tabs> -->
          </el-col>
        </el-row>
        <el-row justify="center" style="background: rgb(242, 242, 242)">
          <el-col :span="14" :xs="22">
            <a-list
              item-layout="vertical"
              :data-source="competition"
              :loading="loading"
              class="game-list"
            >
              <template #loadMore>
                <div
                  v-if="isMore"
                  :style="{
                    textAlign: 'center',
                    margin: '12px 0',
                    height: '32px',
                    lineHeight: '32px'
                  }"
                >
                  <a-spin v-if="loadingMore" />
                  <a-button v-else @click="loadMore">加载更多</a-button>
                </div>
              </template>
              <template #renderItem="{ item }">
                <el-card class="game-card">
                  <a-list-item>
                    <a-list-item-meta>
                      <template #title>
                        <a
                          href="https://www.antdv.com/"
                          class="game-item-title"
                        >
                          {{ item.base_info.cName }}
                          <el-tag
                            type="success"
                            size="small"
                            style="margin-left: 5px"
                            >{{
                              checkComStatus(
                                item.startTime,
                                item.endTime,
                                item.rStartTime,
                                item.rEndTime
                              )
                            }}</el-tag
                          >
                          <el-tag
                            type="info"
                            size="small"
                            style="margin-left: 5px"
                            >{{
                              filterDict(
                                item.base_info.cType,
                                competitionTypeOptions
                              )
                            }}类赛事</el-tag
                          >
                          <el-tag
                            type="info"
                            size="small"
                            style="margin-left: 5px"
                            >{{ filterDict(item.level, levelOptions) }}</el-tag
                          >
                        </a>
                        <div>
                          <p
                            style="
                              font-size: 14px;
                              color: rgb(102, 102, 102);
                              max-width: 95%;
                            "
                          >
                            {{ item.base_info.introduction }}
                          </p>
                          <p
                            style="
                              margin-top: 6px;
                              font-size: 12px;
                              color: rgb(136, 136, 136);
                            "
                          >
                            报名时间： {{ timeFormatYMD(item.startTime) }}
                            <el-divider direction="vertical"></el-divider>
                            截止时间：{{ timeFormatYMD(item.endTime) }}
                            <el-divider direction="vertical"></el-divider>
                            举办方：{{ item.base_info.organizer }}
                          </p>
                        </div>
                      </template>
                      <template #avatar>
                        <a-avatar
                          shape="square"
                          src="https://ali-cdn.educoder.net/images/avatars/Competition/3?t=1591925435"
                          class="game-item-img"
                        />
                      </template>
                    </a-list-item-meta>
                    <template #extra>
                      <div class="game-extra">
                        <el-button :disabled="item.isdisabled"
                          >参与报名</el-button
                        >
                      </div>
                      <div class="game-extra">
                        <el-button :disabled="item.isdisabled"
                          ><el-link
                            :href="item.base_info.url"
                            target="_blank"
                            :underline="false"
                            >前往官网</el-link
                          ></el-button
                        >
                      </div>
                    </template>
                  </a-list-item>
                </el-card>
              </template>
            </a-list>
          </el-col>
        </el-row>
      </el-main>
      <el-footer style="padding: 0; margin: 0">
        <ReFooter></ReFooter>
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.game-list {
  margin-top: 20px;
  min-height: 400px;

  .game-card {
    margin: 20px 0;
    border-radius: 5px;

    .el-card__body {
      padding: 0;
    }

    .game-item-title {
      font-size: 20px;
      color: #05101a;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 80%;
    }

    .game-item-img {
      width: 200px;
      height: 100px;
      border-radius: 5px;
    }
  }
}

.game-extra {
  margin: 10px 0;
}
@media screen and (max-width: 768px) {
  .game-list {
    margin-top: 20px;

    .game-card {
      .game-item-img {
        display: none;
        width: 100px;
        height: 50px;
        border-radius: 5px;
      }
    }
  }
}
</style>
