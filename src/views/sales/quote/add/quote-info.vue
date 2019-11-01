/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-01 11:28:59
 * @Description: 填写报价单详情
*/
<template>
  <div>
    <d-tabs :style="{maxHeight:'calc(100vh - 220px)'}">
      <d-tab-pane
        v-for="(val,key) of tabs"
        :key="key"
        :label="val"
        :name="key"
      />
      <customerInfo id="customerInfo" />
      <companyInfo id="companyInfo" />
      <deliverInfo id="deliverInfo" />
      <commodityInfo id="commodityInfo" />
      <payExpire id="payExpire" />
      <extrataxInfo id="extrataxInfo" />
      <customInfo id="customInfo" />
      <extraInfo id="extraInfo" />
    </d-tabs>

  </div>
</template>
<script>
import customerInfo from '@/components/formComponents/customer-info' //客户信息
import companyInfo from '@/components/formComponents/company-info' //公司信息
import customInfo from '@/components/formComponents/custom-info' //自定义信息
import deliverInfo from '@/components/formComponents/deliver-info' //发货信息
import extrataxInfo from '@/components/formComponents/extratax-info' //附加发票
import extraInfo from '@/components/formComponents/extras-info' //备注信息
import payExpire from '@/components/formComponents/pay-expire' //报价单有效期
import commodityInfo from '@/components/formComponents/commodity-info' //商品信息

export default {
  components: {
    customerInfo,
    companyInfo,
    customInfo,
    deliverInfo,
    extrataxInfo,
    extraInfo,
    payExpire,
    commodityInfo,
  },
  props: ['drawerData'],
  data() {
    return {
      tabs: {
        customerInfo: '客户信息',
        companyInfo: '公司信息',
        deliverInfo: '发货信息',
        commodityInfo: '商品信息',
        payExpire: '报价单有效期',
        extrataxInfo: '附加发票',
        customInfo: '自定义信息',
        extraInfo: '备注信息',
      },
      // 表单
      form: {},
      // 报价单信息
      activeName: "0",
      quotoCollapse: true
    }
  },
  beforeDestroy() {
  }
}
</script>
<style scoped lang="scss">
.collapse-arrow {
  transition: all 0.2s;
  &.active {
    transform: rotate(90deg);
  }
}
</style>
