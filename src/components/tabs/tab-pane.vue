/*
 * @Author: 赵伦
 * @Date: 2019-10-29 13:42:26
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-14 10:49:26
 * @Description: 
*/
<template>
  <span style="display:none;">{{label}} {{name}}</span>
</template>
<script>
export default {
  name: 'dTabPanel',
  props: ['name', 'label'],
  updated() {
    this.$parent.$parent.$parent.$emit('tab-pane-update');
  }
};
</script>
<style lang="scss" scoped>
</style>
