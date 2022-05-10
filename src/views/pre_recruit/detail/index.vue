<script setup lang="ts">
import { ReHeader, ReFooter } from "/@/components/ReComon";
</script>

<template>
  <div style="height: 100%">
    <el-container style="height: 100%" direction="vertical">
      <el-header class="p-0 border-solid border">
        <ReHeader :index="5" />
      </el-header>
      <el-main class="p-0 bg-[rgba(211,220,230,0.2)]">
        <el-row justify="center" class="mt-5">
          <el-col :span="14">
            <el-card>
              <template #header>
                <div class="recruit-header">
                  <span class="text-xl font-bold">开发人员</span>
                  <el-button type="success"> 立即申请</el-button>
                </div>
              </template>
              <div class="recruit-pusher">
                <div style="display: flex; align-items: center">
                  <el-avatar
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <span class="ml-5">胡先生</span>
                </div>
                <div>联系方式：249337001</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row justify="center" class="mt-3 mb-5">
          <el-col :span="14">
            <el-card>
              <div>
                介绍： 团队融洽，工作氛围较好，欢迎投递
                1、字节跳动商业化技术团队，负责商业变现，为公司年度收入目标而奋斗；
                2、参与字节跳动广告系统、电商生态、垂直业务等相关产品前端开发工作；
                3、参与广告系统中台、基础设施、商业变现的流量入口的前端研发工作；
              </div>
              <div>
                岗位要求 1、计算机相关专业，本科及以上学历；
                2、良好的算法、数据结构基础，熟悉计算机操作系统、网络、数据库等课程，至少熟悉一门编程语言；
                3、对主流前端框架（React\Vue\Angular等）有一定了解，对服务端（Nodejs\Java\Python\Go等）有一定实际的开发经验的优先；
              </div>
            </el-card>
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

html,
body,
#app,
.el-contaniner {
  padding: 0;
  margin: 0;
  height: 100%;
}
</style>
