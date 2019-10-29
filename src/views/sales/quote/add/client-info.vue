/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-29 18:44:39
 * @Description: file content
*/
<template>
  <div>
    <baseInfo />
    <invoiceInfo />
  </div>
</template>
<script>
import baseInfo from '@/components/formComponents/base-info' //客户信息
import invoiceInfo from '@/components/formComponents/invoice-info' //发票信息
import customInfo from '@/components/formComponents/custom-info' //自定义信息
import deliverInfo from '@/components/formComponents/deliver-info' //发货信息
import extrataxInfo from '@/components/formComponents/extratax-info' //附加发票
import extraInfo from '@/components/formComponents/extras-info' //备注信息
import paymentLate from '@/components/formComponents/payment-late' //收款滞纳金
import billInfo from '@/components/formComponents/bill-info' //账期信息
import payExpire from '@/components/formComponents/pay-expire' //报价单有效期
import commodityInfo from '@/components/formComponents/commodity-info' //商品信息

export default {
  props: ['dialogData', 'visible'],
  components: {
    baseInfo,
    invoiceInfo
  },
  data() {
    return {
      loading: false,
      // 当前操作步骤
      steps: 1,
      clientno: '',
      activeName: 'first', // 数据源
      // 新增orEdit框内容
      addForm: {
        title: '', // 标题
        cityName: '', // 城市
        cityId: this.$local.fetch('cityInfo').id, // 城市
        id: '', // 主键id
        mainPic: '', // 主图
        content: '' // 内容
      },
    }
  },
  created() {
    // this.initCompanyAdd()
  },
  mounted() {
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
</style>
