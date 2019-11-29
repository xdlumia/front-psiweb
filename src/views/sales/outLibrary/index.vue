/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-29 14:43:28
 * @Description: 销售-销售出库单首页
 */
<template>
  <div>
    <table-view
      busType="16"
      ref="table"
      :filter="true"
      :moreButton="true"
      :column="true"
      title="销售出库单"
      api="seePsiSaleService.salesshipmentList"
      exportApi="seePsiSaleService.salesshipmentExport"
      @selection-change="selectionChange"
      :params="Object.assign(queryForm,params)"
    >
      <template slot-scope="{column,row,value}">
        <!-- 销售出库单编号 -->
        <span
          v-if="column.columnFields=='shipmentCode'"
          class="d-text-blue d-pointer"
          @click="eventHandle('detailVisible',row)"
        >{{value}}</span>
        <!-- 有无合同 -->
        <span v-else-if="column.columnFields=='isContract'">{{value?'有':'无'}}</span>

        <!-- 有无合同 -->
        <span v-else-if="column.columnFields=='contractTemplate'">{{value}}</span>
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
// let filterOptions = [
//   { label: '商户编号、商户名称/简称', prop: 'text', type: 'text', default: true, },
//   { label: '联系人、联系人电话', prop: 'text1', type: 'text', default: true, },
//   { label: '商机阶段', prop: 'pushTime', type: 'select', default: true, dicName: 'PSI_SP_KIND' },
//   { label: '跟进时间起止', prop: 'status', type: 'daterange', default: true, },
//   { label: '维护人', prop: 'creator', type: 'employee', default: true, },
// ]
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
      // filterOptions: filterOptions,
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
