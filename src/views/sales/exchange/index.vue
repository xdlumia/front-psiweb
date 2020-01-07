/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-01-06 10:20:33
 * @Description: 销售-销售换货单
 */
<template>
  <div>
    <table-view
      busType="18"
      ref="table"
      :filter="true"
      :exportButton="authorityButtons.includes('psi_sales_exchange_08')"
      :column="true"
      title="销售换货单"
      api="seePsiSaleService.salesexchangeList"
      exportApi="seePsiSaleService.salesexchangeExport"
      :params="Object.assign(queryForm,params)"
      :mergeFilter="true"
      :filterOptions="filterOptions"
    >

      <template slot-scope="{column,row,value,prop}">
        <!-- 销售换货单编号 -->
        <span
          class="d-text-blue d-pointer"
          v-if="column.columnFields=='alterationCode'"
          @click="eventHandle('exchangeVisible',row)"
        > {{value | codeSlice}}</span>
        <!-- 销售出库单编号 -->
        <span
          class="d-text-blue d-pointer"
          v-else-if="column.columnFields=='salesShipmentCode'"
          @click="eventHandle('outLibVisible',row)"
        > {{value | codeSlice}}</span>
        <span v-else-if="column.columnFields=='refundNumber'">
          {{value}}/{{row.totalRefundNumber}}
        </span>
        <span v-else-if="column.columnFields=='exchangeNumber'">
          {{value}}/{{row.totalExchangeNumber}}
        </span>
        <span v-else-if="prop=='totalRefundAmount'">{{-Number(row.actualRefundAmount)}}</span>
        <span v-else>{{value}}</span>
      </template>
    </table-view>
    <exchangeDetails
      v-if="exchangeVisible"
      :visible.sync="exchangeVisible"
      :rowData="rowData"
      :code="rowData.alterationCode"
      @reload="$refs.table.reload()"
    />
    <!-- 销售出库单 -->
    <outLibDetails
      v-if="outLibVisible"
      :visible.sync="outLibVisible"
      :rowData="rowData"
      :code="rowData.salesShipmentCode"
      @reload="$refs.table.reload()"
    />
  </div>
</template>
<script>
import exchangeDetails from './details' //销售换货单详情
import outLibDetails from '../outLibrary/outLib-details' //销售出库单详情
let filterOptions = [
  { label: '退回数量', prop: 'TotalRefundNumber', default: true, type: 'numberrange' },
  { label: '换出数量', prop: 'TotalExchangeNumber', default: true, type: 'numberrange' },
]

export default {
  name: 'return',
  components: {
    exchangeDetails,
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
      default: () => {
        return {}
      }
    },
  },
  data() {
    return {
      loading: false,
      // 查询表单
      queryForm: {
        // status: "",
        busType: 18,
        page: 1,
        limit: 20
      },
      // 列表筛选
      filterOptions: filterOptions,
      rowData: {},
      exchangeVisible: false,
      outLibVisible: false,
    };
  },
  methods: {
    // 按钮功能操作
    eventHandle(type, row) {
      this[type] = true
      this.rowData = row ? row : {}
      return
    },
    // 多选
    selectionChange(val) {
      console.log(val);

    },
    submitFilter() {
      this.$emit('submit-filter')
    },
    // 重置
    reset() {
      this.$refs.filters.$refs.form.resetFields()
      this.$refs.table.reload(1);
    },
  }
};
</script>
