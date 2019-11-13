/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-13 19:24:02
 * @Description: 销售-销售换货单
 */
<template>
  <div>
    <table-view
      busType="18"
      ref="table"
      :filter="true"
      :moreButton="true"
      :column="true"
      title="销售换货单"
      api="seePsiSaleService.salesalterationsheetList"
      exportApi="seePsiSaleService.salesalterationsheetExport"
      :params="Object.assign(queryForm,params)"
      :filterOptions="filterOptions"
    >

      <template slot-scope="{column,row,value}">
        <!-- 销售退货单编号 -->
        <span
          class="d-text-blue d-pointer"
          v-if="column.columnFields=='alterationCode'"
          @click="eventHandle('returnVisible',row)"
        > {{value}}</span>
        <!-- 销售出库单编号 -->
        <span
          class="d-text-blue d-pointer"
          v-else-if="column.columnFields=='salesShipmentCode'"
          @click="eventHandle('outLibVisible',row)"
        > {{value}}</span>
        <!-- 状态 -->
        <span v-else-if="column.columnFields=='state'">{{stateObj[value]}}</span>
        <!-- 创建时间 -->
        <span v-else-if="column.columnFields=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </table-view>
    <returnDetails
      v-if="returnVisible"
      :visible.sync="returnVisible"
      :rowData="rowData"
      :code="rowData.alterationCode"
      @reload="this.$refs.table.reload()"
    />
    <!-- 销售出库单 -->
    <outLibDetails
      v-if="outLibVisible"
      :visible.sync="outLibVisible"
      :rowData="rowData"
      :code="rowData.salesShipmentCode"
      @reload="this.$refs.table.reload()"
    />
  </div>
</template>
<script>
import returnDetails from './details' //销售换货单详情
import outLibDetails from '../outLibrary/outLib-details' //销售出库单详情
let filterOptions = [
  // { label: '排序', prop: 'sort', default: true, type: 'sort', options: [], },
  { label: '客户编号', prop: 'title', default: true, type: 'text' },
  { label: '客户名称', prop: 'city', default: true, type: 'text' },
  { label: '联系人', prop: 'pushTime', default: true, type: 'employee', },
  { label: '联系电话', prop: 'status', default: true, type: 'text' },
  { label: '提交人', prop: 'messageType', default: true, type: 'employee', },
  { label: '部门', prop: 'messageType2', default: true, type: 'employee', },
  { label: '提交时间', prop: 'messageType3', default: true, type: 'daterange', },
]
let stateObj = {
  '-1': '新建',
  '0': '审核中',
  '1': '待完成',
  '2': '部分完成',
  '3': '已完成',
  '4': '已驳回',
}
export default {
  name: 'return',
  components: {
    returnDetails,
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
      // 列表状态
      stateObj: stateObj,
      // 列表筛选
      filterOptions: filterOptions,
      rowData: {},
      returnVisible: false,
      outLibVisible: false,
    };
  },
  methods: {
    // 按钮功能操作
    eventHandle(type, row) {
      this[type] = true
      this.rowData = row
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
