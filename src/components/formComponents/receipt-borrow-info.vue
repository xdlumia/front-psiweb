/*
 * @Author: web.王晓冬
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-22 15:24:36
 * @Description: 借款单 单据信息
*/
<template>
  <div>
    <form-card title="单据信息">
      <el-row :gutter="10">
        <el-col
          :span="item.span || 12"
          v-for="(item,index) of formItems"
          :key="index"
        >
          <el-form-item
            :rules="item.rules"
            :label="item.label"
            :prop="item.prop"
          >
            <employees-chosen
              v-if="item.type =='employess'"
              :multiple="false"
              :closeOnSelect="false"
              @input="chooseEmployees"
              style="width:100%"
              class="d-inline"
            >
              <el-input
                :disabled='disabled'
                v-model="data.borrower"
              ></el-input>
            </employees-chosen>
            <el-input
              v-else-if="item.type =='input' || item.type =='textarea'"
              :disabled='disabled'
              v-model="data[item.prop]"
              :type="item.type"
              :placeholder="`请输入${item.label}`"
            >
              <template
                v-if="item.prop == 'borrowingAmount'"
                slot="append"
              >元</template>
            </el-input>
            <!-- 结算账号 -->
            <el-select
              class="wfull"
              @change="companyChange"
              v-else-if="item.type =='select' && item.prop == 'companySettlementId'"
              :disabled="disabled"
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
  </div>
</template>
<script>
import invoiceMixin from '@/views/finance/invoice-mixins.js'
export default {
  mixins: [invoiceMixin],
  components: {},
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
    }
  },

  data() {
    return {
      // 遍历表单
      items: [
        { label: '借款单编号', prop: 'borrowingCode', type: 'input', rules: [{ required: true, trigger: 'blur' }], },
        { label: '借款人', prop: 'borrower', type: 'employess', rules: [{ required: true, trigger: 'blur' }], options: [{ content: '收款', code: 0 }, { content: '付款', code: 1 }], },
        { label: '借款金额', prop: 'borrowingAmount', type: 'input', rules: [{ required: true, trigger: 'blur' }, { type: 'price' }], },
        { label: '结算账户', prop: 'companySettlementId', type: 'select', rules: [{ required: true, trigger: 'blur' }] },
        { label: '借款日期', prop: 'borrowTime', type: 'date', rules: [{ required: true, trigger: 'blur' }] },
        { label: '流水单凭号', prop: 'serialNumber', type: 'input', rules: [{ required: false }], },
        { label: '预计还款日期', prop: 'returnDate', type: 'date', rules: [{ required: false, trigger: 'blur' }] },
        { label: '备注', prop: 'note', span: 24, type: 'textarea', rules: [{ required: false, trigger: 'blur' }] },
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
    companyChange(val) {
      let item = this.settlementAccount.find(v => v.id == val)
      this.data.companySettlementInfo = `${item.corporationName}${item.accountType}(${item.account})`

    },
    // 选择对方账号
    chooseEmployees(item) {
      this.data.borrower = item.employeeName
      this.data.employeeId = item.id
    },
  }


};
</script>
<style lang="scss" scoped>
</style>