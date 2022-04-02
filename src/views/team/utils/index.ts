import { storageLocal } from "/@/utils/storage/index";
import { DeleteTeamMember, UpdateTeamMember } from "/@/api/team";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { getStudentInfo, ReadUserBaseInfo } from "/@/api/user";
import {
  getTeamInfo,
  getTeamId,
  getCompanyInfo,
  getTeamMemberAll
} from "/@/api/team";

import { ReteamInfo, RecompanyInfo, List, Members } from "/@/api/model/team";
import { UserBaseInfo } from "/@/views/base";
export const greetings = ref("团队详情");
//关于折叠面板
export const activeNames = ref(["1"]);
export const handleChange = (val: string[]) => {
  console.log(val);
};
//获取用户id
const userinfo: UserBaseInfo = storageLocal.getItem("Info");
const uid = ref(userinfo.ID);
//团队信息
export const form = ref({
  ID: 0,
  CreatedAt: "",
  name: "",
  companyId: 0,
  introduction: "",
  intellectualProperty: "",
  remark: "",
  check: 0
} as ReteamInfo);
const teamid = ref<number>(0);
//获取团队id
export const get_team_id = async () => {
  const data = await getTeamId({
    uid: uid.value
  });
  console.log(
    "%c 🍻 data: ",
    "font-size:20px;background-color: #3F7CFF;color:#fff;",
    data
  );
  teamid.value = data.data;
  form.value.ID = data.data;
};

//获取团队信息
export const get_team_info = async () => {
  if (form.value.ID) {
    const data = await getTeamInfo({
      ID: teamid.value
    });
    console.log(
      "%c 🍩 data: ",
      "font-size:20px;background-color: #33A5FF;color:#fff;",
      data
    );
    form.value = data.data.reteamInfo;
  }
};
export const company = ref<RecompanyInfo>({
  ID: 0,
  CreatedAt: "",
  name: "",
  address: "",
  introduction: "",
  check: 0
});
//获取公司信息
export const get_company_info = async () => {
  if (form.value.companyId) {
    const data = await getCompanyInfo({
      ID: form.value.companyId
    });
    console.log(
      "%c 🍦 data: ",
      "font-size:20px;background-color: #FCA650;color:#fff;",
      data
    );
    company.value = data.data.recompanyInfo;
  }
};

//人员信息
export const MemberBase = ref<Members>({
  list: [],
  total: 0,
  page: 1,
  pageSize: 10
});
export const MemberDetail = ref<Array<List>>([]);
//获取人员基本信息
export const get_team_member_all = async () => {
  MemberDetail.value = [];
  const data = await getTeamMemberAll({
    teamId: teamid.value,
    page: 1,
    limit: 10
  });
  MemberBase.value = data.data;
  for (const item of MemberBase.value.list) {
    const StudentInfo = await getStudentInfo({
      uId: item.uId
    });
    const baseInfo = await ReadUserBaseInfo({
      ID: item.uId
    });
    MemberDetail.value.push({
      ID: item.ID,
      name: StudentInfo.data.restudentInfo.realName,
      identify: item.identify,
      uId: item.uId,
      phone: baseInfo.data.reuserInfo.phone,
      teamId: item.teamId,
      CreatedAt: item.CreatedAt
    } as List);
  }
};

//编辑团队人员
export const isEditMember = ref(false);
export const update_team_member = async index => {
  console.log(
    "%c 🍾 index: ",
    "font-size:20px;background-color: #ED9EC7;color:#fff;",
    index
  );
  console.log(
    "%c 🍰 MemberDetail.value[index]: ",
    "font-size:20px;background-color: #3F7CFF;color:#fff;",
    MemberDetail.value
  );
  const data = await UpdateTeamMember(MemberDetail.value[index]);
  console.log(
    "%c 🥫 data: ",
    "font-size:20px;background-color: #93C0A4;color:#fff;",
    data
  );
  isEditMember.value = false;
  ElMessage.success("恭喜你编辑成功！");
};

//删除团队人员
export const delete_team_member = async id => {
  await DeleteTeamMember({
    id: id
  });
  ElMessage.success("恭喜你删除成功！");
};
