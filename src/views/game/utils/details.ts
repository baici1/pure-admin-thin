import { ElMessage } from "element-plus";
import { ref } from "vue";
import { getAGameInfo, updateEntryFormDetail } from "/@/api/game";
import {
  getStudentInfo,
  ReadUserBaseInfo,
  GetInfoByPrePhone
} from "/@/api/user";
import { Entry, Status } from "/@/api/model/game";
export const greetings = ref("参赛表详情");

export const Info = ref<Entry>({
  ID: 1,
  CreatedAt: "2022-02-14T15:03:23+08:00",
  name: "无敌",
  cmpId: 1,
  pId: 1,
  rank: 1,
  achName: "无敌",
  status: [
    {
      ID: 1,
      CreatedAt: "2022-02-14T15:03:32+08:00",
      formId: 1,
      uId: 1,
      identify: 3,
      order: 0
    },
    {
      ID: 2,
      CreatedAt: "2022-02-16T13:28:34+08:00",
      formId: 1,
      uId: 2,
      identify: 0,
      order: 0
    }
  ],
  project: {
    ID: 1,
    CreatedAt: "2022-02-14T15:03:37+08:00",
    projectCode: "101",
    projectName: "无敌项目",
    introduction: "啦啦啦",
    remark: ""
  },
  competition: {
    ID: 1,
    CreatedAt: "2022-01-19T00:29:04+08:00",
    cId: 1,
    level: 1,
    version: 1,
    startTime: "2022-01-01T00:28:43+08:00",
    endTime: "2022-01-05T00:28:47+08:00",
    rStartTime: "2022-02-14T16:54:25+08:00",
    rEndTime: "2023-04-01T16:54:29+08:00",
    base_info: {
      ID: 1,
      CreatedAt: "2022-01-19T00:27:21+08:00",
      cName: "蓝桥杯",
      cType: 0,
      organizer: "工业和信息化部人才交流中心1",
      introduction: "是我们获奖率比较高的比赛",
      url: "https://dasai.lanqiao.cn/"
    }
  }
});

//获取一个参赛表详情信息
export const get_a_game_info = async (id: number) => {
  const data = await getAGameInfo({
    id: id
  });
  console.log(
    "%c 🥔 data: ",
    "font-size:20px;background-color: #4b4b4b;color:#fff;",
    data
  );
  Info.value = data.data;
};

export const isEdit = ref(false);

//参赛表队员
export const MembersInfo = ref<Array<Status>>([]);

export const read_student_base_info = async () => {
  MembersInfo.value = [];
  for (const item of Info.value.status) {
    const data = await getStudentInfo({
      uId: item.uId
    });
    const baseInfo = await ReadUserBaseInfo({
      ID: item.uId
    });
    MembersInfo.value.push({
      ID: item.ID,
      name: data.data.restudentInfo.realName,
      identify: item.identify,
      uId: item.ID,
      phone: baseInfo.data.reuserInfo.phone,
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
    const data = await GetInfoByPrePhone({ phone: item.phone });
    MembersInfo.value[i].uId = data.data.ID;
  }
  Info.value.status = MembersInfo.value;
  const data = await updateEntryFormDetail(Info.value);
  if (data.code == 0) {
    ElMessage.success("恭喜你保存成功！");
  } else {
    ElMessage.error("修改失败！");
  }
  isEdit.value = false;
};
