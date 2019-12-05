/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-04 20:12:51
 * @Description: 销售出库单详情-详情
*/
<template>
  <div>
    <!-- 审核面板 -->
    <approve-panel
      busType="39"
      disabled
      :data="data"
    />

    <goods-buying-quote
      :params="{busCode:data.quotationCode,busType:1,putawayType:1}"
      :data="data"
    />
    <!-- 备注信息 -->
    <extrasInfo
      disabled
      :data="data"
    />
  </div>
</template>
<script>

export default {
  props: {
    rowData: Object,
    data: {
      default: () => ({}),
      type: Object
    },
  },
  components: {

  },

  data() {
    return {

    }
  },
  computed: {
    rowDatas() {
      return []
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
