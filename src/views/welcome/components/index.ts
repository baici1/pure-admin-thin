import { App } from "vue";
import reInfo from "./src/Info.vue";
import reList from "./src/list.vue";

export const ReList = Object.assign(reList, {
  install(app: App) {
    app.component(reList.name, reList);
  }
});

export const ReInfo = Object.assign(reInfo, {
  install(app: App) {
    app.component(reInfo.name, reInfo);
  }
});
