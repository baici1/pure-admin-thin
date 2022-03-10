import { $t } from "/@/plugins/i18n";
const Layout = () => import("/@/layout/index.vue");

const homeRouter = {
  path: "/",
  name: "home",
  component: Layout,
  redirect: "/welcome",
  meta: {
    icon: "home-filled",
    title: $t("menus.hshome"),
    i18n: true,
    rank: 0
  },
  children: [
    {
      path: "/welcome",
      name: "welcome",
      component: () => import("/@/views/welcome/welcome.vue"),
      meta: {
        title: $t("menus.hshome"),
        i18n: true
      }
    },
    {
      path: "/info/update",
      name: "authInfo",
      component: () => import("/@/views/welcome/editor.vue"),
      meta: {
        title: $t("menus.hsinfoUpdate"),
        i18n: true,
        showLink: false
      }
    }
  ]
};

export default homeRouter;
