import { ElMessage } from "element-plus";
import { ref } from "vue";
import { getAGameInfo, updateEntryFormDetail } from "/@/api/game";
import { ReadStudentsBaseInfo } from "/@/api/user";
import { EntryOne, MembersRequest, entryReq } from "./type";
export const greetings = ref("参赛表详情");

export const Info = ref<EntryOne>({
  form: {
    id: 1,
    name: "",
    cmp_id: 1,
    p_id: 1,
    rank: "",
    ach_name: "",
    status: 0
  },
  project: {
    id: 1,
    project_code: "101",
    project_name: "无敌项目",
    introduction: "啦啦啦",
    remark: ""
  },
  members: [
    {
      form_id: 1,
      u_id: 1,
      identify: 1,
      order: 0
    },
    {
      form_id: 1,
      u_id: 14,
      identify: 2,
      order: 0
    }
  ],
  competition: {
    com_sche: {
      id: 1,
      c_id: 1,
      level: "",
      version: "",
      start_time: "",
      end_time: "",
      r_start_time: "",
      r_end_time: ""
    },
    com_info: {
      id: 1,
      c_name: "",
      c_type: "",
      organizer: "",
      introduction: "",
      url: ""
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
export const MembersInfo = ref<Array<MembersRequest>>([]);

export const read_student_base_info = async () => {
  MembersInfo.value = [];
  console.log(
    "%c 🥒 Info.value.members: ",
    "font-size:20px;background-color: #4b4b4b;color:#fff;",
    Info.value.members
  );
  for (const item of Info.value.members) {
    console.log(
      "%c 🍩 item: ",
      "font-size:20px;background-color: #FCA650;color:#fff;",
      item
    );
    const data = await ReadStudentsBaseInfo({
      u_id: item.u_id
    });
    MembersInfo.value.push({
      u_id: item.u_id,
      identify: item.identify,
      phone: data.data.phone,
      name: data.data.real_name
    } as MembersRequest);
    //console.log("1");
  }
};
//增加
export const addMember = () => {
  MembersInfo.value.push({
    u_id: 0,
    identify: 3,
    phone: "",
    name: ""
  } as MembersRequest);
};
//删除
export const deleteMember = (val, index) => {
  val.splice(index, 1);
};
//更新参赛表
export const SaveInfo = async () => {
  const param = ref<entryReq>({
    id: Info.value.form.id,
    members: MembersInfo.value
  });
  if (Info.value.project) {
    param.value.p_id = Info.value.project.id;
    param.value.project_name = Info.value.project.project_name;
    param.value.introduction = Info.value.project.introduction;
  }
  await updateEntryFormDetail(param.value);
  ElMessage.success("恭喜你保存成功！");
  isEdit.value = false;
};
