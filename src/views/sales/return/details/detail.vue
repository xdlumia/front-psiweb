/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-14 16:42:07
 * @Description: 销售出库单详情-详情
*/
<template>
  <div>
    <!-- 审核面板 -->
    <approve-panel :data="data" />
    <!-- 客户信息 -->
    <customer-info
      disabled
      :data="data"
    />
    <!-- 公司信息 -->
    <company-info
      disabled
      :data="data"
    />
    <!-- 退货商品信息 -->
    <goods-return
      :params="{busType:17,busCode:code}"
      disabled
    />
    <!-- 其他费用 -->
    <other-fee
      disabled
      :data="data"
    />
    <!-- 账期信息 -->
    <return-bill-info
      disabled
      :data="data"
    />
    <!-- 自定义信息 -->
    <custom-info
      disabled
      :data="data"
    />
    <!-- 备注信息 -->
    <extras-info
      disabled
      :data="data"
    />
  </div>
</template>
<script>

export default {
  components: {

  },
  props: {
    code: [Number, String],
    rowData: Object,
    data: {
      default: () => ({}),
      type: Object
    },
  },
  data() {
    return {
      activeName: 'detail',
      // 详情信息
      detailInfo: {},
    }
  },
  mounted() {

  },
  methods: {
    //根据code 查看详情
    salesalterationsheetGetInfoByCode() {
      this.$api.seePsiSaleService.salesalterationsheetGetInfoByCode({ code: this.code })
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
