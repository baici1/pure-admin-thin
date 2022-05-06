import { http } from "../utils/http";
import { File } from "./model/file";
import { BaseModel, BaseRes } from "./model/base";
export const getFileInfo = (params?: object) => {
  return http.request<BaseModel<File>>(
    "get",
    "http://127.0.0.1:8888/fileUploadAndDownload/getFile",
    {
      params
    }
  );
};

export const DeleteFileInfo = (data?: object) => {
  return http.request<BaseRes>(
    "post",
    "http://127.0.0.1:8888/fileUploadAndDownload/deleteFile",
    {
      data
    }
  );
};
