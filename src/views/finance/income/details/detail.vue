/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-19 19:23:54
 * @Description: 销售出库单详情-详情
*/
<template>
  <div>
    <!-- 单据信息 -->
    <receipt-info :data="data" />

    <!-- 其他费用 -->
    <other-fee
      disabled
      :data="data"
    />
    <!-- 匹配账单 -->
    <!-- 操作记录 -->
  </div>
</template>
<script>

export default {
  components: {

  },
  props: {
    code: [Number, String],
    rowData: Object,
    data: {
      default: () => ({}),
      type: Object
    },
  },
  data() {
    return {
    }
  },
  mounted() {

  },
  methods: {
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
