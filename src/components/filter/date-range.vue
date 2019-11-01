/*
 * @Author: 赵伦
 * @Date: 2019-11-01 10:46:22
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-01 12:53:05
 * @Description: 时间段过滤框
*/
<template>
  <el-form-item :label="item.label">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item :prop="'min'+item.prop">
          <el-date-picker class="wfull" placeholder="开始时间" v-model="form['min'+item.prop]"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :prop="'max'+item.prop">
          <el-date-picker class="wfull" placeholder="截止时间" v-model="form['max'+item.prop]"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
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
<style lang="scss" scoped>
.search-icon {
  position: absolute;
  right: 5px;
  top: 5px;
  font-size: 18px;
}
</style>