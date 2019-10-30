/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:00:41
 * @Description: 库房  组装单
 */
<template>
  <div class="buying-requisition-page wfull hfull">
    <!-- 右侧滑出 -->
    <TableView
      :moreButton="true"
      :headers="tableHeader"
      :selection='false'
      api="bizSystemService.getEmployeeList"
      title="组装单"
    >
      <template v-slot:button>
        <div class='fl mr10 mt5'>
          <span class="d-text-black">自动分配：</span>
          <el-switch v-model="value1">
          </el-switch>
        </div>
        <el-button
          type="primary"
          size='mini'
        >新增</el-button>
      </template>
      <template slot-scope="{column,row,value}">
        <span
          class="d-text-blue"
          @click="getTableVisible(row)"
        >点击111</span>
        <span v-if="column.prop=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>

      <!-- <template slot-scope="{column,row,value}">
        <span @click="quotoHandle('quoto',row)">报价</span>
        <span @click="quotoHandle('sales',row)">销售</span>
        <span v-if="column.prop=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template> -->
    </TableView>
    <side-popup
      class="side-page"
      :title="drawerData.title"
      :visible.sync="tableVisible"
      size="50%"
    >
      <el-container class="wfull hfull">
        <el-header
          class="p0 d-bg-gray"
          style="height:70px;"
        >
          <div class="pl10 pr10 ar">
            <el-button
              size="mini"
              type="primary"
            >生成拣货单和组装任务</el-button>
            <el-button
              size="mini"
              type="primary"
            >终止</el-button>
          </div>
          <SideStatusbar />
        </el-header>
        <el-main class="p0">
          <el-tabs
            class='tabs-view'
            v-model="activeName"
            @tab-click="handleClick"
          >
            <el-tab-pane label="详情"></el-tab-pane>
            <el-tab-pane label="拣货单"></el-tab-pane>
            <el-tab-pane label="组装任务"></el-tab-pane>
            <el-tab-pane label="销售单"></el-tab-pane>
          </el-tabs>
          <div class="p10">
            <components
              :is='drawerData.component'
              :drawerData="drawerData"
            >
            </components>
          </div>
        </el-main>
      </el-container>
    </side-popup>
    <assemblyAdd />
  </div>
</template>
<script>
/**
 * 采购-请购单
 */
import TableView from '@/components/tableView';
import Details from './details.vue'
import assemblyAdd from './assembly-add.vue'
import SideStatusbar from '@/components/formComponents/side-statusbar';
export default {
  components: {
    Details,
    SideStatusbar,
    TableView,
    assemblyAdd
  },
  data() {
    return {
      // 查询表单
      queryForm: {
        title: '', // 标题
        city: '', // 城市
        pushTime: '',
        messageType: '',
        status: '',
        page: 1,
        limit: 20
      },
      value1: '',
      componentActive: '',//当前的组件
      tableVisible: false,//销售单右侧抽屉
      drawerData: {//弹框的相关数据
        title: '',
        component: 'Details'
      },
      activeName: '',
      status: [],
      tableHeader: [
        { label: '操作', prop: 'deptName', width: '140' },
        { label: '生成顺序', prop: 'deptName', width: '100' },
        { label: '组装单编号', prop: 'deptName', width: '140' },
        { label: '组装单状态', prop: 'deptName', width: '100' },
        { label: '拣货状态', prop: 'deptName', width: '100' },
        { label: '任务数量', prop: 'deptName', width: '80' },
        { label: '待分配', prop: 'deptName', width: '80' },
        { label: '未组装量', prop: 'deptName', width: '80' },
        { label: '已组装量', prop: 'createTime', width: '80' },
        { label: '单据创建人', prop: 'createTime', width: '100' },
        { label: '创建部门', prop: 'createTime', width: '100' },
        { label: '创建时间', prop: 'createTime', width: '100' }
      ]
    };
  },
  methods: {
    //点击打开右侧边栏
    getTableVisible(data) {
      this.tableVisible = true
      this.drawerData.title = '组装单' + data.id
    },
    //tab换组件
    handleClick() {

    }
  }
};
</script>
<style lang="scss" scoped>
.side-page {
  /deep/ {
    > .popup-main {
      width: 50% !important;
      > .popup-head {
        font-weight: bold;
        > .d-inline > .popup-close {
          position: absolute;
          right: 10px;
          top: 16px;
        }
      }
      > .popup-body {
        padding: 0;
        overflow: hidden;
      }
    }
  }
  .tabs-view {
    position: relative;
    /deep/ {
      & > .el-tabs__header {
        background-color: #f2f2f2;
        padding: 0 10px;
        > .el-tabs__nav-wrap::after {
          background-color: #f2f2f2;
        }
      }
      & > .el-tabs__content {
        height: calc(100% - 55px);
        overflow: hidden;
        overflow-y: auto;
        padding: 0 10px;
      }
    }
  }
}
</style>
