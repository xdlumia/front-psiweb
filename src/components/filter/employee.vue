/*
 * @Author: 赵伦
 * @Date: 2019-11-01 10:46:22
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-01 12:52:25
 * @Description: 员工查询过滤框
*/
<template>
  <el-form-item :label="item.label" :prop="item.prop">
    <el-select
      :loading="loading"
      :placeholder="item.placeholder||('请输入选择'+item.label)"
      :remote-method="getEmployee"
      class="wfull"
      filterable
      remote
      reserve-keyword
      v-model="form[item.prop]"
    >
      <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in options"></el-option>
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
    getEmployee(words) {
      if (words) {
        this.loading = true;
        setTimeout(() => {
          this.options = [{ label: '张三', value: '1' }];
          this.loading = false;
        }, 1000);
      } else {
        this.options = [];
      }
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