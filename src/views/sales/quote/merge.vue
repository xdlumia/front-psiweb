/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-31 16:27:54
 * @Description: 报价单详情
*/
<template>
  <el-form
    ref="form"
    :model="form"
    size="mini"
    label-position="top"
  >
    <el-tabs v-model="anchorLink">
      <el-tab-pane name="customerInfo">
        <span
          slot="label"
          v-anchor:customerInfo
        >客户信息</span>
      </el-tab-pane>
      <el-tab-pane name="companyInfo">
        <span
          slot="label"
          v-anchor:companyInfo
        >公司信息</span>
      </el-tab-pane>
      <el-tab-pane name="quotationInfo">
        <span
          slot="label"
          v-anchor:quotationInfo
        >报价单信息</span>
      </el-tab-pane>
      <el-tab-pane name="billInfo">
        <span
          slot="label"
          v-anchor:billInfo
        >账单信息</span>
      </el-tab-pane>
      <el-tab-pane name="customInfo">
        <span
          slot="label"
          v-anchor:customInfo
        >自定义信息</span>
      </el-tab-pane>
      <el-tab-pane name="extrasInfo">
        <span
          slot="label"
          v-anchor:extrasInfo
        >备注信息</span>
      </el-tab-pane>
    </el-tabs>
    <div
      class="d-auto-y"
      style="height:calc(100vh - 200px)"
    >
      <!-- 客户信息 -->
      <customerInfo ref="customerInfo" />
      <!-- 公司信息 -->
      <companyInfo ref="companyInfo" />
      <!-- 报价单信息 -->
      <quotation-info ref="quotationInfo">
        <el-tabs
          slot="tabs"
          v-model="activeName"
        >
          <el-tab-pane
            v-for="(item,index) of 11"
            :key="index"
            :label="`报价单${index}`"
            :name="index+''"
          ></el-tab-pane>
        </el-tabs>
        <div slot="body">
          <!-- 发货信息 -->
          <deliverInfo />
          <!-- 商品信息 -->
          <commodityInfo />
          <!-- 报价单有效期 -->
          <payExpire />
          <!-- 附加发票 -->
          <extrataxInfo />
          <!-- 自定义信息 -->
          <customInfo />
          <!-- 备注信息 -->
          <extrasInfo />
        </div>
      </quotation-info>
      <!-- 收款滞纳金 -->
      <paymentLate ref="paymentLate" />
      <!-- 账期信息 -->
      <billInfo ref="billInfo" />
      <!-- 自定义信息 -->
      <customInfo ref="customInfo" />
      <!-- 备注信息 -->
      <extrasInfo ref="extrasInfo" />
    </div>
    <div class="ac mt10">
      <el-button
        @click="dialogData.visible = false"
        size="small"
      >取消</el-button>
      <el-button
        type="primary"
        size="small"
      >保存</el-button>
    </div>
  </el-form>
</template>
<script>
export default {
  components: {
  },
  props: ['dialogData'],
  data() {
    return {
      // 当前锚点
      anchorLink: 'customerInfo',
      // 表单
      form: {},
      // 报价单信息
      activeName: "0",
      quotoCollapse: true
    }
  },
  beforeDestroy() {
  }
}
</script>
<style scoped lang="scss">
.collapse-arrow {
  transition: all 0.2s;
  &.active {
    transform: rotate(90deg);
  }
}
</style>
