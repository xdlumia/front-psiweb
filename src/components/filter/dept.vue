/*
 * @Author: 赵伦
 * @Date: 2019-11-01 10:46:22
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-04 17:14:32
 * @Description: 部门查询过滤框
*/
<template>
  <el-form-item :label="item.label" :prop="item.prop">
    <el-cascader :options="options" :props="cascaderProps" @change="changed" class="wfull" clearable filterable v-model="value"></el-cascader>
  </el-form-item>
</template>
<script>
export default {
  props: {
    item: Object,
    form: Object
  },
  data() {
    return {
      options: [],
      loading: false,
      cascaderProps: {
        label: 'deptName',
        value: 'totalCode',
        checkStrictly: true
      },
      value: []
    };
  },
  watch: {},
  mounted() {
    this.getDept();
  },
  methods: {
    async getDept() {
      this.loading = true;
      let { data } = await this.$api.bizSystemService.getDeptList({
        type: 0
      });
      data.map(this.checkChildren);
      this.options = data || [];
      this.loading = false;
    },
    checkChildren(dept) {
      if (!dept.children || dept.children.length == 0) {
        dept.children = null;
      } else {
        dept.children.map(this.checkChildren);
      }
    },
    changed(e) {
      this.form[this.item.prop] = e.slice(-1)[0];
      this.$emit('change');
    },
    resetForm() {
      this.value = [];
    }
  }
};
</script>
<style lang="scss" scoped>
</style>