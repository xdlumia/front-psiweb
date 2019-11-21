/*
 * @Author: 赵伦
 * @Date: 2019-10-28 15:44:58
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-21 16:38:03
 * @Description: 付款单详细信息 已绑定 1
*/
<template>
  <form-card title="详细信息">
    <el-row :gutter="10">
      <el-col :key="item.prop" :span="8" v-for="item of formItems" v-show="!hide.includes(item.prop)">
        <el-form-item :label="item.label" required>
          <div class="wfull d-text-gray d-elip h30" v-if="item.dictName">{{data[item.prop]|dictionary('ZD_DY_LX')}}</div>
          <div class="wfull d-text-gray d-elip h30" v-else-if="item.time">{{data[item.prop]|timeToStr('YYYY-MM-DD')}}</div>
          <div class="wfull d-text-gray d-elip h30" v-else-if="item.map">{{item.map[data[item.prop]]}}</div>
          <div class="wfull d-text-gray d-elip h30" v-else>{{data[item.prop]}}</div>
        </el-form-item>
      </el-col>
    </el-row>
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
    }
  },
  data() {
    return {
      formItems: [
        { label: '账单类型', prop: 'billType', map: { 0: '收款', 1: '付款' } },
        { label: '费用类型', prop: 'feeTypeCode', dictName: 'ZD_DY_LX' },
        { label: '费用明细类型', prop: 'feeDetailCode', dictName: 'ZD_DY_LX' },
        { label: '预应付金额', prop: 'predictAmount' },
        { label: '应付款时间', prop: 'payEndDate', time: true },
        { label: '结算账户', prop: 'companySettlementInfo' },
        { label: '付款单来源', prop: 'source' },
        { label: '滞纳金', prop: 'lateFeeAmount' },
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
</style>
