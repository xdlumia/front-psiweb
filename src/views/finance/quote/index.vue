/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-18 09:05:08
 * @Description: 发票本
 */
<template>
  <div>
    <table-view
      busType="61"
      ref="table"
      :filter="true"
      :moreButton="true"
      :column="true"
      title="发票本"
      api="seePsiFinanceService.finvoicedatumList"
      exportApi="seePsiFinanceService.finvoicedatumExport"
      :params="Object.assign(queryForm,params)"
      :filterOptions="filterOptions"
      :exportButton="authorityButtons.includes('psi_quote_1002')"
    >
      <template slot="top-filter">
        <el-row style="width:430px" type="flex" justify="space-between"
align="center">
          <el-col :span="4">
            <span style="line-height:28px;">发票账户：</span>
          </el-col>
          <el-col :span="20">
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
      <template v-slot:button v-if="authorityButtons.includes('psi_quote_1001')">
        <el-button size="mini" type="primary" @click="editId = null,visible = true">发票录入</el-button>
      </template>
      <template slot-scope="{column,row,value}">
        <span v-if="column.columnFields=='invoiceSum'">{{value | dictionary('PSI_GSSZ_FPZDXE')}}</span>
        <span v-else-if="column.columnFields=='coding'">{{row.startCoding}}~{{row.endCoding}}</span>

        <span v-else>{{value}}</span>
      </template>
    </table-view>
    <add :visible.sync="visible" ref="addQuotation" v-if="visible"
@refresh="$refs.table.reload"></add>
  </div>
</template>

<script>
import invoiceMixin from '../invoice-mixins'
import add from './add'
const filterOptions = [
  { label: '发票额度', prop: 'invoiceSum', default: true, type: 'dict',
    dictName: 'PSI_GSSZ_FPZDXE' },
  { label: '增票数量', prop: 'IncreaseNumber', default: true, type: 'numberrange' },
  { label: '创建时间', prop: 'CreateTime', default: true, type: 'daterange' },
  { label: '创建人', prop: 'creator', default: true, type: 'employee' },
  { label: '发票代码', prop: 'invoiceCoding', default: true },
  // { label: '起始发票号码', prop: 'StartCoding', default: true, type: 'numberrange' },
  // { label: '结束发票号码', prop: 'EndCoding', default: true, type: 'numberrange' },
  { label: '已用数量', prop: 'UseNumber', default: true, type: 'numberrange' },
  { label: '作废数量', prop: 'FailureNumber', default: true, type: 'numberrange' }
]

export default {
  mixins: [invoiceMixin],
  name: 'Return',
  components: {
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
    }
  },
  data() {
    return {
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
      rowData: {}
    };
  },
  computed: {

  },
  watch: {
    'queryForm.companyId': {
      handler(newValue) {
        // console.log(newValue)
        this.$refs.table.reload();
      }
    }
  },
  methods: {
    // 按钮功能操作
    eventHandle(type, row) {
      this[type] = true
      this.rowData = row || {}
      return
    }
  }
};
</script>
