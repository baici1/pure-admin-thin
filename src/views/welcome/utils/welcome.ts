import { getStudentInfo } from "/@/api/user";
import { ElMessage } from "element-plus";
import { storageLocal } from "/@/utils/storage";
import { ref } from "vue";
import { UserInfo, StudentInfo } from "./types";
export const loading = ref<boolean>(true);
//个人信息结构

//获取个人id
const info: UserInfo = storageLocal.getItem("Info");
const uid = info.id;
export const Info = ref<StudentInfo>();

export const get_student_info = async () => {
  try {
    const data = await getStudentInfo({
      id: uid
    });
    console.log(
      "%c 🦑 data: ",
      "font-size:20px;background-color: #EA7E5C;color:#fff;",
      data
    );
    Info.value = data.data;
    Info.value.lists = data.data.specialty.split(",");
  } catch (error) {
    console.log(
      "%c 🥜 error: ",
      "font-size:20px;background-color: #B03734;color:#fff;",
      error
    );
    ElMessage.error("获取用户信息失败，请重新刷新！");
  } finally {
    loading.value = false;
  }
};
