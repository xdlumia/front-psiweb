/*
 * @Author: 赵伦
 * @Date: 2019-10-28 15:54:43
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-04 11:15:51
 * @Description: 收款方信息 对方名称
*/
<template>
  <form-card title="收款方信息">
    <el-row :gutter="10">
      <el-col :span="8">
        <div class="mt5 d-required">收款方</div>
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