<script setup lang="ts">
import { ref } from "vue";
import { NEllipsis } from "naive-ui";
import { timeFormatMD, filterDict } from "/@/utils/format";
import { ArticlesItem } from "/@/api/model/pre";
import { GetSpecificArticles } from "/@/api/pre_home";
import { articleTypeOptions } from "../utils/homeBody";
const props = defineProps({
  articleType: {
    type: Number
  },
  icon: {
    type: String
  }
});
const articles = ref([] as ArticlesItem[]);
//获取文章分类的列表
const get_specific_articles = async (type: number) => {
  const data = await GetSpecificArticles({
    page: 1,
    pageSize: 3,
    type: type
  });
  console.log(
    "%c 🥡 data: ",
    "font-size:20px;background-color: #3F7CFF;color:#fff;",
    data
  );
  articles.value = data.data.list;
  isEmpty.value = false;
};

get_specific_articles(props.articleType);

const isEmpty = ref(true);
</script>

<template>
  <div>
    <el-card>
      <template #header>
        <div class="news-header">
          <div class="nleft">
            <iconify-icon-offline
              :icon="props.icon"
              class="mr-5px h-30px w-30px"
            ></iconify-icon-offline>
            <span>
              {{ filterDict(props.articleType, articleTypeOptions) }}
            </span>
            <!-- <img src="https://static.lanqiao.cn/dasai/images/20210818/title/notice.png" /> -->
          </div>
          <div class="nright">
            <img
              src="https://static.lanqiao.cn/dasai/images/20210818/icons/yellow_right.png"
              alt="icons"
            />
          </div>
        </div>
      </template>
      <el-empty description="No Data" v-show="isEmpty"></el-empty>
      <div v-for="(item, index) in articles" :key="index" class="news-text">
        <el-link>
          <n-ellipsis style="max-width: 300px">
            {{ item.title }}
          </n-ellipsis>
        </el-link>
        <span style="color: #999999" class="news-time">{{
          timeFormatMD(item.publishedTime)
        }}</span>
      </div>
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
