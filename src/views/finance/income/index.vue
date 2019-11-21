/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-21 10:13:37
 * @Description: 销售-收入流水
 */
<template>
  <div>
    <table-view
      busType="54"
      ref="table"
      :filter="true"
      :moreButton="true"
      :column="true"
      title="收入流水"
      api="seePsiFinanceService.revenuerecordList"
      exportApi="seePsiSaleService.revenuerecordExport"
      :params="Object.assign(queryForm,params)"
      :filterOptions="filterOptions"
    >

      <template slot-scope="{column,row,value}">
        <!-- 流水编号 -->
        <span
          class="d-text-blue d-pointer"
          v-if="column.columnFields=='incomeRecordCode'"
          @click="eventHandle('detailVisible',row)"
        > {{value}}</span>
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
    <detail
      v-if="detailVisible"
      :visible.sync="detailVisible"
      :rowData="rowData"
      :code="rowData.incomeRecordCode"
      @reload="this.$refs.table.reload()"
    />
  </div>
</template>
<script>
import detail from './details' //销售退货单详情
let filterOptions = [
  // { label: '商户编号、商户名称/简称', prop: 'alterationCode', default: true, type: 'text' },
  // { label: '联系人、联系人电话', prop: 'shipmentCode', default: true, type: 'text' },
  // { label: '商机阶段', prop: 'state', default: true, type: 'select', options: [] },
  // { label: '跟进时间起止', prop: 'CreateTime', default: true, type: 'daterange' },
  // { label: '维护人', prop: 'creator', default: true, type: 'employee' }
]

export default {
  name: 'return',
  components: {
    detail

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
        page: 1,
        limit: 20
      },
      // 筛选数据
      filterOptions: filterOptions,
      // 当前行数据
      rowData: {},
      detailVisible: false,
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
