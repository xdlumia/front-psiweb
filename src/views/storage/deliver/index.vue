/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:00:41
 * @Description: 库房  发货单
 */
<template>
  <div class="buying-requisition-page wfull hfull">
    <!-- 右侧滑出 -->
    <TableView
      :headers="tableHeader"
      :selection='false'
      api="bizSystemService.getEmployeeList"
      title="发货单"
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
  </div>
</template>
<script>
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
      tableVisible: false,//销售单右侧抽屉
      componentActive: '',//当前的组件
      drawerData: {//弹框的相关数据
        title: '',
        component: 'Details',
        tableVisible: false,
      },
      activeName: '',
      tableHeader: [
        { label: '销售出库单编号', prop: 'deptName', width: '140' },
        { label: '客户名称', prop: 'deptName', width: '100' },
        { label: '销售单编号', prop: 'deptName', width: '140' },
        { label: '发货人', prop: 'deptName', width: '100' },
        { label: '运单编号', prop: 'deptName', width: '100' },
        { label: '生成时间', prop: 'deptName', width: '140' },
        { label: '单据创建人', prop: 'deptName', width: '100' },
        { label: '创建部门', prop: 'createTime', width: '100' }
      ]
    };
  },
  methods: {
    //点击打开右侧边栏
    getTableVisible(data) {
      this.drawerData.tableVisible = true
      this.drawerData.title = '发货单' + data.id
    },
    update() {
      console.log('324124123')
      this.drawerData.tableVisible = false
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
