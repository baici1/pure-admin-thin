import { $t } from "/@/plugins/i18n";
const Layout = () => import("/@/layout/index.vue");

const recruitRouter = {
  path: "/",
  name: "Recruit",
  component: Layout,
  redirect: "/Recruit",
  meta: {
    icon: "office-building",
    title: $t("menus.hsRecruitManage"),
    i18n: true,
    rank: 100
  },
  children: [
    {
      path: "/Recruit",
      name: "RecruitInfo",
      component: () => import("/@/views/recruit/index.vue"),
      meta: {
        title: $t("menus.hsRecruitManage"),
        i18n: true
      }
    }
  ]
};

export default recruitRouter;
