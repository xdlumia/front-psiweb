/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-03 19:04:02
 * @Description: file content
*/
<template>
  <div>
    <el-form
      size="small"
      :model="data"
    >
      <baseInfo
        disabled
        :data="data"
      />
      <invoiceInfo
        disabled
        :data="data"
      />
    </el-form>
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
