import iconifyIconOffline from "./src/iconifyIconOffline";
import iconifyIconOnline from "./src/iconifyIconOnline";
import fontIcon from "./src/iconfont";
import { App } from "vue";
import SvgIcon from "./src/own.vue";
export const IconifyIconOffline = iconifyIconOffline;
export const IconifyIconOnline = iconifyIconOnline;
export const FontIcon = fontIcon;
export const ReSvgIcon = Object.assign(SvgIcon, {
  install(app: App) {
    app.component(SvgIcon.name, SvgIcon);
  }
});

export default {
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon
};
