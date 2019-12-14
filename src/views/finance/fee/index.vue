/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-29 13:58:20
 * @Description: 费用单
 */
<template>
  <div>
    <table-view
      busType="62"
      ref="table"
      :filter="true"
      :moreButton="true"
      :column="true"
      title="费用单"
      api="seePsiFinanceService.fcostList"
      exportApi="seePsiFinanceService.fcostExport"
      :params="Object.assign(queryForm,params)"
      @selection-change="selectionChange"
      :filterOptions="filterOptions"
      :exportButton="authorityButtons.includes('psi_finance_cost_04')"
    >
      <template slot="top-filter">
        <el-row
          style="width:300px;flex:0 0 300px;"
          type="flex"
          justify="space-between"
          align="center"
        >
          <el-col :span="6">
            <span style="line-height:28px;">结算账户：</span>
          </el-col>
          <el-col :span="18">
            <el-select size="mini" v-model="queryForm.companySettlementId">
              <el-option value label="全部"></el-option>
              <el-option
                v-for="(item, index) in settlementAccount"
                :key="index"
                :value="item.id"
                :label="`${item.corporationName}${item.accountType}(${item.account})`"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </template>
      <template v-slot:button>
        <el-button
          size="mini"
          type="primary"
          @click="editId = null,visible = true"
          v-if="button && authorityButtons.includes('psi_finance_addfee')"
        >新增费用单</el-button>
      </template>
      <template slot-scope="{column,row,value}">
        <el-button
          type="text"
          v-if="column.columnFields=='costCode'"
          @click="detail(row)"
          style="padding:0"
        >{{row.costCode}}</el-button>
        <span v-else-if="column.columnFields=='state'">{{stateText[row.state]}}</span>
        <span v-else-if="column.columnFields=='settleStatus'">{{billText[row.settleStatus]}}</span>
        <span v-else-if="column.columnFields=='feeTypeCode'">{{value | dictionary('ZD_DY_LX')}}</span>
        <span v-else-if="column.columnFields=='feeDetailCode'">{{value | dictionary('ZD_DY_LX')}}</span>
        <span v-else-if="column.columnFields=='coding'">{{row.startCoding}}~{{row.endCoding}}</span>
        <span v-else>{{value}}</span>
      </template>
    </table-view>
    <add :visible.sync="visible" ref="addQuotation" v-if="visible"
@refresh="$refs.table.reload"></add>
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
import add from './add'
import detail from './detail'

export default {
  mixins: [invoiceMixin],
  name: 'Return',
  components: {
    add,
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
    }
  },
  data() {
    return {
      showDetail: false,
      visible: false,
      loading: false,
      // 查询表单
      queryForm: {
        page: 1,
        limit: 20,
        companySettlementId: ''
      },
      // 筛选数据
      filterOptions: [
        { label: '账单状态',
          prop: 'settleStatus',
          type: 'select',
          default: true,
          options: [
            { label: '未结清', value: 0 },
            { label: '部分结清', value: 1 },
            { label: '已结清', value: 2 },
            { label: '已关闭', value: 3 }
          ]
        },
        { label: '费用类型',
          prop: 'feeTypeCode',
          type: 'select',
          default: true,
          options: []
        },
        { label: '费用单编号', prop: 'costCode', default: true },
        { label: '对方名称', prop: 'clientName', default: true },
        { label: '创建人', prop: 'creator', default: true, type: 'employee' },
        { label: '金额', prop: 'Amount', default: true, type: 'numberrange' },
        { label: '创建时间', prop: 'CreateTime', default: true, type: 'daterange' }
      ],
      // 当前行数据
      rowData: {},
      feeTypeCodeList: [],
      stateText: {
        '-1': '新建',
        '0': '审核中',
        '1': '待复核',
        '2': '已通过',
        '3': '已驳回',
        '4': '部分分摊',
        '5': '已分摊'
      },
      billText: {
        '0': '未结清',
        '1': '部分结清',
        '2': '已结清',
        '3': '已关闭'
      }
    };
  },
  computed: {
    settlementAccount() {
      return [].concat(...this.accountList.map(item => {
        return [].concat(...((item.commonCorporationAccountEntities || []).map(sub => {
          sub.accountType = this.$options.filters.dictionary(sub.accountType, 'PSI_GSSZ_ZHLX')
          return Object.assign(sub, { corporationName: item.corporationName })
        })))
      }))
    }
  },
  watch: {
    'queryForm.companySettlementId': {
      handler(newValue) {
        this.$refs.table.reload();
      }
    }
  },
  mounted() {
    this.getDictionaryValueTreeList()
  },
  methods: {
    detail(row) {
      this.rowData = row
      this.code = row.costCode
      this.showDetail = true
    },
    // 多选
    selectionChange(val) {
      this.$emit('selection-change', val);
    },
    // 按钮功能操作
    eventHandle(type, row) {
      this[type] = true
      this.rowData = row || {}
      return
    },
    getDictionaryValueTreeList() {
      this.$api.seeDictionaryService.getDictionaryValueTreeList({ dicCode: 'ZD_DY_LX' }).then(res => {
        this.feeTypeCodeList = [{ label: '全部', value: '' }].concat(res.data.map(item => {
          return {
            label: item.content,
            value: item.code
          }
        }))
        this.$set(this.filterOptions, 1, { label: '费用类型',
          prop: 'feeTypeCode',
          type: 'select',
          default: true,
          options: this.feeTypeCodeList
        })
      })
    }
  }
};
</script>
