/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-14 15:39:23
 * @Description: 销售出库单详情-详情
*/
<template>
  <div>
    <!-- 审核面板 -->
    <approve-panel
      disabled
      :data="data"
    />
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
    <!-- 报价单信息 -->
    <quote-info :rowDatas="rowDatas" />

    <!-- 收款滞纳金 -->
    <payment-late-sales
      disabled
      :data="data"
    />
    <!-- 账期信息 -->
    <billInfo
      disabled
      :data="data"
    />
    <!-- 自定义信息 -->
    <customInfo
      disabled
      :data="data"
    />
    <!-- 备注信息 -->
    <extrasInfo
      disabled
      :data="data"
    />
  </div>
</template>
<script>
import quoteInfo from '../quote-info'

export default {
  props: {
    rowData: Object,
    data: {
      default: () => ({}),
      type: Object
    },
  },
  components: {
    quoteInfo
  },

  data() {
    return {

    }
  },
  computed: {
    rowDatas() {
      return []
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
