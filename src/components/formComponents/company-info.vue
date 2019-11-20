/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-20 10:41:48
 * @Description: 公司信息  传入 公司发票账户 和公司结算账户id 会自动查询其余信息
*/
<template>

  <form-card title="公司信息">
    <el-row :gutter="10">
      <el-col :span="8">
        <el-form-item
          :rules="{ required: true,trigger: 'blur' }"
          label="公司发票账户"
          prop="companyAccountId"
        >
          <el-select
            @change="invoiceChange"
            class="wfull"
            :disabled='disabled'
            v-model="invoiceItem"
            value-key="id"
          >
            <el-option
              v-for="item in invoiceOptions"
              :key="item.id"
              :label="item.corporationName"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          :rules="{ required: true, trigger: 'blur'}"
          label="公司结算账户"
          prop="companySettlementId"
        >
          <el-select
            class="wfull"
            @change="settlementChange"
            :disabled='disabled'
            v-model="settlementItem"
            value-key="id"
          >
            <el-option
              v-for="item in settlementOptions"
              :key="item.id"
              :label="item.accountName || item.accountBank"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col
        :span="item.span || 8"
        v-for="(item,index) of formItems"
        :key="index"
      >
        <el-form-item
          :rules="item.rules"
          :label="item.label"
          :prop="item.prop"
        >
          <el-select
            class="wfull"
            v-if="item.type =='select'"
            :disabled='disabled'
            v-model="data[item.prop]"
            :placeholder="`请选择${item.label}`"
          >
            <el-option
              v-for="item in item.options || []"
              :key="item.id"
              :label="item.corporationName"
              :value="item.id"
            />
          </el-select>
          <el-input
            v-else
            disabled
            v-model.trim="companyInfo[item.prop]"
            :placeholder="`请输入${item.label}`"
          />

        </el-form-item>
      </el-col>
    </el-row>

  </form-card>
</template>
<script>
import { log } from 'util'
let formItems = [
  // { label: '公司发票账户', prop: 'companyAccountId', type: 'select', rules: [{ required: true, trigger: 'blur' }], options: [] },
  // { label: '公司结算账户', prop: 'companySettlementId', type: 'select', rules: [{ required: true, trigger: 'blur' }], options: [] },
  { label: '发票抬头', prop: 'invoiceTitle', type: 'input', rules: [{ required: false, trigger: 'change' }], },
  { label: '纳税人识别号', prop: 'taxpayersNum', type: 'input', rules: [{ required: false, trigger: 'change' }], },
  { label: '注册地址', prop: 'registerAddres', type: 'input', rules: [{ required: false, }], },
  { label: '开户银行', prop: 'accountBank', type: 'input', rules: [{ required: false, }], },
  { label: '开户行账号', prop: 'bankAccount', type: 'input', rules: [{ required: false, }], },
]
export default {
  props: {
    data: {
      default: () => { return {} }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      invoiceOptions: [], //公司发票信息帐号下拉
      invoiceItem: '', //v-model 绑定项
      settlementOptions: [], //公司结算帐号下拉
      settlementItem: '',//v-model 绑定项
      companyInfo: {},
      isCurrChange: false,
      // 遍历表单
      formItems: formItems.filter(item => !this.hide.includes(item.prop)),
    }
  },
  created() {
    this.commoncorporationSelectForJxc()
  },
  watch: {
    'data.companyAccountId': {
      handler(val) {
        // 如果是在外部变更的 发票账户id 需要在此初始化. 否则不用
        if (!this.isCurrChange) {
          setTimeout(() => {
            this.initFrom()
          })
        }
        this.isCurrChange = false
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 公司发票信息更改
    invoiceChange(row) {
      this.isCurrChange = true
      this.settlementOptions = row.commonCorporationAccountEntities || {}
      this.companyInfo.invoiceTitle = row.corporationName
      this.companyInfo.taxpayersNum = row.taxpayersNum
      this.companyInfo.registerAddres = row.address
      this.data.companyAccountId = row.id
      this.data.companySettlementId = ''

      // 这里的接口是公共的 .所以字段不对应
      this.companyInfo.invoiceTitle = row.corporationName
      this.companyInfo.taxpayersNum = row.taxpayersNum
      this.companyInfo.registerAddres = row.address
      this.companyInfo.accountBank = ''
      this.companyInfo.bankAccount = ''

    },
    // 公司结算账户更改
    settlementChange(row) {
      this.data.companySettlementId = row.id
      // 这里的接口是公共的 .所以字段不对应
      this.companyInfo.accountBank = row.accountBank
      this.companyInfo.bankAccount = row.account
    },
    // 初始化表单
    initFrom() {
      // 初始化数据的时候 要有发票id 并且有下拉数据
      if (this.data.companyAccountId && this.invoiceOptions.length) {
        // 获取公司发票选中项 
        this.invoiceItem = { id: this.data.companyAccountId }

        let [invoiceSelected] = this.invoiceOptions.filter(item => item.id === this.data.companyAccountId) || [{}]
        invoiceSelected = invoiceSelected || {}
        // 获取结算账户列表
        this.settlementOptions = invoiceSelected.commonCorporationAccountEntities
        // 这里的接口是公共的 .所以字段不对应
        this.companyInfo.invoiceTitle = invoiceSelected.corporationName
        this.companyInfo.taxpayersNum = invoiceSelected.taxpayersNum
        this.companyInfo.registerAddres = invoiceSelected.address
        if (this.data && this.data.companySettlementId) {
          // 获取公司结算账户当前项
          this.settlementItem = { id: this.data.companySettlementId }
          let [settlementSelected] = (this.settlementOptions || []).filter(item => item.id === this.data.companySettlementId) || [{}]
          settlementSelected = settlementSelected || {}
          // 这里的接口是公共的 .所以字段不对应
          this.companyInfo.accountBank = settlementSelected.accountBank
          this.companyInfo.bankAccount = settlementSelected.account
        }
      }
    },
    // 获取公司发票账户 和结算账户 
    commoncorporationSelectForJxc() {
      this.$api.seeBaseinfoService.commoncorporationSelectForJxc()
        .then(res => {
          // 给公司发票账户 options 添加下拉值
          // this.$set(this.formItems[0], 'options', res.data || [])
          this.invoiceOptions = res.data || []
          // 初始化表单
          this.initFrom()
        })
    },
  },
}
</script>
<style lang="scss" scoped>
</style>