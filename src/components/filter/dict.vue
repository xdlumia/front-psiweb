/*
 * @Author: 赵伦
 * @Date: 2019-11-01 10:46:22
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-04 11:10:30
 * @Description: 业务字典过滤框
*/
<template>
  <el-form-item :label="item.label" :prop="item.prop">
    <d-select :dicCode="item.dictName" lable="code" v-model="form[item.prop]" valueKey="code" @change="changed"></d-select>
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
  methods:{
    changed(e) {
      this.$emit('change');
    }
  }
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