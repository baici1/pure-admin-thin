<template>
  <el-config-provider :locale="currentLocale">
    <router-view :key="route.fullPath" />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  name: "app",
  setup() {
    const router = useRouter();
    const route = useRoute();
    return { router, route };
  },
  components: {
    [ElConfigProvider.name]: ElConfigProvider
  },
  computed: {
    currentLocale() {
      return this.$storage.locale?.locale === "zh" ? zhCn : en;
    }
  },
  methods: {}
});
</script>
