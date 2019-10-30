/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 09:50:11
 * @Description: 报价单-请购单
*/
<template>
  <!-- 请购单 -->
  <buy />
</template>
<script>
import buy from '@/views/sales/quote/index.vue' //顶部状态

export default {
  components: {
    buy
  },
  props: ['drawerData'],
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
