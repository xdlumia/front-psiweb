/*
 * @Author: 赵伦
 * @Date: 2019-10-28 15:44:58
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-10 18:09:48
 * @Description: 收支流水匹配账单
*/
<template>
  <form-card title="匹配账单">
    <el-row :gutter="10">
      <el-col
        :key="item.prop"
        :span="8"
        v-for="item of formItems"
        v-show="!hide.includes(item.prop)"
      >
        <el-form-item
          :label="item.label"
          required
        >
          <el-input
            :value="data[item.prop]|dictionary('ZD_DY_LX')"
            disabled
            v-if="item.dictName"
          />
          <el-input
            :value="format(item.map[data[item.prop]])"
            disabled
            v-else-if="item.map"
          />
          <el-input
            :value="format(data[item.prop])"
            disabled
            v-else
          />
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
        { label: '账单编号', prop: 'billType', },
        { label: '账单金额', prop: 'billType', },
        { label: '对方名称 ', prop: 'billType', },
        { label: '匹配金额 ', prop: 'billType', },
        { label: '费用类型', prop: 'feeTypeCode', dictName: 'ZD_DY_LX' },
        { label: '费用明细', prop: 'feeDetailCode', dictName: 'ZD_DY_LX' },
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
