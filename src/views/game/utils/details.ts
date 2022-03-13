import { ref } from "vue";
import { getAGameInfo } from "/@/api/game";
import { EntryDetail } from "./type";
export const greetings = ref("参赛表详情");

export const Info = ref<EntryDetail>({
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
  Info.value = data.data;
};

export const isEdit = ref(false);
