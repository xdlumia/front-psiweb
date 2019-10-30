/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-28 18:07:44
 * @Description: 操作记录
*/
<template>
  <div class="steps">
    <div
      class="step"
      :key="index"
      v-for="(item,index) of 4"
    >
      <div class="step-time">2019-10-24 11:54:01</div>
      <div class="step-head"></div>
      <div class="step-main">
        <div
          class="d-flex"
          style="align-items: center;"
        >
          <el-avatar
            class="ml30"
            icon="el-icon-user-solid"
          ></el-avatar>
          <span class="d-inline ml20">王五</span>
          <span class="d-inline ml30">审核通过</span>
        </div>
        <div class="ml30 mt5">内容内容内容内容内</div>

      </div>
    </div>
  </div>
</template>
<script>
import salesDetails from '@/components/formComponents/side-statusbar' //顶部状态
import approvePanel from '@/components/formComponents/approve-panel' //审核面板

export default {
  components: {
    salesDetails,
    approvePanel
  },
  props: {
    data: {
      type: Array,
      default: [],
    }
  },
  beforeDestroy() {
  }
}
</script>
<style scoped lang="scss">
.steps {
  flex-flow: column;
  .step {
    display: flex;
    min-height: 60px;
    .step-time {
      margin-right: 10px;
      margin-top: 10px;
      font-size: 14px;
      color: #444;
    }
    .step-head {
      margin-top: 10px;
      position: relative;
      &::before,
      &::after {
        content: "";
        display: block;
        background-color: #409eff;
      }
      &::before {
        border-radius: 50%;
        width: 24px;
        height: 24px;
      }
      &::after {
        position: absolute;
        top: 0px;
        bottom: -10px;
        left: 11px;
        width: 2px;
      }
    }
    .step-main {
      color: #666;
      font-size: 14px;
      margin-bottom: 20px;
    }
    &:last-child {
      .step-head {
        &::after {
          height: 0px;
        }
      }
    }
  }
}
</style>
