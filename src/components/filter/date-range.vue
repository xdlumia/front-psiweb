/*
 * @Author: 赵伦
 * @Date: 2019-11-01 10:46:22
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-10 17:51:02
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
  mounted() {
    this.reset();
  },
  methods: {
    // prettier-ignore
    update() {
      let range = this.value || [];
      let minDate = new Date(+range[0] || '')
      let maxDate = new Date(+range[1] || '')
      this.$set(this.form, `min${this.firstToUpperCase(this.item.prop)}`, +new Date(`${minDate.toLocaleDateString()} 00:00:00`));
      this.$set(this.form, `max${this.firstToUpperCase(this.item.prop)}`, +new Date(`${maxDate.toLocaleDateString()} 23:59:59`));
      this.changed()
    },
    reset() {
      let min = this.form[`min${this.firstToUpperCase(this.item.prop)}`];
      let max = this.form[`max${this.firstToUpperCase(this.item.prop)}`];
      if (min && max) {
        min = min ? new Date(min) : '';
        max = max ? new Date(max) : '';
        this.value = [min, max];
      } else {
        this.form[`min${this.firstToUpperCase(this.item.prop)}`] = '';
        this.form[`max${this.firstToUpperCase(this.item.prop)}`] = '';
        this.value = null;
      }
    },
    changed(e) {
      this.$emit('change');
    },
    // 首字母转大写
    firstToUpperCase(str) {
      str = str || '';
      return str.charAt(0).toUpperCase() + str.slice(1);
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