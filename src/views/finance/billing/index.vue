/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-13 17:14:38
 * @Description: 待开票
 */
<template>
  <div>
    <table-view
      busType="59"
      ref="table"
      :filter="true"
      :moreButton="true"
      :column="true"
      :title="title"
      api="seePsiFinanceService.finvoicebillingList"
      exportApi="seePsiFinanceService.finvoicebillingExport"
      :params="Object.assign(queryForm,params)"
      :filterOptions="filterOptions"
      @selection-change="selectionChange"
      :exportButton="authorityButtons.includes('psi_billing_1010')"
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
            <el-select size="mini" v-model="queryForm.marketId">
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
        <el-button
          size="mini"
          @click="mergeBilling"
          v-if="button && authorityButtons.includes('psi_billing_1001')"
        >合并开票</el-button>
        <el-button
          size="mini"
          @click="obsolete = true"
          v-if="button && authorityButtons.includes('psi_billing_1001')"
        >发票作废</el-button>
        <el-button
          size="mini"
          @click="finvoicebillingDilution"
          v-if="button && authorityButtons.includes('psi_billing_1002')"
        >发票冲红</el-button>
      </template>
      <template slot-scope="{column,row,value}">
        <el-button
          type="text"
          v-if="column.columnFields=='invoiceCode'"
          @click="detail(row)"
          style="padding:0"
        >{{row.invoiceCode || '未确定发票号码'}}</el-button>
        <span v-else-if="column.columnFields=='busCode' && title!='发票记录'">
          <!-- 关联单据编号 -->
          <el-link
            :underline="false"
            @click="openBusPage(row)"
            class="f12"
            type="primary"
          >{{value | codeSlice}}</el-link>
        </span>

        <span v-else-if="column.columnFields=='state'">{{stateText[row.state]}}</span>
        <span
          v-else-if="column.columnFields=='invoiceTypeCode'"
        >{{row.invoiceTypeCode | dictionary('CW_FP_LX')}}</span>
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
    <component
      :code="currentBusCode"
      :is="busInfo[currentBusType].detailPage"
      :visible.sync="showBusDetail"
      @reload="$refs.table.reload"
      v-if="showBusDetail"
    />
    <billing
      :visible.sync="showBilling"
      v-if="showBilling"
      @refresh="$refs.table.reload"
      :detailForm="billingForm"
      :type="true"
    ></billing>
  </div>
</template>

<script>
import invoiceMixin from '../invoice-mixins'
import detail from './detail'
import billing from './billing'
import cancellation from './cancellation'
import BusMixin from '@/views/finance/payment/busMixin';

const filterOptions = [
  {
    label: '发票类型', prop: 'invoiceTyepCode', default: true, type: 'dict',
    dictName: 'CW_FP_LX'
  },
  { label: '发票号码', prop: 'invoiceCode', default: true },
  { label: '购方名称', prop: 'purchaseName', default: true },
  { label: '商品金额', prop: 'CommodityTotalAmount', default: true, type: 'numberrange' },
  { label: '含税金额', prop: 'TaxTotalAmount', default: true, type: 'numberrange' },
  { label: '税金', prop: 'AccountTotalAmount', default: true, type: 'numberrange' },
  { label: '开票金额', prop: 'InvoiceAmount', default: true, type: 'numberrange' },
  { label: '开票日期', prop: 'InvoiceDate', default: true, type: 'daterange' }
]

export default {
  mixins: [invoiceMixin, BusMixin],
  name: 'Return',
  components: {
    detail,
    cancellation,
    billing
  },
  props: {
    // 客户详情引用
    title: {
      type: String,
      default: '待开票'
    },
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
  data () {
    return {
      showBilling: false,
      obsolete: false,
      showDetail: false,
      visible: false,
      loading: false,
      // 查询表单
      queryForm: {
        page: 1,
        limit: 20,
        marketId: ''
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
      selectList: [],
      billingForm: {
        ids: [],
        invoiceTypeCode: ''
      }
    };
  },
  computed: {
  },
  watch: {
    'queryForm.marketId': {
      handler (newValue) {
        this.$refs.table.reload();
      }
    }
  },
  mounted () {
  },
  methods: {
    mergeBilling () {
      if (!this.selectList.length || this.selectList.length < 2) {
        this.$message.error('请选择发票,最少两项进行合并开票')
        return
      }
      const result = this.validateMergeBilling(this.selectList)
      if (result) {
        this.$message.error('请选择相同的发票类型，相同购买方下待开票的发票')
        return
      }
      this.billingForm.ids = this.selectList.map(item => {
        return item.id
      })
      this.billingForm.invoiceTypeCode = this.selectList[0].invoiceTypeCode
      this.showBilling = true
    },
    validateMergeBilling (array) {
      const temp = array[0]
      return array.some(item => {
        return (item.invoiceTypeCode !== temp.invoiceTypeCode) || (item.purchaseId !== temp.purchaseId) ||
          (item.state !== 2)
      })
    },
    finvoicebillingDilution () {
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
    selectionChange (val) {
      console.log(val)
      this.selectList = val
    },
    detail (row) {
      this.rowData = row
      this.code = row.id
      this.showDetail = true
    },
    // 按钮功能操作
    eventHandle (type, row) {
      this[type] = true
      this.rowData = row || {}
      return
    }
  }
};
</script>
