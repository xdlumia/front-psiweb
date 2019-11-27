/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-26 19:00:56
 * @Description: 销售-待收票
 */
<template>
  <div>
    <table-view
      busType="58"
      ref="table"
      :filter="true"
      :moreButton="true"
      :column="true"
      title="待收票"
      api="seePsiFinanceService.finvoicereceivableList"
      exportApi="seePsiFinanceService.finvoicereceivableExport"
      :params="Object.assign(queryForm,params)"
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
            <el-select
              size="mini"
              v-model="queryForm.invoiceCode"
            >
              <el-option
                value
                label="全部"
              ></el-option>
              <el-option
                v-for="(item, index) in accountList"
                :key="index"
                :value="item.invoiceSum"
                :label="`${item.corporationName}(${item.invoiceSum})`"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </template>

      <template slot-scope="{column,row,value}">
        <!-- 发票号码 -->
        <span
          class="d-text-blue d-pointer"
          v-if="column.columnFields=='invoiceCode'"
          @click="eventHandle('detailVisible',row)"
        > {{value}}</span>
        <!-- 关联单据号 -->
        <span
          class="d-text-blue"
          v-else-if="column.columnFields=='busCode'"
        > {{value}}</span>
        <!-- 发票类型 -->
        <span v-else-if="column.columnFields=='invoiceTypeCode'">{{value|dictionary('CW_FP_LX')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </table-view>

    <!-- 详情 -->
    <detail
      v-if="detailVisible"
      :visible.sync="detailVisible"
      :rowData="rowData"
      :code="rowData.invoiceCode"
      :id="rowData.id"
      @reload="$refs.table.reload()"
    />
  </div>
</template>
<script>
import detail from './details' //详情
import add from './add' //新增
import invoiceMixin from '../invoice-mixins'
let filterOptions = [
  // { label: '商户编号、商户名称/简称', prop: 'alterationCode', default: true, type: 'text' },
  // { label: '联系人、联系人电话', prop: 'shipmentCode', default: true, type: 'text' },
  // { label: '商机阶段', prop: 'state', default: true, type: 'select', options: [] },
  // { label: '跟进时间起止', prop: 'CreateTime', default: true, type: 'daterange' },
  // { label: '维护人', prop: 'creator', default: true, type: 'employee' }
]

export default {
  name: 'financeIncome',
  mixins: [invoiceMixin],
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
        dataType: 0, //票据类型(0收票，1开票)
        // invoiceCode: ''
      },
      // 筛选数据
      filterOptions: filterOptions,
      // 当前行数据
      rowData: {},
      detailVisible: false,
    };
  },
  computed: {

  },
  watch: {
    'queryForm.invoiceCode': {
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
