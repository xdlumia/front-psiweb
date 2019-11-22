/*
 * @Author: web.王晓冬
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-21 20:04:01
 * @Description: 借款单 单据信息
*/
<template>
  <div>
    <form-card title="单据信息">
      <el-row :gutter="10">
        <el-col
          :span="span || 8"
          v-for="(item,index) of formItems"
          :key="index"
        >
          <el-form-item
            :rules="item.rules"
            :label="item.label"
            :prop="item.prop"
          >
            <el-input
              v-if="item.type =='input'"
              :disabled='disabled'
              v-model="data[item.prop]"
              :placeholder="`请输入${item.label}`"
            >
              <template
                v-if="item.prop == 'borrowingAmount'"
                slot="append"
              >元</template>
              <el-button
                v-else-if="item.prop == 'borrower'"
                slot="append"
                @click="borrowerVisible = true"
                icon="el-icon-plus"
              ></el-button>

            </el-input>
            <!-- 结算账号 -->
            <el-select
              class="wfull"
              v-else-if="item.type =='select' && item.prop == 'companySettlementId'"
              :disabled="disabled || item.prop== 'incomeType'"
              v-model="data[item.prop]"
              :placeholder="`请输入${item.label}`"
            >
              <el-option
                v-for="(item, index) in settlementAccount"
                :key="index"
                :value="item.id"
                :label="`${item.corporationName}${item.accountType}(${item.account})`"
              ></el-option>
            </el-select>

            <el-select
              class="wfull"
              v-else-if="item.type =='select'"
              :disabled="disabled"
              v-model="data[item.prop]"
              :placeholder="`请输入${item.label}`"
            >
              <el-option
                v-for="sub in item.options"
                :key="sub.code"
                :label="sub.content"
                :value="sub.code"
              />
            </el-select>
            <el-date-picker
              class="wfull"
              v-else-if="item.type =='date'"
              value-format="timestamp"
              :disabled='disabled'
              v-model="data[item.prop]"
              :placeholder="`请选择${item.label}`"
            />
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
  components: { otherNameList },
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
    span: {
      type: Number,
      default: 8
    }
  },

  data() {
    return {
      borrowerVisible: false, //添加账单
      // 遍历表单
      items: [
        { label: '借款单编号', prop: 'borrowingCode', type: 'input', rules: [{ required: true, trigger: 'blur' }], },
        { label: '借款人', prop: 'borrower', type: 'input', rules: [{ required: true, trigger: 'blur' }], options: [{ content: '收款', code: 0 }, { content: '付款', code: 1 }], },
        { label: '借款金额', prop: 'borrowingAmount', type: 'input', rules: [{ required: true, trigger: 'blur' }, { type: 'price' }], },
        { label: '结算账户', prop: 'companySettlementId', type: 'select', rules: [{ required: true, trigger: 'blur' }] },
        { label: '借款日期', prop: 'borrowTime', type: 'date', rules: [{ required: true, trigger: 'blur' }] },
        { label: '流水单凭号', prop: 'serialNumber', type: 'input', rules: [{ required: false }], },
        { label: '预计还款日期', prop: 'returnDate', type: 'date', rules: [{ required: true, trigger: 'blur' }] },
      ],
      options: []
    };
  },
  computed: {
    formItems() {
      return this.items.filter(item => !this.hide.includes(item.prop))
    },
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
    // 选择对方账号
    choose(item) {
      let [row] = item
      this.data.oppositeAccount = row.bankAccount
    },
  }


};
</script>
<style lang="scss" scoped>
</style>