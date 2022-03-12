import { $t } from "/@/plugins/i18n";
import Layout from "/@/layout/index.vue";

const TeamRouter = {
  path: "/team",
  name: "Team",
  component: Layout,
  redirect: "/team/info",
  meta: {
    icon: "home-filled",
    title: $t("menus.hsteamManagement"),
    showLink: true,
    i18n: true,
    rank: 10
  },
  children: [
    {
      path: "/team/info",
      name: "TeamInfo",
      component: () => import("/@/views/team/index.vue"),
      meta: {
        title: $t("menus.hsteamManageInfo"),
        i18n: true,
        showLink: true
      }
    },
    {
      //用于团队创建，不显示
      path: "/team/editor",
      name: "Create&UpdateTeam",
      component: () => import("/@/views/team/editor.vue"),
      meta: {
        title: $t("menus.hsCreateteam"),
        i18n: true,
        showLink: true
      }
    },
    {
      path: "/team/sucess",
      name: "SucessTeam",
      component: () => import("/@/views/team/sucess.vue"),
      meta: {
        title: $t("menus.hsSucess"),
        i18n: true,
        showLink: false
      }
    }
  ]
};

export default TeamRouter;
