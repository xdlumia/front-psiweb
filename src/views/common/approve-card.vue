<template>
  <div>
    <el-steps :active="currentStepIndex">
      <!-- el-icon-error 驳回
      el-icon-success 审核通过-->
      <!-- wait / process / finish / error / success -->
      <el-step :key="i" :status="getStatus(item,i)" :title="item.name" v-for="(item,i) of progress">
        <span :class="getIcons(item,i)" class="f24" slot="icon"></span>
        <div slot="description">
          <div>{{item.approvalName}}</div>
          <div>{{item.operatTime | timeToStr('YYYY-MM-DD hh:mm:ss')}}</div>
        </div>
      </el-step>
    </el-steps>
    <div class="d-text-gray" v-if="isReject">审核 驳回原因：价格不符</div>
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
          name: '提交审核',
          operatTime: +new Date(),
          approvalName: '小胖'
        },
        {
          approved: true,
          rejected: false,
          name: '财务审核',
          operatTime: +new Date(),
          approvalName: '小胖'
        },
        {
          approved: false,
          rejected: true,
          name: '审核驳回',
          operatTime: +new Date(),
          approvalName: '小胖'
        },
        {
          approved: false,
          name: '完成',
          operatTime: +new Date(),
          approvalName: '小胖'
        },
        {
          approved: false,
          name: '完成',
          operatTime: +new Date(),
          approvalName: '小胖'
        },
        {
          approved: false,
          name: '完成',
          operatTime: +new Date(),
          approvalName: '小胖'
        },
        {
          approved: false,
          name: '完成',
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
      if (data.approved) {
        return 'finish';
      } else if (data.rejected) {
        return 'error';
      } else if (this.currentStepIndex == index) {
        return 'wait';
      } else {
        return 'wait';
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