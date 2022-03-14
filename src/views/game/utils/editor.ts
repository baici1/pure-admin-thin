import { storageLocal } from "/@/utils/storage/index";
import { ref } from "vue";
import type { CascaderOption } from "element-plus";
import { getComSelectList } from "/@/api/competition";
import { EntryInfo } from "./type";
import { UserInfo } from "/@/views/base";
//获取手机号
const info: UserInfo = storageLocal.getItem("Info");
//参赛表的表单
export const entry = ref<EntryInfo>({
  members: {
    phone: info.phone,
    identify: 1
  },
  cmp_id: 0,
  project_name: "",
  introduction: ""
});
//参赛表的表单规则
export const entryRules = ref({
  cmp_id: [
    { required: true, message: "Please input Activity name", trigger: "blur" }
  ],
  project: [
    { required: true, message: "Please input Activity name", trigger: "blur" }
  ],
  project_name: [
    { required: true, message: "Please input Activity name", trigger: "blur" }
  ],
  introduction: [
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
  entry.value.cmp_id = value[2];
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
};
