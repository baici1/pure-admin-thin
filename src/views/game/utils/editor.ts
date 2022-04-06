import { storageLocal } from "/@/utils/storage/index";
import { ref } from "vue";
import type { CascaderOption } from "element-plus";
import { getComSelectList } from "/@/api/competition";
import { EntryInfo } from "./type";
import { UserBaseInfo } from "/@/views/base";
import { ElMessageBox, ElMessage } from "element-plus";
import { getDictFunc, filterDict } from "/@/utils/format";
//获取手机号
const userinfo: UserBaseInfo = storageLocal.getItem("Info");
const uid = ref(userinfo.ID);
//参赛表的表单
export const entry = ref<EntryInfo>({
  name: "",
  status: {
    uId: uid.value,
    identify: 1
  },
  cmpId: 0,
  project: {
    projectName: "",
    introduction: ""
  }
});
export const EntryInit = () => {
  entry.value = {
    name: "",
    status: {
      uId: uid.value,
      identify: 1
    },
    cmpId: 0,
    project: {
      projectName: "",
      introduction: ""
    }
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
export const isProject = ref(false);

//与联级选择相关
export const cascaderOptions = ref([] as CascaderOption[]);
//联级选择器改变
export const cascaderChange = value => {
  console.log(
    "%c 🥘 value: ",
    "font-size:20px;background-color: #6EC1C2;color:#fff;",
    value
  );
  entry.value.cmpId = value[2];
};
//获取比赛信息树形数据
export const get_com_selectList = async () => {
  const data: any = await getComSelectList();
  console.log(
    "%c 🥩 data: ",
    "font-size:20px;background-color: #465975;color:#fff;",
    data
  );
  cascaderOptions.value = data.data;
  for (let i = 0; i < cascaderOptions.value.length; i++) {
    for (let j = 0; j < cascaderOptions.value[i].children.length; j++) {
      cascaderOptions.value[i].children[j].label += "届";
      for (
        let k = 0;
        k < cascaderOptions.value[i].children[j].children.length;
        k++
      ) {
        cascaderOptions.value[i].children[j].children[k].label = filterDict(
          Number(cascaderOptions.value[i].children[j].children[k].label),
          levelOptions.value
        );
      }
    }
  }
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
