/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-01-06 10:22:28
 * @Description: 销售-报价单
 */
<template>
  <div>
    <!-- busType="15" -->
    <table-view
      busType="15"
      ref="table"
      :filter="true"
      :exportButton="authorityButtons.includes('psi_sales_quote_15')"
      :column="true"
      title="报价单"
      api="seePsiSaleService.salesquotationList"
      exportApi="seePsiSaleService.salesquotationExport"
      :params="Object.assign(queryForm,params)"
      @selection-change="selectionChange"
    >
      <!-- 自定义按钮功能 -->
      <template v-slot:button>
        <el-button
          size="mini"
          type="primary"
          @click="eventHandle('quoteAddVisible')"
          v-if="authorityButtons.includes('psi_sales_quote_02')"
        >新建</el-button>
        <el-button
          size="mini"
          @click="eventHandle('mergeVisible')"
          v-if="authorityButtons.includes('psi_sales_quote_03')"
        >合并生成出库单</el-button>
        <el-button
          size="mini"
          @click="eventHandle('quoteCopyVisible')"
          v-if="authorityButtons.includes('psi_sales_quote_04')"
        >复制生成报价单</el-button>
      </template>
      <template slot-scope="{column,prop,row,value}">
        <!-- 报价单编号 -->
        <span
          v-if="prop == 'quotationCode'"
          class="d-text-blue d-pointer"
          @click="eventHandle('quoteVisible',row)"
        > {{value | codeSlice}}</span>
        <!-- 销售出库单编号 -->
        <span
          v-else-if="prop == 'shipmentCode'"
          class="d-text-blue d-pointer"
          @click="eventHandle('outLibVisible',row)"
        > {{value | codeSlice}}</span>
        <span v-else>{{value}}</span>
      </template>
    </table-view>
    <!-- 销售报价单详情侧边弹出框 -->
    <quote-details
      v-if="quoteVisible"
      :visible.sync="quoteVisible"
      :rowData="rowData"
      :code="rowData.quotationCode"
      @reload="$refs.table.reload()"
    ></quote-details>
    <!-- 销售出库单详情 -->
    <outLib-details
      v-if="outLibVisible"
      :visible.sync="outLibVisible"
      :rowData="rowData"
      :code="rowData.shipmentCode"
      @reload="$refs.table.reload()"
    ></outLib-details>
    <!-- 新建 -->
    <quote-add
      :visible.sync="quoteAddVisible"
      type="add"
      @reload="$refs.table.reload()"
    ></quote-add>
    <!-- 复制 -->
    <quote-add
      :visible.sync="quoteCopyVisible"
      type="copy"
      :rowData="rowData"
      :code="rowData.quotationCode"
      @reload="$refs.table.reload()"
    ></quote-add>
    <!-- 合并生成出库单 所以rowData是多行数据 -->
    <outLibAdd
      v-if="mergeVisible"
      :visible.sync="mergeVisible"
      type="merge"
      :rowData="selectionData"
      @reload="$refs.table.reload()"
    />
  </div>
</template>
<script>
import quoteDetails from './quote-details' //报价详情
import outLibDetails from '../outLibrary/outLib-details' //销售详
import quoteAdd from './add' //新增
import outLibAdd from '../outLibrary/add' //生成出库单
// let filterOptions = [
//   { label: '报价单编号', prop: 'quotationCode', default: true, type: 'text' },
//   { label: '销售出库单编号', prop: 'shipmentCode', default: true, type: 'text' },
//   { label: '单据状态', prop: 'state', default: true, type: 'select', options: [] },
//   { label: '客户名称', prop: 'clientId', default: true, type: 'employee' },
//   { label: '创建人', prop: 'creator', default: true, type: 'select' }
// ]
export default {
  name: 'quote',
  components: {
    quoteDetails,
    outLibDetails,
    quoteAdd,
    outLibAdd,
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
      default: () => ({})
    },
  },
  data() {
    return {
      loading: false,
      // 当前行数据
      rowData: {},
      selectionData: [],
      // 查询表单
      queryForm: {
        page: 1,
        limit: 20,
        quotationCode: '',//报价单编号
        shipmentCode: '',//出库单编号
        state: '',//状态
        apprpvalState: '',//审核状态
        clientId: '',//客户id
        creator: '',//
      },
      // 报价单详情
      quoteVisible: false,
      // 报价单新增
      quoteAddVisible: false,
      quoteCopyVisible: false,
      // 报价单新增
      mergeVisible: false,
      // 出库单详情
      outLibVisible: false,
      // 筛选
      // filterOptions: filterOptions,
    };
  },
  methods: {
    // 按钮功能操作
    eventHandle(type, row) {
      if (type === 'mergeVisible') {
        if (!this.selectionData.length) {
          this.$message.error({
            showClose: true,
            message: '合并生成出库单最少选择两条数据'
          })
          return
        }
        if (this.selectionData.some(item => item.shipmentCode || item.state != '1')) {
          this.$message.error({
            showClose: true,
            message: '已经生成出库单或者非已通过状态不能合并'
          })
          return
        }
        if (this.selectionData.map(item => item.clientId).filter((a, b, c) => c.indexOf(a) == b).length != 1) {
          return this.$message.error({
            showClose: true,
            message: '相同客户的报价单才可合并生成出库单'
          })
        }
        if (this.selectionData.map(item => item.companySettlementId).filter((a, b, c) => c.indexOf(a) == b).length != 1) {
          return this.$message.error({
            showClose: true,
            message: '相同公司结算账户才可合并生成出库单'
          })
        }

      }
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
      this.rowData = row ? row : {}
      this[type] = true
    },
    // 多选
    selectionChange(val) {
      this.selectionData = val
    }
  }
};
</script>
