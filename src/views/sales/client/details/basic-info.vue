/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-04 10:03:40
 * @Description: 客户详情-基本详情
*/
<template>
  <div>
    <base-info id="baseInfo" />
    <!-- 发票信息 -->
    <invoice-info id="invoiceInfo" />
    <!-- 备注信息 -->
    <extras-info id="extrasInfo" />
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
