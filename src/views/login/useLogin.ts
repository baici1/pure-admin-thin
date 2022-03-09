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
    if (classState.length === 0) {
      removeClass(document.querySelector("." + ClassStr), "focus");
      removeClass(document.querySelector("." + ClassStr), "err");
    }
  }
  function onInputErr(ClassStr: String) {
    addClass(document.querySelector("." + ClassStr), "err");
  }
  return { onInputFocus, onInputBlur, onInputErr };
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
  phone: "13337474745",
  password: "123456"
});
//注册表单
export const RegisterForm = ref({
  phone: "",
  password: "",
  again: ""
});
