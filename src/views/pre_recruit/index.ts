import { ref } from "vue";
import { RecruitList } from "/@/api/model/recruit";
import { getStudentRecruitList } from "/@/api/recruit";
import { TimeList } from "/@/api/model/pre";
import { GetCompetitionTimeList } from "/@/api/pre_home";
//===============获取比赛信息=================
export const times = ref([] as TimeList[]);
export const get_competition_time_list = async () => {
  const data = await GetCompetitionTimeList({
    page: 1,
    pageSize: 10,
    publish: true
  });
  console.log(
    "%c 🌯 data: ",
    "font-size:20px;background-color: #93C0A4;color:#fff;",
    data
  );
  times.value = data.data.list;
};

//===============学生招聘区域============
export const pageStu = ref(1);
export const totalStu = ref(0);
export const pageSizeStu = ref(20);
export const searchInfoStu = ref("");
export const tableDataStu = ref<Array<RecruitList>>([]);

export const getTableDataStu = async (comid?: number) => {
  const res = await getStudentRecruitList({
    page: pageStu.value,
    pageSize: pageSizeStu.value,
    comId: comid
  });
  console.log(
    "%c 🍭 res: ",
    "font-size:20px;background-color: #7F2B82;color:#fff;",
    res
  );
  if (res.code == 0) {
    tableDataStu.value = res.data.list;
    totalStu.value = res.data.total;
    pageSizeStu.value = res.data.pageSize;
    pageStu.value = res.data.page;
  }
};
// 修改页面容量
export const handleCurrentChangeStu = val => {
  pageStu.value = val;
  getTableDataStu();
};

//===============学生招聘区域============
