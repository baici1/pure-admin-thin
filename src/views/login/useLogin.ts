import { ref, computed } from "vue";
import { addClass, removeClass } from "/@/utils/operate";
//管理输入框的状态：激活与未激活
export function useInputUtil() {
  function onInputFocus(ClassStr: String) {
    addClass(document.querySelector("." + ClassStr), "focus");
  }
  function onInputBlur(classState, ClassStr: String) {
    console.log(
      "%c 🍝 classState: ",
      "font-size:20px;background-color: #E41A6A;color:#fff;",
      classState
    );
    if (classState.length === 0)
      removeClass(document.querySelector("." + ClassStr), "focus");
  }
  return { onInputFocus, onInputBlur };
}

export enum FormStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD
}
const currentState = ref(FormStateEnum.LOGIN);
//管理用户表单状态
export function useFormState() {
  function setFormState(state: FormStateEnum) {
    currentState.value = state;
  }

  const getFormState = computed(() => currentState.value);

  function handleBackLogin() {
    setFormState(FormStateEnum.LOGIN);
  }

  return { setFormState, getFormState, handleBackLogin };
}
//登录表单
export const LoginForm = ref({
  phone: "",
  password: ""
});
//注册表单
export const RegisterForm = ref({
  phone: "",
  password: "",
  again: ""
});
export const rulesLoginForm = ref({
  phone: [
    {
      required: true,
      message: "请输入手机号",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur"
    }
  ]
});
