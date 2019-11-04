/*
 * @Author: 赵伦
 * @Date: 2019-11-01 10:46:22
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-04 16:14:07
 * @Description: 员工查询过滤框
*/
<template>
  <el-form-item :label="item.label" :prop="item.prop">
    <el-select
      :loading="loading"
      :placeholder="item.placeholder||('请输入选择'+item.label)"
      :remote-method="getEmployee"
      @change="changed"
      class="wfull"
      filterable
      remote
      reserve-keyword
      v-model="form[item.prop]"
    >
      <el-option :key="item.id" :label="item.employeeName" :value="item.id" v-for="item in options"></el-option>
    </el-select>
    <span class="el-icon-search search-icon"></span>
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
      loading: false
    };
  },
  methods: {
    async getEmployee(words) {
      if (words) {
        this.loading = true;
        let { data } = await this.$api.bizSystemService.getEmployeeList({
          condition: words,
          page: 1,
          limit: 50,
          sysCode: this.$local.fetch('userInfo').syscode
        });
        this.options = data || [];
        this.loading = false;
      } else {
        this.options = [];
      }
    },
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