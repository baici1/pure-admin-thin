<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { ReHeader, ReFooter } from "/@/components/ReComon";
import {
  findRecruitByID,
  recruitData,
  dialogFormVisible,
  openDialog,
  closeDialog,
  enterDialog,
  formData,
  rules
} from "./index";
import type { FormInstance } from "element-plus";
const ruleFormRef = ref<FormInstance>();
const route = useRoute();
findRecruitByID(route.params.id);
</script>

<template>
  <div>
    <el-container direction="vertical">
      <el-header class="p-0 border-solid border">
        <ReHeader :index="5" />
      </el-header>
      <el-main class="p-0 bg-[rgba(211,220,230,0.2)]" style="min-height: 700px">
        <div>
          <el-row justify="center" class="mt-5">
            <el-col :span="14">
              <el-card>
                <template #header>
                  <div class="recruit-header">
                    <div>
                      <span class="text-2xl font-bold">
                        {{ recruitData.title }}
                      </span>
                      <span class="text-lg text-red-500 ml-4">
                        还需 {{ recruitData.num }} 人
                      </span>
                    </div>

                    <el-button type="success" @click="openDialog">
                      立即申请
                    </el-button>
                  </div>
                </template>
                <div class="recruit-pusher">
                  <div style="display: flex; align-items: center">
                    <el-avatar :src="recruitData.member?.avatar" />
                    <span class="ml-5">{{ recruitData.member?.realName }}</span>
                  </div>
                  <div>
                    联系方式：{{ recruitData.member?.QQ }}
                    <el-divider direction="vertical" />
                    {{ recruitData.member?.email }}
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row justify="center" class="mt-3 mb-5">
            <el-col :span="14">
              <el-card>
                <p class="text-xl font-semibold">职责：</p>
                <div class="mt-5 mb-5">
                  {{ recruitData.introduce }}
                </div>
                <p class="text-xl font-semibold">要求：</p>
                <div class="mt-5 mb-5">
                  {{ recruitData.need }}
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-main>
      <el-footer style="padding: 0; margin: 0" height="165px">
        <ReFooter></ReFooter>
      </el-footer>
    </el-container>
    <el-dialog
      v-model="dialogFormVisible"
      :before-close="closeDialog"
      title="发起申请"
      top="5vh"
    >
      <el-alert
        title="建议将信息填完全，这样对方可以更好的认识您！"
        type="warning"
        effect="dark"
        class="mb-5"
        :closable="false"
      />
      <el-form
        ref="ruleFormRef"
        :rules="rules"
        :model="formData"
        label-position="right"
        label-width="80px"
      >
        <el-form-item label="学号:">
          <el-input
            v-model="formData.producer.studentId"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="姓名:" prop="realName">
          <el-input
            v-model="formData.producer.realName"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="性别:">
          <el-input
            v-model="formData.producer.gender"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="学历:">
          <el-input
            v-model="formData.producer.degree"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="年级:">
          <el-input
            v-model="formData.producer.grade"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="学院:">
          <el-input
            v-model="formData.producer.department"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="专业:">
          <el-input
            v-model="formData.producer.major"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="班级:">
          <el-input
            v-model="formData.producer.classNum"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="QQ:" prop="QQ">
          <el-input
            v-model="formData.producer.QQ"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="微信:" prop="wechat">
          <el-input
            v-model="formData.producer.wechat"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="介绍:">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 6 }"
            v-model="formData.producer.introduction"
            maxlength="100"
            show-word-limit
            clearable
            placeholder="请输入"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" @click="closeDialog">取 消</el-button>
          <el-button
            size="small"
            type="primary"
            @click="enterDialog(ruleFormRef)"
          >
            确 定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.recruit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.recruit-pusher {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
