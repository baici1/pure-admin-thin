<script setup lang="ts">
import { ReHeader, ReFooter } from "/@/components/ReComon";
import {
  pageStu,
  totalStu,
  pageSizeStu,
  tableDataStu,
  getTableDataStu,
  handleCurrentChangeStu,
  searchInfoStu
} from "./index";
const init = async () => {
  getTableDataStu();
};
init();
</script>

<template>
  <div>
    <el-container>
      <el-header class="p-0 border-solid border">
        <ReHeader :index="5" />
      </el-header>
      <el-main style="padding: 0; background-color: rgb(247, 248, 249)">
        <el-row justify="center" class="mt-5">
          <el-col :span="22">
            <el-card shadow="never">
              <template #header>
                <div class="card-header">
                  <el-row>
                    <el-col :span="3"> <span>学生组队</span></el-col>
                    <el-col :span="10">
                      <el-input
                        v-model="searchInfoStu"
                        placeholder="Please input"
                      >
                        <template #append>
                          <el-button>
                            <template #icon>
                              <iconify-icon-offline
                                icon="search"
                              ></iconify-icon-offline>
                            </template>
                          </el-button>
                        </template> </el-input
                    ></el-col>
                  </el-row>
                </div>
              </template>

              招聘 两块部分 1.块部分是学生的组队招聘卡片
              <el-row>
                <el-col
                  :span="4"
                  v-for="(item, index) in tableDataStu"
                  :key="index"
                >
                  <el-card
                    class="stu-recruit"
                    shadow="hover"
                    :body-style="{ padding: '10px' }"
                  >
                    <router-link
                      class="w-full h-full"
                      :to="{
                        name: 'PreRecuritDetail',
                        params: { id: item.ID }
                      }"
                    >
                      <div class="flex justify-between">
                        <div>{{ item.title }}</div>
                        <div class="text-red-500">还需 {{ item.num }} 人</div>
                      </div>
                      <div
                        class="mt-2 mb-5"
                        style="font-size: 12px; color: rgb(187, 187, 187)"
                      >
                        {{ item.competition.base_info.cName }}
                      </div>
                      <div class="pusher">
                        <div>
                          <el-avatar :src="item.member.avatar" />
                        </div>
                        <div class="ml-3">
                          {{ item.member.realName }}
                        </div>
                      </div>
                    </router-link>
                  </el-card>
                </el-col>
              </el-row>
              <div class="mt-5">
                <el-pagination
                  layout="total, prev, pager, next, jumper"
                  :current-page="pageStu"
                  :page-size="pageSizeStu"
                  :total="totalStu"
                  @current-change="handleCurrentChangeStu"
                />
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-row justify="center">
          <el-col :span="22">
            <el-card> 2.块部分是老师项目的招聘卡片</el-card>
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
.stu-recruit {
  border-radius: 1rem;
  background-color: rgb(247, 248, 249);
}

.stu-recruit:hover {
  background-color: white;
}

.pusher {
  display: flex;
  align-items: center;
}
</style>
