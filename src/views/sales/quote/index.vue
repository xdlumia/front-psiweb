/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 11:26:55
 * @Description: 销售-报价单
 */
<template>
  <div>
    <table-view
      type="1"
      ref="table"
      :filter="true"
      :moreButton="true"
      :column="true"
      title="报价单"
      api="bizSystemService.getEmployeeList"
      :params="queryForm"
      @selection-change="selectionChange"
    >
      <template v-slot:filter>自定义筛选列</template>
      <!-- 自定义按钮功能 -->
      <template v-slot:button>
        <el-button
          size="mini"
          type="primary"
          @click="quotoHandle('add')"
        >新建</el-button>
        <el-button
          size="mini"
          @click="quotoHandle('merge')"
        >合并生成出库单</el-button>
        <el-button
          size="mini"
          @click="quotoHandle('copy')"
        >复制生成报价单</el-button>
      </template>
      <template v-slot:moreButton>自定义更多按钮</template>
      <template slot-scope="{column,row,value,scope}">
        {{scope.$index}}
        <span @click="quotoHandle('quoto',row)">报价单编号</span>
        <span @click="quotoHandle('sales',row)">销售单编号</span>
        <span v-if="column.prop=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </table-view>
    <!-- 新增 / 编辑 弹出框-->
    <el-dialog
      :title="drawerData.title"
      :visible.sync="dialogVisible"
      :width="drawerData.width"
      v-dialogDrag
    >
      <components
        :is="drawerData.component"
        :visible.sync="dialogVisible"
        :dialogData="drawerData"
        v-if="dialogVisible"
        @submit="$refs.table.reload"
      ></components>
    </el-dialog>

    <!-- 抽屉弹出框 -->
    <el-drawer
      :title="drawerData.title"
      :visible.sync="drawerVisible"
      :size="drawerData.width"
    >
      <components
        :visible.sync="drawerVisible"
        :is="drawerData.component"
        :drawerData="drawerData"
        v-if="drawerVisible"
      ></components>
    </el-drawer>

  </div>
</template>
<script>
import quotoDetails from './quoto-details' //报价详情
import salesDetails from './sales-details' //销售详情
import add from './add' //新增
import merge from './merge' //合并
export default {
  props: {
    button: {
      type: Boolean,
      default: false
    }
  },
  components: {
    quotoDetails,
    salesDetails,
    add,
    merge
  },
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
      dialogVisible: false, //dialog弹出框
      drawerVisible: false, //抽屉弹出框
      drawerData: {
        title: '',
        type: '',
        width: '920px',
        data: '',
      }
    };
  },
  methods: {
    // 按钮功能操作
    quotoHandle(type, row) {
      let typeObj = {
        add: { comp: 'add', title: '新增报价单' },
        copy: { comp: 'add', title: '复制报价单' },
        merge: { comp: 'merge', title: '合并生成销售出库单' },
        quoto: { comp: 'quotoDetails', title: '报价单' },
        sales: { comp: 'salesDetails', title: '销售出库单' },
      }
      // 如果是新增复制合并调用dialog弹出框
      if (type == "add" || type == "copy" || type == "merge") {
        this.dialogVisible = true
      } else {
        // 否则调用抽屉弹出框
        this.drawerVisible = true;
      }
      // 非新增才会有row数据
      if (type != 'add') {
        this.drawerData.data = row;
      }

      this.drawerData.type = type
      this.drawerData.title = typeObj[type].title
      this.drawerData.component = typeObj[type].comp
    },
    // 多选
    selectionChange(val) {
      console.log(val);

    },
    // 重置
    reset() {
      this.$refs.queryForm.resetFields();
      this.$refs.table.reload();
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
