/*
 * @Author: 赵伦
 * @Date: 2019-10-28 10:05:00
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-29 10:17:24
 * @Description: 审核小卡片
*/
<template>
  <div>
    <!-- el-icon-error 驳回
      el-icon-success 审核通过-->
    <!-- wait / process / finish / error / success -->
    <!-- <el-steps :active="currentStepIndex">
      <el-step
        :key="i"
        :status="getStatus(item,i)"
        :title="item.taskName"
        v-for="(item,i) of progress"
      >
        <span
          :class="getIcons(item,i)"
          class="f24"
          slot="icon"
        ></span>
        <div slot="description">
          <div>{{item.approvalName ||'审核人名称'}}</div>
          <div>{{item.createTime | timeToStr('YYYY-MM-DD hh:mm:ss')}}</div>
        </div>
      </el-step>
    </el-steps> -->
    <ul class="approve-wrap">
      <li
        class="approve-item d-text-qgray"
        :class="`${classStatus(item)} ${classFloat(index)}`"
        v-for="(item,index) of progress"
        :key="index"
      >
        <div class="approve-state"></div>
        <div class="approve-title ac">{{item.taskName}}</div>
        <div class="approve-name ac">{{item.creator | userName}}</div>
        <div class="approve-time ac f12">{{item.createTime | timeToStr('YYYY-MM-DD HH:MM:ss')}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    progress: {
      type: Array,
      default: () => [
        {
          approved: true,
          taskName: '提交审核',
          operatTime: +new Date(),
          approvalName: '小胖'
        },
        {
          approved: true,
          rejected: false,
          taskName: '财务审核',
          operatTime: +new Date(),
          approvalName: '小胖'
        },
        {
          approved: false,
          rejected: true,
          taskName: '审核驳回',
          operatTime: +new Date(),
          approvalName: '小胖'
        }
      ]
    }
  },
  data() {
    return {
      icons: {
        wait: 'el-icon-success',
        process: 'el-icon-success',
        error: 'el-icon-error',
        finish: 'el-icon-success',
        success: 'el-icon-success'
      }
    };
  },
  computed: {

  },
  methods: {
    classFloat(index) {
      let rowIndex = Math.ceil((index + 1) / 5)
      let isOdd = rowIndex % 2 == 1
      // 奇数行添加float left  偶数right
      return isOdd ? "fl" : "fr"
    },
    classStatus(data, index) {
      if (data.taskName == '驳回') {
        return 'error';
      }
      else {
        return 'finish';
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.approve-wrap {
  overflow: hidden;
  .approve-item {
    padding-bottom: 20px;
    width: 20%;
    position: relative;
    &::before,
    &::after {
      content: "";
      position: absolute;
      background-color: #dad6d6;
    }

    &::before {
      height: 3px;
      left: 0;
      top: 11px;
      right: 0;
    }
    &:nth-of-type(5n) {
      &::after {
        width: 3px;
        bottom: -11px;
        top: 11px;
        right: 0;
      }
    }
    &:nth-of-type(10n) {
      &::after {
        width: 3px;
        bottom: -11px;
        left: 0px;
        top: 11px;
      }
    }
    .approve-state {
      font-family: element-icons !important;
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: center;
      &::before {
        content: "";
        line-height: 24px;
        text-align: center;
        font-size: 20px;
        display: inline-block;
        color: #fff;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: #dad6d6;
      }
    }
    &.finish {
      &::before,
      &::after {
        background-color: #409eff;
      }
      .approve-state::before {
        content: "\e6da";
        background-color: #409eff;
      }
      .approve-title {
        color: #409eff;
      }
    }
    &.error {
      &::before,
      &::after {
        background-color: #f56c6c;
      }
      .approve-state::before {
        content: "\e6db";
        background-color: #f56c6c;
      }
      .approve-title {
        color: #f56c6c;
      }
    }
    &:first-of-type {
      &::before {
        left: 50%;
      }
    }
    &.fl:last-of-type {
      &::before {
        right: 50%;
      }
    }
    &.fr:last-of-type {
      &::before {
        left: 50%;
      }
    }
  }
}
</style>