/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-04 11:15:10
 * @Description: 付款单详情
*/
<template>
  <div>
    <!-- 审核面板 -->
    <approve-panel />
    <!-- 详细信息 -->
    <paybill-detail />
    <!-- 对方名称 -->
    <receiver-info />
    <!-- 收支流水 -->
    <payment-log />
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
