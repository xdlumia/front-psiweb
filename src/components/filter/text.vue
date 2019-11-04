/*
 * @Author: 赵伦
 * @Date: 2019-11-01 10:46:22
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-04 16:35:54
 * @Description: 模糊查询过滤框
*/
<template>
  <el-form-item :label="item.label" :prop="item.prop">
    <el-input :placeholder="item.placeholder||('请输入'+item.label)" v-model.trim="form[item.prop]" @change="changed">
      <el-button @click="changed" icon="el-icon-search" slot="append"></el-button>
    </el-input>
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
  mounted() {
  },
  methods: {
    changed(e) {
      this.$emit('change');
    }
  }
};
</script>