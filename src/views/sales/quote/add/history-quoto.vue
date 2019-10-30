/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 11:39:07
 * @Description: file content
*/
<template>
  <quoto :button="false"></quoto>
</template>
<script>
import quoto from '@/views/sales/quote'
export default {
  props: [],
  components: {
    quoto
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
