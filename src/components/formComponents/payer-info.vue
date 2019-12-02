/*
 * @Author: 赵伦
 * @Date: 2019-10-28 15:44:58
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-02 11:25:32
 * @Description: 收款方信息 已绑定 1
*/
<template>
  <form-card title="对方名称">
    <el-row :gutter="10">
      <el-col :key="item.prop" :span="8" v-for="item of formItems" v-show="!hide.includes(item.prop)">
        <el-form-item :label="item.label" required>
          <el-input :value="data[item.prop]||' '" disabled />
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
    },
    type: Number
  },
  data() {
    return {};
  },
  computed: {
    formItems() {
      return [
        { label: this.type == 0 ? '付款方' : '收款方', prop: 'accountName' },
        { label: '联系人', prop: 'linkman' },
        { label: '联系电话', prop: 'linkmanPhone' }
      ];
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
