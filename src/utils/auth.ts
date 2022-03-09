import Cookies from "js-cookie";
import { useUserStoreHook } from "/@/store/modules/user";

const TokenKey = "authorized-token";

type paramsMapType = {
  user: object;
  expires: number;
  accessToken: string;
};

// 获取token
export function getToken() {
  // 此处与TokenKey相同，此写法解决初始化时Cookies中不存在TokenKey报错
  return Cookies.get("authorized-token");
}

// 设置token以及过期时间（cookies、localStorage各一份）
// 后端需要将用户信息和token以及过期时间都返回给前端，过期时间主要用于刷新token
export function setToken(data) {
  const { accessToken, expires, user } = data;
  // 提取关键信息进行存储
  const paramsMap: paramsMapType = {
    user,
    expires: Date.now() + parseInt(expires),
    accessToken
  };
  //json 序列化
  const dataString = JSON.stringify(paramsMap);
  useUserStoreHook().SET_TOKEN(accessToken);
  //根据过期时间设置存储cookie
  expires > 0
    ? Cookies.set(TokenKey, dataString, {
        expires: expires / 86400000
      })
    : Cookies.set(TokenKey, dataString);
  //存入localStorage
  localStorage.setItem(TokenKey, dataString);
}

// 删除token
export function removeToken() {
  Cookies.remove(TokenKey);
  localStorage.removeItem(TokenKey);
}
