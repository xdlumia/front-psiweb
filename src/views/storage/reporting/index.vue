/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: 徐贺
 * @Last Modified time: 2019-10-28 14:00:41
 * @Description: 库房  报溢报损单
 */
<template>
  <div class="buying-requisition-page wfull hfull">
    <!-- 右侧滑出 -->
    <TableView
      busType="3"
      :filterOptions='filterOptions'
      :params="params"
      ref="allTable"
      selection
      exportApi="seePsiWmsService.wmsreportinglossesExport"
      api="seePsiWmsService.wmsreportinglossesList"
      title="报溢报损单"
    >
      <template v-slot:button>
        <el-button
          type="primary"
          size='mini'
          @click="visible = true"
        >新增</el-button>
      </template>
      <template slot-scope="{column,row,value}">
        <span
          v-if="column.columnFields=='reportingLossesCode'"
          class="d-text-blue d-pointer"
          @click="getTableVisible(row)"
        >{{value}}</span>
        <span v-else-if="column.columnFields=='type'">{{value == 1 ? '报溢' : '报损'}}</span>
        <span v-else>{{value}}</span>
      </template>
    </TableView>
    <Details
      :drawerData='drawerData'
      @update='update'
      :visible.sync='tableVisible'
      v-if="tableVisible"
    />
    <reportingAdd
      :visible.sync='visible'
      @reload='reload'
    />
  </div>
</template> 
<script>
/**
 * 采购-请购单
 */
import TableView from '@/components/tableView';
import Details from './details.vue'
import reportingAdd from './reporting-add'
export default {
  components: {
    Details,
    TableView,
    reportingAdd
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
        wmsId: '',//库房id
        personInChargeId: '',//责任人id
        reportingLossesCode: '',//报溢报损单编号	
        num: '',//报溢报损数量	
        totalCostPrice: '',//总成本金额	
        taxInclusiveTotalCostPrice: '',//税款总成本金额	
        source: '',//来源
        type: '',//类别（1-报溢 2-报损）
        deptId: '',//部门ID	
        isDelete: '',//是否删除(1-是 0-否)	
        page: 1,
        limit: 20
      },
      visible: false,
      tableVisible: false,//销售单右侧抽屉
      componentActive: '',//当前的组件
      drawerData: {//弹框的相关数据
        title: '',
        component: 'Details'
      },
      activeName: '',
      filterOptions: [
        { label: '报溢报损单编号', prop: 'reportingLossesCode', default: true },
        {
          label: '类别',
          prop: 'type',
          type: 'select',
          options: [
            { label: '全部', value: '' },
            { label: '报溢', value: '1' },
            { label: '报损', value: '2' }
          ],
          default: true
        },
        {
          label: '报溢/报损数量',
          prop: 'Num',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '总成本金额',
          prop: 'TotalCostPrice',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '含税总金额',
          prop: 'TaxInclusiveTotalCostPrice',
          type: 'numberRange',
          default: true,
          int: true
        },
        {
          label: '创建时间',
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
    };
  },
  methods: {
    //点击打开右侧边栏
    getTableVisible(row) {
      this.drawerData = row
      this.tableVisible = true
    },
    //tab换组件
    handleClick() {

    },
    update() {
      this.tableVisible = false
    },
    reload() {
      this.$refs.allTable.reload()
      console.log('ahahahahha11111')
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
