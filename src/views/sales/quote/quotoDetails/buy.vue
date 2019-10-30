/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 11:10:11
 * @Description: 报价单-请购单
*/
<template>
  <!-- 请购单 -->
  <buying />
</template>
<script>
import buying from '@/views/sales/quote/index.vue' //顶部状态

export default {
  components: {
    buying
  },
  props: ['drawerData'],
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
