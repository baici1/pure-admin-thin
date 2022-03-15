<script setup lang="ts">
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { greetings, entryList, get_all_game_info, isload } from "./utils/index";
import { dialogVisible, handleClose } from "./utils/editor";
import { checkComStatus } from "/@/utils/tools";
import editorVue from "./editor.vue";
get_all_game_info();
const router = useRouter();
const ToDetail = id => {
  router.push({ name: "gameDetail", params: { id: id as number } });
};
const status = s => {
  if (s == 1) {
    return "队长";
  } else {
    return "队员";
  }
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
                  <edit-outlined key="edit" @click="ToDetail(item.form.id)" />
                </el-tooltip>
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="详情"
                  placement="top"
                >
                  <ellipsis-outlined
                    key="ellipsis"
                    @click="ToDetail(item.form.id)"
                  />
                </el-tooltip>
              </template>
              <a-descriptions title="参赛表" layout="vertical">
                <a-descriptions-item label="比赛名">
                  {{ item.competition.com_info.c_name }}-{{
                    item.competition.com_sche.level
                  }}
                </a-descriptions-item>
                <a-descriptions-item label="队伍名">
                  {{ item.form.name }}
                </a-descriptions-item>
                <a-descriptions-item label="项目名">
                  {{ item.form.p_id == 0 ? "无" : item.project?.project_name }}
                </a-descriptions-item>
                <a-descriptions-item label="当前进度">
                  <el-tag>{{
                    checkComStatus(
                      item.competition.com_sche.start_time,
                      item.competition.com_sche.end_time,
                      item.competition.com_sche.r_start_time,
                      item.competition.com_sche.r_end_time
                    )
                  }}</el-tag>
                </a-descriptions-item>
                <a-descriptions-item label="获奖情况">
                  {{ item.form.rank.length == 0 ? "暂无" : item.form.rank }}
                </a-descriptions-item>
                <a-descriptions-item label="获奖名称">
                  {{
                    item.form.ach_name.length == 0 ? "暂无" : item.form.ach_name
                  }}
                </a-descriptions-item>
              </a-descriptions>
              <a-card-meta :title="status(item.members.identify)">
                <template #avatar>
                  <a-avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
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
