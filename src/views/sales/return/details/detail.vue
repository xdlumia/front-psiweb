/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: 赵伦
 * @LastEditTime: 2020-01-07 19:29:45
 * @Description: 销售出库单详情-详情
*/
<template>
  <div>
    <!-- 审核面板 -->
    <approve-panel
      busType="17"
      :data="data"
    />
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
    <goods-return-info
      :rowData="rowData"
      :code="code"
      pre=退货
      :data="data.commodityEntityList"
      disabled
      :form="data"
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
      :hide="['actualRefundAmount']"
    />
    <!-- 自定义信息 -->
    <custom-info
      disabled
      busType="17"
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
