import { ref } from "vue";
import { storageLocal } from "/@/utils/storage/index";
import { UserInfo } from "/@/views/base";
import { EntryAll } from "./type";
import { getAllGameInfo } from "/@/api/game";
export const greetings = ref("参赛表汇总");

//获取用户id
const userinfo: UserInfo = storageLocal.getItem("Info");
const uid = ref(userinfo.id);

export const entryList = ref<Array<EntryAll>>([]);
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
  isload.value = false;
};
export const isload = ref(true);
