<script setup lang="ts">
import { ref } from "vue";
// import { useRenderIcon } from "/@/components/ReIcon/src/hooks";
import { GetCompetitionTimeList } from "/@/api/pre_home";
import { TimeList } from "/@/api/model/pre";
import { timeFormatYMD, checkComStatus } from "/@/utils/tools";

const times = ref([] as TimeList[]);
const get_competition_time_list = async () => {
  const data = await GetCompetitionTimeList();
  console.log(
    "%c 🌯 data: ",
    "font-size:20px;background-color: #93C0A4;color:#fff;",
    data
  );
  times.value = data.data;
};
get_competition_time_list();
</script>

<template>
  <div>
    <el-timeline>
      <el-timeline-item
        v-for="(time, index) in times"
        :key="index"
        :timestamp="`${timeFormatYMD(time.start_time)}~${timeFormatYMD(
          time.end_time
        )}`"
      >
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="
            checkComStatus(
              time.start_time,
              time.end_time,
              time.r_start_time,
              time.r_end_time
            )
          "
          placement="top"
        >
          <el-link :href="time.url">
            {{ time.c_name }}-{{ time.level }}
          </el-link>
        </el-tooltip>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<style scoped></style>
