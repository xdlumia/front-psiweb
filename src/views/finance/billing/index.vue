/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-18 09:05:08
 * @Description: 销售-销售退货单
 */
<template>
  <div>
    <table-view
      busType="59"
      ref="table"
      :filter="true"
      :moreButton="true"
      :column="true"
      title="待开票"
      api="seePsiFinanceService.finvoicebillingList"
      exportApi="seePsiFinanceService.salesreturnedExport"
      :params="Object.assign(queryForm,params)"
      :filterOptions="filterOptions"
      @selection-change="selectionChange"
    >
      <template slot="top-filter">
        <el-row
          style="width:300px;flex:0 0 300px;"
          type="flex"
          justify="space-between"
          align="center"
        >
          <el-col :span="6">
            <span style="line-height:28px;">发票账户：</span>
          </el-col>
          <el-col :span="18">
            <el-select size="mini" v-model="queryForm.companyId">
              <el-option value label="全部"></el-option>
              <el-option
                v-for="(item, index) in accountList"
                :key="index"
                :value="item.id"
                :label="`${item.corporationName}(${item.commonCorporationAccountEntities[0] ? item.commonCorporationAccountEntities[0].account : ''})`"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </template>
      <template v-slot:button>
        <el-button size="mini" @click="obsolete = true" v-if="button">发票作废</el-button>
        <el-button size="mini" @click="finvoicebillingDilution" v-if="button">发票冲红</el-button>
      </template>
      <template slot-scope="{column,row,value}">
        <el-button
          type="text"
          v-if="column.columnFields=='invoiceCode'"
          @click="detail(row)"
          style="padding:0"
        >{{row.invoiceCode || '未确定发票号码'}}</el-button>
        <el-button
          type="text"
          v-else-if="column.columnFields=='busCode'"
          @click="detail(row)"
          style="padding:0"
        >{{row.busCode}}</el-button>
        <span v-else-if="column.columnFields=='state'">{{stateText[row.state]}}</span>
        <span
          v-else-if="column.columnFields=='invoiceTyepCode'"
        >{{row.invoiceTyepCode | dictionary('CW_FP_LX')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </table-view>
    <cancellation :visible.sync="obsolete" v-if="obsolete" @refresh="$refs.table.reload"></cancellation>
    <detail
      @refresh="$refs.table.reload(queryForm.page)"
      v-if="showDetail"
      :rowData="rowData"
      :code="code"
      :visible.sync="showDetail"
    ></detail>
  </div>
</template>

<script>
import invoiceMixin from '../invoice-mixins'
import detail from './detail'
import cancellation from './cancellation'

const filterOptions = [
  { label: '发票类型', prop: 'invoiceTyepCode', default: true, type: 'dict',
    dictName: 'CW_FP_LX' },
  // { label: '账单状态',
  //   prop: 'settleStatus',
  //   type: 'select',
  //   default: true,
  //   options: [
  //     { label: '未结清', value: 0 },
  //     { label: '部分结清', value: 1 },
  //     { label: '已结清', value: 2 },
  //     { label: '已关闭', value: 3 }
  //   ]
  // },
  { label: '发票号码', prop: 'invoiceCode', default: true },
  { label: '商品合计金额', prop: 'CommodityTotalAmount', default: true, type: 'numberrange' },
  { label: '税价合计金额', prop: 'TaxTotalAmount', default: true, type: 'numberrange' },
  { label: '合计税金', prop: 'AccountTotalAmount', default: true, type: 'numberrange' },
  { label: '票据金额', prop: 'InvoiceAmount', default: true, type: 'numberrange' },
  // { label: '创建人', prop: 'creator', default: true, type: 'employee' },
  // { label: '金额', prop: 'Amount', default: true, type: 'numberrange' },
  { label: '开票日期', prop: 'InvoiceDate', default: true, type: 'daterange' }
]

export default {
  mixins: [invoiceMixin],
  name: 'Return',
  components: {
    detail,
    cancellation
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
    }
  },
  data() {
    return {
      obsolete: false,
      showDetail: false,
      visible: false,
      loading: false,
      // 查询表单
      queryForm: {
        page: 1,
        limit: 20,
        companyId: ''
      },
      // 筛选数据
      filterOptions: filterOptions,
      // 当前行数据
      rowData: {},
      stateText: {
        '-1': '新建',
        '0': '审核中',
        '1': '已驳回',
        '2': '待开票',
        '3': '已开票',
        '4': '已作废',
        '5': '已冲红'
      },
      billText: {
        '0': '未结清',
        '1': '部分结清',
        '2': '已结清',
        '3': '已关闭'
      },
      selectList: []
    };
  },
  computed: {
  },
  watch: {
    'queryForm.companyId': {
      handler(newValue) {
        this.$refs.table.reload();
      }
    }
  },
  mounted() {
  },
  methods: {
    finvoicebillingDilution() {
      if (!this.selectList.length) {
        this.$message.error('请选择发票')
        return
      }
      this.$confirm(`是否进行发票冲红`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = []
        const incomeCodeList = []
        this.selectList.forEach(item => {
          ids.push(item.id)
          incomeCodeList.push(item.invoiceCode)
        })
        this.$api.seePsiFinanceService.finvoicebillingDilution({ ids, incomeCodeList }).then(res => {
          this.$refs.table.reload(this.queryForm.page)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    selectionChange(val) {
      console.log(val)
      this.selectList = val
    },
    detail(row) {
      this.rowData = row
      this.code = row.id
      this.showDetail = true
    },
    // 按钮功能操作
    eventHandle(type, row) {
      this[type] = true
      this.rowData = row || {}
      return
    }
  }
};
</script>
