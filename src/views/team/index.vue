<script setup lang="ts">
import { computed } from "vue";
import {
  greetings,
  get_team_info,
  get_team_id,
  company,
  form,
  get_company_info,
  get_team_member_all,
  delete_team_member,
  isEditMember,
  update_team_member,
  MemberDetail,
  setOptions
} from "./utils/index";
import {
  dialogVisibleCompany,
  dialogVisibleTeam,
  handleCloseCompany,
  handleCloseTeam,
  dialogVisibleCreateTeam,
  handleCloseCreateTeam,
  dialogVisibleMember,
  handleCloseMember
} from "./utils/editor";
import { timeFormatYMD } from "/@/utils/format";
//import { useRouter } from "vue-router";
import companyVue from "./components/company.vue";
import teamVue from "./components/team.vue";
import createVue from "./components/create.vue";
import memberVue from "./components/member.vue";
import successVue from "./components/success.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const init = async () => {
  await get_team_id();
  await get_team_info();
  await get_company_info();
  await get_team_member_all();
  if (form.value.check != 1) {
    router.push({ path: "/team/success", query: { check: form.value.check } });
    return;
  }
  console.log(form.value);
};
init();

const isEditor = computed(() => {
  if (form.value.companyId) {
    return true;
  }
  return false;
});
const isEditorStr = computed(() => {
  if (form.value?.companyId > 0) {
    return "修改公司";
  }
  return "创建公司";
});
setOptions();
</script>

<template>
  <div>
    <div class="team" v-if="form.check != 1">
      <!-- //页面头部信息提示 -->
      <el-card class="top">
        <div class="top-content flex justify-between">
          <p>{{ greetings }}</p>
          <el-button
            @click="dialogVisibleCreateTeam = true"
            v-if="form?.ID ? false : true"
          >
            创建
          </el-button>
        </div>
      </el-card>
      <el-card class="team-card" v-if="form">
        <template #header>
          <div class="item">
            <div class="item-title">
              团队基本信息
              <el-tooltip
                class="box-item"
                effect="dark"
                content="如果信息有问题，请找管理员！"
                placement="top"
              >
                <el-button type="text" color="#fff">
                  <IconifyIconOffline icon="question"></IconifyIconOffline
                ></el-button>
              </el-tooltip>
            </div>
            <el-button
              type="text"
              @click="dialogVisibleTeam = true"
              v-if="form.ID"
              >编辑</el-button
            >
          </div>
        </template>
        <div class="item-container">
          <el-empty description="无" v-if="form.ID == 0"></el-empty>
          <el-descriptions
            direction="vertical"
            v-else
            :column="3"
            :border="true"
          >
            <el-descriptions-item label="编号">
              {{ 0 || form.ID }}
            </el-descriptions-item>
            <el-descriptions-item label="名称">
              {{ form.name || "" }}
            </el-descriptions-item>
            <el-descriptions-item label="创建时间">
              {{ timeFormatYMD(form.CreatedAt) }}
            </el-descriptions-item>
            <el-descriptions-item label="是否有公司">
              {{ form.companyId ? "有" : "无" }}
            </el-descriptions-item>
            <el-descriptions-item label="知识产权" :span="2">
              <el-tag size="small">{{
                form.intellectualProperty || ""
              }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="团队介绍">
              {{ form.introduction || "" }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-card>
      <el-card class="team-card">
        <template #header>
          <div class="item">
            <div class="item-title">
              企业基本信息
              <el-tooltip
                class="box-item"
                effect="dark"
                content="添加完成后，自行关闭！"
                placement="top"
              >
                <el-button type="text" color="#fff">
                  <IconifyIconOffline icon="question"></IconifyIconOffline
                ></el-button>
              </el-tooltip>
            </div>
            <el-button type="text" @click="dialogVisibleCompany = true">{{
              isEditor ? "编辑" : "创建"
            }}</el-button>
          </div>
        </template>
        <!-- <el-empty description="无"></el-empty> -->
        <el-steps
          :active="company.check"
          align-center
          v-if="company.check != 1"
        >
          <el-step title="提交成功" description="Some description"></el-step>
          <el-step title="审核中" description="Some description"></el-step>
          <el-step title="审查中" description="Some description"></el-step>
          <el-step title="完成" description="Some description"></el-step>
        </el-steps>
        <div class="item-container" v-else>
          <el-descriptions direction="vertical" :column="3" :border="true">
            <el-descriptions-item label="编号">
              {{ company.ID }}
            </el-descriptions-item>
            <el-descriptions-item label="名称">
              {{ company.name }}
            </el-descriptions-item>
            <el-descriptions-item label="创建时间">
              {{ timeFormatYMD(company.CreatedAt) }}
            </el-descriptions-item>
            <el-descriptions-item label="地址">
              {{ company.address }}
            </el-descriptions-item>
            <el-descriptions-item label="公司介绍">
              {{ company.introduction }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-card>
      <el-card class="team-card">
        <template #header>
          <div class="item">
            <div class="item-title">
              团队成员
              <el-tooltip
                class="box-item"
                effect="dark"
                content="如果信息有问题，请找管理员！"
                placement="top"
              >
                <el-button type="text" color="#fff">
                  <IconifyIconOffline icon="question"></IconifyIconOffline
                ></el-button>
              </el-tooltip>
            </div>
            <el-button type="text" @click="dialogVisibleMember = true">
              增加队员
            </el-button>
          </div>
        </template>
        <div class="item-container">
          <el-table :data="MemberDetail" stripe style="width: 100%">
            <el-table-column prop="ID" label="Date" width="180" />
            <el-table-column prop="phone" label="手机号" width="180" />
            <el-table-column label="身份" width="180">
              <template #default="scope">
                <el-select
                  v-model="scope.row.identify"
                  placeholder="请选择"
                  v-if="isEditMember"
                >
                  <el-option key="leader" :value="2" label="副队长" />
                  <el-option key="member" :value="3" label="队员" />
                </el-select>
                <span v-else>{{ scope.row.identify }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="名字" />
            <el-table-column label="Operations">
              <template #default="scope">
                <el-button
                  size="small"
                  @click="isEditMember = true"
                  v-show="!isEditMember"
                >
                  更新
                </el-button>
                <el-button
                  size="small"
                  v-show="isEditMember"
                  @click="update_team_member(scope.$index)"
                >
                  保存
                </el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="delete_team_member(scope.row.ID)"
                >
                  删除
                </el-button>
                <el-button size="small" type="info">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-dialog
        v-model="dialogVisibleCompany"
        :title="isEditorStr"
        width="50%"
        :before-close="handleCloseCompany"
      >
        <companyVue :is-editor="isEditor" :team_id="form.ID"></companyVue>
      </el-dialog>
      <el-dialog
        v-model="dialogVisibleTeam"
        :title="isEditorStr"
        width="50%"
        :before-close="handleCloseTeam"
      >
        <team-vue></team-vue>
      </el-dialog>
      <el-dialog
        v-model="dialogVisibleCreateTeam"
        :title="isEditorStr"
        width="50%"
        :before-close="handleCloseCreateTeam"
      >
        <createVue></createVue>
      </el-dialog>
      <el-dialog
        v-model="dialogVisibleMember"
        :title="isEditorStr"
        width="50%"
        :before-close="handleCloseMember"
      >
        <memberVue :team_id="form.ID"></memberVue>
      </el-dialog>
    </div>
    <success-vue :check="form.check" v-else></success-vue>
  </div>
</template>

<style lang="scss" scoped>
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

.team {
  height: 100%;

  .team-card {
    margin: 10px;

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .item-title {
        margin-left: 10px;
        display: flex;
        align-items: center;
        font-weight: 400;
        font-size: 18px;

        svg {
          margin-left: 5px;
        }

        .box-item {
          width: 110px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
