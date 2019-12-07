/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-06 17:18:45
 * @Description: 账期信息
 */
<template>
  <form-card title='账期信息'>
    <el-form-item
      label="结账方式"
      prop="paymentTypeCode"
    >
      <el-select
        size="mini"
        :disabled="disabled"
        v-model="data.paymentTypeCode"
      >
        <el-option
          v-for="item in dictionaryOptions('PSI_SALE_JZFS ')"
          :key="item.code"
          :label="item.content"
          :value="item.code"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-table
      size="mini"
      :data="data.shipmentFinanceSaveVoList || []"
      show-summary
      :summary-method="getSummaries"
      ref="table"
      max-height="300px"
    >
      <el-table-column
        v-if="!disabled && !billDisable"
        label="操作"
        width="60"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <i
            type="text"
            @click="delBill(scope.$index)"
            class="d-text-blue d-pointer f18 el-icon-remove-outline"
            v-if="scope.$index>0"
          ></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="paymenDays"
        label="账期"
        width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        min-width="140"
        label="付款时间"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-form-item
            class="mb0"
            :rules="[{required:true}]"
            :prop="`shipmentFinanceSaveVoList.${scope.$index}.payTime`"
          >
            <el-date-picker
              :disabled="disabled || billDisable || scope.$index==0"
              size="mini"
              value-format="timestamp"
              v-model="scope.row.payTime"
              type="date"
              placeholder="选择日期"
            />

          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column
        min-width="80"
        label="直接生成应收"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-form-item
            class="mb0"
            :rules="[{required:true}]"
            :prop="`shipmentFinanceSaveVoList.${scope.$index}.isBillFee`"
          >
            <el-switch
              :disabled="disabled || billDisable"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.isBillFee"
            />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column
        min-width="130"
        label="付款金额(元)"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-form-item
            class="mb0"
            :rules="[{required:true},{type:'price'}]"
            :prop="`shipmentFinanceSaveVoList.${scope.$index}.payAmount`"
          >
            <el-input
              :disabled="disabled || billDisable || scope.$index==0"
              size="mini"
              placeholder="请输入"
              @input="payAmountChange(scope)"
              v-model="scope.row.payAmount"
            />
          </el-form-item>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      v-if="!disabled && !billDisable"
      class="mt10 el-icon-circle-plus-outline"
      size="mini"
      @click="addBill"
    > 增加账期</el-button>
  </form-card>
</template>
<script>
export default {
  components: {
  },
  props: {
    data: {
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
  watch: {
    'data.paymentTypeCode': {
      handler(val) {
        // 如果是现结
        if (val === 'PSI_SALE_JZFS-2') {
          this.data.shipmentFinanceSaveVoList = [{
            feeDetailCode: '', // 费用明细",
            feeTypeCode: '', // 费用类型",
            isBillFee: 1, // 0,
            payAmount: this.data.totalAmount,
            payTime: new Date().getTime(), // 付款时间
            paymenDays: "第1期", // 账期",
            paymentType: '', // 9
          }]
        }
      }
    }
  },
  data() {
    return {

    }
  },
  computed: {
    // 结账方式如果是现结不能增加账期 不能修改操作
    billDisable() {
      return this.data.paymentTypeCode == 'PSI_SALE_JZFS-2'
    }
  },
  methods: {
    payAmountChange(scope) {
      let row = scope.row
      let payAmount = row.payAmount
      let index = scope.$index
      let total = 0;
      if (index != 0) {
        total = this.data.shipmentFinanceSaveVoList.filter((item, index) => index != 0).reduce((sum, curr, index) => {
          const val = Number(curr.payAmount)
          return sum + val
        }, 0)
      }
      this.data.shipmentFinanceSaveVoList[0].payAmount = this.data.totalAmount - total
    },
    // 删除账单
    delBill(index) {
      this.data.shipmentFinanceSaveVoList.splice(index, 1)
      // 重新修改账期名称
      this.data.shipmentFinanceSaveVoList.map((item, index) => {
        item.paymenDays = `第${index + 1}期`
        return item
      })
    },
    addBill() {
      // 账期
      let paymenDays = (this.data.shipmentFinanceSaveVoList || []).length + 1
      this.data.shipmentFinanceSaveVoList.push({
        feeDetailCode: '', // 费用明细",
        feeTypeCode: '', // 费用类型",
        isBillFee: 1, // 0,
        payAmount: '', // 98765432109876.12,
        payTime: '', // 1572403069534,
        paymenDays: `第${paymenDays}期`, // 账期",
        paymentType: '', // 9
      })
    },
    // 自定义账单金额数据
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((col, index) => {
        if (index == 0) {
          sums[index] = '总价'
        } else if (index == 4) {
          const values = data.map(item => Number(item.payAmount || 0));
          let tatal = values.reduce((sum, curr) => {
            const val = Number(curr)
            return sum + curr
          }, 0)
          if (tatal > this.data.totalAmount) {
            this.$message({
              message: '所有账期的付款金额不能大于或小于总价',
              type: 'error',
              showClose: true,
            });
          }
          // 最大不能超过销售单总金额
          sums[index] = this.data.totalAmount
        }
      });
      return sums
    },
  },

}
</script>
<style scoped>
</style>
