/*
 * @Author: 赵伦
 * @Date: 2019-11-04 11:22:09
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-27 17:28:46
 * @Description: 全屏显示包裹一下按钮
*/
<template>
  <el-container :style="{
      height:height
  }" class="wfull">
    <el-header style="height:30px;line-height: 30px;padding:0;">
      <el-link :underline="false" @click="visible=true" class="fr" type="primary">全屏显示</el-link>
    </el-header>
    <el-main class="fullscreen-wrap-container" style="padding:0;">
      <slot />
    </el-main>
    <FullscreenElement :element="$slots.default[0].componentInstance" :visible.sync="visible" />
  </el-container>
</template>
<script>
import FullscreenElement from './fullscreen-element';

export default {
  components: {
    FullscreenElement
  },
  props: {
    height: {
      type: String,
      default: '100%'
    }
  },
  mounted() {},
  data() {
    return {
      visible: false
    };
  }
};
</script>
<style lang="scss" scoped>
.fullscreen-wrap-container {
  /deep/ {
    > div {
      height: 100%;
      > .main-content {
        height: 98% !important;
      }
    }
  }
}
</style>