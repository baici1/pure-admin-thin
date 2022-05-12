<template>
  <div>
    <div class="gva-search-box">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="比赛">
          <el-select
            v-model="searchInfo.comId"
            class="ml-2"
            placeholder="Select"
          >
            <el-option
              v-for="item in options"
              :key="item.ID"
              :label="item.base_info.cName"
              :value="item.ID"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            type="primary"
            icon="search"
            @click="onSubmit"
          >
            查询
          </el-button>
          <el-button size="small" icon="refresh" @click="onReset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button size="small" type="primary" icon="plus" @click="openDialog">
          新增
        </el-button>
        <el-popover v-model:visible="deleteVisible" placement="top" width="160">
          <p>确定要删除吗？</p>
          <div style="text-align: right; margin-top: 8px">
            <el-button size="small" type="text" @click="deleteVisible = false">
              取消
            </el-button>
            <el-button size="small" type="primary" @click="onDelete">
              确定
            </el-button>
          </div>
          <template #reference>
            <el-button
              icon="delete"
              size="small"
              style="margin-left: 10px"
              :disabled="!multipleSelection.length"
              @click="deleteVisible = true"
            >
              删除
            </el-button>
          </template>
        </el-popover>
      </div>
      <el-table
        ref="multipleTable"
        style="width: 100%"
        tooltip-effect="dark"
        :data="tableData"
        row-key="ID"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column align="left" label="日期" width="180">
          <template #default="scope">{{
            timeFormatYMD(scope.row.CreatedAt)
          }}</template>
        </el-table-column>
        <el-table-column align="left" label="标题" prop="title" width="120" />
        <el-table-column align="left" label="比赛" prop="comId" width="120">
          <template #default="scope">
            {{
              options.filter(item => item.ID == scope.row.comId)[0].base_info
                .cName
            }}
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="介绍"
          prop="introduce"
          width="120"
        />
        <el-table-column align="left" label="人数" prop="num" width="120" />
        <el-table-column align="left" label="要求" prop="need" width="120" />
        <el-table-column align="left" label="按钮组">
          <template #default="scope">
            <el-button
              type="text"
              icon="edit"
              size="small"
              class="table-button"
              @click="updateStudentRecruitFunc(scope.row)"
            >
              变更
            </el-button>
            <el-button
              type="text"
              icon="delete"
              size="small"
              @click="deleteRow(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="gva-pagination">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <el-dialog
      v-model="dialogFormVisible"
      :before-close="closeDialog"
      title="弹窗操作"
    >
      <el-form :model="formData" label-position="right" label-width="80px">
        <el-form-item label="标题:">
          <el-input v-model="formData.title" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="比赛:">
          <el-select v-model="formData.comId" class="ml-2" placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.ID"
              :label="item.base_info.cName"
              :value="item.ID"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="介绍:">
          <el-input
            v-model="formData.introduce"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="人数:">
          <el-input
            v-model.number="formData.num"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="要求:">
          <el-input v-model="formData.need" clearable placeholder="请输入" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" @click="closeDialog">取 消</el-button>
          <el-button size="small" type="primary" @click="enterDialog">
            确 定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
export default {
  name: "StudentRecruit"
};
</script>

<script setup lang="ts">
import {
  createStudentRecruit,
  deleteStudentRecruit,
  deleteStudentRecruitByIds,
  updateStudentRecruit,
  findStudentRecruitInfo,
  getStudentRecruitList
} from "/@/api/recruit";

// 全量引入格式化工具 请按需保留
import { timeFormatYMD } from "/@/utils/format";
import { ElMessage, ElMessageBox } from "element-plus";
import { GetCompetitionTimeList } from "/@/api/pre_home";
import { ref } from "vue";

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  title: "",
  comId: 0,
  entryId: 0,
  uId: 0,
  introduce: "",
  num: 0,
  need: ""
});

// =========== 表格控制部分 ===========
const page = ref(1);
const total = ref(0);
const pageSize = ref(10);
const tableData = ref([]);
const searchInfo = ref({} as any);

// 重置
const onReset = () => {
  searchInfo.value = {};
};

// 搜索
const onSubmit = () => {
  page.value = 1;
  pageSize.value = 10;
  getTableData();
};

// 分页
const handleSizeChange = val => {
  pageSize.value = val;
  getTableData();
};

// 修改页面容量
const handleCurrentChange = val => {
  page.value = val;
  getTableData();
};

// 查询
const getTableData = async () => {
  const table = await getStudentRecruitList({
    page: page.value,
    pageSize: pageSize.value,
    ...searchInfo.value
  });
  if (table.code === 0) {
    tableData.value = table.data.list;
    total.value = table.data.total;
    page.value = table.data.page;
    pageSize.value = table.data.pageSize;
  }
};

getTableData();

// ============== 表格控制部分结束 ===============

// 获取需要的字典 可能为空 按需保留
const setOptions = async () => {};

// 获取需要的字典 可能为空 按需保留
setOptions();

// 多选数据
const multipleSelection = ref([]);
// 多选
const handleSelectionChange = val => {
  multipleSelection.value = val;
};

// 删除行
const deleteRow = row => {
  ElMessageBox.confirm("确定要删除吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteStudentRecruitFunc(row);
  });
};

// 批量删除控制标记
const deleteVisible = ref(false);

// 多选删除
const onDelete = async () => {
  const ids = [];
  if (multipleSelection.value.length === 0) {
    ElMessage({
      type: "warning",
      message: "请选择要删除的数据"
    });
    return;
  }
  multipleSelection.value &&
    multipleSelection.value.map(item => {
      ids.push(item.ID);
    });
  const res = await deleteStudentRecruitByIds({ ids });
  if (res.code === 0) {
    ElMessage({
      type: "success",
      message: "删除成功"
    });
    if (tableData.value.length === ids.length && page.value > 1) {
      page.value--;
    }
    deleteVisible.value = false;
    getTableData();
  }
};

// 行为控制标记（弹窗内部需要增还是改）
const type = ref("");

// 更新行
const updateStudentRecruitFunc = async row => {
  const res = await findStudentRecruitInfo({ ID: row.ID });
  type.value = "update";
  if (res.code === 0) {
    formData.value = res.data.restudentRecruit;
    dialogFormVisible.value = true;
  }
};

// 删除行
const deleteStudentRecruitFunc = async row => {
  const res = await deleteStudentRecruit({ ID: row.ID });
  if (res.code === 0) {
    ElMessage({
      type: "success",
      message: "删除成功"
    });
    if (tableData.value.length === 1 && page.value > 1) {
      page.value--;
    }
    getTableData();
  }
};

// 弹窗控制标记
const dialogFormVisible = ref(false);

// 打开弹窗
const openDialog = () => {
  type.value = "create";
  dialogFormVisible.value = true;
};

// 关闭弹窗
const closeDialog = () => {
  dialogFormVisible.value = false;
  formData.value = {
    title: "",
    comId: 0,
    entryId: 0,
    uId: 0,
    introduce: "",
    num: 0,
    need: ""
  };
};
// 弹窗确定
const enterDialog = async () => {
  let res;
  switch (type.value) {
    case "create":
      res = await createStudentRecruit(formData.value);
      break;
    case "update":
      res = await updateStudentRecruit(formData.value);
      break;
    default:
      res = await createStudentRecruit(formData.value);
      break;
  }
  if (res.code === 0) {
    ElMessage({
      type: "success",
      message: "创建/更改成功"
    });
    closeDialog();
    getTableData();
  }
};

//===============自定义内容======================
const options = ref([]);
//获取比赛信息数据
const get_com_selectList = async () => {
  const data = await GetCompetitionTimeList({
    page: 1,
    pageSize: 20
  });
  console.log(
    "%c 🥩 data: ",
    "font-size:20px;background-color: #465975;color:#fff;",
    data
  );
  options.value = data.data.list;
};
get_com_selectList();
</script>

<style lang="scss" scoped>
/* 改变主题色变量 */

#app {
  .el-button {
    font-weight: 400;
    border-radius: 2px;
  }
}

::-webkit-scrollbar-track-piece {
  background-color: #f8f8f8;
}

::-webkit-scrollbar {
  width: 9px;
  height: 9px;
}

::-webkit-scrollbar-thumb {
  background-color: #dddddd;
  background-clip: padding-box;
  min-height: 28px;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
}

.el-button--primary {
  --el-button-font-color: #ffffff;
  --el-button-background-color: #4d70ff;
  --el-button-border-color: #4d70ff;
  --el-button-hover-color: #0d84ff;
  --el-button-active-font-color: #e6e6e6;
  --el-button-active-background-color: #0d84ff;
  --el-button-active-border-color: #0d84ff;
}

:root {
  --el-color-primary: #4d70ff;
}

.gva-search-box {
  padding: 24px;
  padding-bottom: 2px;
  background-color: #fff;
  border-radius: 2px;
  margin-bottom: 12px;

  .el-collapse {
    border: none;

    .el-collapse-item__header,
    .el-collapse-item__wrap {
      border-bottom: none;
    }
  }
}

.el-form--inline {
  .el-form-item {
    margin-right: 24px;
  }
}

.el-input__inner {
  height: 40px;
  line-height: 40px;
}

.gva-form-box {
  padding: 24px;
  background-color: #fff;
  border-radius: 2px;
}

.gva-table-box {
  padding: 24px;
  background-color: #fff;
  border-radius: 2px;
}

.gva-pagination {
  display: flex;
  justify-content: flex-end;

  .el-pagination__editor {
    .el-input__inner {
      height: 32px;
    }
  }

  .el-pagination__total {
    line-height: 32px !important;
  }

  .btn-prev {
    padding-right: 6px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
  }

  .number {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
  }

  .btn-quicknext {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
  }

  .btn-next {
    padding-left: 6px;
    width: 32px;
    height: 32px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .active {
    background: #4d70ff;
    border-radius: 2px;
    color: #ffffff !important;
  }

  .el-pager li.active + li {
    border-left: 1px solid #ddd !important;
  }

  .el-pagination__sizes {
    .el-input {
      .el-input__suffix {
        margin-top: 2px;
      }
    }
  }
}

.el-button--small {
  min-height: 32px;
  font-size: 12px !important;
}

.el-checkbox {
  height: auto;
}

.el-button {
  padding: 8px 16px;
  border-radius: 2px;

  &.el-button--text {
    padding: 8px 0;
  }
}

.el-dialog {
  padding: 12px;
  border-radius: 2px;

  .el-dialog__body {
    padding: 12px 6px;
  }

  .el-dialog__header {
    padding: 2px 20px 12px 20px;
    border-bottom: 1px solid #e4e4e4;

    .el-dialog__title {
      font-size: 14px;
      font-weight: 500;
    }
  }

  .el-dialog__headerbtn {
    top: 16px;
  }

  .el-dialog__footer {
    padding: 0 16px 16px 0;

    .dialog-footer {
      .el-button {
        padding-left: 24px;
        padding-right: 24px;
      }

      .el-button + .el-button {
        margin-left: 30px;
      }
    }
  }
}

.el-drawer__body {
  padding: 0;
}

.el-date-editor .el-range-separator {
  line-height: 24px;
}

.el-select .el-input .el-select__caret.el-icon {
  height: 38px;
}
</style>
