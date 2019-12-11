/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-10 17:30:21
 * @Description: 销售-借款单
 */
<template>
  <div>
    <table-view
      busType="57"
      ref="table"
      :filter="true"
      :exportButton="authorityButtons.includes('psi_borrow_1002')"
      :column="true"
      title="借款单"
      api="seePsiFinanceService.fborrowingList"
      exportApi="seePsiFinanceService.fborrowingExport"
      :params="Object.assign(queryForm,params)"
    >
      <template slot="top-filter">
        <bill-account-selector v-model="queryForm.companySettlementId" />
      </template>
      <template slot="button">
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-plus"
          @click="addVisible = true"
          v-if="authorityButtons.includes('psi_borrow_1001')"
        >新增借款</el-button>
      </template>
      <template slot-scope="{column,row,value}">
        <!-- 借款编号 -->
        <span
          class="d-text-blue d-pointer"
          v-if="column.columnFields=='borrowingCode'"
          @click="eventHandle('detailVisible',row)"
        > {{value}}</span>

        <!-- 创建时间 -->
        <span v-else>{{value}}</span>
      </template>
    </table-view>

    <!-- 新增 -->
    <add
      :visible.sync="addVisible"
      type="add"
      @reload="$refs.table.reload()"
    />

    <!-- 详情 -->
    <detail
      v-if="detailVisible"
      :visible.sync="detailVisible"
      :rowData="rowData"
      :code="rowData.borrowingCode"
      @reload="$refs.table.reload()"
    />
  </div>
</template>
<script>
import detail from './details' //详情
import add from './add' //新增
let filterOptions = [
  // { label: '商户编号、商户名称/简称', prop: 'alterationCode', default: true, type: 'text' },
  // { label: '联系人、联系人电话', prop: 'shipmentCode', default: true, type: 'text' },
  // { label: '商机阶段', prop: 'state', default: true, type: 'select', options: [] },
  // { label: '跟进时间起止', prop: 'CreateTime', default: true, type: 'daterange' },
  // { label: '维护人', prop: 'creator', default: true, type: 'employee' }
]

export default {
  name: 'financeIncome',
  components: {
    detail,
    add
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
      addTransferVisible: false,
      addVisible: false,
    };
  },
  computed: {

  },
  watch: {
    'queryForm.companySettlementId': {
      handler(newValue) {
        this.$refs.table.reload();
      }
    }
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
