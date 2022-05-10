import { ref } from "vue";
import { RecruitList } from "/@/api/model/recruit";
import { getStudentRecruitList } from "/@/api/recruit";
//===============学生招聘区域============
export const pageStu = ref(1);
export const totalStu = ref(0);
export const pageSizeStu = ref(10);
export const searchInfoStu = ref("");
export const tableDataStu = ref<Array<RecruitList>>([]);

export const getTableDataStu = async () => {
  const res = await getStudentRecruitList({
    page: pageStu.value,
    pageSize: pageSizeStu.value
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
