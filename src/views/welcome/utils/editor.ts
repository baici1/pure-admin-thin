import { ref, nextTick } from "vue";
import { form } from "./welcome";
import { ElInput } from "element-plus";

//初始化表单
export const initForm = () => {
  form.value = {
    id: 0,
    student_id: "",
    u_id: 0,
    nickname: "",
    email: "",
    avatar: "",
    real_name: "",
    gender: 1,
    degree: "",
    grade: "",
    department: "",
    major: "",
    class_num: "",
    specialty: "",
    QQ: "",
    wechat: "",
    bank_name: "",
    bank_card_number: "",
    introduction: ""
  };
};

//表单规则
export const formRules = ref({
  student_id: [
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
  real_name: [
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
  class_num: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  specialty: [
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
  bank_name: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  bank_card_number: [
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

form.value.lists = ["Tag 1", "Tag 2", "Tag 3"];

export const inputVisible = ref(false);
export const InputRef = ref<InstanceType<typeof ElInput>>();

export const handleClose = (tag: string) => {
  form.value.lists.splice(form.value.lists.indexOf(tag), 1);
};
export const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
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
