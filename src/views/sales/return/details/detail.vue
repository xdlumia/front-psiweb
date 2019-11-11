/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-11 10:26:56
 * @Description: 销售出库单详情-详情
*/
<template>
  <div>
    <!-- 审核面板 -->
    <approve-panel :data="detailInfo" />
    <!-- 客户信息 -->
    <customer-info
      disabled
      :data="detailInfo"
    />
    <!-- 公司信息 -->
    <company-info
      disabled
      :data="detailInfo"
    />
    <!-- 退货商品信息 -->
    <goods-return
      disabled
      :data="detailInfo"
    />
    <!-- 其他费用 -->
    <other-fee
      disabled
      :data="detailInfo"
    />
    <!-- 账期信息 -->
    <bill-info
      disabled
      :data="detailInfo"
    />
    <!-- 自定义信息 -->
    <custom-info
      disabled
      :data="detailInfo"
    />
    <!-- 备注信息 -->
    <extras-info
      disabled
      :data="detailInfo"
    />
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
      // 详情信息
      detailInfo: {},
    }
  },
  mounted() {
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
