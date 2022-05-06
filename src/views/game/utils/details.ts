import { ElMessage } from "element-plus";
import { ref } from "vue";
import {
  getAGameInfo,
  findProjectInfo,
  createProjectInfo,
  updateProjectInfo,
  updateEntryForm,
  getEntryMemberList,
  deleteEntryMember,
  createEntryMember,
  updateEntryMember,
  findEntryMember,
  getEntryTeacherList,
  createEntryTeacher,
  deleteEntryTeacher,
  getAchievementList,
  deleteAchievement,
  createAchievement
} from "/@/api/game";
import {
  getStudentInfo,
  GetIDByPhone,
  findTeacherInfo,
  getTeacherInfoList
} from "/@/api/user";
import {
  Entry,
  Member,
  Project,
  entryTeacher,
  Achievement
} from "/@/api/model/game";
import { getFileInfo, DeleteFileInfo } from "/@/api/file";
export const greetings = ref("参赛表详情");

export const Info = ref<Entry>({
  ID: 1,
  CreatedAt: "",
  name: "",
  cmpId: 0,
  pId: 0,
  competition: {
    ID: 0,
    CreatedAt: "",
    cId: 0,
    version: 0,
    startTime: "",
    endTime: "",
    year: 0,
    base_info: {
      ID: 1,
      CreatedAt: "",
      cName: "",
      cType: 0,
      organizer: "",
      introduction: "",
      url: ""
    }
  }
});

export const isLoading = ref(true);
//获取一个参赛表详情信息
export const get_a_game_info = async (id: number) => {
  isLoading.value = true;
  const data = await getAGameInfo({
    id: id
  });
  console.log(
    "%c 🥔 data: ",
    "font-size:20px;background-color: #4b4b4b;color:#fff;",
    data
  );
  Info.value = data.data;
  isLoading.value = false;
};

export const isEdit = ref(false);

//===============项目==================
//项目formData
export const ProjectformData = ref<Project>({
  ID: 0,
  projectCode: "",
  projectName: "",
  introduction: "",
  remark: "",
  url: ""
});
//获取项目信息
// 弹窗控制标记
export const dialogProjectFormVisible = ref(false);

// 获取项目的详情信息
export const getProjectInfoFunc = async id => {
  const res = await findProjectInfo({ ID: id });
  console.log(
    "%c 🥧 res: ",
    "font-size:20px;background-color: #B03734;color:#fff;",
    res
  );
  if (res.code === 0) {
    ProjectformData.value = res.data.reprojectInfo;
  }
};
// 行为控制标记（弹窗内部需要增还是改）
export const typeProject = ref("");
// 打开弹窗
export const OpenDialogProject = row => {
  if (row.pId === 0) {
    typeProject.value = "create";
  } else {
    typeProject.value = "update";
    getProjectInfoFunc(row.pId);
  }
  dialogProjectFormVisible.value = true;
};

// 关闭弹窗
export const closeDialogProject = () => {
  dialogProjectFormVisible.value = false;
  getProjectInfoFunc(Info.value.pId);
};
// 弹窗确定
export const enterDialogProject = async () => {
  let res;
  switch (typeProject.value) {
    case "create":
      res = await createProjectInfo(ProjectformData.value);
      break;
    case "update":
      res = await updateProjectInfo(ProjectformData.value);
      break;
    default:
      res = await createProjectInfo(ProjectformData.value);
      break;
  }
  if (res.code === 0) {
    ElMessage({
      type: "success",
      message: "创建/更改成功"
    });
    if (typeProject.value === "create") {
      Info.value.pId = res.data;
      const r = await updateEntryForm(Info.value);
      if (r.code === 0) {
        ElMessage({
          type: "success",
          message: "创建成功"
        });
      }
    }
    closeDialogProject();
  }
};
//==================参赛表队员==================
const page = ref(1);
const total = ref(0);
const pageSize = ref(10);
export const MembersInfo = ref<Array<Member>>([]);

export const getMembersInfo = async id => {
  const table = await getEntryMemberList({
    page: page.value,
    pageSize: pageSize.value,
    formId: id
  });
  console.log(
    "%c 🦀 table: ",
    "font-size:20px;background-color: #FFDD4D;color:#fff;",
    table
  );
  if (table.code === 0) {
    MembersInfo.value = table.data.list;
    total.value = table.data.total;
    page.value = table.data.page;
    pageSize.value = table.data.pageSize;
  }
  for (const item of MembersInfo.value) {
    const data = await getStudentInfo({
      ID: item.uId
    });
    item.name = data.data.restudentInfo.realName;
    item.phone = data.data.restudentInfo.phone;
  }
};

// 更新行
export const updateEntryMemberFunc = async row => {
  const res = await findEntryMember({ ID: row.ID });
  typeMember.value = "update";
  if (res.code === 0) {
    formDataMember.value = res.data.reentryMember;
    const data = await getStudentInfo({
      ID: formDataMember.value.uId
    });
    if (res.code == 0) {
      formDataMember.value.name = data.data.restudentInfo.realName;
      formDataMember.value.phone = data.data.restudentInfo.phone;
      dialogFormVisibleMember.value = true;
    }
  }
};

// 删除行
export const deleteEntryMemberFunc = async row => {
  const res = await deleteEntryMember({ ID: row.ID });
  if (res.code === 0) {
    ElMessage({
      type: "success",
      message: "删除成功"
    });
    if (MembersInfo.value.length === 1 && page.value > 1) {
      page.value--;
    }
    getMembersInfo(Info.value.ID);
  }
};
// 行为控制标记（弹窗内部需要增还是改）
const typeMember = ref("");
export const formDataMember = ref<Member>({
  ID: 0,
  formId: Info.value.ID,
  uId: 0,
  identify: undefined,
  order: 0
});

// 弹窗控制标记
export const dialogFormVisibleMember = ref(false);

// 打开弹窗
export const openDialogMember = () => {
  typeMember.value = "create";
  dialogFormVisibleMember.value = true;
};

// 关闭弹窗
export const closeDialogMember = () => {
  dialogFormVisibleMember.value = false;
  formDataMember.value = {
    ID: 0,
    formId: Info.value.ID,
    uId: 0,
    identify: undefined,
    order: 0
  };
};
// 弹窗确定
export const enterDialogMember = async (phone?: string) => {
  let res;
  formDataMember.value.formId = Info.value.ID;
  if (typeMember.value == "create") {
    res = await GetIDByPhone({ phone: phone });
    if (res.code == 0) {
      formDataMember.value.uId = res.data;
      formDataMember.value.order = total.value + 1;
    } else {
      ElMessage.error("未找到此用户！");
      return;
    }
  }
  switch (typeMember.value) {
    case "create":
      res = await createEntryMember(formDataMember.value);
      break;
    case "update":
      res = await updateEntryMember(formDataMember.value);
      break;
    default:
      res = await createEntryMember(formDataMember.value);
      break;
  }
  if (res.code === 0) {
    ElMessage({
      type: "success",
      message: "创建/更改成功"
    });
    closeDialogMember();
    getMembersInfo(Info.value.ID);
  }
};

//=================参赛表指导老师==============
const totalTeacher = ref(0);
// 自动化生成的字典（可能为空）以及字段
export const formDataTeacher = ref<entryTeacher>({
  ID: 0,
  formId: 0,
  tId: undefined,
  order: 0
});
export const tableDataTeacher = ref<Array<entryTeacher>>([]);
// 查询
export const getTableDataTeacher = async () => {
  const table = await getEntryTeacherList({
    formId: Info.value.ID,
    page: page.value,
    pageSize: pageSize.value
  });
  console.log(
    "%c 🍝 table: ",
    "font-size:20px;background-color: #EA7E5C;color:#fff;",
    table
  );
  if (table.code === 0) {
    tableDataTeacher.value = table.data.list;
    totalTeacher.value = table.data.total;
    page.value = table.data.page;
    pageSize.value = table.data.pageSize;
  }
  for (const item of tableDataTeacher.value) {
    const res = await findTeacherInfo({ ID: item.tId });
    if (res.code === 0) {
      item.phone = res.data.reteacherInfo.phone;
      item.realName = res.data.reteacherInfo.realName;
      item.email = res.data.reteacherInfo.email;
      item.major = res.data.reteacherInfo.major;
    }
  }
};

// 删除行
export const deleteEntryTeacherFunc = async row => {
  const res = await deleteEntryTeacher({ ID: row.ID });
  if (res.code === 0) {
    ElMessage({
      type: "success",
      message: "删除成功"
    });
    if (tableDataTeacher.value.length === 1 && page.value > 1) {
      page.value--;
    }
    getTableDataTeacher();
  }
};
// 弹窗控制标记
export const dialogFormVisibleTeacher = ref(false);

// 打开弹窗
export const openDialogTeacher = () => {
  dialogFormVisibleTeacher.value = true;
  getTeachersOption();
};
// 关闭弹窗
export const closeDialogTeacher = () => {
  dialogFormVisibleTeacher.value = false;
};
// 弹窗确定
export const enterDialogTeacher = async () => {
  formDataTeacher.value.formId = Info.value.ID;
  formDataTeacher.value.order = totalTeacher.value + 1;
  const res = await createEntryTeacher(formDataTeacher.value);
  if (res.code === 0) {
    ElMessage({
      type: "success",
      message: "创建/更改成功"
    });
    closeDialogTeacher();
    getTableDataTeacher();
  }
};

export const TeachersOption = ref([]);
export const getTeachersOption = async () => {
  const res = await getTeacherInfoList({
    page: 1,
    pageSize: 20
  });
  if (res.code == 0) {
    TeachersOption.value = res.data.list;
  }
};

//=================成果文件管理==============
export const GetAchievementFile = urlId => {
  console.log(
    "%c 🍝 urlId: ",
    "font-size:20px;background-color: #2EAFB0;color:#fff;",
    urlId
  );
  formDataAchievement.value.urlId = urlId;
};
export const formDataAchievement = ref<Achievement>({
  formId: Info.value.ID,
  match: undefined,
  rank: undefined,
  remark: "",
  urlId: 0,
  check: false
});

export const tableDataAchievement = ref<Array<Achievement>>([]);
// 查询
export const getTableDataAchievement = async () => {
  const table = await getAchievementList({
    formId: Info.value.ID,
    page: page.value,
    pageSize: pageSize.value
  });
  if (table.code === 0) {
    tableDataAchievement.value = table.data.list;
    total.value = table.data.total;
    page.value = table.data.page;
    pageSize.value = table.data.pageSize;
  }
  for (const item of tableDataAchievement.value) {
    const res = await getFileInfo({ ID: item.urlId });
    console.log(
      "%c 🍪 res: ",
      "font-size:20px;background-color: #7F2B82;color:#fff;",
      res
    );
    if (res.code === 0) {
      item.url = res.data.url;
      item.file = res.data;
    }
  }
};
// 删除行
export const deleteAchievementFunc = async row => {
  let res = await deleteAchievement({ ID: row.ID });
  if (res.code === 0) {
    ElMessage({
      type: "success",
      message: "删除成功"
    });
    if (tableDataAchievement.value.length === 1 && page.value > 1) {
      page.value--;
    }
    res = await DeleteFileInfo(row.file);
    if (res.code == 0) {
      ElMessage({
        type: "success",
        message: "删除成功"
      });
    }
    getTableDataAchievement();
  }
};
// 弹窗控制标记
export const dialogFormVisibleAchievement = ref(false);

// 打开弹窗
export const openDialogAchievement = () => {
  dialogFormVisibleAchievement.value = true;
};
// 关闭弹窗
export const closeDialogAchievement = () => {
  dialogFormVisibleAchievement.value = false;
  formDataAchievement.value = {
    formId: Info.value.ID,
    match: undefined,
    rank: undefined,
    remark: "",
    urlId: 0,
    check: false
  };
};
// 弹窗确定
export const enterDialogAchievement = async () => {
  formDataAchievement.value.formId = Info.value.ID;
  console.log(
    "%c 🍇 formDataAchievement.value: ",
    "font-size:20px;background-color: #2EAFB0;color:#fff;",
    formDataAchievement.value
  );
  const res = await createAchievement(formDataAchievement.value);
  if (res.code === 0) {
    ElMessage({
      type: "success",
      message: "创建/更改成功"
    });
    closeDialogAchievement();
    getTableDataAchievement();
  }
};
