/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-28 16:45:43
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
    <goodsExported />
    <!-- 报价有效期 -->

    <!-- 附加发票 -->
    <extrataxInfo />
    <!-- 自定义信息 -->
    <customInfo />
    <!-- 备注信息 -->
    <extraInfo />
  </div>
</template>
<script>
import approvePanel from '@/components/formComponents/approve-panel' //审核面板
import customerInfo from '@/components/formComponents/customer-info' //客户信息
import companyInfo from '@/components/formComponents/company-info' //公司信息
import customInfo from '@/components/formComponents/custom-info' //自定义信息
import deliverInfo from '@/components/formComponents/deliver-info' //发货信息
import extrataxInfo from '@/components/formComponents/extratax-info' //附加发票
import extraInfo from '@/components/formComponents/extras-info' //备注信息
import goodsExported from '@/components/formComponents/goods-exported' //商品信息


export default {
  components: {
    approvePanel,
    customerInfo,
    companyInfo,
    customInfo,
    deliverInfo,
    extrataxInfo,
    extraInfo,
    goodsExported
  },
  props: ['drawerData'],
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
