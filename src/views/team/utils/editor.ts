import { ref } from "vue";
import { TeamInfoRe } from "./types";

export const greetings = ref("创建");

//提交的团队信息字段
export const formDataTeam = ref({
  name: "",
  introduction: "",
  intellectual_property: ""
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
  intellectual_property: [
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
