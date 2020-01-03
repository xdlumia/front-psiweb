/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-01-03 15:01:03
 * @Description: 销售-销售退货单
 */
<template>
  <div>
    <table-view
      busType="17"
      ref="table"
      :filter="true"
      :exportButton="authorityButtons.includes('psi_sales_return_10')"
      :column="true"
      title="销售退货单"
      api="seePsiSaleService.salesreturnedList"
      exportApi="seePsiSaleService.salesreturnedExport"
      :params="Object.assign(queryForm,params)"
      :mergeFilter="true"
      :filterOptions="filterOptions"
      @selection-change="selectionChange"
    >
      <!-- 自定义按钮功能 -->
      <template v-slot:button>
        <el-button
          size="mini"
          @click="eventHandle('quoteCopyVisible')"
          v-if="authorityButtons.includes('psi_sales_quote_04')"
        >复制生成报价单</el-button>
      </template>
      <template slot-scope="{column,row,value}">
        <!-- 退货单编号 -->
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
        <!-- 状态 -->
        <span v-else-if="column.columnFields=='refundNumber'">
          {{value}}/{{row.totalRefundNumber}}
        </span>
        <span v-else>{{value}}</span>
      </template>
    </table-view>
    <!-- 复制 -->
    <quote-add
      :visible.sync="quoteCopyVisible"
      type="copy"
      :rowData="rowData"
      :code="rowData.quotationCode"
      @reload="$refs.table.reload()"
    ></quote-add>
    <!-- 销售退货单详情 -->
    <returnDetails
      v-if="returnVisible"
      :visible.sync="returnVisible"
      :rowData="rowData"
      :code="rowData.alterationCode"
      @reload="$refs.table.reload()"
    />
    <!-- 销售出库单详情 -->
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
import quoteAdd from '../quote/add'
import returnDetails from './details' //销售退货单详情
import outLibDetails from '../outLibrary/outLib-details' //销售出库单详情

let filterOptions = [
  { label: '退货数量', prop: 'TotalRefundNumber', default: true, type: 'numberrange' },
]

export default {
  name: 'return',
  components: {
    returnDetails,
    outLibDetails,
    quoteAdd
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
      selectionData: [],
      // 当前行数据
      rowData: {},
      quoteCopyVisible: false,
      returnVisible: false,
      outLibVisible: false,
    };
  },
  computed: {

  },
  watch: {
  },
  methods: {
    // 多选
    selectionChange(val) {
      this.selectionData = val
    },
    // 按钮功能操作
    eventHandle(type, row) {
      if (type === 'quoteCopyVisible') {
        if (this.selectionData.length != 1) {
          this.$message.error({
            showClose: true,
            message: '复制生成报价单只能选择一条数据'
          })
          return
        }
        this.rowData = this.selectionData[0]
        this[type] = true
        return
      }
      this[type] = true
      this.rowData = row ? row : {}
      return
    },
  }
};
</script>
