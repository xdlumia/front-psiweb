/*
 * @Author: 赵伦
 * @Date: 2019-11-01 10:46:22
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-01 15:06:51
 * @Description: 时间段过滤框
*/
<template>
  <el-form-item :label="item.label" :prop="`min${item.prop}`">
    <el-date-picker
      @change="update"
      class="wfull"
      end-placeholder="结束日期"
      range-separator="至"
      start-placeholder="开始日期"
      type="daterange"
      v-model="value"
    ></el-date-picker>
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
      value: []
    };
  },
  watch: {
    form: {
      deep: true,
      handler() {
        this.reset();
      }
    }
  },
  methods: {
    update() {
      let range = this.value || [];
      this.$set(this.form, `min${this.item.prop}`, +range[0] || '');
      this.$set(this.form, `max${this.item.prop}`, +range[1] || '');
    },
    reset() {
      let min = this.form[`min${this.item.prop}`];
      let max = this.form[`max${this.item.prop}`];
      if (min && max) {
        min = min ? new Date(min) : '';
        max = max ? new Date(max) : '';
        this.value = [min, max];
      } else {
        this.form[`min${this.item.prop}`] = '';
        this.form[`max${this.item.prop}`] = '';
        this.value = null;
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