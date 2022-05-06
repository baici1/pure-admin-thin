import { App } from "vue";
import reAvatar from "./src/avatar.vue";
import reHeader from "./src/header.vue";
import reFooter from "./src/footer.vue";
import reUpload from "./src/upload.vue";
export const ReAvatar = Object.assign(reAvatar, {
  install(app: App) {
    app.component(reAvatar.name, reAvatar);
  }
});
export const ReHeader = Object.assign(reHeader, {
  install(app: App) {
    app.component(reHeader.name, reHeader);
  }
});
export const ReFooter = Object.assign(reFooter, {
  install(app: App) {
    app.component(reFooter.name, reFooter);
  }
});

export const ReUpload = Object.assign(reUpload, {
  install(app: App) {
    app.component(reUpload.name, reUpload);
  }
});
