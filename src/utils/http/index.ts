import { ElMessage } from "element-plus";
import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import {
  PureHttpError,
  RequestMethods,
  PureHttpResponse,
  PureHttpRequestConfig
} from "./types.d";
import qs from "qs";
import NProgress from "../progress";
// import { loadEnv } from "@build/index";

const pendingMap = new Map();

// 加载环境变量 VITE_PROXY_DOMAIN（开发环境）  VITE_PROXY_DOMAIN_REAL（打包后的线上环境）
// const { VITE_PROXY_DOMAIN, VITE_PROXY_DOMAIN_REAL } = loadEnv();

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  // baseURL:
  //   process.env.NODE_ENV === "production"
  //     ? VITE_PROXY_DOMAIN_REAL
  //     : VITE_PROXY_DOMAIN,
  // 当前使用mock模拟请求，将baseURL制空，如果你的环境用到了http请求，请删除下面的baseURL启用上面的baseURL，并将11行、16行代码注释取消
  baseURL: "http://127.0.0.1:8888", //106.12.133.12:8888
  timeout: 10000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json"
    // "X-Requested-With": "XMLHttpRequest"
  },
  // 数组格式参数序列化
  paramsSerializer: params => qs.stringify(params, { indices: false })
};

class PureHttp {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }
  // 初始化配置对象
  private static initConfig: PureHttpRequestConfig = {};

  // 保存当前Axios实例对象
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

  // 请求拦截
  private httpInterceptorsRequest(): void {
    PureHttp.axiosInstance.interceptors.request.use(
      (config: PureHttpRequestConfig) => {
        removePending(config);
        addPending(config);
        const $config = config;
        // 开启进度条动画
        NProgress.start();
        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof config.beforeRequestCallback === "function") {
          config.beforeRequestCallback($config);
          return $config;
        }
        if (PureHttp.initConfig.beforeRequestCallback) {
          PureHttp.initConfig.beforeRequestCallback($config);
          return $config;
        }
        //请求头部加入token信息
        const token = window.localStorage.getItem("token");
        if (token) {
          config.headers["x-token"] = token;
        }
        return $config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  // 响应拦截
  private httpInterceptorsResponse(): void {
    const instance = PureHttp.axiosInstance;
    instance.interceptors.response.use(
      (response: PureHttpResponse) => {
        removePending(response.config);
        const $config = response.config;
        // 关闭进度条动画
        NProgress.done();
        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof $config.beforeResponseCallback === "function") {
          $config.beforeResponseCallback(response);
          return response.data;
        }
        if (PureHttp.initConfig.beforeResponseCallback) {
          PureHttp.initConfig.beforeResponseCallback(response);
          return response.data;
        }
        return response.data;
      },
      (error: PureHttpError) => {
        removePending(error.config);
        const $error = error;
        $error.isCancelRequest = Axios.isCancel($error);
        // 关闭进度条动画
        NProgress.done();
        //处理异常
        httpErrorStatusHandle(error);
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error);
      }
    );
  }

  // 通用请求工具函数
  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: PureHttpRequestConfig
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig
    } as PureHttpRequestConfig;

    // 单独处理自定义请求/响应回掉
    return new Promise((resolve, reject) => {
      PureHttp.axiosInstance
        .request(config)
        .then((response: undefined) => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // 单独抽离的post工具函数
  public post<T, P>(
    url: string,
    params?: T,
    config?: PureHttpRequestConfig
  ): Promise<P> {
    return this.request<P>("post", url, params, config);
  }

  // 单独抽离的get工具函数
  public get<T, P>(
    url: string,
    params?: T,
    config?: PureHttpRequestConfig
  ): Promise<P> {
    return this.request<P>("get", url, params, config);
  }
}

export const http = new PureHttp();

//处理异常
function httpErrorStatusHandle(error) {
  // 处理被取消的请求
  if (Axios.isCancel(error))
    return console.error("请求的重复请求：" + error.message);
  let message = "";
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = "接口重定向了！";
        break;
      case 400:
        message = "提交信息不正确！";
        break;
      case 401:
        message = "您未登录，或者登录已经超时，请先登录！";
        break;
      case 403:
        message = "您没有权限操作！";
        break;
      case 404:
        message = `请求地址出错: ${error.response.config.url}`;
        break; // 在正确域名下
      case 408:
        message = "请求超时！";
        break;
      case 409:
        message = "系统已存在相同数据！";
        break;
      case 500:
        message = "服务器内部错误！";
        break;
      case 501:
        message = "服务未实现！";
        break;
      case 502:
        message = "网关错误！";
        break;
      case 503:
        message = "服务不可用！";
        break;
      case 504:
        message = "服务暂时无法访问，请稍后再试！";
        break;
      case 505:
        message = "HTTP版本不受支持！";
        break;
      default:
        message = "异常问题，请联系管理员！";
        break;
    }
  }
  if (error.message.includes("timeout")) message = "网络请求超时！";
  if (error.message.includes("Network"))
    message = window.navigator.onLine ? "服务端异常！" : "您断网了！";
  ElMessage({
    type: "error",
    message
  });
}

/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config) {
  const pendingKey = getPendingKey(config);
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey);
    // 如你不明白此处为什么需要传递pendingKey可以看文章下方的补丁解释
    cancelToken(pendingKey);
    pendingMap.delete(pendingKey);
  }
}

/**
 * 生成唯一的每个请求的唯一key
 * @param {*} config
 * @returns
 */
function getPendingKey(config) {
  // eslint-disable-next-line prefer-const
  let { url, method, params, data } = config as PureHttpRequestConfig;
  if (typeof data === "string") data = JSON.parse(data); // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join("&");
}

/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 * @param {*} config
 */
function addPending(config) {
  const pendingKey = getPendingKey(config);
  config.cancelToken =
    config.cancelToken ||
    new Axios.CancelToken(cancel => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel);
      }
    });
}
