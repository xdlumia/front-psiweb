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
      :params="params"
      :selection='false'
      api="seePsiWmsService.wmsshipmentsorderList"
      exportApi="seePsiWmsService.wmsshipmentsorderExport"
      title="发货单"
    >
      <template slot-scope="{column,row,value}">
        <span
          v-if="column.columnFields=='salesShipmentCode'"
          class="d-text-blue d-pointer"
          @click="getDetailVisible(row)"
        >{{value}}</span>
        <span
          v-else-if="column.columnFields=='shipmentsOrderCode'"
          class="d-text-blue d-pointer"
          @click="getTableVisible(row)"
        >{{value}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Details
      :code="drawerData.shipmentsOrderCode"
      :visible.sync='tableVisible'
      :drawerData='drawerData'
      @update='update'
      v-if="tableVisible"
    />
    <outLibDetails
      :visible.sync="outLibVisible"
      :rowData="rowData"
      v-if="outLibVisible"
      :code="rowData.salesShipmentCode"
      @reload="$refs.table.reload()"
    />
  </div>
</template>
<script>
import TableView from '@/components/tableView';
import Details from './details.vue'
import outLibDetails from '@/views/sales/outLibrary/outLib-details'
import SideStatusbar from '@/components/formComponents/side-statusbar';
export default {
  components: {
    Details,
    SideStatusbar,
    outLibDetails,
    TableView
  },
  props: {
    // 是否显示按钮
    button: {
      type: Boolean,
      default: true
    },
    // 在当做组件引用的时候替换的参数
    params: {
      type: Object,
      default: () => ({ page: 1, limit: 15 })
    }
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
        { label: '销售出库单编号', prop: 'salesShipmentCode', default: true },
        { label: '客户名称', prop: 'clientName', default: true },
        { label: '发货单编号', prop: 'shipmentsOrderCode', default: true },
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
          prop: 'creator',
          type: 'employee',
          default: true
        },
        { label: '创建部门', prop: 'deptTotalCode', type: 'dept', default: true },
      ],
      rowData: {},
      outLibVisible: false,//销售出库单详情
    };
  },
  methods: {
    //点击打开右侧边栏
    getTableVisible(data) {
      this.tableVisible = true
      this.drawerData = data
    },
    update() {
      this.tableVisible = false
    },
    //打开销售出库单详情
    getDetailVisible(data) {
      this.outLibVisible = true
      this.rowData = data
    },
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
