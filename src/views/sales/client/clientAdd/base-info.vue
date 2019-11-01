/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-01 12:01:03
 * @Description: 客户管理-基本信息
*/
<template>
  <div>
    <!-- 基本信息 -->
    <base-info />
    <!-- 发票信息 -->
    <invoice-info />
    <!-- 备注信息 -->
    <extras-info />
    <approve-panel />
  </div>
</template>
<script>

export default {
  components: {

  },
  props: [],
  data() {
    return {
      // 操作按钮
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
