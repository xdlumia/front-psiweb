/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 16:48:57
 * @Description: 销售-销售退货单
 */
<template>
  <div>
    <table-view
      type="1"
      ref="table"
      :filter="true"
      :moreButton="true"
      :column="true"
      title="销售退货单"
      api="bizSystemService.getEmployeeList"
      :params="queryForm"
      @selection-change="selectionChange"
    >
      <template v-slot:filter>自定义筛选列</template>
      <template slot-scope="{column,row,value}">
        <span
          class="d-text-blue"
          @click="quotoHandle('return',row)"
        >销售退货单编号</span>
        <span
          class="d-text-red"
          @click="quotoHandle('outLib',row)"
        >销售出库单编号</span>
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
      :append-to-body="true"
      :title="drawerData.title"
      :visible.sync="drawerVisible"
      :size="drawerData.width"
    >
      <components
        :visible.sync="drawerVisible"
        :is="drawerData.component"
        :drawerData="drawerData"
      ></components>
    </el-drawer>

  </div>
</template>
<script>
import returnDetails from './details' //销售退货单详情
import outLibDetails from '../outLibrary/outLib-details' //销售出库单详情
export default {
  components: {
    returnDetails,
    outLibDetails
  },
  props: {
    button: {
      type: Boolean,
      default: true
    }
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
        return: { comp: 'returnDetails', title: '销售退货单' },
        outLib: { comp: 'outLibDetails', title: '销售出库单' },
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
    selectionChange() { },

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
