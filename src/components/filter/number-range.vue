/*
 * @Author: 赵伦
 * @Date: 2019-11-01 10:46:22
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-09 14:03:31
 * @Description: 数字区间过滤框
*/
<template>
  <el-form-item :label="item.label">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item :prop="'min'+item.prop">
          <el-input
            :placeholder="item.placeholder?(`${item.placeholder}最小值`):'最小值'"
            @change="checkMinMax"
            type="number"
            v-model.number="form['min'+firstToUpperCase(item.prop)]"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :prop="'max'+item.prop">
          <el-input
            :placeholder="item.placeholder?(`${item.placeholder}最大值`):'最大值'"
            @change="checkMinMax"
            type="number"
            v-model.number="form['max'+firstToUpperCase(item.prop)]"
          ></el-input>
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
  methods: {
    checkMinMax() {
      console.log('check min max')
      let min = this.form[`min${this.firstToUpperCase(this.item.prop)}`];
      let max = this.form[`max${this.firstToUpperCase(this.item.prop)}`];
      if (String(min) && this.item.int) {
        min = parseInt(min);
        this.form[`min${this.firstToUpperCase(this.item.prop)}`] = min;
      }
      if (String(max) && this.item.int) {
        max = parseInt(max);
        this.form[`max${this.firstToUpperCase(this.item.prop)}`] = max;
      }
      if (String(min).trim() && String(max).trim()) {
        if (min > max) {
          this.form[`min${this.firstToUpperCase(this.item.prop)}`] = max;
        }
      }
      this.changed();
    },
    changed(e) {
      this.$emit('change');
    },
    // 首字母转大写
    firstToUpperCase(str) {
      str = str || ''
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
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