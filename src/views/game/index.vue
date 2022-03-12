<script setup lang="ts">
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons-vue";
import { greetings, entryList, get_all_game_info } from "./utils/index";
get_all_game_info();
</script>

<template>
  <div>
    <el-card class="top-content">
      <p>{{ greetings }}</p>
    </el-card>
    <el-card class="entrys">
      <a-row :gutter="20" justify="space-between">
        <template v-for="(item, index) in entryList" :key="index">
          <a-col :span="7">
            <a-card hoverable style="width: 300px">
              <template #actions>
                <edit-outlined key="edit" />
                <ellipsis-outlined key="ellipsis" />
              </template>
              <a-descriptions title="User Info">
                <a-descriptions-item label="UserName"
                  >Zhou Maomao</a-descriptions-item
                >
                <a-descriptions-item label="Telephone"
                  >1810000000</a-descriptions-item
                >
                <a-descriptions-item label="Live"
                  >Hangzhou, Zhejiang</a-descriptions-item
                >
                <a-descriptions-item label="Remark">empty</a-descriptions-item>
                <a-descriptions-item label="Address">
                  No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                </a-descriptions-item>
              </a-descriptions>
            </a-card>
          </a-col>
        </template>
      </a-row>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.main-content {
  margin: 0 !important;
}

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

.entrys {
  margin-top: 20px;
}
</style>
