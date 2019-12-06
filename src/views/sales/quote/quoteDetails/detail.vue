/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-06 15:58:06
 * @Description: 报价单详情
*/
<template>
  <div>
    <!-- 审核面板 -->
    <approve-panel busType="15" :id="rowData.id" />
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
      :hide="['note']"
      :data="data"
    />
    <!-- 商品信息 -->
    <commodity-quote-info
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
