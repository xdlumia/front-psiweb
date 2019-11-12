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
      busType="7"
      :filterOptions='filterOptions'
      :params="queryForm"
      :selection='false'
      api="seePsiWmsService.wmsshipmentsorderList"
      title="发货单"
    >
      <template slot-scope="{column,row,value}">
        <span v-if="column.columnFields=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span
          v-else-if="column.columnFields=='shipmentCode'"
          class="d-text-blue"
          @click="getTableVisible(row)"
        >{{value}}</span>
        <span
          v-else-if="column.columnFields=='shipmentsOrderCode'"
          class="d-text-blue"
          @click="getTableVisible(row)"
        >{{value}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Details
      :visible.sync='tableVisible'
      :drawerData='drawerData'
      @update='update'
      v-if="tableVisible"
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
        page: 1,
        limit: 20
      },
      tableVisible: false,//销售单右侧抽屉
      componentActive: '',//当前的组件
      drawerData: {//弹框的相关数据
        title: '',
        component: 'Details',
      },
      activeName: '',
      filterOptions: [
        { label: '销售出库单编号', prop: 'shipmentCode', default: true },
        { label: '客户名称', prop: 'clientId', default: true },
        { label: '发货单编号', prop: 'salesSheetCode', default: true },
        { label: '发货人', prop: 'creator', type: 'employee', default: true },
        { label: '运单编号', prop: 'waybillCodes', default: true },
        {
          label: '生成时间',
          prop: 'Time',
          type: 'daterange',
          default: true
        },
        {
          label: '单据创建人',
          prop: 'creator1',
          type: 'employee',
          default: true
        },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept', default: true },
      ],
    };
  },
  methods: {
    //点击打开右侧边栏
    getTableVisible(data) {
      this.tableVisible = true
      this.drawerData = data
      console.log(this.drawerData)
    },
    update() {
      this.tableVisible = false
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
