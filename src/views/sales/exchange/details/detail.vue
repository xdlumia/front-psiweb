/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: 赵伦
 * @LastEditTime: 2020-01-15 14:49:19
 * @Description: 销售换货单详情-详情
*/
<template>
  <div>
    <!-- 审核面板 -->
    <approve-panel
      busType="18"
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
    <!-- 换入商品信息 -->

    <goods-return-info
      :data="(data.commodityEntityList || []).filter(item=>item.putawayType ==1)"
      title="换入商品信息"
      :code="rowData.alterationCode"
      pre="换入"
      :form="rowData"
    />
    <!-- 换出商品信息 -->
    <goods-return-info
      :data="(data.commodityEntityList || []).filter(item=>item.putawayType ==0)"
      title="换出商品信息"
      :code="rowData.alterationCode"
      pre="换出"
      :hide="['isTax']"
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
      busType="18"
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
