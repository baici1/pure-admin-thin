<script setup lang="ts">
import { ref } from "vue";
import { StudentInfo } from "/@/api/model/user";
import { getStudentInfo } from "/@/api/user";
import {
  greetings,
  form,
  get_team_info,
  get_team_id,
  company,
  get_company_info,
  MemberBase,
  get_team_member_all
} from "./utils/index";
import { timeFormatYMD } from "/@/utils/tools";
const MemberDetail = ref<Array<StudentInfo>>([]);
const init = async () => {
  MemberDetail.value = [];
  await get_team_id();
  await get_team_info();
  await get_company_info();
  await get_team_member_all();
  for (let item of MemberBase.value.result) {
    const data = await getStudentInfo({
      id: item.u_id
    });
    MemberDetail.value.push(data.data);
  }
};
init();
</script>

<template>
  <div class="team">
    <!-- //页面头部信息提示 -->
    <el-card class="top-content">
      <p>{{ greetings }}</p>
    </el-card>
    <el-card class="team-card">
      <template #header>
        <div class="item-title">
          {{ form.name }}
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
      </template>
      <div class="item-container">
        <el-descriptions direction="vertical" :column="3" :border="true">
          <el-descriptions-item label="编号">
            {{ form.id }}
          </el-descriptions-item>
          <el-descriptions-item label="名称">
            {{ form.name }}
          </el-descriptions-item>
          <el-descriptions-item label="创建时间">
            {{ timeFormatYMD(form.create_time) }}
          </el-descriptions-item>
          <el-descriptions-item label="是否有公司">
            {{ form.company_id ? "有" : "无" }}
          </el-descriptions-item>
          <el-descriptions-item label="知识产权" :span="2">
            <el-tag size="small">{{ form.intellectual_property }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="团队介绍">
            {{ form.introduction }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>
    <el-card class="team-card">
      <template #header>
        <div class="item-title">
          {{ company.name }}
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
      </template>
      <div class="item-container">
        <el-descriptions direction="vertical" :column="3" :border="true">
          <el-descriptions-item label="编号">
            {{ company.id }}
          </el-descriptions-item>
          <el-descriptions-item label="名称">
            {{ company.name }}
          </el-descriptions-item>
          <el-descriptions-item label="创建时间">
            {{ timeFormatYMD(company.create_time) }}
          </el-descriptions-item>
          <el-descriptions-item label="地址">
            {{ company.address }}
          </el-descriptions-item>
          <el-descriptions-item label="团队介绍">
            {{ company.introduction }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>
    <el-card class="team-card">
      <template #header>
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
      </template>
      <div class="item-container">
        <el-table :data="MemberDetail" stripe style="width: 100%">
          <el-table-column prop="u_id" label="Date" width="180" />
          <el-table-column prop="real_name" label="Name" width="180" />
          <el-table-column prop="email" label="Address" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.main-content {
  margin: 0 !important;
}

.team {
  height: 100%;

  .top-content {
    display: flex;
    align-items: center;
    height: 60px;
    background: #fff;

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

  .team-card {
    margin: 10px;

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
</style>
