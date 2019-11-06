/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-06 09:34:53
 * @Description: 客户详情-基本详情
*/
<template>
  <div v-loading="loading">
    <base-info
      disabled
      :hide="['code','trade']"
      :data="detailData"
    />
    <!-- 发票信息 -->
    <invoice-info
      disabled
      :data="detailData"
    />
    <!-- 备注信息 -->
    <extras-info
      disabled
      :data="detailData"
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
    rowData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    code: {}
  },
  data() {
    return {
      loading: false,
      detailData: {}, //详情数据
    }
  },
  mounted() {
    this.commonclientinfoInfo()
  },
  methods: {
    // 获取详情信息
    commonclientinfoInfo() {
      this.loading = true
      this.$api.seePsiCommonService.commonclientinfoInfo(null, this.code)
        .then(res => {
          this.detailData = res.data || {}
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
