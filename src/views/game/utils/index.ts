import { ref } from "vue";
import { storageLocal } from "/@/utils/storage/index";
import { UserBaseInfo } from "/@/views/base";
import { Entry } from "/@/api/model/game";
import { getAllGameInfo } from "/@/api/game";
import { getDictFunc } from "/@/utils/format";
export const greetings = ref("参赛表汇总");

//获取用户id
const userinfo: UserBaseInfo = storageLocal.getItem("Info");
const uid = ref(userinfo.ID);

export const entryList = ref<Array<Entry>>([]);
//获取总共的所有的参赛表信息
export const get_all_game_info = async () => {
  isload.value = true;
  const data = await getAllGameInfo({
    u_id: uid.value
  });
  console.log(
    "%c 🥐 data: ",
    "font-size:20px;background-color: #EA7E5C;color:#fff;",
    data
  );
  entryList.value = data.data;
  console.log(
    "%c 🍐 entryList.value: ",
    "font-size:20px;background-color: #42b983;color:#fff;",
    entryList.value
  );
  isload.value = false;
};
export const isload = ref(true);

//获取字典信息
export const rankOptions = ref([]);
export const identifyOptions = ref([]);
export const levelOptions = ref([]);
export const competitionTypeOptions = ref([]);
export const competitionStatusOptions = ref([]);
export const teamIdentifyOptions = ref([]);
// 获取需要的字典 可能为空 按需保留
export const setOptions = async () => {
  rankOptions.value = await getDictFunc("award");
  identifyOptions.value = await getDictFunc("teamIdentify");
  levelOptions.value = await getDictFunc("competitionLevel");
  competitionTypeOptions.value = await getDictFunc("competitionType");
  competitionStatusOptions.value = await getDictFunc("competitionStatus");
  teamIdentifyOptions.value = await getDictFunc("teamIdentify");
};
