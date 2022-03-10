<template>
  <el-upload
    class="avatar-uploader"
    action="http://47.113.203.60:20201/admin/upload/a_file"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :headers="header"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"
      ><IconifyIconOffline icon="plus"></IconifyIconOffline
    ></el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { storageLocal, storageSession } from "/@/utils/storage";

const imageUrl = ref("");
const props = defineProps({
  avatarUrl: {
    type: String,
    default: ""
  }
});
watch(
  () => props.avatarUrl,
  newVal => {
    if (newVal?.length > 0) {
      imageUrl.value = newVal;
    }
  },
  {
    immediate: true, // 立即执行
    deep: true // 深度监听
  }
);
const handleAvatarSuccess = (res: any, file: any) => {
  console.log(
    "%c 🍕 file: ",
    "font-size:20px;background-color: #4b4b4b;color:#fff;",
    file
  );
  imageUrl.value = "http://img.yangdiy.cn/" + res?.data.path;
  storageSession.setItem("avatar", imageUrl.value);
};
const beforeAvatarUpload = (file: any) => {
  const isJPG = file.type === "image/jpeg";
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    ElMessage.error("Avatar picture must be JPG format!");
  }
  if (!isLt2M) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
  }
  return isJPG && isLt2M;
};
const header = ref({
  Authorization:
    "Bearer " + storageLocal.getItem("authorized-token").accessToken
} as any);
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 70px;
  height: 70px;
  text-align: center;
}

.avatar {
  width: 70px;
  height: 70px;
  display: block;
}
</style>
