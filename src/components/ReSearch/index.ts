import { App } from "vue";
import reSearch from "./src/SearchModal.vue";
export const ReSearch = Object.assign(reSearch, {
  install(app: App) {
    app.component(reSearch.name, reSearch);
  }
});
