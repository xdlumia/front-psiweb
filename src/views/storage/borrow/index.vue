/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:00:41
 * @Description: 库房  借入借出任务
 */
<template>
  <div class="buying-requisition-page wfull hfull">
    <!-- 右侧滑出 -->

    <!-- api="seePsiSaleService.wmsborrowloantaskList" -->
    <TableView
      busType="4"
      :filterOptions='filterOptions'
      :params="params"
      :exportButton="authorityButtons.includes('psi_wms_borrow_03')"
      ref='table'
      selection
      api="seePsiWmsService.wmsborrowloantaskList"
      exportApi="seePsiWmsService.wmsborrowloantaskExport"
      title="借入借出任务"
    >
      <template slot-scope="{column,row,value}">
        <span
          v-if="column.columnFields=='salesShipmentCode'"
          class="d-text-blue d-pointer"
          @click="getdisassemblyVisible(row)"
        >{{value}}</span>
        <span
          v-else-if="column.columnFields=='borrowLoanTaskCode'"
          class="d-text-blue d-pointer"
          @click="getTableVisible(row)"
        >{{value}}</span>
        <span v-else-if="column.columnFields=='borrowLoanType'">{{value == 0 ? '借入' : '借出'}}</span>
        <span v-else-if="column.columnFields=='borrowLoanState'">{{state[value] || '全部'}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Details
      :code='drawerData.borrowLoanTaskCode'
      @reload='reload'
      :drawerData='drawerData'
      :visible.sync='tableVisible'
      v-if="tableVisible"
    />
    <!-- 出库单详情 -->
    <outLibDetails
      :visible.sync="disassemblyVisible"
      :rowData="rowData"
      v-if="disassemblyVisible"
      :code="rowData.salesShipmentCode"
      @reload="$refs.table.reload()"
    />
  </div>
</template>
<script>
/**
 * 采购-请购单
 */
import TableView from '@/components/tableView';
import outLibDetails from '@/views/sales/outLibrary/outLib-details';
import Details from './details.vue'
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
      tableVisible: false,//销售单右侧抽屉
      state: {
        2: '待借入',
        3: '待借出',
        4: '部分借入',
        5: '部分借出',
        6: '待归还',
        7: '待返还',
        8: '部分返还',
        9: '部分归还',
        10: '完成返还',
        11: '完成归还',
        '-1': '终止',
      },
      componentActive: '',//当前的组件
      drawerData: {//弹框的相关数据
        title: '',
        component: 'Details'
      },
      activeName: '',
      status: [{ label: '出库状态', value: '待出库' }, { label: '生成时间', value: '2019-9-21 10:04:38' }, { label: '单据创建人', value: '张三' }, { label: '创建部门', value: '库房部' }, { label: '来源', value: '销售单' }],
      filterOptions: [
        { label: '借入借出任务编号', prop: 'borrowLoanTaskCode', default: true },
        { label: '销售出库单编号', prop: 'salesShipmentCode', default: true },
        {
          label: '借入借出状态',
          prop: 'state',
          type: 'select',
          options: [
            { label: '全部', value: '' },
            { label: '待借入', value: '2' },
            { label: '待借出', value: '3' },
            { label: '部分借入', value: '4' },
            { label: '部分借出', value: '5' },
            { label: '待归还', value: '6' },
            { label: '待返还', value: '7' },
            { label: '部分返还', value: '8' },
            { label: '部分归还', value: '9' },
            { label: '完成返还', value: '10' },
            { label: '完成归还', value: '11' },
            { label: '终止', value: '-1' },
          ],
          default: true
        },
        {
          label: '归还/返还时间',
          prop: 'ReturnTime',
          type: 'daterange',
          default: true
        },
        {
          label: '借入借出类型',
          prop: 'borrowLoanType',
          type: 'select',
          options: [
            { label: '全部', value: '' },
            { label: '借入', value: '0' },
            { label: '借出', value: '1' }
          ],
          default: true
        },
        {
          label: '借入/借出数量',
          prop: 'BorrowLoanNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '归还/返还数量',
          prop: 'ReturnNum',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '生成/创建时间',
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
      disassemblyVisible: false,
      rowData: {}
    };
  },
  methods: {
    //点击打开右侧边栏
    getTableVisible(data) {
      this.tableVisible = true
      this.drawerData = data
      console.log(this.drawerData, 'this.drawerDatathis.drawerDatathis.drawerDatathis.drawerData')
    },
    //销售出库单
    getdisassemblyVisible(row) {
      this.disassemblyVisible = true
      this.rowData = row
    },
    //tab换组件
    handleClick() {

    },
    reload() {
      this.$refs.table.reload()
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
