/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-25 18:55:40
 * @Description: 销售-请购单
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
        <span @click="click(row)">点击以下哈哈</span>
        <span v-if="column.prop=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </table-view>
    <!-- 抽屉弹出框 -->
    <el-drawer
      title="我是标题"
      :visible.sync="drawer.visible"
      :size="drawer.size"
    >312312
      <components
        :is="drawer.component"
        :drawer="drawer"
        v-if="drawer.visible"
      ></components>
    </el-drawer>

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
      },
      drawer: {
        title: true,
        visible: true,
        type: '',
        size: '820px',
        data: '',
        width: ''
      }
    };
  },
  methods: {
    // 配置公司
    click(row) {
      console.log(11);

      this.drawer.visible = true;
      this.drawer.type = "";
      this.drawer.width = "820px";
      this.drawer.title = "报名记录";
      this.drawer.data = row;
      // this.drawer.component = "collegeRecord";
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
      this.drawer.component = "collegeAdd";
      if (type === "check") {
        title = "查看消息";
        this.drawer.component = "collegeRecord";
      }
      this.drawer.visible = true;
      this.drawer.type = type;
      this.drawer.width = "720px";
      this.drawer.title = title;
      this.drawer.data = data;
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
