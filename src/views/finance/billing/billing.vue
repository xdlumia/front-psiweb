<!--
 * @Author: 高大鹏
 * @Date: 2019-11-05 17:46:46
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-22 15:51:10
 * @Description: 新增报价单
 -->
<template>
  <el-row class>
    <el-dialog
      v-loading="loading"
      :visible.sync="visible"
      v-dialogDrag
      :show-close="false"
      width="1000px"
      title="新增库房"
    >
      <div slot="title" style="display:flex;">
        <h3 style="flex:1;text-align:center;">开票</h3>
        <div>
          <el-button type="primary" size="mini" @click="finvoicebillingBilling">保存</el-button>
          <el-button size="mini" @click="$emit('update:visible', false)">关闭</el-button>
        </div>
      </div>
      <el-form ref="invoiceForm" size="mini" :model="invoiceForm"
:rules="invoiceFormRule">
        <form-card title="发票信息">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item prop="invoiceTypeCode" label="发票类型">
                <d-select
                  size="mini"
                  v-model="invoiceForm.invoiceTypeCode"
                  dicCode="CW_FP_LX"
                  disabled
                ></d-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="invoiceCoding" label="发票代码">
                <el-select size="mini" v-model="invoiceForm.invoiceCoding" class="wfull">
                  <el-option
                    v-for="(item, index) in quoteList"
                    :key="index"
                    :value="item.invoiceCoding"
                    :label="item.invoiceCoding"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发票号码" prop="invoiceCode">
                <el-select
                  :remote-method="finvoicecodingList"
                  class="wfull"
                  filterable
                  remote
                  size="mini"
                  v-model="invoiceForm.invoiceCode"
                >
                  <el-option
                    v-for="(item, index) in invoiceCodeList"
                    :key="index"
                    :value="item.code"
                    :label="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </form-card>
        <form-card :title="true">
          <div slot="title" style="display:flex;justify-content: space-between;align-items: center">
            <span>物流信息</span>
            <div>
              <span class="mr5">是否需要物流</span>
              <el-switch v-model="invoiceForm.isLogistics" :active-value="1" :inactive-value="0"></el-switch>
            </div>
          </div>
          <el-row :gutter="10" v-if="invoiceForm.isLogistics">
            <el-col :span="8">
              <el-form-item prop="bmcId" label="服务商名称">
                <el-select
                  :loading="serviceLoading"
                  :remote-method="getServiceProvider"
                  class="wfull"
                  filterable
                  remote
                  v-model="invoiceForm.bmcId"
                  @change="bmcIdChange"
                >
                  <el-option
                    :key="item.code"
                    :label="item.serviceName"
                    :value="item.id"
                    v-for="item in serviceOptions"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="serveType" label="服务类型">
                <d-select
                  v-model="invoiceForm.serveType"
                  size="mini"
                  class="wfull"
                  dicCode="PSI_FWS_FWLX"
                ></d-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="物流单号" prop="trackingCode">
                <el-input v-model.trim="invoiceForm.trackingCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="运费" prop="transportAmount">
                <el-input v-model.trim="invoiceForm.transportAmount"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </form-card>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    detailForm: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      serviceOptions: [],
      serviceLoading: false,
      invoiceForm: {
        id: '',
        isLogistics: 1,
        trackingCode: '',
        transportAmount: '',
        serveType: '',
        invoiceTypeCode: '',
        invoiceCoding: '',
        invoiceCode: '',
        bmcId: '',
        bmcName: ''
      },
      quoteList: [],
      invoiceCodeList: [],
      invoiceFormRule: {
        invoiceCoding: { required: true, message: '请选择', trigger: 'change' },
        invoiceSum: { required: true, message: '请选择', trigger: 'blur' },
        invoiceCode: { required: true, message: '请选择', trigger: 'change' },
        bmcId: { required: true, message: '请选择', trigger: 'change' },
        serveType: { required: true, message: '请选择', trigger: 'change' },
        transportAmount: { pattern: /^\d{1,11}(\.\d{1,2})?$/, message: '请输入最多11位整数，两位小数', trigger: 'blur' }
      },
      loading: false
    }
  },
  components: {
  },
  watch: {
    'invoiceForm.invoiceCoding': {
      handler(newValue) {
        console.log(newValue)
        this.finvoicecodingList()
      }
    },
    'invoiceForm.isLogistics': {
      handler(newValue) {
        if (!newValue) {
          this.invoiceForm.transportAmount = ''
          this.invoiceForm.serveType = ''
          this.invoiceForm.bmcId = ''
          this.invoiceForm.bmcName = ''
          this.invoiceForm.trackingCode = ''
        }
      }
    }
  },
  computed: {
    maxHeight() {
      return window.innerHeight - 130;
    }
  },
  mounted() {
    this.invoiceForm.invoiceTypeCode = this.detailForm.invoiceTypeCode
    this.invoiceForm.id = this.detailForm.id
    this.finvoicedatumList()
    this.getServiceProvider()
    this.finvoicecodingList()
  },
  methods: {
    bmcIdChange(val) {
      this.invoiceForm.bmcName = this.serviceOptions.find(item => item.id === val).serviceName
    },
    getServiceProvider(words = '') {
      this.serviceLoading = true;
      this.$api.seePsiCommonService.commonserviceproviderList({
        page: 1,
        limit: 20,
        fuzzyServiceName: words.trim()
      }).then(res => {
        this.serviceOptions = res.data;
      }).finally(() => {
        this.serviceLoading = false;
      });
    },
    finvoicecodingList(words = '') {
      if (!this.invoiceForm.invoiceCoding) {
        return
      }
      this.$api.seePsiFinanceService.finvoicecodingList({ page: 1, limit: 20, coding: this.invoiceForm.invoiceCoding, code: words.trim() }).then(res => {
        this.invoiceCodeList = res.data
      })
    },
    finvoicedatumList() {
      this.$api.seePsiFinanceService.finvoicedatumList({ page: 1, limit: 999 }).then(res => {
        this.quoteList = res.data
      })
    },
    finvoicebillingBilling() {
      this.$refs.invoiceForm.validate(valid => {
        if (valid) {
          this.loading = true
          const method = 'finvoicebillingBilling'
          this.$api.seePsiFinanceService[method](this.invoiceForm).then(res => {
            this.$emit('refresh')
            this.$emit('update:visible', false)
          }).finally(() => { this.loading = false })
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.obsolete-number {
  /deep/ .el-form-item__label {
    width: 100%;
    display: flex;
  }
}
/deep/ .el-row--flex {
  flex-wrap: wrap;
}
/deep/ .incomeCode {
  .el-form-item__label::before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
}
</style>
