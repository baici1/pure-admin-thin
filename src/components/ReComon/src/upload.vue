<template>
  <el-upload
    class="upload-demo"
    action="http://127.0.0.1:8888/fileUploadAndDownload/upload"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :on-success="handleSuccess"
    :limit="1"
    :headers="header"
    ref="upload"
  >
    <el-button type="primary">Click to upload</el-button>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500KB.
      </div>
    </template>
  </el-upload>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { UploadProps, UploadFile, UploadInstance } from "element-plus";
import { DeleteFileInfo } from "/@/api/file";
// 声明事件
const emit = defineEmits(["uploadURL"]);
const upload = ref<UploadInstance>();
const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview: UploadProps["onPreview"] = uploadFile => {
  console.log("1", uploadFile);
};
const handleSuccess: UploadProps["onSuccess"] = (
  response: any,
  uploadFile: UploadFile
) => {
  console.log(
    "%c 🍚 response: ",
    "font-size:20px;background-color: #FCA650;color:#fff;",
    response
  );
  if (response.code == 0) {
    emit("uploadURL", response.data.file.ID);
  } else {
    ElMessage.error(response.msg);
  }
  console.log(uploadFile);
};

const beforeRemove: UploadProps["beforeRemove"] = uploadFile => {
  return ElMessageBox.confirm(
    `Cancel the transfert of ${uploadFile.name} ?`
  ).then(
    async () => {
      let res = await DeleteFileInfo(uploadFile.response["data"].file);
      if (res.code == 0) {
        return true;
      }
    },
    () => false
  );
};

const token = localStorage.getItem("token");
let header = ref({
  "x-token": token
});
</script>
