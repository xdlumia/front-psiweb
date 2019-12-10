/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-25 15:10:36
 * @Description: 发票库
 */
<template>
  <div>
    <table-view
      busType="60"
      ref="table"
      :filter="true"
      :moreButton="false"
      :selection="false"
      :column="true"
      title="发票库"
      api="seePsiFinanceService.finvoicewarehouseList"
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
            <el-select
              size="mini"
              v-model="queryForm.companyAccountId"
            >
              <el-option
                value
                label="全部"
              ></el-option>
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
      <template slot-scope="{column,row,value}">
        <el-image
          v-if="column.columnFields=='goodsPic'"
          :src="row.goodsPic"
          style="width: 80px;height:40px"
          fit="scale-down"
          :preview-src-list="[row.goodsPic]"
        >
          <div
            slot="error"
            class="image-slot"
          >
            <el-image
              :src="noPic"
              style="width: 40px;height:40px;"
              fit="fit"
            ></el-image>
          </div>
        </el-image>
        <span v-else-if="column.columnFields=='state'">{{stateText[row.state]}}</span>
        <span v-else-if="column.columnFields=='categoryCode'">{{row.categoryCode | dictionary('PSI_SP_KIND')}}</span>
        <span v-else>{{value}}</span>
      </template>
    </table-view>
  </div>
</template>

<script>
import invoiceMixin from '../invoice-mixins'

const filterOptions = [
  {    label: '商品类别', prop: 'categoryCode', default: true, type: 'dict',
    dictName: 'PSI_SP_KIND'  },
  { label: '商品名称', prop: 'goodsName', default: true },
  {    label: '单位', prop: 'unit', default: true, type: 'dict',
    dictName: 'SC_JLDW'  },
  { label: '规格', prop: 'specOne', default: true },
  { label: '可开票数量', prop: 'EnableNumber', default: true, type: 'numberrange' },
  { label: '实际数量', prop: 'ActualNumber', default: true, type: 'numberrange' }
]

export default {
  mixins: [invoiceMixin],
  name: 'Return',
  components: {
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
      noPic: require('@/assets/img/no-pic.png'),
      obsolete: false,
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
    'queryForm.companyAccountId': {
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
