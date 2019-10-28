/*
 * @Author: 赵伦
 * @Date: 2019-10-28 15:44:58
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-28 15:47:47
 * @Description: 付款单详细信息
*/
<template>
  <form-card title="详细信息">
    <el-row>
      <el-col :span="8">
        <div class="mt5 d-required">费用类型</div>
        <div class="d-text-gray mt10 mb10 d-elip">采购费</div>
      </el-col>
      <el-col :span="8">
        <div class="mt5 d-required">预计金额</div>
        <div class="d-text-gray mt10 mb10 d-elip">999</div>
      </el-col>
      <el-col :span="8">
        <div class="mt5 d-required">应付金额</div>
        <div class="d-text-gray mt10 mb10 d-elip">999</div>
      </el-col>
      <el-col :span="8">
        <div class="mt5 d-required">应付时间</div>
        <div class="d-text-gray mt10 mb10 d-elip">20190909</div>
      </el-col>
      <el-col :span="8">
        <div class="mt5 d-required">实付金额</div>
        <div class="d-text-gray mt10 mb10 d-elip">999</div>
      </el-col>
      <el-col :span="8">
        <div class="mt5 d-required">发票账号</div>
        <div class="d-text-gray mt10 mb10 d-elip">阿里巴巴</div>
      </el-col>
      <el-col :span="8">
        <div class="mt5 d-required">结算账户</div>
        <div class="d-text-gray mt10 mb10 d-elip">农业银行</div>
      </el-col>
      <el-col :span="8">
        <div class="mt5 d-required">付款单来源</div>
        <div class="d-text-gray mt10 mb10 d-elip">采购入库单</div>
      </el-col>
    </el-row>
  </form-card>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
</style>
