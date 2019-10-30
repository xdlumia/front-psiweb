/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 19:33:33
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
      <template
        v-if="button"
        v-slot:button
      >
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
      <template slot-scope="{column,row,value}">
        <span
          class="d-text-blue"
          @click="quotoHandle('quoto',row)"
        > 报价单编号</span>
        <span @click="quotoHandle('outLib',row)">销售出库单编号</span>
        <span v-if="column.prop=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </table-view>
    <!-- 新增 / 编辑 弹出框-->
    <el-dialog
      :title="dialogData.title"
      :visible.sync="dialogData.visible"
      :width="dialogData.width"
      v-dialogDrag
    >
      <components
        :is="dialogData.component"
        :dialogData="dialogData"
      ></components>
    </el-dialog>

    <!-- 抽屉弹出框 -->
    <el-drawer
      :title="drawerData.title"
      :visible.sync="drawerData.visible"
      :size="drawerData.width"
    >
      <components
        :is="drawerData.component"
        :drawerData="drawerData"
      ></components>
    </el-drawer>

  </div>
</template>
<script>
import quotoDetails from './quoto-details' //报价详情
import outLibDetails from '../outLibrary/outLib-details' //销售详

import add from './add' //新增
import merge from './merge' //合并
export default {
  components: {
    quotoDetails,
    outLibDetails,
    add,
    merge
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
      //dialog弹出框
      dialogData: {
        visible: false,
        title: '',
        type: '',
        width: '920px',
        data: '',
      },
      drawerData: {
        visible: false,
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
        outLib: { comp: 'outLibDetails', title: '销售出库单' },
      }
      // 如果是新增复制合并调用dialog弹出框
      if (type == "add" || type == "copy" || type == "merge") {
        this.dialogData.visible = true
        this.dialogData.type = type
        this.dialogData.title = typeObj[type].title
        this.dialogData.component = typeObj[type].comp
        this.dialogData.data = row;
      } else {
        this.drawerData.visible = true
        this.drawerData.type = type
        this.drawerData.title = typeObj[type].title
        this.drawerData.component = typeObj[type].comp
        this.drawerData.data = row;
      }
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
