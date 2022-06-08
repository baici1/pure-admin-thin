<script setup lang="ts">
import { useRoute } from "vue-router";
import {
  greetings,
  Info,
  get_a_game_info,
  isEdit,
  isLoading,
  getProjectInfoFunc,
  ProjectformData,
  OpenDialogProject,
  enterDialogProject,
  dialogProjectFormVisible,
  closeDialogProject,
  MembersInfo,
  getMembersInfo,
  deleteEntryMemberFunc,
  dialogFormVisibleMember,
  openDialogMember,
  formDataMember,
  closeDialogMember,
  enterDialogMember,
  updateEntryMemberFunc,
  openDialogTeacher,
  tableDataTeacher,
  deleteEntryTeacherFunc,
  getTableDataTeacher,
  dialogFormVisibleTeacher,
  closeDialogTeacher,
  enterDialogTeacher,
  formDataTeacher,
  tableDataAchievement,
  getTableDataAchievement,
  deleteAchievementFunc,
  dialogFormVisibleAchievement,
  closeDialogAchievement,
  openDialogAchievement,
  enterDialogAchievement,
  formDataAchievement,
  GetAchievementFile,
  TeachersOption,
  isEditByOwn
} from "./utils/details";
import {
  competitionTypeOptions,
  setOptions,
  identifyOptions,
  competitionStatusOptions,
  teamIdentifyOptions,
  levelOptions,
  rankOptions
} from "./utils/index";
import { filterDict, checkComStatus } from "/@/utils/format";
import { ReUpload } from "/@/components/ReComon/index";
const route = useRoute();

const init = async () => {
  await setOptions();
  await get_a_game_info(Number(route.params.id));
  await getProjectInfoFunc(Info.value.pId);
  await getMembersInfo(Info.value.ID);
  await getTableDataTeacher();
  await getTableDataAchievement();
};
init();
</script>

<template>
  <div v-loading="isLoading">
    <el-card class="top">
      <div class="top-content">
        <p>{{ greetings }}</p>
      </div>
    </el-card>
    <el-card class="entry-detail">
      <el-card class="detail-card" shadow="never">
        <el-descriptions title="比赛信息" :column="2">
          <el-descriptions-item label="比赛名称：">
            <span>{{ Info.competition?.base_info.cName }}</span>
          </el-descriptions-item>

          <el-descriptions-item label="比赛届数：">
            {{ Info.competition.version }}
          </el-descriptions-item>
          <el-descriptions-item label="比年份：">
            {{ Info.competition.year }}
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
            checkComStatus(Info.competition.startTime, Info.competition.endTime)
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
            {{ MembersInfo.length }}
          </el-descriptions-item>
          <el-descriptions-item label="队长：">{{
            MembersInfo[0]?.name
          }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-divider></el-divider>
      <el-card class="detail-card" shadow="never">
        <el-descriptions title="项目信息" :column="2">
          <template #extra>
            <el-button
              type="primary"
              @click="OpenDialogProject(Info)"
              v-if="isEditByOwn"
              >编辑</el-button
            >
          </template>
          <el-descriptions-item label="项目编号：">
            <el-input
              v-model="ProjectformData.projectCode"
              style="width: 200px"
              v-if="isEdit"
            />
            <span v-else> {{ ProjectformData.projectCode }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="项目名称：">
            <el-input
              v-model="ProjectformData.projectName"
              style="width: 200px"
              v-if="isEdit"
            />
            <span v-else>
              {{ ProjectformData.projectName }}
            </span>
          </el-descriptions-item>
          <el-descriptions-item label="项目介绍：">
            <el-input
              v-model="ProjectformData.introduction"
              style="width: 200px"
              v-if="isEdit"
            />
            <span v-else>{{ ProjectformData.introduction }}</span>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card class="detail-card" shadow="never">
        <template #header>
          <div class="card-header">
            <div class="card-title">队员信息</div>
            <el-button
              type="primary"
              @click="openDialogMember"
              v-if="isEditByOwn"
            >
              新增队员
            </el-button>
          </div>
        </template>
        <el-table :data="(MembersInfo as any)" stripe style="width: 100%">
          <el-table-column type="index" width="50" label="#" />
          <el-table-column label="手机号">
            <template #default="scope">
              {{ scope.row.phone }}
            </template>
          </el-table-column>
          <el-table-column label="职位">
            <template #default="scope">
              {{ filterDict(scope.row.identify, identifyOptions) }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" />
          <el-table-column fixed="right" label="Operations" width="180">
            <template #default="scope">
              <el-button
                type="text"
                size="small"
                @click="updateEntryMemberFunc(scope.row)"
                :disabled="scope.$index == 0"
                v-if="isEditByOwn"
              >
                更改
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="deleteEntryMemberFunc(scope.row)"
                :disabled="scope.$index == 0"
                v-if="isEditByOwn"
              >
                删除
              </el-button>
              <el-button type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card class="detail-card" shadow="never">
        <template #header>
          <div class="card-header">
            <div class="card-title">指导老师信息</div>
            <el-button
              type="primary"
              @click="openDialogTeacher"
              v-if="isEditByOwn"
            >
              新增老师
            </el-button>
          </div>
        </template>
        <el-table :data="(tableDataTeacher as any)" stripe style="width: 100%">
          <el-table-column type="index" width="50" label="#" />
          <el-table-column label="姓名">
            <template #default="scope">
              {{ scope.row.realName }}
            </template>
          </el-table-column>
          <el-table-column label="电话">
            <template #default="scope">
              {{ scope.row.phone }}
            </template>
          </el-table-column>
          <el-table-column label="邮箱">
            <template #default="scope">
              {{ scope.row.email }}
            </template>
          </el-table-column>
          <el-table-column label="方向">
            <template #default="scope">
              {{ scope.row.major }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="Operations" width="180">
            <template #default="scope">
              <el-button
                type="text"
                size="small"
                @click="deleteEntryTeacherFunc(scope.row)"
                v-if="isEditByOwn"
              >
                删除
              </el-button>
              <el-button type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card class="detail-card" shadow="never">
        <template #header>
          <div class="card-header">
            <div class="card-title">获奖信息</div>
            <el-button
              type="primary"
              @click="openDialogAchievement"
              v-if="isEditByOwn"
            >
              新增获奖
            </el-button>
          </div>
        </template>
        <el-table
          :data="(tableDataAchievement as any)"
          stripe
          style="width: 100%"
        >
          <el-table-column type="index" width="50" label="#" />

          <el-table-column label="赛事级别">
            <template #default="scope">
              {{ filterDict(scope.row.match, levelOptions) }}
            </template>
          </el-table-column>
          <el-table-column label="获奖级别">
            <template #default="scope">
              {{ filterDict(scope.row.rank, rankOptions) }}
            </template>
          </el-table-column>
          <el-table-column label="附件">
            <template #default="scope">
              <el-link :href="scope.row.url" target="_blank" type="primary">
                下载文件
              </el-link>
            </template>
          </el-table-column>
          <el-table-column label="审核">
            <template #default="scope">
              <el-tag :type="scope.row.check ? 'success' : 'warning'">
                {{ scope.row.check ? "通过" : "未通过" }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="Operations"
            width="180"
            v-if="isEditByOwn"
          >
            <template #default="scope">
              <el-button
                type="text"
                size="small"
                @click="deleteAchievementFunc(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-card>
    <el-dialog
      v-model="dialogProjectFormVisible"
      :before-close="closeDialogProject"
      title="弹窗操作"
    >
      <el-form
        :model="ProjectformData"
        label-position="right"
        label-width="80px"
      >
        <el-form-item label="项目编号:">
          <el-input
            v-model="ProjectformData.projectCode"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="项目名称:">
          <el-input
            v-model="ProjectformData.projectName"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="项目简介:">
          <el-input
            v-model="ProjectformData.introduction"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="备注:">
          <el-input
            v-model="ProjectformData.remark"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialogProject">取 消</el-button>
          <el-button type="primary" @click="enterDialogProject">
            确 定
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="dialogFormVisibleMember"
      :before-close="closeDialogMember"
      title="弹窗操作"
    >
      <el-form
        :model="formDataMember"
        label-position="right"
        label-width="80px"
      >
        <el-form-item label="手机号:">
          <el-input
            v-model.number="formDataMember.phone"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="身份:">
          <el-select
            v-model="formDataMember.identify"
            placeholder="请选择"
            style="width: 100%"
            clearable
          >
            <el-option
              v-for="(item, key) in teamIdentifyOptions"
              :key="key"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" @click="closeDialogMember">取 消</el-button>
          <el-button
            size="small"
            type="primary"
            @click="enterDialogMember(formDataMember.phone)"
          >
            确 定
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="dialogFormVisibleTeacher"
      :before-close="closeDialogTeacher"
      title="弹窗操作"
    >
      <el-form :model="formDataTeacher" label-position="right">
        <el-form-item label="老师id:">
          <el-select
            v-model="formDataTeacher.tId"
            class="m-2"
            placeholder="Select"
            size="large"
          >
            <el-option
              v-for="item in TeachersOption"
              :key="item.ID"
              :label="item.realName"
              :value="item.ID"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" @click="closeDialogTeacher">取 消</el-button>
          <el-button size="small" type="primary" @click="enterDialogTeacher">
            确 定
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="dialogFormVisibleAchievement"
      :before-close="closeDialogAchievement"
      title="弹窗操作"
      destroy-on-close
    >
      <el-form
        :model="formDataAchievement"
        label-position="right"
        label-width="80px"
      >
        <el-form-item label="赛事级别:">
          <el-select
            v-model="formDataAchievement.match"
            placeholder="请选择"
            style="width: 100%"
            clearable
          >
            <el-option
              v-for="(item, key) in levelOptions"
              :key="key"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="获奖级别:">
          <el-select
            v-model="formDataAchievement.rank"
            placeholder="请选择"
            style="width: 100%"
            clearable
          >
            <el-option
              v-for="(item, key) in rankOptions"
              :key="key"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input
            v-model="formDataAchievement.remark"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="成果附件:">
          <ReUpload
            @uploadURL="GetAchievementFile"
            style="width: 100%"
          ></ReUpload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" @click="closeDialogAchievement">
            取 消
          </el-button>
          <el-button
            size="small"
            type="primary"
            @click="enterDialogAchievement"
            :disabled="formDataAchievement.urlId == 0"
          >
            确 定
          </el-button>
        </div>
      </template>
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
