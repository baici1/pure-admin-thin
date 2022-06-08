<script setup lang="ts">
import { computed, onMounted } from "vue";
import { ReBar, RePie } from "/@/components/ReCharts/index";
import { loading, form, get_student_info } from "./utils/welcome";
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import { storageLocal } from "/@/utils/storage";
get_student_info();
const date: Date = new Date();
let greetings = computed(() => {
  if (date.getHours() >= 0 && date.getHours() < 12) {
    return "上午阳光明媚，祝你竞赛获得好成绩🌞！";
  } else if (date.getHours() >= 12 && date.getHours() < 18) {
    return "下午小风娇好，愿你青春不老😃！";
  } else {
    return "折一根天使羽毛，愿拂去您的疲惫烦恼忧伤🌛！";
  }
});

//================引导页==========================
const steps = [
  {
    element: "#header-notice",
    popover: {
      title: "消息通知",
      description: "你可以在这里查看管理员发送的消息",
      position: "left"
    }
  },
  {
    element: "#header-screenfull",
    popover: {
      title: "全屏",
      description: "你可以在这里进行全屏切换",
      position: "left"
    }
  },
  {
    element: "#header-translation",
    popover: {
      title: "国际化",
      description: "你可以在这里进行语言切换",
      position: "left"
    }
  },
  {
    element: "#dropdown-link",
    popover: {
      title: "个人中心",
      description: "在这里你可以修改自己的信息和退出系统",
      position: "left"
    }
  },
  {
    element: ".el-icon-setting",
    popover: {
      title: "项目配置",
      description: "你可以在这里查看项目配置",
      position: "left"
    }
  },
  {
    element: ".tags-view",
    popover: {
      title: "多标签页",
      description: "这里是你访问过的页面的历史",
      position: "buttom"
    }
  },
  {
    element: ".sidebar-container",
    popover: {
      title: "菜单栏",
      description: "你可以访问你需要的页面",
      position: "right"
    }
  }
];
const driver = new Driver({
  className: "scoped-class",
  animate: true,
  opacity: 0.75,
  padding: 0,
  allowClose: true,
  overlayClickNext: false,
  doneBtnText: "完成",
  closeBtnText: "关闭",
  nextBtnText: "下一步",
  prevBtnText: "上一步"
});
const guide = () => {
  const flag = storageLocal.getItem("isGuide");
  console.log(
    "%c 🥝 flag: ",
    "font-size:20px;background-color: #42b983;color:#fff;",
    flag
  );
  if (flag) {
    return;
  }
  storageLocal.setItem("isGuide", true);
  driver.defineSteps(steps);
  driver.start();
};
onMounted(() => {
  guide();
});
</script>
<template>
  <div class="welcome">
    <el-card class="top-content">
      <div class="left-mark">
        <el-image class="e-img" :src="form?.avatar" />
        <span>{{ greetings }}</span>
      </div>
    </el-card>
    <!-- <el-row :gutter="24" style="margin: 20px">
      <el-col
        :xs="24"
        :sm="24"
        :md="10"
        :lg="10"
        :xl="10"
        style="margin-bottom: 20px"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200
          }
        }"
      >
        <el-card>
          <template #header>
            <span style="font-size: 16px; font-weight: 500"
              >比赛类型分析图</span
            >
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <ReBar />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row> -->
    <el-row :gutter="24" style="margin: 20px" justify="space-between">
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
        style="margin-bottom: 20px"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200
          }
        }"
      >
        <el-card>
          <template #header>
            <span style="font-size: 16px; font-weight: 500"
              >比赛类型分析图</span
            >
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <ReBar />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
        style="margin-bottom: 20px"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200
          }
        }"
      >
        <el-card>
          <template #header>
            <span style="font-size: 16px; font-weight: 500">获奖分析图</span>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <RePie />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
<style lang="scss" scoped>
.main-content {
  margin: 0 !important;
}

.welcome {
  height: 100%;

  .top-content {
    display: flex;
    align-items: center;
    height: 60px;
    background: #fff;

    .left-mark {
      display: flex;
      align-items: center;

      .e-img {
        display: block;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }

      span {
        font-size: 14px;
      }
    }
  }
}
</style>
<style>
div#driver-highlighted-element-stage,
div#driver-page-overlay {
  background: transparent !important;
  outline: 5000px solid rgba(0, 0, 0, 0.75);
}
</style>
