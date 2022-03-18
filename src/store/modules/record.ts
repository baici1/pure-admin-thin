import { defineStore } from "pinia";
import { store } from "/@/store";
import { recordType } from "./types";
export const useRecordStore = defineStore({
  id: "web-record",
  state: (): recordType => ({
    menuIndex: 1
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        key: "menuIndex",
        storage: sessionStorage
      }
    ]
  },
  actions: {
    SET_MENUINDEX(index) {
      this.menuIndex = index;
    }
  }
});

export function useRecordStoreHook() {
  return useRecordStore(store);
}
