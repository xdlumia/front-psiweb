/*
 * @Author: 赵伦
 * @Date: 2019-11-07 17:03:52
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-10 21:04:28
 * @Description: 账单信息
*/
<template>
  <form-card title="账单信息">
    <el-table :data="data.financeList" :summary-method="getSummaries" max-height="500px" ref="table" show-summary>
      <el-table-column align="center" label="账期" min-width="60" show-overflow-tooltip>
        <template slot-scope="{$index}">
          <span>第{{$index+1}}期</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="付款时间" min-width="140" prop="payTime" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-date-picker
            align="right"
            class="wfull"
            placeholder="选择日期"
            size="mini"
            type="date"
            v-model="scope.row.titme"
            value-format="timestamp"
          ></el-date-picker>
        </template>
      </el-table-column>
      <el-table-column align="center" label="直接生成应收" min-width="100" prop="isBillFee">
        <template slot-scope="{row}">
          <el-checkbox v-model="row.isBillFee"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column align="center" label="付款金额" min-width="140" prop="payAmount" show-overflow-tooltip>
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
            <el-input class="wfull" placeholder="请输入" size="mini" v-model="row.payAmount"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="60">
        <template slot-scope="{$index}">
          <el-link :underline="false" @click="remove($index)" class="el-icon-remove f20"></el-link>
        </template>
      </el-table-column>
    </el-table>
    <div @click="addBill" class="mt10 el-icon-circle-plus-outline d-pointer">增加账期</div>
  </form-card>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {};
  },
  mounted(){
    this.resetBillData()
  },
  watch:{
    data:{
      deep:true,
      handler(){
        this.resetBillData()
      }
    }
  },
  methods: {
    resetBillData(){
      if(this.data&&!this.data.financeList){
        this.data.financeList=[]
      }
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
        } else if (index == 0) {
          sums[0] = '总计';
        } else sums[index] = '';
      });
      return sums;
    },
    addBill() {
      this.data.financeList.push({
        isBillFee: false,
        payAmount: '',
        payTime: ''
      });
    },
    remove(i) {
      this.data.financeList.splice(i, 1);
    }
  }
};
</script>
<style scoped>
</style>
