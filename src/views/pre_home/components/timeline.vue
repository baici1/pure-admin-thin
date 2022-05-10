<script setup lang="ts">
import { ref } from "vue";
// import { useRenderIcon } from "/@/components/ReIcon/src/hooks";
import { GetCompetitionTimeList } from "/@/api/pre_home";
import { TimeList } from "/@/api/model/pre";
import { timeFormatYMD, checkComStatus, filterDict } from "/@/utils/format";
import { competitionStatusOptions } from "../utils/homeBody";
const times = ref([] as TimeList[]);
const get_competition_time_list = async () => {
  const data = await GetCompetitionTimeList({
    page: 1,
    pageSize: 10
  });
  console.log(
    "%c 🌯 data: ",
    "font-size:20px;background-color: #93C0A4;color:#fff;",
    data
  );
  times.value = data.data.list;
};
get_competition_time_list();
</script>

<template>
  <div>
    <el-timeline>
      <el-timeline-item
        v-for="(time, index) in times"
        :key="index"
        :timestamp="`${timeFormatYMD(time.startTime)}~${timeFormatYMD(
          time.endTime
        )}`"
      >
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="
            filterDict(
              checkComStatus(time.startTime, time.endTime),
              competitionStatusOptions
            )
          "
          placement="top"
        >
          <el-link :href="time.base_info.url">
            {{ time.base_info.cName }}
          </el-link>
        </el-tooltip>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<style scoped></style>
