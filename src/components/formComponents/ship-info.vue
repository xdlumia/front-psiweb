/*
 * @Author: 徐贺 
 * @Date: 2019-10-25 15:24:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-25 17:18:25
 * @Description: 库房  销售单 详情组件 发货信息
 */
<template>
  <div>
    <form-card title='发货信息'>
      <el-row>
        <el-col :span="8">
          <div class="d-text-black">销售要求发货日期</div>
          <div class="d-text-qgray mt5 mb20">{{data.salesQuotationEntity.salesRequireArrivalTime|timeToStr('YYYY-MM-DD')}}</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-black">物流方式</div>
          <div class="d-text-qgray mt5 mb20">陆运</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-black">到货方式</div>
          <div class="d-text-qgray mt5 mb20">自提</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-black">控货方式</div>
          <div class="d-text-qgray mt5 mb20">不控</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-black">收货人</div>
          <div class="d-text-qgray mt5 mb20">{{data.salesQuotationEntity.clientLinkman || '-'}}</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-black">收货人电话</div>
          <div class="d-text-qgray mt5 mb20">{{data.salesQuotationEntity.clientPhone || '-'}}</div>
        </el-col>
        <el-col :span="8">
          <div class="d-text-black">收货人地址</div>
          <div class="d-text-qgray mt5">{{data.salesQuotationEntity.clientReceivingAddress || '-'}}</div>
        </el-col>
        <el-col :span="14">
          <div class="d-text-black">备注</div>
          <div class="d-text-qgray mt5">{{data.salesQuotationEntity.note || '-'}}</div>
        </el-col>

      </el-row>
    </form-card>
  </div>
</template>
<script>
export default {
  props: ['data'],
  data() {
    return {
      // 查询表单
      queryForm: {
        title: '', // 标题
        city: '', // 城市
        pushTime: '',
        messageType: '',
        status: '',
        page: 1,
        limit: 20
      },
    }
  },
  components: {
  },
}
</script>
<style scoped>
</style>
