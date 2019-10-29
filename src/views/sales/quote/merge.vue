/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-29 16:38:35
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
        <a
          slot="label"
          href="#customerInfo"
        >客户信息</a>
      </el-tab-pane>
      <el-tab-pane name="companyInfo">
        <span
          slot="label"
          v-anchor:companyInfo
        >公司信息</span>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span
          slot="label"
          v-anchor:customer
        >报价单信息</span>
      </el-tab-pane>
      <el-tab-pane name="1">
        <span
          slot="label"
          v-anchor:customer
        >账单信息</span>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span
          slot="label"
          v-anchor:customer
        >自定义信息</span>
      </el-tab-pane>
      <el-tab-pane name="3">
        <span
          slot="label"
          v-anchor:customer
        >备注信息</span>
      </el-tab-pane>
    </el-tabs>
    <div
      class="d-auto-y"
      style="height:calc(100vh - 200px)"
    >
      <!-- 客户信息 -->
      <customerInfo id="customerInfo" />
      <!-- 公司信息 -->
      <companyInfo ref="companyInfo" />
      <!-- 报价单信息 -->
      <form-card title="报价单信息">
        <el-tabs v-model="activeName">
          <el-tab-pane
            v-for="(item,index) of 11"
            :key="index"
            :label="`报价单${index}`"
            :name="index"
          ></el-tab-pane>
        </el-tabs>
        <!-- 发货信息 -->
        <deliverInfo />
        <!-- 商品信息 -->
        <!-- 报价单有效期 -->
        <payExpire />
        <!-- 附加发票 -->
        <extrataxInfo ref="extrataxInfo" />
        <!-- 自定义信息 -->
        <customInfo ref="customInfo" />
        <!-- 备注信息 -->
        <extraInfo ref="extraInfo" />
      </form-card>

      <!-- 收款滞纳金 -->
      <paymentLate ref="paymentLate" />
      <!-- 账期信息 -->
      <billInfo ref="billInfo" />
      <!-- 自定义信息 -->
      <customInfo ref="customInfo" />
      <!-- 备注信息 -->
      <extraInfo ref="extraInfo" />
    </div>
    <div class="ac mt10">
      <el-button
        type="primary"
        size="small"
      >取消</el-button>
      <el-button size="small">保存</el-button>
    </div>
  </el-form>
</template>
<script>
import customerInfo from '@/components/formComponents/customer-info' //客户信息
import companyInfo from '@/components/formComponents/company-info' //公司信息
import customInfo from '@/components/formComponents/custom-info' //自定义信息
import deliverInfo from '@/components/formComponents/deliver-info' //发货信息
import extrataxInfo from '@/components/formComponents/extratax-info' //附加发票
import extraInfo from '@/components/formComponents/extras-info' //备注信息
import paymentLate from '@/components/formComponents/payment-late' //收款滞纳金
import billInfo from '@/components/formComponents/bill-info' //账期信息
import payExpire from '@/components/formComponents/pay-expire' //报价单有效期


export default {
  components: {
    customerInfo,
    companyInfo,
    customInfo,
    deliverInfo,
    extrataxInfo,
    extraInfo,
    paymentLate,
    billInfo,
    payExpire
  },
  props: ['drawerData'],
  data() {
    return {
      // 当前锚点
      anchorLink: 'customer',
      // 表单
      form: {},
      // 报价单信息
      activeName: 0
    }
  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
