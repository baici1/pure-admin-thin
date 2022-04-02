import { ref } from "vue";
import { TeamInfoRe, MemberRe } from "./types";
import { ElMessageBox, ElMessage } from "element-plus";

export const greetings = ref("创建");

//提交的团队信息字段

export const formDataTeam = ref({
  name: "",
  introduction: "",
  intellectualProperty: "",
  companyId: 0,
  check: 0
} as TeamInfoRe);

//团队的表单规则
export const rulesTeam = ref({
  name: [
    {
      required: true,
      message: "请输入团队名称",
      trigger: "blur"
    }
  ],
  introduction: [
    {
      required: true,
      message: "请输入团队介绍",
      trigger: "blur"
    }
  ],
  intellectualProperty: [
    {
      required: true,
      message: "请输入知识产权",
      trigger: "blur"
    }
  ]
});
export const rulesCompany = ref({
  name: [
    {
      required: true,
      message: "请输入公司名称",
      trigger: "blur"
    }
  ],
  address: [
    {
      required: true,
      message: "请输入公司地址",
      trigger: "blur"
    }
  ],
  introduction: [
    {
      required: true,
      message: "请输入团队介绍",
      trigger: "blur"
    }
  ]
});

//对话框
export const dialogVisibleCompany = ref(false);
export const dialogVisibleTeam = ref(false);
export const dialogVisibleCreateTeam = ref(false);

export function handleCloseCompany() {
  ElMessageBox.alert("请保持你进行的修改", "是否取消", {
    confirmButtonText: "OK",
    callback: () => {
      dialogVisibleCompany.value = false;
      ElMessage({
        type: "info",
        message: "已取消"
      });
    }
  });
}
export function handleCloseTeam() {
  ElMessageBox.alert("请保持你进行的修改", "是否取消", {
    confirmButtonText: "OK",
    callback: () => {
      dialogVisibleTeam.value = false;
      ElMessage({
        type: "info",
        message: "已取消"
      });
    }
  });
}

export function handleCloseCreateTeam() {
  ElMessageBox.alert("请保持你进行的修改", "是否取消", {
    confirmButtonText: "OK",
    callback: () => {
      dialogVisibleCreateTeam.value = false;
      ElMessage({
        type: "info",
        message: "已取消"
      });
    }
  });
}
//关于团队队员的信息
export const formDataMember = ref({
  phone: "",
  identify: 0
} as MemberRe);

export const rulesMenber = ref({
  phone: [
    {
      required: true,
      message: "请输入公司名称",
      trigger: "blur"
    }
  ],
  identify: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change"
    }
  ]
});
export const dialogVisibleMember = ref(false);
export function handleCloseMember() {
  ElMessageBox.alert("请保持你进行的修改", "是否取消", {
    confirmButtonText: "OK",
    callback: () => {
      dialogVisibleMember.value = false;
      ElMessage({
        type: "info",
        message: "已取消"
      });
    }
  });
}
