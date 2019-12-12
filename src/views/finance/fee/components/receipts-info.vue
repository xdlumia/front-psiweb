<!--
 * @Author: 高大鹏
 * @Date: 2019-11-09 11:24:00
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-12-12 14:17:15
 * @Description: description
 -->
<template>
  <div class>
    <form-card title="单据信息">
      <el-row :gutter="10">
        <!-- <el-col :span="8">
          <el-form-item prop="goodName" label="费用单编号">
            <el-input v-model="data.goodName" placeholder="系统自动生成" disabled></el-input>
          </el-form-item>
        </el-col>-->
        <el-col :span="8">
          <el-form-item label="收支状态" prop="costType">
            <el-select size="mini" v-model="data.costType" class="wfull">
              <el-option :value="0" label="收入"></el-option>
              <el-option :value="1" label="支出"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="`${data.costType ? '付' : '收'}款日期`" prop="chargeDate">
            <el-date-picker
              v-model="data.chargeDate"
              type="date"
              placeholder="选择日期"
              value-format="timestamp"
              class="wfull"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结算账户" prop="companySettlementId">
            <el-select
              size="mini"
              v-model="data.companySettlementId"
              class="wfull"
              @change="selectChange"
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
        <el-col :span="8">
          <el-form-item label="对方名称" prop="clientId">
            <el-input v-model="data.clientName" v-if="detail"></el-input>
            <otherNameChoose v-else class="wufll" @choose="choose"
:value="data.clientName"></otherNameChoose>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="银行账号" prop="bankAccount">
            <el-input v-model="data.bankAccount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="data.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </form-card>
  </div>
</template>

<script type='text/ecmascript-6'>
import invoiceMixin from '../../invoice-mixins'
import otherNameChoose from './other-name-choose'
export default {
  mixins: [invoiceMixin],
  data() {
    return {
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    detail: {
      type: Boolean,
      default: false
    }
  },
  components: {
    otherNameChoose
  },
  computed: {
    settlementAccount() {
      return [].concat(...this.accountList.map(item => {
        return [].concat(...((item.commonCorporationAccountEntities || []).map(sub => {
          sub.accountType = this.$options.filters.dictionary(sub.accountType, 'PSI_GSSZ_ZHLX')
          return Object.assign(sub, { corporationName: item.corporationName, companyAccountId: item.id })
        })))
      }))
    }
  },
  methods: {
    selectChange(val) {
      const temp = this.settlementAccount.filter(item => item.id === val)[0]
      this.data.companySettlementInfo = `${temp.corporationName}${temp.accountType}(${temp.account})`
      this.data.companyAccountId = temp.companyAccountId
    },
    choose(e) {
      // bankAccount  bankAccount  bankAccount
      this.data.clientId = e[0].id
      this.data.clientName = e[0].clientName || e[0].companyName || e[0].supplierName || e[0].serviceName
      this.data.bankAccount = e[0].bankAccount
      this.data.phone = e[0].phone
      this.data.clientType = e[0].clientType
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
