/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 14:29:07
 * @Description: 销售出库单详情-详情
*/
<template>
  <div>
    <!-- 审核面板 -->
    <approve-panel />
    <!-- 客户信息 -->
    <customerInfo />
    <!-- 公司信息 -->
    <companyInfo />
    <!-- 报价单信息 -->
    <quotationInfo>
      <el-tabs
        slot="tabs"
        v-model="activeName"
      >
        <el-tab-pane
          v-for="(item,index) of 11"
          :key="index"
          :label="`报价单${index}`"
          :name="index+''"
        ></el-tab-pane>
      </el-tabs>
      <div slot="body">
        <!-- 发货信息 -->
        <deliverInfo />
        <!-- 商品信息 -->
        <commoditInfo />
        <!-- 报价有效期 -->
        <payExpire />
        <!-- 附加发票 -->
        <extrataxInfo />
        <!-- 自定义信息 -->
        <customInfo />
        <!-- 备注信息 -->
        <extraInfo />
      </div>
    </quotationInfo>

    <!-- 收款滞纳金 -->
    <paymentLate ref="paymentLate" />
    <!-- 账期信息 -->
    <billInfo ref="billInfo" />
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
import quotationInfo from '@/components/formComponents/quotation-info' //报价单信息
import customInfo from '@/components/formComponents/custom-info' //自定义信息
import deliverInfo from '@/components/formComponents/deliver-info' //发货信息
import extrataxInfo from '@/components/formComponents/extratax-info' //附加发票
import extraInfo from '@/components/formComponents/extras-info' //备注信息
import commoditInfo from '@/components/formComponents/commodity-info' //商品信息
import payExpire from '@/components/formComponents/pay-expire' //报价单有效期
import paymentLate from '@/components/formComponents/payment-late' //收款滞纳金
import billInfo from '@/components/formComponents/bill-info' //账期信息


export default {
  components: {
    approvePanel,
    customerInfo,
    companyInfo,
    quotationInfo,
    customInfo,
    deliverInfo,
    extrataxInfo,
    extraInfo,
    commoditInfo,
    payExpire,
    paymentLate,
    billInfo
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
