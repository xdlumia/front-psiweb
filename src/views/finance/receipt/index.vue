/*
 * @Author: web.王晓冬
 * @Date: 2019-08-23 14:12:30
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-13 17:05:28
 * @Description: 销售-待收票
 */
<template>
  <div>
    <table-view
      busType="58"
      ref="table"
      :filter="true"
      :exportButton="authorityButtons.includes('psi_receipt_1007')"
      :column="true"
      :title="title"
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
              v-model="queryForm.purchaseId"
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
        <!-- 发票号码 -->
        <span
          class="d-text-blue d-pointer"
          v-if="column.columnFields=='invoiceCode'"
          @click="eventHandle('detailVisible',row)"
        > {{value}}</span>

        <span v-else-if="column.columnFields=='busCode'">
          <!-- 关联单据编号 -->
          <el-link
            :type="hasBusPage(row)?'primary':'info'"
            :underline="false"
            @click="openBusPage(row)"
            class="f12"
          >{{value}}</el-link>
        </span>
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
    <component
      :code="currentBusCode"
      :is="busInfo[currentBusType].detailPage"
      :visible.sync="showBusDetail"
      @reload="$refs.table.reload()"
      v-if="showBusDetail"
    />
  </div>
</template>
<script>
import detail from './details' //详情
import invoiceMixin from '../invoice-mixins'
import BusMixin from '@/views/finance/payment/busMixin.js';

export default {
  name: 'financeIncome',
  mixins: [invoiceMixin, BusMixin],
  components: {
    detail
  },
  props: {
    title: {
      type: String,
      default: '待收票'
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
    },
  },
  data() {
    return {
      loading: false,
      // 查询表单
      queryForm: {
        page: 1,
        limit: 20,
        dataType: 0, //票据类型(0收票，1开票)
        purchaseId: '',
        // invoiceCode: ''
      },
      // 当前行数据
      rowData: {},
      detailVisible: false,
    };
  },
  computed: {

  },
  watch: {
    'queryForm.purchaseId': {
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
