import { App } from "vue";
import reBar from "./src/Bar.vue";
import rePie from "./src/Pie.vue";

export const ReBar = Object.assign(reBar, {
  install(app: App) {
    app.component(reBar.name, reBar);
  }
});

export const RePie = Object.assign(rePie, {
  install(app: App) {
    app.component(rePie.name, rePie);
  }
});
