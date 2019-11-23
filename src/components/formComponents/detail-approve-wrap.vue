/*
 * @Author: 赵伦
 * @Date: 2019-11-23 15:34:44
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-23 16:05:48
 * @Description: 详情页面的审核信息包裹层 1
*/
<template>
  <el-container class="hfull detail-approve-fixed">
    <span
      :class="[showHeader?'el-icon-arrow-down':'el-icon-arrow-right']"
      @click="showHeader=!showHeader"
      class="header-toggle d-pointer"
      :title="showHeader?'收起审核流程面板':'打开审核流程面板'"
    ></span>
    <el-header :class="[showHeader?'':'hide-top']" :style="{height:showHeader?'260px':'46px'}" class="top-header p0">
      <approve-panel :busType="busType" :id="id" class="approve-fixed" v-if="id&&busType" />
    </el-header>
    <el-main class="p0">
      <slot />
    </el-main>
  </el-container>
</template>
<script>
export default {
  props: ['busType', 'id'],
  data() {
    return {
      showHeader: true
    };
  }
};
</script>
<style lang="scss" scoped>
.detail-approve-fixed {
  .header-toggle {
    position: absolute;
    top: 18px;
    font-size: 20px;
    left: 106px;
    z-index: 2;
    transition: all ease 0.2s;
  }
  /deep/ .approve-fixed {
    width: 100%;
    background-color: #fff;
    z-index: 1;
    box-sizing: border-box;
    .progress-list {
      height: 170px;
      overflow-y: auto;
    }
  }
  .top-header {
    position: relative;
    width: calc(100% + 40px);
    margin: 0 -20px;
    padding: 0 20px;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    z-index: 1;
    overflow: hidden;
    &.hide-top {
      box-shadow: none;
    }
  }
}
</style>