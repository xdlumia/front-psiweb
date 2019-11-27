/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-27 17:52:37
 * @Description: 销售费用分摊单-基本详情
*/
<template>
  <div>
    <!-- 分摊信息 -->
    <apportion-info
      disabled
      :data="data"
    />
    <!-- 商品信息 -->
    <!-- TODO 组件调用的还有问题 后期修改-->
    <goods-return-edit
      disabled
      :data="data"
    />
    <!-- 备注信息 -->
    <extras-info
      disabled
      :data="data"
    />
  </div>
</template>
<script>

export default {
  props: {
    code: [Number, String],
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
