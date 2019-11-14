/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-14 15:47:16
 * @Description: 账期信息
 */
<template>
  <form-card title='账期信息'>
    <el-form-item
      label="结账方式"
      prop="paymentType"
    >
      <el-select
        :disabled="disabled"
        v-model="data.paymentType"
      >
        <!-- TODO 字典码不对 后期调整 -->
        <el-option
          v-for="item in dictionaryOptions('PSI_FWS_FWLX')"
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
      style="max-height:200px"
    >
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
            :rules="[{required:true}]"
            :prop="`shipmentFinanceSaveVoList.${scope.$index}.payTime`"
          >
            <el-date-picker
              :disabled="disabled"
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
            :rules="[{required:true}]"
            :prop="`shipmentFinanceSaveVoList.${scope.$index}.isBillFee`"
          >
            <el-switch
              :disabled="disabled"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.isBillFee"
            />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column
        min-width="130"
        label="付款金额"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-form-item
            :rules="[{required:true},{type:'price'}]"
            :prop="`shipmentFinanceSaveVoList.${scope.$index}.payAmount`"
          >
            <el-input
              :disabled="disabled"
              size="mini"
              placeholder="请输入"
              v-model="scope.row.payAmount"
            />
          </el-form-item>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      v-if="!disabled"
      class="mt10 el-icon-circle-plus-outline"
      size="mini"
      @click="addBill"
    > 增加账期</el-button>
  </form-card>
</template>
<script>
import { log } from 'util';
export default {
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
  data() {
    return {

    }
  },
  methods: {
    addBill() {
      let paymenDays = (this.data.shipmentFinanceSaveVoList || []).length + 1
      this.data.shipmentFinanceSaveVoList.push({
        feeDetailCode: '', // 费用明细",
        feeTypeCode: '', // 费用类型",
        isBillFee: '', // 0,
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
        } else if (index == 3) {
          const values = data.map(item => Number(item.payAmount || 0));
          sums[index] = values.reduce((sum, curr) => {
            const val = Number(curr)
            return sum + curr
          }, 0)
        }
      });
      return sums
    },
  },
  components: {
  },
}
</script>
<style scoped>
</style>
