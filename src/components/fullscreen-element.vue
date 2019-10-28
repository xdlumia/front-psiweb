<template>
  <el-dialog :modal="false" :visible="visible" center custom-class="fullscreen-el-view" fullscreen>
    <el-container class="wfull hfull">
      <el-header style="height:30px;">
        <el-link :underline="false" @click="exitFullscreen" class="fr" type="primary">取消全屏</el-link>
      </el-header>
      <el-main style="padding:0;">
        <!-- 占位节点，用于放置原节点 -->
        <span ref="placeholder"></span>
      </el-main>
    </el-container>
  </el-dialog>
</template>
<script>
/**
 * @author 赵伦 2019-10-24
 * @description 全屏化某个局部dom节点
 * @example
 *
 * <FullscreenElement :element="$refs.tableView" :visible.sync="showInFullscreen" />
 */
export default {
  props: {
    visible: Boolean, // 显示全屏弹框
    element: Object // 需要全屏化的dom节点
  },
  data() {
    return {
      commentDom: document.createComment('placeholder') // 占位节点，用于替换原节点
    };
  },
  watch: {
    //   监听显示状态
    visible() {
      this.$nextTick(() => this.checkView());
    }
  },
  methods: {
    //   退出全屏
    exitFullscreen() {
      this.$emit('update:visible', false);
    },
    // 检查节点状态
    checkView() {
      const target = this.getElement(this.element);
      if (!target) return;
      if (this.visible) {
        target.replaceWith(this.commentDom);
        this.$refs.placeholder.replaceWith(target);
      } else {
        target.replaceWith(this.$refs.placeholder);
        this.commentDom.replaceWith(target);
      }
    },
    // 获取节点
    getElement(node) {
      if (!node) return;
      if (node instanceof HTMLElement) return node;
      else return node.$el;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
.fullscreen-el-view.el-dialog.is-fullscreen {
  height: calc(100% - 60px);
  top: 60px;
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .request-fullscreen-button {
      display: none;
    }
  }
}
</style>
