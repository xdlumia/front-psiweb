/*
 * @Author: 赵伦
 * @Date: 2019-11-01 12:44:54
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-25 10:29:20
 * @Description: 自定义下拉选框
*/
<template>
  <el-form-item :label="item.label" :prop="item.prop">
    <el-select class="wfull" placeholder="请选择" v-model="form[item.prop]" @change="changed">
      <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in item.options||[]"></el-option>
    </el-select>
  </el-form-item>
</template>
<script>
export default {
  props: {
    item: Object,
    form: Object
  },
  methods:{
    changed(e) {
      this.$emit('change');
    }
  }
};
</script>