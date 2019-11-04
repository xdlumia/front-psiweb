/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-04 10:03:22
 * @Description: 销售费用分摊单-基本详情
*/
<template>
  <div>
    <!-- 分摊信息 -->
    <apportion-info id="apportionInfo" />
    <!-- 商品信息 -->
    <commodity-info id="commodityInfo" />
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
