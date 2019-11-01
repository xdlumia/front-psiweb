/*
 * @Author: 赵伦
 * @Date: 2019-11-01 10:46:22
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-01 12:51:08
 * @Description: 模糊查询过滤框
*/
<template>
  <el-form-item :label="item.label" :prop="item.prop">
    <el-input :placeholder="item.placeholder||('请输入'+item.label)" v-model.trim="form[item.prop]"></el-input>
  </el-form-item>
</template>
<script>
export default {
  props: {
    item: Object,
    form: Object
  },
  data() {
    return {};
  },
  methods: {}
};
</script>