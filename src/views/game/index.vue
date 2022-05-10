<script setup lang="ts">
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import {
  greetings,
  entryList,
  get_all_game_info,
  isload,
  setOptions,
  identifyOptions,
  competitionTypeOptions
} from "./utils/index";
import { dialogVisible, handleClose } from "./utils/editor";
import { filterDict } from "/@/utils/format";
import editorVue from "./editor.vue";
setOptions();
const init = async () => {
  await get_all_game_info();
};
init();

const router = useRouter();
const ToDetail = id => {
  router.push({ name: "gameDetail", params: { id: id as number } });
};
</script>

<template>
  <div>
    <el-card class="top">
      <div class="top-content">
        <p>{{ greetings }}</p>
        <el-button type="success" @click="dialogVisible = true">增加</el-button>
      </div>
    </el-card>
    <el-card class="entrys" v-loading="isload">
      <a-row :gutter="10" justify="space-between">
        <template v-for="(item, index) in entryList" :key="index">
          <a-col :span="8">
            <a-card hoverable class="entry-card">
              <template #actions>
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="编辑"
                  placement="top"
                >
                  <edit-outlined key="edit" @click="ToDetail(item.ID)" />
                </el-tooltip>
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="详情"
                  placement="top"
                >
                  <ellipsis-outlined
                    key="ellipsis"
                    @click="ToDetail(item.ID)"
                  />
                </el-tooltip>
              </template>
              <a-descriptions title="参赛表" layout="vertical">
                <a-descriptions-item label="届数">
                  {{ item.competition.year }}
                </a-descriptions-item>
                <a-descriptions-item label="比赛名">
                  {{ item.competition.base_info.cName }}
                </a-descriptions-item>
                <a-descriptions-item label="比赛类型">
                  {{
                    filterDict(
                      item.competition.base_info.cType,
                      competitionTypeOptions
                    )
                  }}
                </a-descriptions-item>
                <a-descriptions-item label="队伍名">
                  {{ item.name }}
                </a-descriptions-item>
                <a-descriptions-item label="项目名">
                  {{ item.pId == 0 ? "无" : item.project?.projectName }}
                </a-descriptions-item>
              </a-descriptions>
              <a-card-meta
                :title="filterDict(item.member?.identify, identifyOptions)"
              >
                <template #avatar>
                  <a-avatar :src="item.member?.base_info.avatar" />
                </template>
              </a-card-meta>
            </a-card>
          </a-col>
        </template>
      </a-row>
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="40%"
      :before-close="handleClose"
    >
      <editorVue></editorVue>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.main-content {
  margin: 0 !important;
}

.top {
  height: 60px;
  background: #fff;
  width: 100%;

  .top-content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      margin-right: 12px;
      margin-bottom: 0;
      color: #000000d9;
      font-weight: 600;
      font-size: 20px;
      line-height: 32px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

.entrys {
  margin: 10px 10px 0;
  min-height: 500px;

  .entry-card {
    min-height: 300px;
    margin: 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
