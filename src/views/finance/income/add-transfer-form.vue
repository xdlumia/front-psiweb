/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-21 17:04:07
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
            prop="companySettlementId"
            label="公司名称"
          >
            <el-select
              class="wfull"
              :disabled="disabled"
              v-model="data.companySettlementId"
            >
              <el-option
                v-for="(item, index) in settlementAccount"
                :key="index"
                :value="item.id"
                :label="`${item.corporationName}${item.accountType}(${item.account})`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :rules="{required:true}"
            prop="oppositeAccount"
            label="转帐账号"
          >
            <el-autocomplete
              class="wfull"
              :disabled='disabled'
              v-model="data.oppositeAccount"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
            >
              <el-button
                class="wfull"
                slot="append"
                icon="el-icon-plus"
                @click="addAccount"
              ></el-button>
            </el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :rules="{required:true}"
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
            prop="intoCompanySettlementId"
            label="公司名称"
          >
            <el-select
              class="wfull"
              :disabled="disabled"
              v-model="data.intoCompanySettlementId"
            >
              <el-option
                v-for="(item, index) in settlementAccount"
                :key="index"
                :value="item.id"
                :label="`${item.corporationName}${item.accountType}(${item.account})`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">

          <el-form-item
            :rules="{required:true}"
            prop="intOppositeAccount"
            label="转帐账号"
          >
            <el-autocomplete
              class="wfull"
              :disabled='disabled'
              v-model="data.intOppositeAccount"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
            >
              <el-button
                class="wfull"
                slot="append"
                icon="el-icon-plus"
                @click="addAccount('into')"
              ></el-button>
            </el-autocomplete>
          </el-form-item>
        </el-col>
      </el-row>
    </form-card>
    <otherNameList
      :visible.sync="addAccountVisible"
      @choose="choose"
      v-if="addAccountVisible"
    />
  </div>

</template>
<script>
import invoiceMixin from '@/views/finance/invoice-mixins.js'
import otherNameList from '@/views/finance/fee/components/other-name-list.vue'
export default {
  mixins: [invoiceMixin],
  components: {
    otherNameList
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
      addAccountVisible: false,
      isInto: ''// 是否是转入
      // 新增orEdit框内容
    }
  },

  created() {
    // this.init()
  },
  mounted() {

  },
  computed: {
    settlementAccount() {
      return [].concat(...this.accountList.map(item => {
        return [].concat(...((item.commonCorporationAccountEntities || []).map(sub => {
          sub.accountType = this.$options.filters.dictionary(sub.accountType, 'PSI_GSSZ_ZHLX')
          return Object.assign(sub, { corporationName: item.corporationName, companyAccountId: item.id })
        })))
      }))
    },
  },
  methods: {
    // 添加账号
    addAccount(type) {
      console.log(type);

      this.isInto = type
      this.addAccountVisible = true
    },
    // 选择对方账号
    choose(item) {
      let [row] = item
      console.log(item);

      if (this.isInto) {
        this.data.intOppositeAccount = row.bankAccount
        console.log(`${row.corporationName}${row.accountType}(${row.account})`);

      } else {
        this.data.oppositeAccount = row.account
      }

    },
    querySearchAsync(query, cb) {
      // { value: "balel"}
      cb([])
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
