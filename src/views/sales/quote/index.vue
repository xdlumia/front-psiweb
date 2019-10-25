/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-25 18:08:21
 * @Description: 请购单
 */
<template>
  <div>
    <table-view
      selection
      type="1"
      :filter="true"
      :moreButton="true"
      :column="true"
      title="请购单"
      api="bizSystemService.getEmployeeList"
      :params="queryForm"
    >
      <template v-slot:filter>自定义筛选列</template>
      <template v-slot:button>自定义按钮</template>
      <template v-slot:moreButton>自定义更多按钮</template>
      <template slot-scope="{column,row,value}">
        <span v-if="column.prop=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </table-view>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      loading: false,
      // 查询表单
      queryForm: {
        title: "", // 标题
        city: "", // 城市
        pushTime: "",
        messageType: "",
        status: "",
        page: 1,
        limit: 20
      }
    };
  },
  methods: {
    // 配置公司
    setCompany(row) {
      this.dialogMeta.visible = true;
      this.dialogMeta.type = "";
      this.dialogMeta.width = "720px";
      this.dialogMeta.title = "报名记录";
      this.dialogMeta.data = row;
      this.dialogMeta.component = "collegeRecord";
    },
    // 重置
    reset() {
      this.$refs.queryForm.resetFields();
      this.$refs.table.reload();
    },
    // 编辑和新增用户
    updateCompany(type, data) {
      let title = "新增";
      if (type === "edit") {
        title = "编辑";
      }
      this.dialogMeta.component = "collegeAdd";
      if (type === "check") {
        title = "查看消息";
        this.dialogMeta.component = "collegeRecord";
      }
      this.dialogMeta.visible = true;
      this.dialogMeta.type = type;
      this.dialogMeta.width = "720px";
      this.dialogMeta.title = title;
      this.dialogMeta.data = data;
    },
    // 删除公司
    delCompany(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        this.$api.seePumaidongService
          .collegeManagerDelete({
            ids: row
          })
          .then(res => {
            // 重新加载表格数据
            this.tableList = [];
            this.$refs.companyTable.clearSelection();
            this.$refs.companyTable.reload();
          });
      });
    }
  }
};
</script>
