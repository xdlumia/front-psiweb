/*
 * @Author: 赵伦
 * @Date: 2019-10-28 15:28:15
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-28 15:43:34
 * @Description: 选择员工-下拉选择框
*/
<template>
  <div class="choose-man-select">
    <el-select filterable placeholder="选择拆卸人" style="max-width:calc(100% - 40px);" v-model="value">
      <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in options"></el-option>
    </el-select>
    <span @click="dialogData.visible=true" class="add-icon el-icon-plus ml10 d-pointer"></span>
    <ChooseEmployee :dialogMeta="dialogData" :visible.sync="dialogData.visible" />
  </div>
</template>
<script>
import ChooseEmployee from './choose-employee';

export default {
  components: {
    ChooseEmployee
  },
  data() {
    return {
      value: '',
      options: [],
      dialogData: {
        visible: false
      }
    };
  }
};
</script>
<style lang="scss" scoped>
</style>
