import { ElMessage } from "element-plus";
import { ref } from "vue";
import { RecruitList } from "/@/api/model/recruit";
import {
  findStudentRecruitInfo,
  SendStudentRecruitByUser
} from "/@/api/recruit";
import type { FormRules, FormInstance } from "element-plus";
export const recruitData = ref<RecruitList>({
  title: undefined,
  ID: undefined,
  comId: undefined,
  entryId: undefined,
  uId: undefined,
  introduce: undefined,
  num: undefined,
  need: undefined,
  competition: undefined,
  member: undefined
});
export const findRecruitByID = async id => {
  const res = await findStudentRecruitInfo({ ID: id });
  console.log(
    "%c 🦑 res: ",
    "font-size:20px;background-color: #7F2B82;color:#fff;",
    res
  );
  if (res.code == 0) {
    recruitData.value = res.data.restudentRecruit;
  }
};

export const formData = ref({
  producer: {
    studentId: undefined,
    realName: undefined,
    gender: undefined,
    degree: undefined,
    grade: undefined,
    department: undefined,
    major: undefined,
    classNum: undefined,
    QQ: undefined,
    wechat: undefined,
    introduction: undefined
  },
  comsumer: {
    ID: undefined,
    email: undefined,
    key: undefined
  }
});

// 弹窗控制标记
export const dialogFormVisible = ref(false);

// 打开弹窗
export const openDialog = () => {
  dialogFormVisible.value = true;
};

// 关闭弹窗
export const closeDialog = () => {
  dialogFormVisible.value = false;
  formData.value = {
    producer: {
      studentId: undefined,
      realName: undefined,
      gender: undefined,
      degree: undefined,
      grade: undefined,
      department: undefined,
      major: undefined,
      classNum: undefined,
      QQ: undefined,
      wechat: undefined,
      introduction: undefined
    },
    comsumer: {
      ID: undefined,
      email: undefined,
      key: undefined
    }
  };
};
// 弹窗确定
export const enterDialog = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async valid => {
    if (valid) {
      formData.value.comsumer = {
        ID: recruitData.value.ID,
        email: recruitData.value.member.email,
        key: "student"
      };
      const res = await SendStudentRecruitByUser(formData.value);
      if (res.code === 0) {
        ElMessage({
          type: "success",
          message: "创建/更改成功"
        });
        closeDialog();
      }
    } else {
      ElMessage.error("请填写必要信息");
    }
  });
};

export const rules = ref<FormRules>({
  realName: [
    { required: true, message: "Please input Activity name", trigger: "blur" }
  ],
  QQ: [
    { required: true, message: "Please input Activity name", trigger: "blur" }
  ],
  wechat: [
    { required: true, message: "Please input Activity name", trigger: "blur" }
  ]
});
