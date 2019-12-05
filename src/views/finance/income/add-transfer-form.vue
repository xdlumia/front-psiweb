/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-05 11:25:48
 * @Description: 新增转账单
*/
<template>
  <div>
    <!-- 转出账户 -->
    <form-card title="转出账户">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item
            :rules="{required:true}"
            label="公司名称"
          >
            <el-select
              v-model="company"
              class="wfull"
              @change="companyChange"
              :disabled="disabled"
              value-key="id"
            >
              <el-option
                v-for="(item, index) in accountList"
                :key="index"
                :value="item"
                :label="item.corporationName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :rules="{required:true}"
            label="转帐账户"
          >
            <el-select
              v-model="account"
              class="wfull"
              @change="accountChange"
              :disabled="disabled"
              value-key="id"
            >
              <el-option
                v-for="(item, index) in company.commonCorporationAccountEntities"
                :key="index"
                :value="item"
                :label="item.account"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :rules="[{required:true},{type:'price'}]"
            prop="amount"
            label="转账金额"
          >
            <el-input
              :disabled='disabled'
              v-model="data.amount"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </form-card>

    <!-- 转入账号 -->
    <form-card title="转入账户">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item
            :rules="{required:true}"
            label="公司名称"
          >
            <el-select
              class="wfull"
              :disabled="disabled"
              @change="intoCompanyChange"
              v-model="intoCompany"
              value-key="id"
            >
              <el-option
                v-for="(item, index) in accountList"
                :key="index"
                :value="item"
                :label="item.corporationName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">

          <el-form-item
            :rules="{required:true}"
            label="转帐账户"
          >
            <el-select
              v-model="intAccount"
              class="wfull"
              @change="intoAccountChange"
              :disabled="disabled"
              value-key="id"
            >
              <el-option
                v-for="(item, index) in intoCompany.commonCorporationAccountEntities"
                :key="index"
                :value="item"
                :label="item.account"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </form-card>

  </div>

</template>
<script>
import invoiceMixin from '@/views/finance/invoice-mixins.js'

export default {
  mixins: [invoiceMixin],
  components: {

  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      company: {},
      account: {},
      intoCompany: {},
      intAccount: {},
      isInt: ''// 是否是转入
      // 新增orEdit框内容
    }
  },

  created() {
    // this.init()
  },
  mounted() {

  },
  computed: {
    // settlementAccount() {
    //   return [].concat(...this.accountList.map(item => {
    //     return [].concat(...((item.commonCorporationAccountEntities || []).map(sub => {
    //       sub.accountType = this.$options.filters.dictionary(sub.accountType, 'PSI_GSSZ_ZHLX')
    //       return Object.assign(sub, { corporationName: item.corporationName, companyAccountId: item.id })
    //     })))
    //   }))
    // },
  },
  methods: {
    // 转出公司名称切换 清空账户
    companyChange() {
      this.account = {}
    },
    accountChange(item) {
      this.data.companytleSetmentId = item.id
      let accountType = this.$options.filters.dictionary(item.accountType, 'PSI_GSSZ_ZHLX')
      this.data.companySettlementInfo = `${this.company.corporationName}${accountType}(${item.account})`
      this.data.oppositeAccount = item.account

      // item.companySettlementId =
    },
    // 转入公司名称切换
    intoCompanyChange(item) {
      this.intAccount = {}
    },
    intoAccountChange(item) {
      this.data.intoCompanySettlementId = item.id
      let accountType = this.$options.filters.dictionary(item.accountType, 'PSI_GSSZ_ZHLX')
      this.data.intoCompanySettlementInfo = `${this.company.corporationName}${accountType}(${item.account})`
      this.data.intOppositeAccount = item.accoun
    },

  }
}
</script>
<style lang="scss" scoped>
</style>
