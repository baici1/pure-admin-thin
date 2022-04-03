import {
  RouterHistory,
  RouteRecordRaw,
  RouteComponent,
  createWebHistory,
  createWebHashHistory,
  RouteRecordNormalized
} from "vue-router";
import { router } from "./index";
import { loadEnv } from "../../build";
import { useTimeoutFn } from "@vueuse/core";
import { RouteConfigs } from "/@/layout/types";
import { buildHierarchyTree } from "/@/utils/tree";
import { usePermissionStoreHook } from "/@/store/modules/permission";
const Layout = () => import("/@/layout/index.vue");
const IFrame = () => import("/@/layout/frameView.vue");
// https://cn.vitejs.dev/guide/features.html#glob-import
const modulesRoutes = import.meta.glob("/src/views/**/*.{vue,tsx}");

// 动态路由
import { getAsyncRoutes } from "/@/api/routes";

// 按照路由中meta下的rank等级升序来排序路由
function ascending(arr: any[]) {
  arr.forEach(v => {
    if (v?.meta?.rank === null) v.meta.rank = undefined;
    if (v?.meta?.rank === 0) {
      if (v.name !== "home" && v.path !== "/") {
        console.warn("rank only the home page can be 0");
      }
    }
  });
  return arr.sort(
    (a: { meta: { rank: number } }, b: { meta: { rank: number } }) => {
      return a?.meta?.rank - b?.meta?.rank;
    }
  );
}

// 过滤meta中showLink为false的路由
function filterTree(data: RouteComponent[]) {
  const newTree = data.filter(
    (v: { meta: { showLink: boolean } }) => v.meta?.showLink !== false
  );
  newTree.forEach(
    (v: { children }) => v.children && (v.children = filterTree(v.children))
  );
  return newTree;
}

// 批量删除缓存路由(keepalive)
function delAliveRoutes(delAliveRouteList: Array<RouteConfigs>) {
  delAliveRouteList.forEach(route => {
    usePermissionStoreHook().cacheOperate({
      mode: "delete",
      name: route?.name
    });
  });
}

// 通过path获取父级路径
function getParentPaths(path: string, routes: RouteRecordRaw[]) {
  // 深度遍历查找
  function dfs(routes: RouteRecordRaw[], path: string, parents: string[]) {
    for (let i = 0; i < routes.length; i++) {
      const item = routes[i];
      // 找到path则返回父级path
      if (item.path === path) return parents;
      // children不存在或为空则不递归
      if (!item.children || !item.children.length) continue;
      // 往下查找时将当前path入栈
      parents.push(item.path);

      if (dfs(item.children, path, parents).length) return parents;
      // 深度遍历查找未找到时当前path 出栈
      parents.pop();
    }
    // 未找到时返回空数组
    return [];
  }

  return dfs(routes, path, []);
}

// 查找对应path的路由信息
function findRouteByPath(path: string, routes: RouteRecordRaw[]) {
  let res = routes.find((item: { path: string }) => item.path == path);
  if (res) {
    return res;
  } else {
    for (let i = 0; i < routes.length; i++) {
      if (
        routes[i].children instanceof Array &&
        routes[i].children.length > 0
      ) {
        res = findRouteByPath(path, routes[i].children);
        if (res) {
          return res;
        }
      }
    }
    return null;
  }
}

// 重置路由
function resetRouter(): void {
  router.getRoutes().forEach(route => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

// 初始化路由
function initRouter() {
  return new Promise(resolve => {
    getAsyncRoutes().then(({ data }) => {
      const info: any = data.menus;
      for (let i = 0; i < info.length; i++) {
        info[i].meta.rank = (i + 1) * 10;
        for (let j = 0; j < info[i].children.length; j++) {
          info[i].children[j].children = [];
          info[i].children[j].meta.showParent = false;
          info[i].children[j].meta.showLink = !info[i].children[j].hidden;
        }
        // info[i].redirect = info[i].children[0].path;
        if (info[i].children.length == 1) {
          info[i].path = info[i].children[0].path;
          continue;
        }
        info[i].redirect = info[i].children[0].path;
      }
      console.log(
        "%c 🦀 data: ",
        "font-size:20px;background-color: #465975;color:#fff;",
        info
      );
      if (info.length === 0) {
        usePermissionStoreHook().changeSetting(info);
      } else {
        formatFlatteningRoutes(addAsyncRoutes(info)).map(
          (v: RouteRecordRaw) => {
            // 防止重复添加路由
            if (
              router.options.routes[0].children.findIndex(
                value => value.path === v.path
              ) !== -1
            ) {
              return;
            } else {
              // 切记将路由push到routes后还需要使用addRoute，这样路由才能正常跳转
              router.options.routes[0].children.push(v);
              // 最终路由进行升序
              ascending(router.options.routes[0].children);
              if (!router.hasRoute(v?.name)) router.addRoute(v);
              const flattenRouters = router
                .getRoutes()
                .find(n => n.path === "/");
              router.addRoute(flattenRouters);
            }
            resolve(router);
          }
        );
        usePermissionStoreHook().changeSetting(info);
      }
      router.addRoute({
        path: "/:pathMatch(.*)",
        redirect: "/error/404"
      });
    });
  });
}

/**
 * 将多级嵌套路由处理成一维数组
 * @param routesList 传入路由
 * @returns 返回处理后的一维路由
 */
function formatFlatteningRoutes(routesList: RouteRecordRaw[]) {
  if (routesList.length === 0) return routesList;
  let hierarchyList = buildHierarchyTree(routesList);
  for (let i = 0; i < hierarchyList.length; i++) {
    if (hierarchyList[i].children) {
      hierarchyList = hierarchyList
        .slice(0, i + 1)
        .concat(hierarchyList[i].children, hierarchyList.slice(i + 1));
    }
  }
  return hierarchyList;
}

/**
 * 一维数组处理成多级嵌套数组（三级及以上的路由全部拍成二级，keep-alive 只支持到二级缓存）
 * https://github.com/xiaoxian521/vue-pure-admin/issues/67
 * @param routesList 处理后的一维路由菜单数组
 * @returns 返回将一维数组重新处理成规定路由的格式
 */
function formatTwoStageRoutes(routesList: RouteRecordRaw[]) {
  if (routesList.length === 0) return routesList;
  const newRoutesList: RouteRecordRaw[] = [];
  routesList.forEach((v: RouteRecordRaw) => {
    if (v.path === "/") {
      newRoutesList.push({
        component: v.component,
        name: v.name,
        path: v.path,
        redirect: v.redirect,
        meta: v.meta,
        children: []
      });
    } else {
      newRoutesList[0].children.push({ ...v });
    }
  });
  return newRoutesList;
}

// 处理缓存路由（添加、删除、刷新）
function handleAliveRoute(matched: RouteRecordNormalized[], mode?: string) {
  switch (mode) {
    case "add":
      matched.forEach(v => {
        usePermissionStoreHook().cacheOperate({ mode: "add", name: v.name });
      });
      break;
    case "delete":
      usePermissionStoreHook().cacheOperate({
        mode: "delete",
        name: matched[matched.length - 1].name
      });
      break;
    default:
      usePermissionStoreHook().cacheOperate({
        mode: "delete",
        name: matched[matched.length - 1].name
      });
      useTimeoutFn(() => {
        matched.forEach(v => {
          usePermissionStoreHook().cacheOperate({ mode: "add", name: v.name });
        });
      }, 100);
  }
}

// 过滤后端传来的动态路由 重新生成规范路由
function addAsyncRoutes(arrRoutes: Array<RouteRecordRaw>) {
  if (!arrRoutes || !arrRoutes.length) return;
  const modulesRoutesKeys = Object.keys(modulesRoutes);
  arrRoutes.forEach((v: RouteRecordRaw) => {
    if (v.redirect) {
      v.component = Layout;
    } else if (v.meta?.frameSrc) {
      v.component = IFrame;
    } else {
      const index = modulesRoutesKeys.findIndex(ev => ev.includes(v.path));
      v.component = modulesRoutes[modulesRoutesKeys[index]];
    }
    if (v.children) {
      addAsyncRoutes(v.children);
    }
  });
  return arrRoutes;
}

// 获取路由历史模式 https://next.router.vuejs.org/zh/guide/essentials/history-mode.html
function getHistoryMode(): RouterHistory {
  const routerHistory = loadEnv().VITE_ROUTER_HISTORY;
  // len为1 代表只有历史模式 为2 代表历史模式中存在base参数 https://next.router.vuejs.org/zh/api/#%E5%8F%82%E6%95%B0-1
  const historyMode = routerHistory.split(",");
  const leftMode = historyMode[0];
  const rightMode = historyMode[1];
  // no param
  if (historyMode.length === 1) {
    if (leftMode === "hash") {
      return createWebHashHistory("");
    } else if (leftMode === "h5") {
      return createWebHistory("");
    }
  } //has param
  else if (historyMode.length === 2) {
    if (leftMode === "hash") {
      return createWebHashHistory(rightMode);
    } else if (leftMode === "h5") {
      return createWebHistory(rightMode);
    }
  }
}

// 是否有权限
function hasPermissions(value: Array<string>): boolean {
  if (value && value instanceof Array && value.length > 0) {
    const roles = usePermissionStoreHook().buttonAuth;
    const permissionRoles = value;

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role);
    });

    if (!hasPermission) {
      return false;
    }
    return true;
  } else {
    return false;
  }
}

export {
  ascending,
  filterTree,
  initRouter,
  resetRouter,
  hasPermissions,
  getHistoryMode,
  addAsyncRoutes,
  delAliveRoutes,
  getParentPaths,
  findRouteByPath,
  handleAliveRoute,
  formatTwoStageRoutes,
  formatFlatteningRoutes
};
