/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-14 20:18:09
 * @Description: 销售-销售出库单首页
 */
<template>
  <div>
    <table-view
      busType="16"
      ref="table"
      :filter="true"
      :exportButton="authorityButtons.includes('psi_sales_outlibrary_18')"
      :column="true"
      title="销售出库单"
      api="seePsiSaleService.salesshipmentList"
      exportApi="seePsiSaleService.salesshipmentExport"
      @selection-change="selectionChange"
      :params="Object.assign(queryForm,params)"
      mergeFilter
      :filterOptions="filterOptions"
    >
      <template slot-scope="{column,row,value}">
        <!-- 销售出库单编号 -->
        <span
          v-if="column.columnFields=='shipmentCode'"
          class="d-text-blue d-pointer"
          @click="eventHandle('detailVisible',row)"
        >{{value}}</span>

        <!-- 采购预计到货时间 -->
        <span
          v-else-if="column.columnFields=='procurementExpectedArrivalTime'"
          :class="row.salesRequireArrivalTime && row.procurementExpectedArrivalTime>row.salesRequireArrivalTime?'d-text-red':''"
        >{{value}} </span>
        <!-- 有无合同 -->
        <span v-else-if="column.columnFields=='isContract'">{{value==1?'有':value==0?'无':''}}</span>

        <!-- 有无合同 -->
        <span v-else-if="column.columnFields=='contractTemplate'">{{value==1?'非标准':value==0?'标准':''}}</span>
        <span v-else>{{value}}</span>
      </template>
    </table-view>
    <!-- 出库单详情 -->
    <outLib-details
      :visible.sync="detailVisible"
      :rowData="rowData"
      v-if="detailVisible"
      :code="rowData.shipmentCode"
      @reload="$refs.table.reload()"
    />

  </div>
</template>
<script>
import outLibDetails from './outLib-details' //销售出库单详
let filterOptions = [
  { label: '合同范本', prop: 'contractTemplate', type: 'select', default: true, options: [{ label: '全部', value: '' }, { label: '标准', value: 0 }, { label: '非标准', value: 1 }] },
]
export default {
  name: 'outLibrary',
  components: { outLibDetails },
  props: {
    // 是否显示按钮
    button: {
      type: Boolean,
      default: true
    },
    // 在当做组件引用的时候替换的参数
    params: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      loading: false,
      // 查询表单
      queryForm: {
        page: 1,//当前页数
        limit: 20,//每页显示记录数
        // shipmentCode: '',///销售出库单编号
        state: '',//状态
        creator: '',//创建人
      },
      // 筛选列表
      filterOptions: filterOptions,
      // 当前行数据
      rowData: {},
      detailVisible: false, // 出库单详情
      multipleSelection: [],
    };
  },
  methods: {
    // 按钮功能操作
    eventHandle(type, row) {
      this.rowData = row ? row : {}
      this[type] = true
      return
    },
    // 多选
    selectionChange(val) {
      this.$emit("selection-change", val);
    },
  }
};
</script>
