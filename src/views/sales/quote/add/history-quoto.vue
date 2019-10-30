/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 17:45:54
 * @Description: 历史数据 - 报价单
*/
<template>
  <sales-quote :button="false"></sales-quote>
</template>
<script>

export default {
  props: [],
  components: {
  },
  data() {
    return {
      loading: false,
      // 当前操作步骤
      steps: 1,
      clientno: '',
      activeName: 'first', // 数据源
      // 新增orEdit框内容
      addForm: {
        title: '', // 标题
        cityName: '', // 城市
        cityId: this.$local.fetch('cityInfo').id, // 城市
        id: '', // 主键id
        mainPic: '', // 主图
        content: '' // 内容
      },
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
