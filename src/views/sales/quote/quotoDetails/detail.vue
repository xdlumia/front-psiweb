/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-31 10:54:20
 * @Description: 报价单详情
*/
<template>
  <div>
    <!-- 审核面板 -->
    <approve-panel />
    <!-- 客户信息 -->
    <customerInfo />
    <!-- 公司信息 -->
    <companyInfo />
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
</template>
<script>

export default {
  components: {
  },
  props: ['drawerData'],
  data() {
    return {
      activeName: 'detail',
      form: {},
    }
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
