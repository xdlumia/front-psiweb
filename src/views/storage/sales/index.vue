/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:00:41
 * @Description: 库房  销售单
 */
<template>
  <div class="buying-requisition-page wfull hfull">
    <!-- 右侧滑出 -->
    <TableView
      busType="20"
      :filterOptions='filterOptions'
      :params="params"
      selection
      ref='table'
      exportApi="seePsiSaleService.salessheetExport"
      api="seePsiSaleService.salessheetList"
      title="销售单"
    >
      <template slot-scope="{column,row,value}">
        <span
          v-if="column.columnFields=='salesSheetCode'"
          class="d-text-blue d-pointer"
          @click="getTableVisible(row)"
        >{{value}}</span>
        <span
          v-else-if="column.columnFields=='shipmentCode'"
          class="d-text-blue d-pointer"
          @click="getDetailVisible(row)"
        >{{value}}</span>
        <span v-else-if="column.columnFields=='pickingState'">{{value == 0 ? '待拣货' : value == 1 ? '部分拣货' : value == 2 ? '完成拣货' : value == -1 ? '终止' : ''}}</span>
        <span v-else-if="column.columnFields=='assemblyState'">{{value == 0 ? '未开始' : value == 1 ? '待组装':value == 2 ? '部分组装':value == 3 ? '完后组装':value == -1 ? '终止':''}}</span>
        <span v-else-if="column.columnFields=='deliverState'">{{value == 0 ? '待发货' : value == 1 ? '完成发货' : value == 2 ? '终止' : ''}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Details
      :data='drawerData'
      :code="drawerData.salesSheetCode"
      :visible.sync='tableVisible'
      v-if="tableVisible"
    />
    <outLibDetails
      :visible.sync="outLibVisible"
      :rowData="rowData"
      v-if="outLibVisible"
      :code="rowData.shipmentCode"
      @reload="$refs.table.reload()"
    />
  </div>
</template>
<script>
/**
 * 采购-请购单
 */
import TableView from '@/components/tableView';
import Details from './details.vue'
import outLibDetails from '@/views/sales/outLibrary/outLib-details'
export default {
  components: {
    Details,
    TableView,
    outLibDetails
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
      rowData: {},
      outLibVisible: false,//销售出库单详情
      tableVisible: false,//销售单右侧抽屉
      componentActive: '',//当前的组件
      drawerData: {//弹框的相关数据
        tableVisible: false,//销售单右侧抽屉
        title: '',
        component: 'Details'
      },
      activeName: '',
      status: [{ label: '出库状态', value: '待出库' }, { label: '生成时间', value: '2019-9-21 10:04:38' }, { label: '单据创建人', value: '张三' }, { label: '创建部门', value: '库房部' }, { label: '来源', value: '销售单' }],
      filterOptions: [
        { label: '销售出库单编号', prop: 'shipmentCode', default: true },
        { label: '客户名称', prop: 'clientId', default: true },
        { label: '销售单编号', prop: 'salesSheetCode', default: true },
        {
          label: '拣货状态',
          prop: 'pickingState',
          type: 'select',
          options: [
            { label: '完成拣货', value: '2' },
            { label: '部分拣货', value: '1' },
            { label: '待拣货', value: '0' },
            { label: '终止', value: '-1' },
          ],
          default: true
        },
        // {
        //   label: '组装任务状态',
        //   prop: 'assemblyState',
        //   type: 'select',
        //   options: [
        //     { label: '内调', value: '1' },
        //     { label: '外调', value: '2' }
        //   ],
        //   default: true
        // },
        // {
        //   label: '发货状态',
        //   prop: 'deliverState',
        //   type: 'select',
        //   options: [
        //     { label: '内调', value: '1' },
        //     { label: '外调', value: '2' }
        //   ],
        //   default: true
        // },
        {
          label: '商品类别',
          prop: 'categoryCode',
          type: 'select',
          options: [
            { label: '内调', value: '1' },
            { label: '外调', value: '2' }
          ],
          default: true
        },
        {
          label: '出库数量',
          prop: 'WillShipmentNumber',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '未出库量',
          prop: 'WithoutShipmentNumber',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '已出库量',
          prop: 'AlreadyShipmentNumber',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '出库人',
          prop: 'shipmentHuman',
          type: 'employee',
          default: true
        },
        {
          label: '生成时间',
          prop: 'CreateTime',
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
    };
  },
  methods: {
    //点击打开右侧边栏
    getTableVisible(data) {
      this.tableVisible = true
      this.drawerData = data
    },
    //打开销售出库单详情
    getDetailVisible(data) {
      this.outLibVisible = true
      this.rowData = data
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
