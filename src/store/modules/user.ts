import { router } from "/@/router";
import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { storageLocal, storageSession } from "/@/utils/storage";
import { useMultiTagsStoreHook } from "/@/store/modules/multiTags";
import { getLogin, jsonInBlacklist } from "/@/api/user";
import { UserBaseInfo } from "/@/api/model/user";
import { initRouter } from "/@/router/utils";

export const useUserStore = defineStore("pure-user", () => {
  //用户基本信息
  const userInfo = ref({
    ID: 6,
    phone: "13337474741",
    slat: "",
    identity: 2019,
    check: 1,
    authority: {}
  } as UserBaseInfo);
  //获取token
  const token = ref(window.localStorage.getItem("token") || "");
  const setToken = val => {
    token.value = val;
  };
  //设置用户信息
  const setUserInfo = val => {
    storageLocal.setItem("Info", val);
    userInfo.value = val;
  };
  //登录
  const LoginIn = async loginInfo => {
    const data = await getLogin(loginInfo);
    console.log(
      "%c 🍎 data: ",
      "font-size:20px;background-color: #FCA650;color:#fff;",
      data
    );
    if (data.code == 0) {
      if (data.data.user.check != 1) {
        ElMessage.warning("当前用户未审核！请联系管理员！");
      }
      //初步设置
      setToken(data.data.token);
      setUserInfo(data.data.user);
      //获取列表
      //通过权限获取列表
      initRouter().then(() => {});
      //发生跳转
      router.push({ name: "welcome" });
    } else {
      ElMessage.error(data.msg);
    }
  };
  // 登出 清空缓存
  const logOut = async () => {
    //将token存入黑名单
    const res = await jsonInBlacklist();
    console.log(
      "%c 🍝 res: ",
      "font-size:20px;background-color: #465975;color:#fff;",
      res
    );
    if (res.code == 0) {
      token.value = "";
      storageLocal.clear();
      storageSession.clear();
      useMultiTagsStoreHook().handleTags("equal", [
        {
          path: "/welcome",
          parentPath: "/",
          meta: {
            title: "menus.hshome",
            icon: "home-filled",
            i18n: true
          }
        }
      ]);
      useRouter().push("/login");
      window.location.reload();
    }
  };
  watch(token, () => {
    window.localStorage.setItem("token", token.value);
  });
  return {
    userInfo,
    token,
    setToken,
    setUserInfo,
    LoginIn,
    logOut
  };
});
