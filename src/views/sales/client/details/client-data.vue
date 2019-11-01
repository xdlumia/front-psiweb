/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-01 15:41:40
 * @Description: 销售出库单详情-详情
*/
<template>
  <div>
    <!-- 基本数据 -->
    <client-basic-info v-if="!this.hide.includes('clientBasicInfo')" />
    <!-- 回款周期 -->
    <payback-periods />
    <!-- 逾期信息 -->
    <overdue-info />
    <!-- 销售金额 -->
    <sales-amount />
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
