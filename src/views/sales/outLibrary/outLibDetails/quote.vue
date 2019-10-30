/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 16:19:35
 * @Description: 销售-报价单
*/
<template>
  <div>
    <!-- 报价单 -->
    <sales-quote :button="false"></sales-quote>
  </div>
</template>
<script>


export default {
  components: {},
  props: ['drawerData'],
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
