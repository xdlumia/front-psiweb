/*
* @Author: web.王晓冬
* @Date: 2019-05-14 18:08:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-24 09:51:02
* @Description: 表单卡片
* @param  title 表单title
* @param  shadow 卡片阴影出现的时机  默认never
* @slot name=title 自定义title样式
* @slot  默认
* @date 2018年11月1日
* @example 使用示例 1
*        <form-card title="发票信息">
            <div>示意</div>
        </form-card>

* @example 使用示例 2
*        <form-card :title="true">
            <div slot = "title"> <el-row>自定义title</el-row> </div>
            <div>内容</div>
    </form-card>
**/
<template>
  <div>
    <div
      v-if="title"
      class="form-card-title"
    >
      <slot name="title">{{title}}</slot>
    </div>
    <el-card
      :body-style="{padding:'10px'}"
      :shadow="shadow"
    >
      <slot></slot>
    </el-card>
  </div>
</template>
<script>

export default {
  name: 'FormCard',
  props: {
    title: {
      default: false
    },
    shadow: {
      default: 'never'
    }
  },
  data() {
    return {}
  },
  created() { },
  methods: {}
}
</script>
<style lang="scss" scoped>
/* 弹出框标题 */
.form-card-title {
  line-height: 16px;
  font-size: 16px;
  border-left: 2px solid #409eff;
  margin-top: 20px;
  margin-bottom: 10px;
  padding-left: 10px;
}
</style>
