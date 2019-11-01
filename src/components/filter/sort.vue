/*
 * @Author: 赵伦
 * @Date: 2019-11-01 12:44:54
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-01 15:07:38
 * @Description: 排序下拉选框
*/
<template>
  <el-row :gutter="10">
    <el-col :span="4" style="padding-top:2px;">排序</el-col>
    <el-col :span="20">
      <el-form-item :prop="item.prop">
        <el-select class="wfull" placeholder="请选择" style="width:calc(100% - 80px);" v-model="form[item.prop]">
          <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in item.options||[]"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: {
    item: Object,
    form: Object
  }
};
</script>