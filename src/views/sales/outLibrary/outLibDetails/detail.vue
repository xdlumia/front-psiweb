/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-08 15:12:01
 * @Description: 销售出库单详情-详情
*/
<template>
  <div>
    <!-- 审核面板 -->
    <approve-panel :data="detailInfo" />
    <!-- 客户信息 -->
    <customerInfo :data="detailInfo" />
    <!-- 公司信息 -->
    <companyInfo :data="detailInfo" />
    <!-- 报价单信息 -->
    <quotationInfo :data="detailInfo">
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


export default {
  components: {

  },
  props: ['rowData', 'code'],
  data() {
    return {
      activeName: 'detail',
      detailInfo: {}, ///详情信息
    }
  },
  mountend() {
    this.salesshipmentGetInfoByCode()
  },
  methods: {
    //根据code 查看详情
    salesshipmentGetInfoByCode() {
      this.$api.seePsiSaleService.salesshipmentGetInfoByCode({ shipmentCode: this.code })
        .then(res => {
          this.detailInfo = res.data || {}
        })
    }
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
