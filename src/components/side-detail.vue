/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-04 10:55:30
 * @Description: 侧边详情弹框
*/
<template>
  <el-drawer
    :title="title"
    :visible.sync="showPop"
    :size="width"
    @close="close"
    class="side-page"
  >
    <span>
      <slot name='title'></slot>
    </span>
    <sideStatusbar
      style="margin:-10px -15px 10px"
      :status="status"
    />
    <span
      class="drawer-header"
      v-if="hasButton"
    >
      <slot name="button" /></span>
    <slot />
  </el-drawer>
</template>
<script>

export default {
  components: {
  },
  props: {
    status: Array,
    title: String,
    visible: Boolean,
    width: String
  },

  data() {
    return {
      showPop: false
    };
  },
  mounted() {
    this.showPop = this.visible;
  },
  watch: {
    visible() {
      this.showPop = this.visible;
    },
    showPop() {
      if (!this.showPop) {
        this.close();
      }
    },
  },
  computed: {
    hasButton() {
      return this.$slots.button && this.$slots.button.length;
    }
  },
  methods: {
    close() {
      this.$emit('close');
      this.$emit('update:visible', false);
    }
  }
};
</script>
<style lang="scss" scoped>
.side-page {
  /deep/ {
    .tabs-view {
      height: calc(100vh - 120px) !important;
      margin: -10px -15px;
      width: calc(100% + 30px) !important;
      position: relative;
      & > .el-tabs__header {
        background-color: #f2f2f2;
        padding: 0 20px;
        margin-bottom: 0;
        > .el-tabs__nav-wrap::after {
          background-color: #f2f2f2;
        }
      }
      & > .el-tabs__content {
        height: calc(100% - 40px);
        > .el-tab-pane{
          overflow: hidden;
          overflow-y: auto;
          padding: 0 20px;
          max-height: 100%;
          height: 100%;
          position: relative;
          >div > .main-content,
          > .main-content{
            height: 100% !important;
          }
        }
      }
    }
  }
}
</style>