/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-06 17:52:45
 * @Description: 报价单详情
*/
<template>
  <div>
    <!-- 审核面板 -->
    <approve-panel />
    <!-- 客户信息 -->
    <customerInfo
      disabled
      :data="clientInfo"
    />
    <!-- 公司信息 -->
    <companyInfo
      disabled
      :data="clientInfo"
    />
    <!-- 发货信息 -->
    <deliverInfo
      disabled
      :data="quoteInfo"
    />
    <!-- 商品信息 -->
    <commodityInfo
      disabled
      :data="quoteInfo "
    />
    <!-- 报价有效期 -->
    <payExpire
      disabled
      :data="quoteInfo "
    />
    <!-- 附加发票 -->
    <extrataxInfo
      disabled
      :data="quoteInfo "
    />
    <!-- 自定义信息 -->
    <customInfo
      disabled
      :data="quoteInfo "
    />
    <!-- 备注信息 -->
    <extrasInfo
      disabled
      :data="quoteInfo "
    />
  </div>
</template>
<script>

export default {
  components: {
  },
  props: ['rowData', 'code'],
  data() {
    return {
      // 销售单详情
      quoteInfo: {},
      // 客户详情
      clientInfo: {},
    }
  },
  mounted() {
    this.salesquotationGetinfoByCode()
    this.commonclientinfoInfo()
  },
  methods: {
    //根据code 查看详情
    salesquotationGetinfoByCode() {
      this.$api.seePsiSaleService.salesquotationGetinfoByCode({ quotationCode: this.code })
        .then(res => {
          this.quoteInfo = res.data || {}
        })
    },
    // 根据客户id查询客户详情
    commonclientinfoInfo() {
      this.$api.seePsiCommonService.commonclientinfoInfo(null, this.rowData.clientId)
        .then(res => {
          this.clientInfo = res.data || {}
        })
    },
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
