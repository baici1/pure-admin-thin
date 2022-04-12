import { router } from "/@/router";
import { ref, nextTick } from "vue";
import { form } from "./welcome";
import { ElInput, ElMessage } from "element-plus";
import { updateStudentInfo } from "/@/api/user";

//表单规则
export const formRules = ref({
  studentId: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  nickname: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  email: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  avatar: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  realName: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  degree: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  grade: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  department: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  major: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  classNum: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],

  QQ: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  wechat: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  bankName: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  bankCardNumber: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  introduction: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ]
});

//与tag相关
export const inputValue = ref("");

export const inputVisible = ref(false);
export const InputRef = ref<InstanceType<typeof ElInput>>();

export const handleClose = (tag: string) => {
  form.value.lists.splice(form.value.lists.indexOf(tag), 1);
};
export const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value?.input!.focus();
  });
};

export const handleInputConfirm = () => {
  if (inputValue.value) {
    form.value.lists.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = "";
};
//tag结束

//更新学生信息
export const update_student_info = async () => {
  form.value.specialty = form.value.lists.join(",");
  const data = await updateStudentInfo(form.value);
  console.log(
    "%c 🍖 data: ",
    "font-size:20px;background-color: #42b983;color:#fff;",
    data
  );
  ElMessage.success("信息更新成功");
  router.push("/welcome");
};
