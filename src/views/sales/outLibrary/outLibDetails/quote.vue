/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 14:21:25
 * @Description: 销售-报价单
*/
<template>
  <!-- 报价单 -->
  <quote :button="false" />
</template>
<script>
import quote from '../../quote/index' //报价单

export default {
  components: {
    quote
  },
  props: ['drawerData'],
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
