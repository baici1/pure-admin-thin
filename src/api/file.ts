import { http } from "../utils/http";
import { File } from "./model/file";
import { BaseModel, BaseRes } from "./model/base";
export const getFileInfo = (params?: object) => {
  return http.request<BaseModel<File>>(
    "get",
    "/fileUploadAndDownload/getFile",
    {
      params
    }
  );
};

export const DeleteFileInfo = (data?: object) => {
  return http.request<BaseRes>("post", "/fileUploadAndDownload/deleteFile", {
    data
  });
};
