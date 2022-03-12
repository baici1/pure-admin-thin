import { storageLocal } from "/@/utils/storage/index";
import { ElMessageBox } from "element-plus";
import { ref } from "vue";
import {
  getTeamInfo,
  getTeamId,
  getCompanyInfo,
  getTeamMemberAll
} from "/@/api/team";
import { TeamInfo, CompanyInfo, Member } from "./types";
import { UserInfo } from "/@/views/base";
export const greetings = ref("团队详情");
//关于折叠面板
export const activeNames = ref(["1"]);
export const handleChange = (val: string[]) => {
  console.log(val);
};
//获取用户id
const userinfo: UserInfo = storageLocal.getItem("Info");
const uid = ref(userinfo.id);
//团队信息
export const form = ref<TeamInfo>({
  id: 0,
  create_time: "",
  update_time: "",
  name: "",
  company_id: 0,
  introduction: "",
  intellectual_property: "",
  remark: ""
});
const teamid = ref<number>(0);
//获取团队id
export const get_team_id = async () => {
  const data = await getTeamId({
    u_id: uid.value
  });
  teamid.value = data.data;
};
//获取团队信息
export const get_team_info = async () => {
  const data = await getTeamInfo({
    id: teamid.value
  });
  form.value = data.data;
};
export const company = ref<CompanyInfo>({
  id: 0,
  create_time: "",
  update_time: "",
  name: "",
  address: "",
  introduction: ""
});
//获取公司信息
export const get_company_info = async () => {
  if (form.value.company_id) {
    const data = await getCompanyInfo({
      id: form.value.company_id
    });
    company.value = data.data;
  }
};
//人员信息
export const MemberBase = ref<Member>({
  result: [],
  total: 0
});
//获取人员基本信息
export const get_team_member_all = async () => {
  const data = await getTeamMemberAll({
    team_id: teamid.value,
    page: 1,
    limit: 10
  });
  MemberBase.value = data.data;
};
//对话框
export const dialogVisibleCompany = ref(false);
export const dialogVisibleTeam = ref(false);
export const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
