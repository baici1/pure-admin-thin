//一些相关工具函数，对返回的数据进行处理
import dayjs from "dayjs";
import "dayjs/locale/zh-cn"; // import locale
import { getDict } from "/@/utils/dictionary";
dayjs.locale("zh-cn"); // use locale

export function timeFormatMD(time): string {
  return dayjs(time).format("MM-DD");
}

export function timeFormatYMD(time): string {
  return dayjs(time).format("YYYY-MM-DD");
}
export function getYear() {
  return [dayjs().startOf("year"), dayjs().endOf("year")];
}

export function timeFormat(time, format): string {
  return dayjs(time).format(format);
}

export function checkGender(gender: number): string {
  return gender ? "男" : "女";
}

export const ComStatus = ["未开始", "报名中", "参赛中", "已结束", "准备中"];
//通过四个时间判断当前状态。
export function checkComStatus(time1, time2, time3, time4) {
  //当前时间在time1之前
  const time = dayjs();
  if (time.isBefore(time1)) {
    return ComStatus[0];
  } else if (time.isAfter(time1) && time.isBefore(time2)) {
    return ComStatus[1];
  } else if (time.isAfter(time3) && time.isBefore(time4)) {
    return ComStatus[2];
  } else if (time.isAfter(time4)) {
    return ComStatus[3];
  } else {
    return ComStatus[4];
  }
}
export const filterDict = (value, options) => {
  const rowLabel = options && options.filter(item => item.value === value);
  return rowLabel && rowLabel[0] && rowLabel[0].label;
};

export const getDictFunc = async type => {
  const dicts = await getDict(type);
  return dicts;
};
