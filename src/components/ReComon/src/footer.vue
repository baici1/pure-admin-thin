<script setup lang="ts"></script>

<template>
  <div class="bg-[#1A1A1A] footer">
    <el-row :justify="'space-evenly'">
      <el-col :span="6">
        <p class="text-xl font-500 text-white text-opacity-80">支持单位</p>
        <p>主办单位： 工业和信息化部人才交流中心</p>
        <p>技术支持： 国信蓝桥教育科技（杭州）股份有限公司</p>
      </el-col>
      <el-col :span="6">
        <p class="text-xl font-500 text-white text-opacity-80">联系我们</p>
        <p>Email：lanqiao@lanqiao.cn</p>
        <p>地址：北京市东城区东方经贸城C1-308</p>
      </el-col>
    </el-row>
    <el-divider class="mt-20px mb-20px" />
    <el-row :justify="'center'" class="text-center">
      <el-col :span="6"> 京公网安备 xxxxxxxxxx号 </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.footer {
  color: #979797;
  padding: 20px 0px 10px;
}
</style>
