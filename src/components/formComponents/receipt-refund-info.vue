/*
 * @Author: web.王晓冬
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-22 11:32:44
 * @Description: 借款单 - 还款 单据信息
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
              v-if="item.type =='input' || item.type =='textarea'"
              :disabled='disabled'
              :type="item.type"
              v-model="data[item.prop]"
              :placeholder="`请输入${item.label}`"
            >
              <template
                v-if="item.prop == 'repaymentAmount'"
                slot="append"
              >元</template>
            </el-input>
            <!-- 结算账号 -->
            <el-select
              class="wfull"
              v-else-if="item.type =='select'"
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
        { label: '还款金额', prop: 'repaymentAmount', type: 'input', rules: [{ required: true, trigger: 'blur' }, { type: 'price' }], },
        { label: '结算账户', prop: 'companySettlementId', type: 'select', rules: [{ required: true, trigger: 'blur' }] },
        { label: '流水凭证号', prop: 'serialNumber', type: 'input', rules: [{ required: false }], },
        { label: '还款日期', prop: 'borrowTime', type: 'date', rules: [{ required: false, trigger: 'blur' }] },
        { label: '备注', prop: 'note', type: 'textarea', span: 24, rules: [{ required: false, trigger: 'blur' }] },
      ],
      options: []
    };
  },
  watch: {
    'data.companySettlementId': {
      handler(val) {
        console.log(val)
      },
      deep: true
    }
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
    chooseEmployees(item) {
      this.data.borrower = item.employeeName
    },
  }


};
</script>
<style lang="scss" scoped>
</style>