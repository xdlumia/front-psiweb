/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-04 15:51:07
 * @Description: 账单编号-基本详情
*/
<template>
  <div>
    <!-- 详细信息 -->
    <receipt-info />
    <!-- 付款方信息 -->
    <payer-info />
    <!-- 收支流水 -->
    <payment-log />
    <!-- 开票记录 -->
    <invoice-log />
    <!-- 账单调整记录 -->
    <paybill-log />
    <!-- 备注信息 -->
    <extras-info />
  </div>
</template>
<script>

export default {
  components: {

  },
  props: {
    hide: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  data() {
    return {
      activeName: 'detail',
      form: {},
    }
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
