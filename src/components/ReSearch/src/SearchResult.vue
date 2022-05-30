<template>
  <div class="result">
    <template v-for="item in options" :key="item.ID">
      <div
        class="result-item"
        :style="{
          background:
            item?.ID === active ? useEpThemeStoreHook().epThemeColor : '',
          color: item.ID === active ? '#fff' : ''
        }"
        @click="handleTo"
        @mouseenter="handleMouse(item)"
      >
        <component :is="useRenderIcon('bookmark-2-line')"></component>
        <div class="result-item-content">
          <div class="result-item-content-title" v-html="item.title"></div>
          <div
            class="result-item-content-description"
            v-html="item.description"
          ></div>
        </div>

        <enterOutlined />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useEpThemeStoreHook } from "/@/store/modules/epTheme";
import { useRenderIcon } from "/@/components/ReIcon/src/hooks";
import enterOutlined from "/@/assets/svg/enter_outlined.svg?component";

interface optionsItem {
  ID: number;
  title: string;
  description: string;
}

interface Props {
  value: number;
  options: Array<optionsItem>;
}

interface Emits {
  (e: "update:value", val: number): void;
  (e: "enter"): void;
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits<Emits>();

const active = computed({
  get() {
    return props.value;
  },
  set(val: number) {
    emit("update:value", val);
  }
});

/** 鼠标移入 */
async function handleMouse(item) {
  console.log(
    "%c 🍅 item: ",
    "font-size:20px;background-color: #465975;color:#fff;",
    item
  );
  active.value = item.ID;
}

function handleTo() {
  emit("enter");
}
</script>
<style lang="scss" scoped>
.result {
  padding-bottom: 12px;

  &-item {
    display: flex;
    align-items: center;
    margin-top: 8px;
    padding: 14px;
    border-radius: 4px;
    background: #e5e7eb;
    cursor: pointer;

    &-content {
      display: flex;
      flex: 1;
      margin-left: 5px;
      flex-direction: column;

      &-title {
        font-weight: 700;
        font-size: larger;
      }

      &-description {
        font-size: small;
      }
    }
  }
}
</style>
