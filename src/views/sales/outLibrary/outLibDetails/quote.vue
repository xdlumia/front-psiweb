/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 15:23:20
 * @Description: 销售-报价单
*/
<template>
  <div>
    <!-- 报价单 -->
    <outLib-quote :button="false"></outLib-quote>
  </div>
</template>
<script>
// import outLibQuote from '@/views/sales/quote/index.vue' //报价单
import outLibQuote from '@/views/sales/quote/index.vue' //报价单

export default {
  components: { outLibQuote },
  props: ['drawerData'],
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
