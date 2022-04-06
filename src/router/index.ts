import { isUrl } from "/@/utils/is";
import { getConfig } from "/@/config";
import { toRouteType } from "./types";
import { openLink } from "/@/utils/link";
import NProgress from "/@/utils/progress";
import { constantRoutes } from "./modules";
import { findIndex } from "lodash-unified";
import { transformI18n } from "/@/plugins/i18n";
import remainingRouter from "./modules/remaining";
// import { Title } from "../../public/serverConfig.json";
// import { storageSession } from "/@/utils/storage";
import { useMultiTagsStoreHook } from "/@/store/modules/multiTags";
import { usePermissionStoreHook } from "/@/store/modules/permission";
import { Router, RouteMeta, createRouter, RouteRecordName } from "vue-router";
import {
  initRouter,
  getHistoryMode,
  getParentPaths,
  findRouteByPath,
  handleAliveRoute
} from "./utils";

// 创建路由实例
export const router: Router = createRouter({
  history: getHistoryMode(),
  routes: constantRoutes.concat(...remainingRouter),
  strict: true,
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      if (savedPosition) {
        return savedPosition;
      } else {
        if (from.meta.saveSrollTop) {
          const top: number =
            document.documentElement.scrollTop || document.body.scrollTop;
          resolve({ left: 0, top });
        }
      }
    });
  }
});

// 路由白名单
const whiteList = [
  "/login",
  "/pre_home",
  "/list",
  "/page/detail/:id",
  "/preGame/home",
  "/display/user/:id",
  "/display/game/:id"
];

router.beforeEach((to: toRouteType, _from, next) => {
  if (to.meta?.keepAlive) {
    const newMatched = to.matched;
    handleAliveRoute(newMatched, "add");
    // 页面整体刷新和点击标签页刷新
    if (_from.name === undefined || _from.name === "redirect") {
      handleAliveRoute(newMatched);
    }
  }
  const token = localStorage.getItem("token");
  NProgress.start();
  const externalLink = isUrl(to?.name);
  if (!externalLink)
    to.matched.some(item => {
      if (!item.meta.title) return "";
      const Title = getConfig().Title;
      if (Title)
        document.title = `${transformI18n(
          item.meta.title,
          item.meta?.i18n
        )} | ${Title}`;
      else document.title = transformI18n(item.meta.title, item.meta?.i18n);
    });
  console.log(
    "%c 🍩 token.length: ",
    "font-size:20px;background-color: #93C0A4;color:#fff;",
    token.length
  );
  if (token.length > 0) {
    if (_from?.name) {
      // name为超链接
      if (externalLink) {
        openLink(to?.name);
        NProgress.done();
      } else {
        next();
      }
    } else {
      // 刷新
      if (usePermissionStoreHook().wholeMenus.length === 0) {
        initRouter().then((router: Router) => {
          if (!useMultiTagsStoreHook().getMultiTagsCache) {
            const handTag = (
              path: string,
              parentPath: string,
              name: RouteRecordName,
              meta: RouteMeta
            ): void => {
              useMultiTagsStoreHook().handleTags("push", {
                path,
                parentPath,
                name,
                meta
              });
            };
            // 未开启标签页缓存，刷新页面重定向到顶级路由（参考标签页操作例子，只针对静态路由）
            if (to.meta?.refreshRedirect) {
              const routes = router.options.routes;
              const { refreshRedirect } = to.meta;
              const { name, meta } = findRouteByPath(refreshRedirect, routes);
              handTag(
                refreshRedirect,
                getParentPaths(refreshRedirect, routes)[1],
                name,
                meta
              );

              return router.push(refreshRedirect);
            } else {
              const { path } = to;

              const index = findIndex(remainingRouter, v => {
                return v.path == path;
              });

              const routes =
                index === -1
                  ? router.options.routes[0].children
                  : router.options.routes;

              const route = findRouteByPath(path, routes);

              const routePartent = getParentPaths(path, routes);
              // 未开启标签页缓存，刷新页面重定向到顶级路由（参考标签页操作例子，只针对动态路由）
              if (
                path !== routes[0].path &&
                route?.meta?.rank !== 0 &&
                routePartent.length === 0
              ) {
                if (!route?.meta?.refreshRedirect) return;
                const { name, meta } = findRouteByPath(
                  route.meta.refreshRedirect,
                  routes
                );
                handTag(
                  route.meta?.refreshRedirect,
                  getParentPaths(route.meta?.refreshRedirect, routes)[0],
                  name,
                  meta
                );

                return router.push(route.meta?.refreshRedirect);
              } else {
                handTag(
                  route.path,
                  routePartent[routePartent.length - 1],
                  route.name,
                  route.meta
                );

                return router.push(path);
              }
            }
          }
          router.push(to.fullPath);
        });
      }

      next();
    }
  } else {
    if (to.path !== "/login") {
      const regu = /^\/[(page)(display)]/;
      console.log(regu.test(to.path));
      console.log(
        "%c 🍓 to.path: ",
        "font-size:20px;background-color: #F5CE50;color:#fff;",
        to.path
      );
      if (whiteList.indexOf(to.path) !== -1 || regu.test(to.path)) {
        next();
      } else {
        next({ path: "/login" });
      }
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
