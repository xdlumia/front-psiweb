/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-12-31 14:39:26
 * @Description: 填写报价单详情
*/
<template>
  <div v-loading="loading">
    <d-tabs>
      <d-tab-pane
        v-for="(val,key) of tabs"
        :key="key"
        :label="val"
        :name="key"
      />
      <customerInfo
        :data="data"
        id="customerInfo"
        @change="customerChange"
      />
      <!-- 公司信息 -->
      <companyInfo
        select
        :data="data"
        id="companyInfo"
      />
      <!-- 发货信息 -->
      <deliverInfo
        :data="data"
        :hide="['salesRequireArrivalTime','procurementExpectedArrivalTime','note']"
        id="deliverInfo"
      />
      <!-- 商品信息 -->
      <commodity-quote-edit
        :data="data"
        id="commodityInfo"
      />
      <!-- 报价单有效期 -->
      <payExpire
        :data="data"
        id="payExpire"
        disabled
      />
      <!-- 附加发票 -->
      <extrataxInfo
        :data="data"
        id="extrataxInfo"
      />
      <!-- 自定义信息 -->
      <customInfo
        busType="15"
        :data="data"
        id="customInfo"
      />
      <!-- 备注信息 -->
      <extrasInfo
        :data="data"
        id="extraInfo"
      />
    </d-tabs>

  </div>
</template>
<script>

export default {
  components: {
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      loading: false,
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
    }
  },
  mounted() {
  },
  methods: {
    customerChange(e){}
  },
  watch: {

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
