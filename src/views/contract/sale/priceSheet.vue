/*
 * @Author: 赵伦
 * @Date: 2019-11-01 15:44:33
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-01 15:49:27
 * @Description: 报价单tabbar
*/
<template>
  <quotationInfo id="priceBill">
    <el-tabs slot="tabs" v-model="activeName">
      <el-tab-pane :key="index" :label="`报价单${index}`" :name="index+''" v-for="(item,index) of 11"></el-tab-pane>
    </el-tabs>
    <div slot="body">
      <!-- 发货信息 -->
      <deliverInfo />
      <!-- 商品信息 -->
      <commodityInfo />
      <!-- 报价有效期 -->
      <payExpire />
      <!-- 附加发票 -->
      <extrataxInfo />
      <!-- 自定义信息 -->
      <customInfo />
      <!-- 备注信息 -->
      <extrasInfo />
    </div>
  </quotationInfo>
</template>
<script>
export default {
  data() {
    return {
      activeName: ''
    };
  }
};
</script>