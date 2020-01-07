/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-01-07 18:38:09
 * @Description: 销售出库单详情-详情
*/
<template>
  <div>
    <!-- 审核面板 -->
    <approve-panel
      disabled
      collapse
      busType="16"
      :data="data"
      class="d-bg-white"
    >
    </approve-panel>
    <div
      class="d-relative"
      style="top:200px"
    >
      <!-- 客户信息 -->
      <customerInfo
        disabled
        :data="data"
      />
      <!-- 公司信息 -->
      <companyInfo
        disabled
        :data="data"
      />
      <!-- 报价单信息 -->
      <quote-info
        v-if="rowData.quotationCodes"
        :options="rowData.quotationCodes || []"
      />

      <!-- 收款滞纳金 -->
      <payment-late-sales
        disabled
        :data="data"
      />
      <!-- 账期信息 -->
      <billInfo
        disabled
        :data="data"
      />
      <!-- 自定义信息 -->
      <customInfo
        disabled
        busType="16"
        :data="data"
      />
      <!-- 备注信息 -->
      <extrasInfo
        disabled
        :data="data"
      />
      <!-- 邮件担保 -->
      <remark-info
        disabled
        title="邮件担保"
        :data="data.mailEnsureAttachsInfo || {}"
      />
      <!-- 合同收回 -->
      <remark-info
        disabled
        title="合同收回"
        :data="data.contractAttachInfo || {}"
      />
    </div>
  </div>
</template>
<script>
import quoteInfo from '../quote-info'

export default {
  props: {
    rowData: Object,
    data: {
      default: () => ({}),
      type: Object
    }
  },
  components: {
    quoteInfo
  },

  data() {
    return {

    }
  },
  computed: {
  },
  mounted() {

  },
  methods: {

  },
  beforeDestroy() {
  }
}
</script>
<style scoped>
</style>
