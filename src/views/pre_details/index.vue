<script setup lang="ts">
import { ReHeader, ReFooter } from "/@/components/ReComon";
import { useRoute } from "vue-router";
import { GetAArticle } from "/@/api/pre_home";
import { ref } from "vue";
import { timeFormatYMD, getDictFunc, filterDict } from "/@/utils/format";
import { ArticlesItem } from "/@/api/model/pre";
import { ElMessage } from "element-plus";
// 获取id
const route = useRoute();
const id = route.params.id;
//获取字典信息
const articleTypeOptions = ref([]);
// 获取需要的字典 可能为空 按需保留
const setOptions = async () => {
  articleTypeOptions.value = await getDictFunc("articleType");
};
setOptions();
const article = ref({} as ArticlesItem);
let get_a_article = async () => {
  try {
    const data = await GetAArticle({ ID: Number(id) });
    console.log(
      "%c 🍖 data: ",
      "font-size:20px;background-color: #42b983;color:#fff;",
      data
    );
    article.value = data.data.rearticle;
  } catch (error) {
    ElMessage.error("文章" + error.response.data.msg);
  }
};
get_a_article();
</script>

<template>
  <div>
    <el-container>
      <el-header class="p-0 border-solid border"
        ><ReHeader :index="0"
      /></el-header>
      <el-main class="p-0 bg-[rgba(211,220,230,0.2)]">
        <el-row justify="center">
          <el-col :span="16" :xs="22">
            <div class="title">
              <div class="title1">{{ article.title }}</div>
              <div class="title2">
                {{ filterDict(article.type, articleTypeOptions) }}
              </div>
              <div class="mark">
                <span>作者：{{ article?.author }}</span>
                <span>时间：{{ timeFormatYMD(article.publishedTime) }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="16" :xs="22">
            <div class="main-text">
              <!-- <div v-html="article.content">
              {{ article.content }}
            </div> -->
              <p v-html="article.content"></p>
            </div>
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
.title {
  margin: 30px 0;
  text-align: center;
  border-bottom: 2px solid #e1e1e1;

  .title1 {
    text-align: center;
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 5px;
  }

  .title2 {
    text-align: center;
    font-size: 14px;
  }

  .mark {
    text-align: center;
    width: 100%;
    font-size: 14px;
    color: #999;
    margin: 10px 0;

    span {
      margin: 0 20px;
    }
  }
}

.main-text {
  min-height: 500px;
  padding: 0 20px;
}
</style>
