 <!--
 /**
  * @desc 面包屑
  * @author web-王晓冬
  * @date 2019年5月24日
  * @example 使用示例
  *        <crumbs><crumbs>
  **/

-->
<template>
    <div>
        <h2 class="bb pb5" style="margin-bottom:10px;">{{crumbsTitle}}</h2>
    </div>
</template>
<script>

export default {
  name: 'Crumbs',
  props: {
  },
  data() {
    return {
      crumbsTitle: ''
    }
  },
  created() {
    // 初始化面包屑
    this.crumbsTitle = this.$route.meta.title
  },
  watch: {
    // 实时监控当前面包屑
    '$route'() {
      this.crumbsTitle = this.$route.meta.title
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
/* 弹出框标题 */
.form-card-title{ line-height: 16px; font-size: 16px; border-left: 2px solid #409eff; margin-top: 20px; margin-bottom: 10px; padding-left:10px;}
</style>
