/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-23 16:13:57
 * @Description: 操作记录
*/
<template>
  <div>
    <el-timeline>
      <el-timeline-item
        v-for="(item,index) of 6"
        timestamp="2018/4/12"
        placement="top"
        :key="index"
      >
        <el-card>
          <div
            class="d-flex"
            style="align-items: center;"
          >
            <el-avatar icon="el-icon-user-solid"></el-avatar>
            <span class="d-inline ml20">王五</span>
            <span class="d-inline ml30">审核通过</span>
          </div>
          <p>王小虎 提交于 2018/4/12 20:46</p>
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
    // data: {
    //   type: Array
    // }
  },
  beforeDestroy() {
  }
}
</script>
<style scoped lang="scss">
</style>
