/*
 * @Author: 赵伦
 * @Date: 2019-11-07 17:03:52
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-09 11:14:31
 * @Description: 账单信息
*/
<template>
  <form-card title="账单信息">
    <el-table :data="data.financeList" :summary-method="getSummaries" max-height="500px" ref="table" show-summary>
      <el-table-column label="操作" min-width="60" v-if="!disabled">
        <template slot-scope="{$index}">
          <el-link :underline="false" @click="remove($index)" class="d-text-blue el-icon-remove f20" v-if="$index"></el-link>
        </template>
      </el-table-column>
      <el-table-column align="center" label="账期" min-width="60" show-overflow-tooltip>
        <template slot-scope="{$index}">
          <span>第{{$index+1}}期</span>
        </template>
      </el-table-column>
      <el-table-column :label="type==1?'收款时间':'付款时间'" align="center" min-width="140" prop="payTime" show-overflow-tooltip>
        <template slot-scope="{row,$index}">
          <el-form-item
            :prop="`financeList.${$index}.payTime`"
            :rules="[
              {required:true}
          ]"
            size="mini"
            style="margin-bottom:0;"
          >
            <el-date-picker
              :disabled="disabled"
              align="right"
              class="wfull"
              placeholder="选择日期"
              size="mini"
              type="date"
              v-model="row.payTime"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column align="center" label="直接生成应付" min-width="100" prop="isBillFee" v-if="!hide.includes('isBillFee')">
        <template slot-scope="{row,$index}">
          <el-form-item :prop="`financeList.${$index}.isBillFee`" size="mini" style="margin-bottom:0;">
            <el-checkbox :disabled="disabled" :false-label="0" :true-label="1" v-model="row.isBillFee"></el-checkbox>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column :label="typeName" align="center" min-width="140" prop="payAmount" show-overflow-tooltip>
        <template slot-scope="{row,$index}">
          <el-form-item
            :prop="`financeList.${$index}.payAmount`"
            :rules="[
              {required:true},
              {type:'price'}
          ]"
            size="mini"
            style="margin-bottom:0;"
          >
            <el-input
              :disabled="disabled||!$index"
              @change="checkPayAmount"
              class="wfull"
              placeholder="请输入"
              size="mini"
              v-model="row.payAmount"
            ></el-input>
          </el-form-item>
        </template>
      </el-table-column>
    </el-table>
    <div class="wfull ac mt10">
      <span class="d-text-red f14">{{errorTip||''}}</span>
      <el-form-item :rules="financeListRule" class="ac pt5 d-hide" prop="financeList"></el-form-item>
    </div>
    <div @click="addBill" class="mt10 el-icon-circle-plus-outline d-pointer" v-if="!disabled">增加账期</div>
  </form-card>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    hide: {
      type: Array,
      default: () => []
    },
    type: {
      type: Number,
      default: 0 // 0 付款金额 1 收款金额
    },
    disabled: Boolean,
    max: Number,
    feeTypeCode: {
      type: String,
      default: 'ZD_DY_LX-4'
    },
    feeDetailCode: {
      type: String,
      default: 'ZD_DY_LX-4-1'
    }
  },
  data() {
    return {
      financeListRule: [
        {
          validator: (rule, value, cb) => {
            let max = +(Number(this.max) || 0).toFixed(2);
            let now = Number(this.billTotalAmount) || 0;
            if (!this.data.financeList || !this.data.financeList.length) {
              return cb(new Error((this.errorTip = '请填写账单信息')));
            }
            if (max) {
              if (now != max) {
                return cb(
                  new Error(
                    (this.errorTip =
                      '账单总金额须为商品总金额之和,当前总和' + max + '元')
                  )
                );
              }
            }
            this.errorTip = '';
            cb();
          }
        }
      ],
      billTotalAmount: 0,
      errorTip: ''
    };
  },
  computed: {
    typeName() {
      // type==0?'付款金额':'收款金额'
      let data = {
        0: '付款金额',
        1: '收款金额',
        3: '收/付款金额'
      };
      if (String(this.type)) {
        return data[this.type];
      } else {
        return '收/付款金额';
      }
    }
  },
  mounted() {
    this.resetBillData();
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.resetBillData();
      }
    },
    max() {
      this.checkPayAmount();
    }
  },
  methods: {
    checkPayAmount() {
      let sum = 0;
      let list = this.data.financeList || [];
      if (list.length) {
        list.map((item, i) => {
          if (i > 0) {
            sum += Number(item.payAmount) || 0;
          }
        });
        if (sum < this.max) {
          list[0].payAmount = +Number(this.max - sum).toFixed(2);
        }
      }
    },
    resetBillData() {
      if (
        this.data &&
        (!this.data.financeList || !this.data.financeList.length)
      ) {
        this.$set(this.data, 'financeList', []);
        this.addBill();
      }
      this.checkPayAmount();
    },
    // 自定义账单金额数据
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((col, index) => {
        if (col.property == 'payAmount') {
          sums[index] = +Number(
            data
              .map(item => Number(item.payAmount) || 0)
              .reduce((sum, item) => sum + item, 0)
          ).toFixed(2);
          this.billTotalAmount = sums[index];
        } else if (index == 0) {
          sums[0] = '总计';
        } else sums[index] = '';
      });
      return sums;
    },
    addBill() {
      this.data.financeList.push({
        isBillFee: 0,
        payAmount: '',
        payTime: this.data.financeList.length ? '' : +new Date(),
        paymenDays: ''
      });
      this.resetPaymentName();
    },
    resetPaymentName() {
      this.data.financeList.map((item, i) => {
        item.feeTypeCode = this.feeTypeCode;
        item.feeDetailCode = this.feeDetailCode;
        item.paymenDays = `第${i + 1}期`;
      });
    },
    remove(i) {
      this.data.financeList.splice(i, 1);
      this.resetPaymentName();
    }
  }
};
</script>
<style scoped>
</style>
