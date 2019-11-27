/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-23 11:06:47
 * @Description: 报价单详情
*/
<template>
  <div>
    <!-- 审核面板 -->
    <approve-panel />
    <!-- 客户信息 -->
    <customerInfo
      disabled
      :data="data"
    />
    <!-- 公司信息 -->
    <companyInfo
      disabled
      :data="data"
    />
    <!-- 发货信息 -->
    <deliverInfo
      disabled
      :data="data"
    />
    <!-- 商品信息 -->
    <commodity-quote-info
      v-if="data.quotationCode"
      disabled
      :data="data"
    />
    <!-- 报价有效期 -->
    <payExpire
      disabled
      :data="data"
    />
    <!-- 附加发票 -->
    <extrataxInfo
      disabled
      :data="data"
    />
    <!-- 自定义信息 -->
    <customInfo
      disabled
      busType="15"
      :data="data "
    />
    <!-- 备注信息 -->
    <extrasInfo
      disabled
      :data="data "
    />
  </div>
</template>
<script>

export default {
  components: {
  },
  props: {
    rowData: Object,
    data: {
      default: () => ({}),
      type: Object
    },
  },
  data() {
    return {
      // 销售单详情
      quoteInfo: {},
    }
  },
  mounted() {

  },
  methods: {

  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
