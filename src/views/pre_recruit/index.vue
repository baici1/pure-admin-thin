<script setup lang="ts">
import { ReHeader, ReFooter } from "/@/components/ReComon";
import {
  pageStu,
  totalStu,
  pageSizeStu,
  tableDataStu,
  getTableDataStu,
  handleCurrentChangeStu,
  get_competition_time_list,
  times
} from "./index";
import { ref } from "vue";
const init = async () => {
  await getTableDataStu();
  await get_competition_time_list();
  let data = loadAll();
  restaurants.value.push(...data);
};
init();
//==================学生比赛搜索区域================
interface RestaurantItem {
  value: number;
  label: string;
}
const comID = ref(undefined);

const restaurants = ref<RestaurantItem[]>([]);
const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value;
  // call callback function to return suggestions
  cb(results);
};
const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return (
      restaurant.label.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    );
  };
};
const loadAll = () => {
  let lists = [] as Array<RestaurantItem>;
  console.log(
    "%c 🥒 times: ",
    "font-size:20px;background-color: #7F2B82;color:#fff;",
    times.value
  );
  for (let item of times.value) {
    lists.push({
      value: item.ID,
      label: item?.base_info.cName
    } as RestaurantItem);
  }
  console.log(
    "%c 🍓 lists: ",
    "font-size:20px;background-color: #E41A6A;color:#fff;",
    lists
  );
  return lists;
};

const handleSelect = (item: RestaurantItem) => {
  getTableDataStu(item.value);
};
</script>

<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
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
                      <el-autocomplete
                        v-model="comID"
                        :fetch-suggestions="querySearch"
                        clearable
                        class="inline-input w-100"
                        placeholder="请输入比赛"
                        @select="handleSelect"
                        value-key="label"
                        highlight-first-item
                      >
                        <template #append>
                          <el-button @click="init">
                            <template #icon>
                              <iconify-icon-offline
                                icon="search"
                              ></iconify-icon-offline>
                            </template>
                          </el-button>
                        </template>
                      </el-autocomplete>
                    </el-col>
                  </el-row>
                </div>
              </template>
              <el-row :gutter="30">
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

        <el-row justify="center" class="mt-5">
          <el-col :span="22">
            <el-card shadow="never">
              <template #header>
                <div class="card-header">
                  <el-row>
                    <el-col :span="3"> <span>老师项目</span></el-col>
                    <el-col :span="10">
                      <el-autocomplete
                        v-model="comID"
                        :fetch-suggestions="querySearch"
                        clearable
                        class="inline-input w-100"
                        placeholder="Please Input"
                        @select="handleSelect"
                        value-key="label"
                        highlight-first-item
                      >
                        <template #append>
                          <el-button @click="init">
                            <template #icon>
                              <iconify-icon-offline
                                icon="search"
                              ></iconify-icon-offline>
                            </template>
                          </el-button>
                        </template>
                      </el-autocomplete>
                    </el-col>
                  </el-row>
                </div>
              </template>
              <el-row :gutter="30">
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
      </el-main>
      <el-footer style="padding: 0; margin: 0" height="160px">
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
