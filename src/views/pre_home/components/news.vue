<script setup lang="ts">
// import { NEllipsis } from "naive-ui";
// import { timeFormatMD } from "/@/utils/tools";
</script>

<template>
  <div>
    <el-card>
      <template #header>
        <div class="news-header">
          <div class="nleft">
            <span> 双创活动 </span>
            <!-- <img src="https://static.lanqiao.cn/dasai/images/20210818/title/notice.png" /> -->
          </div>
          <div class="nright">
            <router-link :to="{ name: 'List' }">
              <el-button class="button" type="text"> 查看更多 </el-button>
            </router-link>

            <img
              src="https://static.lanqiao.cn/dasai/images/20210818/icons/yellow_right.png"
              alt="icons"
            />
          </div>
        </div>
      </template>
      <!-- <el-empty description="No Data"></el-empty>
      <div v-for="item in articles[0]" :key="item" class="news-text">
        <el-link @click="ToDetail(item.id)">
          <n-ellipsis style="max-width: 300px">
            {{ item.title }}
          </n-ellipsis>
        </el-link>
        <span style="color: #999999" class="news-time">{{
          timeFormatMD(item.create_time)
        }}</span>
      </div> -->
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.news-header {
  height: 50px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: center;

  .el-button {
    color: #161f39;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
  }

  .el-button:hover {
    color: rgb(100, 42, 251);
  }

  .nleft {
    height: 50px;
    text-align: center;
    display: flex;
    align-content: center;
    align-items: center;

    img {
      height: 17px;
      cursor: pointer;
      margin-left: 10px;
    }

    span {
      font-size: 24px;
      color: #161f39;
    }
  }

  .nright {
    height: 50px;
    text-align: center;
    display: flex;
    align-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 17px;
      cursor: pointer;
    }
  }
}

.news-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;

  .el-link {
    margin: 5px 0;
    cursor: pointer;
  }
}
@media screen and (max-width: 768px) {
  .news-time {
    display: none;
  }

  .icon-left {
    display: none;
  }

  .icon-right {
    display: none;
  }
}
</style>
