<script lang="ts" setup>
import { useRouter } from "vue-router";
import SearchResult from "./SearchResult.vue";
import SearchFooter from "./SearchFooter.vue";
import { useDebounceFn, onKeyStroke } from "@vueuse/core";
import { ref, watch, computed, nextTick, shallowRef } from "vue";
import { GetSearchArticlesByEs } from "/@/api/pre_home";
import { ElMessage } from "element-plus";
interface Props {
  /** 弹窗显隐 */
  value: boolean;
}

interface Emits {
  (e: "update:value", val: boolean): void;
}

const emit = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {});
const router = useRouter();

const keyword = ref("");
const activePath = ref(undefined);
const inputRef = ref<HTMLInputElement | null>(null);
const resultOptions = shallowRef([]);
const handleSearch = useDebounceFn(search, 300);

const show = computed({
  get() {
    return props.value;
  },
  set(val: boolean) {
    emit("update:value", val);
  }
});

watch(show, async val => {
  if (val) {
    /** 自动聚焦 */
    await nextTick();
    inputRef.value?.focus();
  }
});

/** 查询 */
async function search() {
  const res = await GetSearchArticlesByEs({
    article: keyword.value
  });
  if (res.code == 0) {
    resultOptions.value = res.data.list;
  } else {
    ElMessage.warning("查询无结果！");
  }
}

function handleClose() {
  show.value = false;
  /** 延时处理防止用户看到某些操作 */
  setTimeout(() => {
    resultOptions.value = [];
    keyword.value = "";
  }, 200);
}

/** key up */
function handleUp() {
  const { length } = resultOptions.value;
  if (length === 0) return;
  const index = resultOptions.value.findIndex(
    item => item.ID === activePath.value
  );
  if (index === 0) {
    activePath.value = resultOptions.value[length - 1].ID;
  } else {
    activePath.value = resultOptions.value[index - 1].ID;
  }
}

/** key down */
function handleDown() {
  const { length } = resultOptions.value;
  if (length === 0) return;
  const index = resultOptions.value.findIndex(
    item => item.ID === activePath.value
  );
  if (index + 1 === length) {
    activePath.value = resultOptions.value[0].ID;
  } else {
    activePath.value = resultOptions.value[index + 1].ID;
  }
}

/** key enter */
function handleEnter() {
  const { length } = resultOptions.value;
  if (length === 0 || activePath.value === undefined) return;
  console.log(
    "%c 🍓 activePath.value: ",
    "font-size:20px;background-color: #42b983;color:#fff;",
    activePath.value
  );
  router.push({ name: "Details", params: { id: activePath.value } });
  handleClose();
}

onKeyStroke("Enter", handleEnter);
onKeyStroke("ArrowUp", handleUp);
onKeyStroke("ArrowDown", handleDown);
</script>

<template>
  <el-dialog top="5vh" v-model="show" :before-close="handleClose">
    <el-input
      ref="inputRef"
      v-model="keyword"
      clearable
      placeholder="请输入关键词搜索"
      @input="handleSearch"
    >
      <template #prefix>
        <el-icon class="el-input__icon">
          <IconifyIconOffline icon="search" />
        </el-icon>
      </template>
    </el-input>
    <div class="search-result-container">
      <el-empty v-if="resultOptions.length === 0" description="暂无搜索结果" />
      <SearchResult
        v-else
        v-model:value="activePath"
        :options="resultOptions"
        @click="handleEnter"
      />
    </div>
    <template #footer>
      <SearchFooter />
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped>
.search-result-container {
  margin-top: 20px;
}
</style>
