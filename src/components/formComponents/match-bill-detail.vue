/*
 * @Author: 赵伦
 * @Date: 2019-10-28 15:44:58
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-11 17:57:08
 * @Description: 收支流水匹配账单
*/
<template>
  <form-card title="匹配账单">
    <div
      class="d-text-gray"
      v-if="!data.length"
    >暂无操作记录</div>
    <el-card
      v-for="billItem of data"
      :key="billItem.id"
      class="mb10"
    >
      <el-row :gutter="10">
        <el-col
          :key="item.prop"
          :span="8"
          v-for="item of formItems"
          v-show="!hide.includes(item.prop)"
        >
          <el-form-item :label="item.label">
            <el-input
              :value="billItem[item.prop]|dictionary('ZD_DY_LX')"
              disabled
              v-if="item.dictName"
            />
            <el-input
              :value="format(item.map[billItem[item.prop]])"
              disabled
              v-else-if="item.map"
            />
            <el-input
              :value="format(billItem[item.prop])"
              disabled
              v-else
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
  </form-card>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    hide: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      formItems: [
        { label: '账单编号', prop: 'billCode', },
        { label: '账单金额', prop: 'billTotalAmount', },
        { label: '对方名称 ', prop: 'accountName', },
        { label: '匹配金额 ', prop: 'factAmount', },
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
