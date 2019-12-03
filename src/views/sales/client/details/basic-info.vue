/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-03 17:33:39
 * @Description: 客户详情-基本详情
*/
<template>
  <div v-loading="loading">
    <base-info
      disabled
      :hide="['code','trade','note']"
      :data="data"
    />
    <!-- 发票信息 -->
    <invoice-info
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
  components: {

  },
  props: {
    hide: {
      type: Array,
      default: () => {
        return []
      }
    },
    data: {
      default: () => ({}),
      type: Object
    },
  },
  data() {
    return {
      loading: false,
      detailData: {}, //详情数据
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
