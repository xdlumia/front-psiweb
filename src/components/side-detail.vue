/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-31 11:41:13
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
    <sideStatusbar
      style="margin:-10px -15px 10px"
      :status="status"
    />
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
  beforeDestroy() {
    this.$el.remove();
  },
  watch: {
    visible() {
      this.showPop = this.visible;
    },
    showPop() {
      if (!this.showPop) {
        this.close();
      }
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
  .header-btns {
    position: absolute;
    right: 40px;
    top: 12px;
  }
  /deep/ {
    > .popup-main {
      > .popup-head {
        font-weight: bold;
        font-size: 18px;
        > .d-inline > .popup-close {
          position: absolute;
          right: 10px;
          top: 16px;
        }
      }
      > .popup-body {
        padding: 0;
        overflow: hidden;
      }
    }
  }
  .side-body {
    /deep/ {
      > .tabs-view {
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
          overflow: hidden;
          overflow-y: auto;
          padding: 0 20px;
        }
      }
    }
  }
}
</style>