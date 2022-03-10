import { App } from "vue";
import reAvatar from "./src/avatar.vue";

export const ReAvatar = Object.assign(reAvatar, {
  install(app: App) {
    app.component(reAvatar.name, reAvatar);
  }
});
