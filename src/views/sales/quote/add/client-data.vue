/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-29 18:48:24
 * @Description: file content
*/
<template>
  <div>
    <!-- 客户数据 -->

  </div>
</template>
<script>
export default {
  props: ['dialogData', 'visible'],
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
