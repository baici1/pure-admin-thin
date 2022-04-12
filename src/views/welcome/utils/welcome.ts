import { getStudentInfo } from "/@/api/user";
import { ElMessage } from "element-plus";
import { storageLocal } from "/@/utils/storage";
import { ref } from "vue";
import { StudentInfo } from "/@/api/model/user";
import { UserBaseInfo } from "/@/views/base";
export const loading = ref<boolean>(true);
//个人信息结构

//获取个人id
const info: UserBaseInfo = storageLocal.getItem("Info");
const uid = info.ID;
export const form = ref({} as StudentInfo);

//获取学生特定信息
export const get_student_info = async () => {
  try {
    const data = await getStudentInfo({
      ID: uid
    });
    console.log(
      "%c 🥪 data: ",
      "font-size:20px;background-color: #6EC1C2;color:#fff;",
      data
    );
    form.value = data.data.restudentInfo;
    form.value.lists = data.data.restudentInfo.specialty.split(",");
  } catch (error) {
    ElMessage.error("获取用户信息失败，请重新刷新！");
  } finally {
    loading.value = false;
  }
};
