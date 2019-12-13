/*
 * @Author: 赵伦
 * @Date: 2019-10-28 10:05:00
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-13 15:50:14
 * @Description: 审核小卡片
*/
<template>
  <div>
    <ul class="approve-wrap">
      <div
        v-if="!progress.length"
        class="ac d-text-gray"
      >暂无操作流程</div>
      <li
        class="approve-item d-text-qgray"
        :class="`${classStatus(item)} ${classFloat(index)}`"
        v-for="(item,index) of progress"
        :key="index"
      >
        <div class="approve-state"></div>
        <div class="approve-title ac">{{item.taskState==3?'驳回':item.taskName}}</div>
        <div class="approve-name ac">{{item.creator | userName}}</div>
        <div class="approve-time ac f12">{{item.createTime | timeToStr('YYYY-MM-DD HH:mm:ss')}}</div>
        <el-tooltip
          v-if="item.taskState==3"
          :content="item.notes"
          placement="top-start"
        >
          <div class="approve-time ac f12 d-elip">驳回原因:{{item.notes}}</div>
        </el-tooltip>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    progress: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

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
      // taskState = 3是驳回 2通过
      if (data.taskState == 3) {
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
    height: 120px;
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