/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-12 15:03:07
 * @Description: file content
*/
<template>
  <div>
    <baseInfo
      disabled
      :data="data"
    />
    <invoiceInfo
      disabled
      :data="data"
    />
  </div>
</template>
<script>
export default {
  props: {
    visible: Boolean,
    code: '',
    data: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
  },
  data() {
    return {
      loading: false
    }
  },
  created() {
    // this.initCompanyAdd()
  },
  mounted() {
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
</style>
