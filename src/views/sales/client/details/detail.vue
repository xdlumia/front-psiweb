/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-31 19:12:10
 * @Description: 销售出库单详情-详情
*/
<template>
  <div>
    <!-- 审核面板 -->
    <approve-panel />
    <!-- 客户信息 -->
    <customer-info />
    <!-- 公司信息 -->
    <company-info />
    <!-- 退货商品信息 -->
    <goods-return />
    <!-- 其他费用 -->
    <other-fee />
    <!-- 账期信息 -->
    <bill-info />
    <!-- 自定义信息 -->
    <custom-info />
    <!-- 备注信息 -->
    <extras-info />
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
