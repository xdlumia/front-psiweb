/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-16 09:33:52
 * @Description: 销售-支出流水
 */
<template>
  <div>
    <table-view
      busType="55"
      ref="table"
      :filter="true"
      :exportButton="authorityButtons.includes('psi_outlay_1003')"
      :column="true"
      title="支出流水"
      api="seePsiFinanceService.payrecordList"
      exportApi="seePsiFinanceService.payrecordExport"
      :params="Object.assign(queryForm,params)"
    >
      <template slot="button">
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-plus"
          @click="addVisible = true"
          v-if="authorityButtons.includes('psi_outlay_1001')"
        >新增支出流水</el-button>
        <el-button
          size="mini"
          @click="addTransferVisible = true"
          icon="el-icon-plus"
          v-if="authorityButtons.includes('psi_outlay_1002')"
        >新增转账单</el-button>
      </template>
      <template slot="top-filter">
        <bill-account-selector v-model="queryForm.companySettlementId" />
      </template>
      <template slot-scope="{column,row,value}">
        <!-- 流水编号 -->
        <span
          class="d-text-blue d-pointer"
          v-if="column.columnFields=='incomeRecordCode'"
          @click="eventHandle('detailVisible',row)"
        >
          {{value}}
          <i
            v-if="row.sourceType==2"
            class="iconfont icon-jie d-text-blue"
          ></i></span>
        <!-- 匹配状态 -->
        <span v-else-if="column.columnFields=='matchState'"> {{stateText[value]}}</span>
        <!-- 收支状态 -->
        <span v-else-if="column.columnFields=='incomeType'"> {{value ==1?'支出':'收入'}}</span>

        <span v-else>{{value}}</span>
      </template>
    </table-view>
    <!-- 新增 -->
    <add
      :visible.sync="addVisible"
      incomeType="1"
      type="add"
      @reload="$refs.table.reload()"
    />
    <!-- 新增转账单 -->
    <addTransfer
      v-if="addTransferVisible"
      incomeType="1"
      :visible.sync="addTransferVisible"
      type="add"
      @reload="$refs.table.reload()"
    />
    <!-- 详情 -->
    <detail
      v-if="detailVisible"
      :visible.sync="detailVisible"
      :rowData="rowData"
      :code="rowData.incomeRecordCode"
      @reload="$refs.table.reload()"
    />
  </div>
</template>
<script>
import add from '../income/add' //新增 支出流水
import addTransfer from '../income/add-transfer' //新增 流水账单
import detail from './details' //详情
let filterOptions = [
  // { label: '商户编号、商户名称/简称', prop: 'alterationCode', default: true, type: 'text' },
  // { label: '联系人、联系人电话', prop: 'shipmentCode', default: true, type: 'text' },
  // { label: '商机阶段', prop: 'state', default: true, type: 'select', options: [] },
  // { label: '跟进时间起止', prop: 'CreateTime', default: true, type: 'daterange' },
  // { label: '维护人', prop: 'creator', default: true, type: 'employee' }
]

export default {
  name: 'financeOutlay',
  components: {
    detail,
    add,
    addTransfer

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
      stateText: {
        '0': '未匹配',
        '1': '部分匹配',
        '2': '已匹配',
      },
      loading: false,
      // 查询表单
      queryForm: {
        page: 1,
        limit: 20,
        incomeType: 1,

      },
      // 筛选数据
      filterOptions: filterOptions,
      // 当前行数据
      rowData: {},
      addVisible: false,
      detailVisible: false,
      addTransferVisible: false,
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
