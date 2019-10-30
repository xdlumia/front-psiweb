/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:00:41
 * @Description: 库房  拣货单
 */
<template>
  <div class="buying-requisition-page wfull hfull">
    <!-- 右侧滑出 -->
    <TableView
      :headers="tableHeader"
      :selection='false'
      api="bizSystemService.getEmployeeList"
      title="拣货单"
    >
      <template slot-scope="{column,row,value}">
        <span @click="getTableVisible(row)">点击111</span>
        <span v-if="column.prop=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Details
      :drawerData='drawerData'
      @update='update'
    />
    <!-- <side-popup
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
            >拣货</el-button>
          </div>
          <SideStatusbar :status='status' />
        </el-header>
        <el-main class="p0">
          <el-tabs
            class='tabs-view'
            v-model="activeName"
            @tab-click="handleClick"
          >
            <el-tab-pane label="详情"></el-tab-pane>
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
    </side-popup> -->
  </div>
</template>
<script>
/**
 * 采购-请购单
 */
import TableView from '@/components/tableView';
import Details from './details.vue'
import SideStatusbar from '@/components/formComponents/side-statusbar';
export default {
  components: {
    Details,
    SideStatusbar,
    TableView
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
      componentActive: '',//当前的组件
      tableVisible: false,//销售单右侧抽屉
      drawerData: {//弹框的相关数据
        title: '',
        component: 'Details',
        tableVisible: false,//销售单右侧抽屉
      },
      activeName: '',
      tableHeader: [
        { label: '操作', prop: 'deptName', width: '140' },
        { label: '销售单编号', prop: 'deptName', width: '140' },
        { label: '组装任务编号', prop: 'deptName', width: '100' },
        { label: '客户名称', prop: 'deptName', width: '100' },
        { label: '拣货单编号', prop: 'deptName', width: '140' },
        { label: '拣货状态', prop: 'deptName', width: '100' },
        { label: '拣货数量', prop: 'deptName', width: '100' },
        { label: '未拣数量', prop: 'deptName', width: '100' },
        { label: '已拣数量', prop: 'deptName', width: '100' },
        { label: '拣货人', prop: 'createTime', width: '100' },
        { label: '商品类别', prop: 'createTime', width: '100' },
        { label: '商品名称', prop: 'createTime', width: '100' },
        { label: '生成时间', prop: 'createTime', width: '140' },
        { label: '单据创建人', prop: 'createTime', width: '100' },
        { label: '创建部门', prop: 'createTime', width: '100' }
      ]
    };
  },
  methods: {
    //点击打开右侧边栏
    getTableVisible(data) {
      this.drawerData.tableVisible = true
      this.drawerData.title = '拣货单-' + data.id
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
