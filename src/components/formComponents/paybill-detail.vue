/*
 * @Author: 赵伦
 * @Date: 2019-10-28 15:44:58
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-10 09:31:07
 * @Description: 付款单详细信息 已绑定 1
*/
<template>
  <form-card title="详细信息">
    <el-row :gutter="10">
      <el-col :key="item.prop" :span="8" v-for="item of formItems" v-show="!hide.includes(item.prop)">
        <el-form-item :label="item.label" required>
          <el-input :value="data[item.prop]|dictionary('ZD_DY_LX')" disabled v-if="item.dictName" />
          <el-input :value="data[item.prop]|timeToStr('YYYY-MM-DD')" disabled v-else-if="item.time" />
          <el-input :value="format(item.map[data[item.prop]])" disabled v-else-if="item.map" />
          <el-input :value="format(data[item.prop])" disabled v-else />
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
        { label: '滞纳金', prop: 'lateFeeAmount' }
      ]
    };
  },
  methods: {
    format(a) {
      if (a == null || a == undefined) return '';
      else return a;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
