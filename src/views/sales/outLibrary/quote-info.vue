/*
 * @Author: web.王晓冬
 * @Date: 2019-10-24 12:33:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-20 11:18:58
 * @Description: 报价单信息 编辑查看时使用
*/
<template>

  <!-- 报价单信息 -->
  <quotationInfo>
    <el-tabs
      slot="tabs"
      v-model="activeName"
    >
      <el-tab-pane
        v-for="(item,index) of options"
        :key="index"
        :label="item"
        :name="item"
      ></el-tab-pane>
    </el-tabs>
    <div slot="body">
      <el-form
        label-position="top"
        size="small"
      >
        <!-- 发货信息 -->
        <deliverInfo
          :hide="['note']"
          :data="detail"
          disabled
        />
        <!-- 商品信息 -->
        <commodity-quote-info
          v-if="Object.keys(detail).length"
          :data="detail"
          disabled
        />
        <!-- 报价有效期 -->
        <payExpire
          :data="detail"
          disabled
        />
        <!-- 附加发票 -->
        <extrataxInfo
          :data="detail"
          disabled
        />
        <!-- 自定义信息 -->
        <customInfo
          :data="detail"
          disabled
        />
        <!-- 备注信息 -->
        <extrasInfo
          :data="detail"
          disabled
        />
      </el-form>
    </div>
  </quotationInfo>
</template>
<script>
import quoteDetail from '../quote/quoteDetails/detail'
import { log } from 'util'
export default {
  props: ['options'],
  components: {
    quoteDetail
  },
  data() {
    return {
      activeName: this.options[0], // 数据源
      detail: {},
    }
  },
  watch: {
    activeName: {
      handler(val) {
        this.getDetail()
      },
      immediate: true
    }
  },
  created() {
  },
  mounted() {

  },
  computed: {

  },
  methods: {
    async getDetail() {
      let { data } = await this.$api.seePsiSaleService.salesquotationGetinfoByCode({ quotationCode: this.activeName })
      this.detail = data || {}
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
