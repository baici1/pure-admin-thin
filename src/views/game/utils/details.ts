import { ElMessage } from "element-plus";
import { ref } from "vue";
import { getAGameInfo, updateEntryFormDetail } from "/@/api/game";
import { getStudentInfo, GetIDByPhone } from "/@/api/user";
import { Entry, Status } from "/@/api/model/game";
export const greetings = ref("参赛表详情");

export const Info = ref<Entry>({
  ID: 1,
  CreatedAt: "",
  name: "",
  cmpId: 0,
  pId: 0,
  rank: 0,
  achName: "",
  status: [],
  project: {
    ID: 1,
    CreatedAt: "",
    projectCode: "",
    projectName: "",
    introduction: "",
    remark: ""
  },
  competition: {
    ID: 0,
    CreatedAt: "",
    cId: 0,
    level: 0,
    version: 0,
    startTime: "",
    endTime: "",
    rStartTime: "",
    rEndTime: "",
    base_info: {
      ID: 1,
      CreatedAt: "",
      cName: "",
      cType: 0,
      organizer: "",
      introduction: "",
      url: ""
    }
  }
});

export const isLoading = ref(true);
//获取一个参赛表详情信息
export const get_a_game_info = async (id: number) => {
  isLoading.value = true;
  const data = await getAGameInfo({
    id: id
  });
  console.log(
    "%c 🥔 data: ",
    "font-size:20px;background-color: #4b4b4b;color:#fff;",
    data
  );
  Info.value = data.data;
  isLoading.value = false;
};

export const isEdit = ref(false);

//参赛表队员
export const MembersInfo = ref<Array<Status>>([]);

export const read_student_base_info = async () => {
  MembersInfo.value = [];
  for (const item of Info.value.status) {
    const data = await getStudentInfo({
      ID: item.uId
    });
    MembersInfo.value.push({
      ID: item.ID,
      name: data.data.restudentInfo.realName,
      identify: item.identify,
      uId: item.uId,
      phone: data.data.restudentInfo.phone,
      formId: item.formId
    } as Status);
  }
};
//增加成员
export const addMember = () => {
  MembersInfo.value.push({
    uId: 0,
    identify: 3,
    phone: "",
    name: "",
    formId: 0
  } as Status);
};

//删除成员
export const deleteMember = (val, index) => {
  val.splice(index, 1);
};

//更新参赛表
export const SaveInfo = async () => {
  for (let i = 0; i < MembersInfo.value.length; i++) {
    const item = MembersInfo.value[i];
    const data = await GetIDByPhone({ phone: item.phone });
    MembersInfo.value[i].uId = data.data;
  }
  Info.value.status = MembersInfo.value;
  const data = await updateEntryFormDetail(Info.value);
  console.log(
    "%c 🍻 data: ",
    "font-size:20px;background-color: #F5CE50;color:#fff;",
    data
  );
  if (data.code == 0) {
    ElMessage.success("恭喜你保存成功！");
  } else {
    ElMessage.error("修改失败！");
  }
  isEdit.value = false;
};
