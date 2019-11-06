/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-06 19:08:24
 * @Description: 填写报价单详情
*/
<template>
  <div v-loading="loading">
    <d-tabs :style="{maxHeight:'calc(100vh - 220px)'}">
      <d-tab-pane
        v-for="(val,key) of tabs"
        :key="key"
        :label="val"
        :name="key"
      />
      <customerInfo
        :data="data"
        id="customerInfo"
      />
      <companyInfo
        disabled
        select
        id="companyInfo"
      />
      <deliverInfo id="deliverInfo" />
      <commodityInfo id="commodityInfo" />
      <payExpire id="payExpire" />
      <extrataxInfo id="extrataxInfo" />
      <customInfo id="customInfo" />
      <extrasInfo id="extraInfo" />
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
      clientInfo: {},
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
    // this.commonclientinfoInfo()
  },
  methods: {
    // 获取客户详情信息
    commonclientinfoInfo() {
      if (!this.data.clientId) return
      this.loading = true
      this.$api.seePsiCommonService.commonclientinfoInfo(null, this.data.clientId)
        .then(res => {
          let data = res.data || {}
          data.clientId = data.id
          this.clientInfo = data
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  watch: {
    clientInfo(val) {
      console.log(this.data);
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
