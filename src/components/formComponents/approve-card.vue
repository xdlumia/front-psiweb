/*
 * @Author: 赵伦
 * @Date: 2019-10-28 10:05:00
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-28 14:25:49
 * @Description: 审核小卡片
*/
<template>
  <div>
    <el-steps :active="currentStepIndex">
      <!-- el-icon-error 驳回
      el-icon-success 审核通过-->
      <!-- wait / process / finish / error / success -->
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
    </el-steps>
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
    currentStepIndex() {
      let index = 0;
      this.progress.some((item, i) => {
        if (!(item.rejected || item.approved)) {
          index = i;
          return true;
        }
      });
      return index;
    },
    isReject() {
      let latestDealed = this.progress[this.currentStepIndex - 1];
      if (latestDealed) {
        return latestDealed.rejected;
      } else {
        return false;
      }
    }
  },
  methods: {
    getStatus(data, index) {
      //   wait / process / finish / error / success
      if (data.wait == '驳回') {
        return 'finish';
      }
      // else if (data.rejected) {
      //   return 'error';
      // } else if (this.currentStepIndex == index) {
      //   return 'wait';
      // } 
      else {
        return 'finish';
      }
    },
    getIcons(data, index) {
      let icon = this.icons[this.getStatus(data, index)];
      return icon || 'el-icon-success';
    }
  }
};
</script>
<style lang="scss" scoped>
</style>