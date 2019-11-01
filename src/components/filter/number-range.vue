/*
 * @Author: 赵伦
 * @Date: 2019-11-01 10:46:22
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-01 13:30:43
 * @Description: 数字区间过滤框
*/
<template>
  <el-form-item :label="item.label">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item :prop="'min'+item.prop">
          <el-input :placeholder="item.placeholder?(`${item.placeholder}最小值`):'最小值'" type="number" v-model="form['min'+item.prop]"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :prop="'max'+item.prop">
          <el-input :placeholder="item.placeholder?(`${item.placeholder}最大值`):'最大值'" type="number" v-model="form['max'+item.prop]"></el-input>
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