<script setup lang="ts">
import { useRoute } from "vue-router";
import { onBeforeMount } from "vue";
import {
  greetings,
  Info,
  get_a_game_info,
  isEdit,
  read_student_base_info,
  MembersInfo,
  addMember,
  deleteMember,
  SaveInfo,
  isLoading
} from "./utils/details";
import {
  levelOptions,
  competitionTypeOptions,
  rankOptions,
  setOptions,
  identifyOptions,
  competitionStatusOptions
} from "./utils/index";
import { filterDict, checkComStatus } from "/@/utils/format";
const route = useRoute();

const init = async () => {
  await setOptions();
  await get_a_game_info(Number(route.params.id));
  await read_student_base_info();
  console.log(
    "%c 🍗 checkComStatus(): ",
    "font-size:20px;background-color: #EA7E5C;color:#fff;",
    checkComStatus(
      Info.value.competition.startTime,
      Info.value.competition.endTime,
      Info.value.competition.rStartTime,
      Info.value.competition.rEndTime
    )
  );
};
init();
onBeforeMount(() => {
  isEdit.value = false;
});
</script>

<template>
  <div v-loading="isLoading">
    <el-card class="top">
      <div class="top-content">
        <p>{{ greetings }}</p>
        <el-button v-if="!isEdit" @click="isEdit = true">编辑</el-button>
        <el-button v-else @click="SaveInfo">保存</el-button>
      </div>
    </el-card>
    <el-card class="entry-detail">
      <el-card class="detail-card" shadow="never">
        <el-descriptions title="比赛信息" :column="2">
          <el-descriptions-item label="比赛名称：">
            <span>{{ Info.competition?.base_info.cName }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="比赛级别：">
            {{ filterDict(Info.competition.level, levelOptions) }}
          </el-descriptions-item>
          <el-descriptions-item label="比赛届数：">
            {{ Info.competition.version }}
          </el-descriptions-item>
          <el-descriptions-item label="比赛类型：">
            {{
              filterDict(
                Info.competition.base_info.cType,
                competitionTypeOptions
              )
            }}
          </el-descriptions-item>
          <el-descriptions-item label="比赛举办方：">
            {{ Info.competition.base_info.organizer }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card class="detail-card" shadow="never">
        <template #header>
          <div class="card-header">参赛进度</div>
        </template>
        <el-steps
          :active="
            checkComStatus(
              Info.competition.startTime,
              Info.competition.endTime,
              Info.competition.rStartTime,
              Info.competition.rEndTime
            )
          "
          align-center
          class="card-step"
          finish-status="success"
        >
          <el-step
            v-for="(item, index) of competitionStatusOptions"
            :key="index"
            :title="item.label"
          ></el-step>
          <!-- <el-step
            title="未开始"
            description="比赛未开始，请详细关注通知！"
          ></el-step>
          <el-step title="报名中" description="请抓紧报名！"></el-step>
          <el-step title="准备中" description="万全的准备是必要的！"></el-step>
          <el-step title="参赛中" description="祝你比赛顺利！"></el-step>
          <el-step
            title="已结束"
            description="祝你比赛结果超过你的预期！"
          ></el-step> -->
        </el-steps>
      </el-card>
      <el-divider></el-divider>
      <el-card class="detail-card" shadow="never">
        <el-descriptions title="参赛表信息" :column="2">
          <el-descriptions-item label="队伍名称：" :span="2">
            <el-input v-model="Info.name" style="width: 200px" v-if="isEdit" />
            <span v-else>
              {{ Info.name }}
            </span>
          </el-descriptions-item>
          <el-descriptions-item label="队伍人数：">
            {{ MembersInfo.length }}</el-descriptions-item
          >
          <el-descriptions-item label="队长：">{{
            MembersInfo[0]?.name
          }}</el-descriptions-item>
          <el-descriptions-item label="获奖情况：">
            <el-tag size="small">{{
              filterDict(Info.rank, rankOptions)
            }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="获奖名称：">
            {{ Info.achName.length == 0 ? "无" : Info.achName }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-divider></el-divider>
      <el-card class="detail-card" shadow="never">
        <el-descriptions title="项目信息" :column="2">
          <el-descriptions-item label="项目编号：">
            <el-input
              v-model="Info.project.projectCode"
              style="width: 200px"
              v-if="isEdit"
            />
            <span v-else> {{ Info.project.projectCode }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="项目名称：">
            <el-input
              v-model="Info.project.projectName"
              style="width: 200px"
              v-if="isEdit"
            />
            <span v-else>
              {{ Info.project.projectName }}
            </span>
          </el-descriptions-item>
          <el-descriptions-item label="项目介绍：">
            <el-input
              v-model="Info.project.introduction"
              style="width: 200px"
              v-if="isEdit"
            />
            <span v-else>{{ Info.project.introduction }}</span>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card class="detail-card" shadow="never">
        <template #header>
          <div class="card-header">
            <div class="card-title">队员信息</div>
            <el-button type="primary" v-show="isEdit" @click="addMember">
              新增队员
            </el-button>
          </div>
        </template>
        <el-table :data="(MembersInfo as any)" stripe style="width: 100%">
          <el-table-column type="index" width="50" label="#" />
          <el-table-column label="手机号">
            <template #default="scope">
              <el-input v-model="scope.row.phone" v-if="isEdit" />
              <span v-else>{{ scope.row.phone }}</span>
            </template>
          </el-table-column>
          <el-table-column label="职位">
            <template #default="scope">
              <el-select
                v-model="scope.row.identify"
                placeholder="请选择"
                v-if="isEdit"
              >
                <el-option key="leader" :value="2" label="副队长" />
                <el-option key="member" :value="3" label="队员" />
              </el-select>
              <span v-else>{{
                filterDict(scope.row.identify, identifyOptions)
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" />
          <el-table-column
            fixed="right"
            label="Operations"
            width="120"
            v-if="isEdit == true"
          >
            <template #default="scope">
              <el-button
                type="text"
                size="small"
                @click="deleteMember(MembersInfo, scope.$index)"
              >
                删除
              </el-button>
              <el-button type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-card>
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

.detail-card {
  border: none;
  margin-bottom: 20px;

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .card-title {
      color: var(--el-text-color-primary);
      font-size: 16px;
      font-weight: 700;
    }
  }

  .card-step {
    padding: 20px 0;
  }
}

.entry-detail {
  margin: 10px;
}
</style>
