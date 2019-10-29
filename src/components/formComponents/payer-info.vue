/*
 * @Author: 赵伦
 * @Date: 2019-10-28 15:54:43
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-29 16:57:44
 * @Description: 付款方信息
*/
<template>
  <form-card title="付款方信息">
    <el-row :gutter="10">
      <el-col :span="8">
        <div class="mt5 d-required">付款方</div>
        <div class="d-text-gray mt10 mb10 d-elip">北京蜂便利</div>
      </el-col>
      <el-col :span="8">
        <div class="mt5 d-required">联系人</div>
        <div class="d-text-gray mt10 mb10 d-elip">李丽丽</div>
      </el-col>
      <el-col :span="8">
        <div class="mt5 d-required">联系方式</div>
        <div class="d-text-gray mt10 mb10 d-elip">16666666666</div>
      </el-col>
    </el-row>
  </form-card>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
</style>