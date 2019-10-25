/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-25 19:33:10
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
      <template slot-scope="{column,row,value}">
        <span @click="quotoHandle('quoto',row)">报价</span>
        <span @click="quotoHandle('sales',row)">销售</span>
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
      @close="closeBefore"
    >
      <components
        :is="dialogData.component"
        :dialogData="dialogData"
        v-if="dialogData.visible"
        @submit="$refs.companyTable.reload"
      ></components>
    </el-dialog>

    <!-- 抽屉弹出框 -->
    <el-drawer
      :title="drawerData.title"
      :visible.sync="drawerData.visible"
      :size="drawerData.width"
    >312312
      <components
        :is="drawerData.component"
        :drawerData="drawerData"
        v-if="drawerData.visible"
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
  components: {
    details,
    add,
    copy,
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
      dialogData: {
        visible: false,
        width: '40%',
        title: '', // dialog标题
        component: '',
        data: '', // 编辑的时候存放数据
        type: '' // 是编辑还是新增
      },
      drawerData: {
        title: '',
        visible: false,
        type: '',
        width: '820px',
        data: '',
      }
    };
  },
  methods: {
    // 按钮功能操作
    quotoHandle(type) {
      let typeObj = {
        add: { comp: 'add', title: '新增报价单' },
        copy: { comp: 'copy', title: '复制报价单' },
        merge: { comp: 'merge', title: '合并生成销售出库单' },
        quoto: { comp: 'quotoDetails', title: '新增报价单' },
        sales: { comp: 'salesDetails', title: '新增报价单' },
      }
      this.drawerData.visible = true;
      this.drawerData.type = "";
      this.drawerData.width = "820px";
      this.drawerData.title = "报名记录";
      this.drawerData.data = row;
      this.drawerData.component = typeObj[type]
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
