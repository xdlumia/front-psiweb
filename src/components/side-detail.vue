/*
 * @Author: 赵伦
 * @Date: 2019-10-26 10:12:11
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-31 10:04:11
 * @Description: 侧边详情弹框
*/
<template>
  <side-popup :title="title" :visible.sync="showPop" :width="width" @close="close" class="side-page">
    <el-container class="wfull hfull">
      <el-header class="p0 d-bg-gray" style="height:60px;">
        <div class="pl10 pr10 ar header-btns">
          <slot name="button" />
        </div>
        <SideStatusbar :status="status" />
      </el-header>
      <el-main class="p0 side-body">
        <slot />
      </el-main>
    </el-container>
  </side-popup>
</template>
<script>
import SideStatusbar from '@/components/formComponents/side-statusbar';

export default {
  props: {
    status: Array,
    title: String,
    visible: Boolean,
    width: String
  },
  components: {
    SideStatusbar
  },
  data() {
    return {
      showPop: false
    };
  },
  mounted() {
    this.showPop = this.visible;
    document.body.append(this.$el);
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