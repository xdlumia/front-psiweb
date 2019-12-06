/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-12-06 16:45:32
 * @Description: 操作记录
*/
<template>
  <div>
    <el-timeline>
      <div
        class="d-text-gray"
        v-if="!logData.length"
      >暂无操作记录</div>
      <el-timeline-item
        v-for="(item,index) of logData"
        :timestamp="$options.filters.timeToStr(item.createTime,'YYYY-MM-DD HH:MM:ss')"
        placement="top"
        :key="index"
      >
        <el-card>
          <div
            class="d-flex"
            style="align-items: center;"
          >
            <el-avatar icon="el-icon-user-solid"></el-avatar>
            <span class="d-inline ml20">{{item.userName}}</span>
            <!-- <span class="d-inline ml30">审核通过</span> -->
          </div>
          <p class="mt5">{{item.description}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>

export default {
  components: {

  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      logData: []
    }
  },
  created() {
    this.logQueryList(this.data.id)
  },
  watch: {
  },
  methods: {
    logQueryList(id) {
      let params = {
        businessId: id,
        businessType: '20', // 报价单
        limit: 99,
        page: 1
      }
      this.$api.operlogService.logQueryList(params)
        .then(res => {
          this.logData = res.data || []
        })
    }
  },
  beforeDestroy() {
  }
}
</script>
<style scoped lang="scss">
</style>
