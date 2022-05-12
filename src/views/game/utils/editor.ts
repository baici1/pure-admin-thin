import { storageLocal } from "/@/utils/storage/index";
import { ref } from "vue";
import { EntryInfo } from "./type";
import { UserBaseInfo } from "/@/views/base";
import { ElMessageBox, ElMessage } from "element-plus";
import { getDictFunc } from "/@/utils/format";
import { GetCompetitionTimeList } from "/@/api/pre_home";
const userinfo: UserBaseInfo = storageLocal.getItem("Info");
const uid = ref(userinfo.ID);
//参赛表的表单
export const entry = ref<EntryInfo>({
  name: undefined,
  status: {
    uId: uid.value,
    identify: 1
  },
  cmpId: undefined
});
export const EntryInit = () => {
  entry.value = {
    name: undefined,
    status: {
      uId: uid.value,
      identify: 1
    },
    cmpId: undefined
  };
};
//参赛表的表单规则
export const entryRules = ref({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" }
  ],
  cmpId: [
    { required: true, message: "Please input Activity name", trigger: "blur" }
  ]
});
export const options = ref([]);
//获取比赛信息数据
export const get_com_selectList = async () => {
  const data = await GetCompetitionTimeList({
    page: 1,
    pageSize: 20
  });
  console.log(
    "%c 🥩 data: ",
    "font-size:20px;background-color: #465975;color:#fff;",
    data
  );
  options.value = data.data.list;
};

export const levelOptions = ref([]);
export const competitionTypeOptions = ref([]);
// 获取需要的字典 可能为空 按需保留
export const setOptions = async () => {
  levelOptions.value = await getDictFunc("competitionLevel");
  competitionTypeOptions.value = await getDictFunc("competitionType");
};

//对话框
export const dialogVisible = ref(false);

export function handleClose() {
  ElMessageBox.alert("请保持你进行的修改", "是否取消", {
    confirmButtonText: "OK",
    callback: () => {
      dialogVisible.value = false;
      ElMessage({
        type: "info",
        message: "已取消"
      });
    }
  });
}
