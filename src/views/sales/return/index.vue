/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-15 16:56:03
 * @Description: 销售-销售退货单
 */
<template>
  <div>
    <table-view
      busType="17"
      ref="table"
      :filter="true"
      :moreButton="true"
      :column="true"
      title="销售退货单"
      api="seePsiSaleService.salesreturnedList"
      exportApi="seePsiSaleService.salesreturnedExport"
      :params="Object.assign(queryForm,params)"
      :filterOptions="filterOptions"
    >

      <template slot-scope="{column,row,value}">
        <!-- 销售换货单编号 -->
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
        <span v-else-if="column.columnFields=='state'">{{value}}</span>
        <!-- 创建时间 -->
        <span v-else-if="column.columnFields=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </table-view>
    <!-- 销售退货单详情 -->
    <returnDetails
      v-if="returnVisible"
      :visible.sync="returnVisible"
      :rowData="rowData"
      :code="rowData.alterationCode"
      @reload="this.$refs.table.reload()"
    />
    <!-- 销售出库单详情 -->
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
import returnDetails from './details' //销售退货单详情
import outLibDetails from '../outLibrary/outLib-details' //销售出库单详情
let filterOptions = [
  // { label: '商户编号、商户名称/简称', prop: 'alterationCode', default: true, type: 'text' },
  { label: '联系人、联系人电话', prop: 'shipmentCode', default: true, type: 'text' },
  // { label: '商机阶段', prop: 'state', default: true, type: 'select', options: [] },
  // { label: '跟进时间起止', prop: 'CreateTime', default: true, type: 'daterange' },
  // { label: '维护人', prop: 'creator', default: true, type: 'employee' }
]

export default {
  name: 'return',
  components: {
    returnDetails,
    outLibDetails,
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
        busType: 17,
        page: 1,
        limit: 20
      },
      // 列表状态
      stateText: {
        '-1': '新建',
        '0': '审核中',
        '1': '待完成',
        '2': '部分完成',
        '3': '已完成',
        '4': '已驳回',
      },
      // 筛选数据
      filterOptions: filterOptions,
      // 当前行数据
      rowData: {},
      returnVisible: false,
      outLibVisible: false,
    };
  },
  computed: {

  },
  watch: {
  },
  methods: {
    // 按钮功能操作
    eventHandle(type, row) {
      this[type] = true
      this.rowData = row ? row : {}
      return
    },
  }
};
</script>
