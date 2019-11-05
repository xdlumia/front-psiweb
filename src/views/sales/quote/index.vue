/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-05 15:48:26
 * @Description: 销售-报价单
 */
<template>
  <div>
    <!-- busType="15" -->
    <table-view
      busType="23"
      ref="table"
      :filter="true"
      :moreButton="true"
      :column="true"
      title="报价单"
      api="seePsiSaleService.salessheetList"
      exportApi="seePsiSaleService.salessheetExprot"
      :params="Object.assign(queryForm,params)"
      @selection-change="selectionChange"
      :filterOptions="filterOptions"
    >
      <!-- <template v-slot:filter>
        <filters
          ref="filters"
          @submit-filter="$refs.table.reload(1)"
          :form="queryForm"
        />
      </template> -->
      <!-- 自定义按钮功能 -->
      <template
        v-if="button"
        v-slot:button
      >
        <el-button
          size="mini"
          type="primary"
          @click="eventHandle('quoteAddVisible')"
        >新建</el-button>
        <el-button
          size="mini"
          @click="eventHandle('mergeVisible')"
        >合并生成出库单</el-button>
        <el-button
          size="mini"
          @click="eventHandle('quoteAddVisible')"
        >复制生成报价单</el-button>
      </template>
      <template v-slot:moreButton>自定义更多按钮</template>
      <template slot-scope="{column,row,value}">
        <span
          class="d-text-blue"
          @click="eventHandle('quoteVisible',row)"
        > 报价单编号</span>
        <span @click="eventHandle('outLibVisible',row)">销售出库单编号</span>
        <span v-if="column.columnFields=='createTime'">{{value|timeToStr('YYYY-MM-DD hh:mm:ss')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </table-view>
    <!-- 销售报价单详情侧边弹出框 -->
    <quote-details
      :visible.sync="quoteVisible"
      :rowData="rowData"
      @reload="this.$refs.table.reload()"
    ></quote-details>
    <!-- 销售出库单详情 -->
    <outLib-details
      :visible.sync="outLibVisible"
      :rowData="rowData"
      @reload="this.$refs.table.reload()"
    ></outLib-details>
    <!-- 新建 -->
    <quote-add
      :visible.sync="quoteAddVisible"
      type="add"
      @reload="this.$refs.table.reload()"
    ></quote-add>
    <!-- 合并报价单 -->
    <quote-merge
      :visible.sync="mergeVisible"
      type="copy"
      @reload="this.$refs.table.reload()"
    ></quote-merge>
  </div>
</template>
<script>
import quoteDetails from './quote-details' //报价详情
import outLibDetails from '../outLibrary/outLib-details' //销售详
import quoteAdd from './add' //新增
import quoteMerge from './merge' //合并
let filterOptions = [
  { label: '报价单编号', prop: 'squotationCode', default: true, type: 'text' },
  { label: '销售出库单编号', prop: 'shipmentCode', default: true, type: 'text' },
  { label: '单据状态', prop: 'pushTime', default: true, type: 'select', options: [] },
  { label: '客户名称', prop: 'clientId', default: true, type: 'text' },
  { label: '创建人', prop: 'creator', default: true, type: 'select' }
]
export default {
  name: 'quote',
  components: {
    quoteDetails,
    outLibDetails,
    quoteAdd,
    quoteMerge
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
      // 当前行数据
      rowData: {},
      // 查询表单
      queryForm: {
        alreadyShipmentNumber: '', // 已出库量,
        clientId: '', // 客户名称,
        creator: '', // 创建人
        salesSheetCode: '', // 销售单编号
        shipmentCode: '', // "示例：销售出库单编号"
        shipmentHuman: '', // "示例：出库人"
        shipmentState: '', // 出库状态
        source: '', // "示例：来源"
        squotationCode: '', // "示例：报价单编号"
        page: 1,
        limit: 20
      },
      // 报价单详情
      quoteVisible: false,
      // 报价单新增
      quoteAddVisible: false,
      // 报价单新增
      mergeVisible: false,
      // 出库单详情
      outLibVisible: false,
      // 筛选
      filterOptions: filterOptions,
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
    // reset() {
    //   this.$refs.filters.$refs.form.resetFields()
    //   this.$refs.table.reload(1);
    // },
  }
};
</script>
