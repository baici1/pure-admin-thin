import { defineStore } from "pinia";
import { store } from "/@/store";
import { userType } from "./types";
import { useRouter } from "vue-router";
import { refreshToken } from "/@/api/user";
import { storageLocal, storageSession } from "/@/utils/storage";
import { getToken, setToken, removeToken } from "/@/utils/auth";
import { useMultiTagsStoreHook } from "/@/store/modules/multiTags";
//每次的一次启动页面的初始化
const data = getToken();
let token = "";
const name = "";
let userid = 0;
let phone = "";
if (data) {
  const dataJson = JSON.parse(data);
  if (dataJson) {
    token = dataJson?.accessToken;
    userid = dataJson?.user.id;
    phone = dataJson?.user.phone;
    //name = dataJson?.name ?? "admin";
  }
}

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    token,
    name,
    userid,
    phone
  }),
  actions: {
    SET_TOKEN(token) {
      this.token = token;
    },
    SET_NAME(name) {
      this.name = name;
    },
    SET_USERID(id) {
      this.userid = id;
    },
    SET_PHONE(phone) {
      this.phone = phone;
    },
    SET_INFO(token, phone, id) {
      this.token = token;
      this.phone = phone;
      this.userid = id;
    },
    // 登出 清空缓存
    logOut() {
      this.token = "";
      this.name = "";
      this.userid = 0;
      this.phone = "";
      removeToken();
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
    },
    // 刷新token
    async refreshToken(data) {
      return refreshToken(data).then(data => {
        if (data) {
          setToken(data);
          return data;
        }
      });
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
